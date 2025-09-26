const express = require("express");
const {
  createTask,
  getAllTasks,
  getMyTasks,
  getTaskById,
  updateTask,
  deleteTask,
  updateTaskStatus,
} = require("../controller/taskController");

const { protect, protectAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", protect, protectAdmin, createTask);
router.get("/all", protect, protectAdmin, getAllTasks);
router.get("/my", protect, getMyTasks);
router.get("/:id", protect, getTaskById);
router.put("/update/:id", protect, protectAdmin, updateTask);
router.patch("/status/:id", protect, updateTaskStatus);
router.delete("/delete/:id", protect, protectAdmin, deleteTask);

module.exports = router;
