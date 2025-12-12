import express from "express";
import {
  listBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
  addReview
} from "../controllers/bookController.js";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

router.get("/", listBooks);
router.get("/:id", getBook);
router.post("/", protect, authorizeRoles("seller", "admin"), upload.single("cover"), createBook);
router.put("/:id", protect, authorizeRoles("seller", "admin"), upload.single("cover"), updateBook);
router.delete("/:id", protect, authorizeRoles("seller", "admin"), deleteBook);
router.post("/:id/reviews", protect, authorizeRoles("user"), addReview);

export default router;
