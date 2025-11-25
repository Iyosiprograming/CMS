import Employee from "../models/employeModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";

//************************ */
// LOGIN EMPLOYEE
//************************* */

export const loginEmployee = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const employee = await Employee.findOne({ email });
        if (!employee) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, employee.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign(
            { id: employee._id },
            process.env.JWT_SECRET as string,
            { expiresIn: "1d" }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            employee,
        });
    } catch (error) {
        console.log("Server error while login employee");
        res.status(500).json({ message: "Server error while login employee" });
    }
};

//************** */
// GET PROFILE 
//*************** */

export const seeProfile = async (req: Request, res: Response) => {
    try {
        const employeeId = req.header("employeeId");

        if (!employeeId) {
            return res.status(400).json({
                success: false,
                message: "employeeId header is missing",
            });
        }

        const employee = await Employee.findById(employeeId);

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Profile Found",
            employee,
        });

    } catch (error) {
        console.log("Server error while getting profile:", error);
        res.status(500).json({
            success: false,
            message: "Server error while getting profile",
        });
    }
};
