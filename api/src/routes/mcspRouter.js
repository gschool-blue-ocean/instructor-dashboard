import express from "express";
import {
	getMcsp,
	getMcspOverview,
	createMcsp,
	deleteMcsp,
	updateMcsp,
} from "../controllers/mcspController.js";

const router = express.Router();

router.get("/", getMcsp);
router.get("/overview/:mcspId", getMcspOverview);
router.post("/", createMcsp);
router.patch("/:mcspId", updateMcsp);
router.delete("/:mcspId", deleteMcsp);

export default router;
