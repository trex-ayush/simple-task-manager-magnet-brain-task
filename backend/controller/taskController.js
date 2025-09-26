const Task = require("../models/task");
const User = require("../models/user");

exports.createTask = async (req, res) => {
  const { title, description, priority, dueDate, assignedTo } = req.body;

  try {
    if (!title || !description || !priority || !dueDate || !assignedTo) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findById(assignedTo);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Assigned user not found",
      });
    }

    const task = await Task.create({
      title,
      description,
      priority,
      dueDate,
      assignedTo,
      assignedBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    console.error("Create Task Error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalTasks = await Task.countDocuments();
    const tasks = await Task.find()
      .populate("assignedTo", "name email")
      .populate("assignedBy", "name email")
      .sort({ dueDate: 1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      tasks,
      pagination: {
        totalTasks,
        currentPage: page,
        totalPages: Math.ceil(totalTasks / limit),
        pageSize: limit,
      },
    });
  } catch (error) {
    console.error("Get All Tasks Error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getMyTasks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalTasks = await Task.countDocuments({ assignedTo: req.user._id });
    const tasks = await Task.find({ assignedTo: req.user._id })
      .sort({ dueDate: 1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      tasks,
      pagination: {
        totalTasks,
        currentPage: page,
        totalPages: Math.ceil(totalTasks / limit),
        pageSize: limit,
      },
    });
  } catch (error) {
    console.error("Get My Tasks Error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getTaskById = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id)
      .populate("assignedTo", "name email")
      .populate("assignedBy", "name email");

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    const assignedToId =
      task.assignedTo && task.assignedTo._id
        ? task.assignedTo._id.toString()
        : task.assignedTo?.toString();

    if (req.user.role !== "admin" && assignedToId !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    res.status(200).json({ success: true, task });
  } catch (error) {
    console.error("Get Task Error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, priority, dueDate, assignedTo } = req.body;

  try {
    const task = await Task.findById(id);
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    if (assignedTo) {
      const user = await User.findById(assignedTo);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "Assigned user not found" });
      }
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.priority = priority || task.priority;
    task.dueDate = dueDate || task.dueDate;
    task.assignedTo = assignedTo || task.assignedTo;

    await task.save();

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    console.error("Update Task Error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.updateTaskStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const allowedStatuses = ["pending", "in-progress", "completed"];
  if (!allowedStatuses.includes(status)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid status value" });
  }

  try {
    const task = await Task.findById(id);

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    const isAssignedUser =
      task.assignedTo?.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isAssignedUser && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this task",
      });
    }

    task.status = status;
    await task.save();

    res.status(200).json({
      success: true,
      message: "Task status updated",
      task,
    });
  } catch (error) {
    console.error("Update Status Error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    await task.remove();

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("Delete Task Error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
