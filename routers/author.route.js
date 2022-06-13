import { Router } from "express";
import { createAuthor, getAuthor, getAuthors, removeAuthor, updateAuthor } from "../controllers/author.controller.js";
import { requireToken } from "../middlewares/requireToken.js";


const router = Router();

router.get("/", getAuthors);
router.get("/:id", getAuthor);
router.post("/", requireToken, createAuthor);
router.delete("/:id", requireToken, removeAuthor);
router.put("/:id", requireToken, updateAuthor);

export default router;