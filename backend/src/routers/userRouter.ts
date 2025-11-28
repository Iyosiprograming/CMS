import { seeProfile, loginEmployee } from "../controllers/userController"
import express from "express"

const router = express.Router();

/*************** */
// Employee Routes
/***************/

router.post("/login", loginEmployee)
router.get("/profile", seeProfile)

export default router
