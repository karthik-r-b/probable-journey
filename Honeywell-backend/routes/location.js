import express from "express";
import { uploadRecords, getLocations } from "../controllers/location.js";
const router = express.Router();
router.route("/upload-records").post(uploadRecords);
router.route("/get-locations").get(getLocations);

export default router;
