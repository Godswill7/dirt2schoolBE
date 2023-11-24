import { Request, Response } from "express";
import schoolModel from "../Model/schoolModel";
import bcrypt from "bcrypt"

export const createSchool = async (req: Request, res: Response) => {
    try {
        const { schoolName, email, password, address } = req.body;

        const encrypt = await bcrypt.genSalt(10);
        const decipher = await bcrypt.hash(password, encrypt);
        
        const school = await schoolModel.create({
            schoolName,
            email,
            password:decipher,
            address,
        })
        return res.status(201).json({
            message: `${schoolName} school has been created successfully`,
            data:school
        })
    } catch (error: any) {
        return res.status(404).json({
            message:`Error ${error.message}`
        })
        
    }
}

export const loginSchool = async () => {
    try {
        
    } catch (error: any) {
        return 
        
    }
}