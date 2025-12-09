import express from "express";
import {
  createOrder,
  getMyOrders,
  getSellerOrders,
  getAllOrders,
  updateOrderStatus
} from "../controllers/orderController.js";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("user"), createOrder);
router.get("/my", protect, authorizeRoles("user"), getMyOrders);
router.get("/seller", protect, authorizeRoles("seller"), getSellerOrders);
router.get("/", protect, authorizeRoles("admin"), getAllOrders);
router.put("/:id/status", protect, authorizeRoles("admin"), updateOrderStatus);

export default router;
