import { loginOwner, createownerAccount, createEmploye } from "../controllers/ownerController"
import express from "express";
const router = express.Router();

router.post("/owner/create", createownerAccount)
router.post("/owner/login", loginOwner)
router.post("/owner/createEmploye", createEmploye)

export default router

