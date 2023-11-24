import { Request, Response } from "express";
import profileModel from "../Model/profileModel";
import feeModel from "../Model/feeModel";

export const createFee = async (req:Request,res:Response) => { 
    try {
    
        const { ammountPaid } = req.body;
        const getSchool =  profileModel

        const Fee = await feeModel.create({
            ammountPaid,
            schoolName: getSchool
        })
    
} catch (error:any) {
    return res.status(404).json({
        message:`Error ${error.message}`
    })
}
};
