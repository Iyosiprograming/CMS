import { Request, Response } from "express";
import Owner from "../models/ownerModel";
import Employe from "../models/employeModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto"

//*********************** */
// CREATE ACCOUNT FOR OWNER (ONLY ONE OWNER IS ALLOWED)
//*********************** */
export const createownerAccount = async (req: Request, res: Response) => {
    try {
        const { name, email, password, passcode } = req.body;


        const existingOwner = await Owner.findOne({});
        if (existingOwner) {
            return res.status(400).json({
                success: false,
                message: "An owner account already exists. Only one owner is allowed.",
            });
        }


        const hashedPassword = await bcrypt.hash(password, 10);

        const newOwner = await Owner.create({
            name,
            email,
            password: hashedPassword,
            passcode,
        });


        const token = jwt.sign(
            { id: newOwner._id },
            process.env.JWT_SECRET as string,
            { expiresIn: "7d" }
        );

        return res.status(201).json({
            success: true,
            message: "Owner account created successfully.",
            owner: {
                id: newOwner._id,
                name: newOwner.name,
                email: newOwner.email,
            },
            token,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

//*************** */
// LOGIN OWNER
//**************** */

export const loginOwner = async (req: Request, res: Response) => {
    try {
        const { email, password, passcode } = req.body;

        const existingOwner = await Owner.findOne({ email });
        if (!existingOwner) {
            return res.status(400).json({
                success: false,
                message: "Owner not found",
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            existingOwner.password
        );
        if (!passwordMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect password",
            });
        }

        if (existingOwner.passcode !== passcode) {
            return res.status(400).json({
                success: false,
                message: "Invalid passcode",
            });
        }

        const token = jwt.sign(
            { id: existingOwner._id },
            process.env.JWT_SECRET as string,
            { expiresIn: "7d" }
        );

        return res.status(200).json({
            success: true,
            message: "Welcome Owner",
            owner: {
                id: existingOwner._id,
                name: existingOwner.name,
                email: existingOwner.email,
            },
            token,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

//***************** */
// CREATE EMPLOYEE
//**************** */

export const createEmploye = async (req: Request, res: Response) => {
    try {
        const { name, age, email, role, salary, employeContract } = req.body;

        const existingEmploye = await Employe.findOne({ email });
        if (existingEmploye) {
            return res.status(400).json({
                success: false,
                message: "Employee with this email already exists",
            });
        }

        const randomPassword = crypto.randomBytes(6).toString("hex"); // 12 characters
        const hashedPassword = await bcrypt.hash(randomPassword, 10);

        const newEmploye = await Employe.create({
            name,
            age,
            email,
            role,
            salary,
            employeContract,
            password: hashedPassword,
        });

        return res.status(201).json({
            success: true,
            message: "Employee account created successfully",
            employee: {
                id: newEmploye._id,
                name: newEmploye.name,
                email: newEmploye.email,
                role: newEmploye.role,
                employeContract: newEmploye.employeContract,
            },
            password: randomPassword,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};