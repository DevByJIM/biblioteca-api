import { Router } from "express";
import { getBook, getBooksAuthor, getBooks, createBook, removeBook, updateBook } from "../controllers/book.controller.js";
import { requireToken } from "../middlewares/requireToken.js";


const router = Router();

router.get("/", getBooks);
router.get("/:id", getBook);
router.post("/", requireToken, createBook);
router.delete("/:id", requireToken, removeBook);
router.put("/:id", requireToken, updateBook);

router.get("/author/:author", getBooksAuthor);

export default router;