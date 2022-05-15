import { Router } from "express";
import { createLink, getLink, getLinks, removeLink, updatelink } from "../controllers/link.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import { bodyLinkValidator, paramsLinkValidator } from "../middlewares/validatorManager.js";

const router = Router();

// GET      api/v1/links                all links
// GET      api/v1/links/:nanoLink      search link
// POST     api/v1/links                create link
// PATCH    api/v1/links                update link
// DELETE   api/v1/links/:nanoLink      remove link

router.get("/", requireToken, getLinks);
router.get("/:id", requireToken, getLink)
router.post("/", requireToken, bodyLinkValidator, createLink);
router.delete("/:id", requireToken, paramsLinkValidator, removeLink);
router.patch("/:id", requireToken, paramsLinkValidator, bodyLinkValidator, updatelink)

export default router; 