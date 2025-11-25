import Employee  from "../models/employeModel"
import { Request, Response } from "express";

// LOGIN EMPLOYEES
export const loginEmployee = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const employee = await Employee.findOne({ email, password });
        if (!employee) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        res.status(200).json({ message: "Login successful", employee });
    } catch (error) {
        console.log("Server error while login employee");
        res.status(500).json({ message: "Server error while login employee" });
        
    }
}