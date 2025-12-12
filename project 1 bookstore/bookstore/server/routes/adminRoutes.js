import express from "express";
import {
  getStats,
  listUsers,
  listSellers,
  listBooks,
  toggleActive
} from "../controllers/adminController.js";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/stats", protect, authorizeRoles("admin"), getStats);
router.get("/users", protect, authorizeRoles("admin"), listUsers);
router.get("/sellers", protect, authorizeRoles("admin"), listSellers);
router.get("/books", protect, authorizeRoles("admin"), listBooks);
router.put("/users/:id/toggle", protect, authorizeRoles("admin"), toggleActive);

export default router;
