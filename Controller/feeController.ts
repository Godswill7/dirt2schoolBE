import { Request, Response } from "express";
import feeModel from "../Model/feeModel";
import schoolModel from "../Model/schoolModel";
import authModel from "../Model/authModel";
import { HTTP } from "../error/mainError";

export const createFee = async (req: Request, res: Response) => {
  try {
    const { studentID, schoolID } = req.params;
    const { ammountPaid } = req.body;

    const getSchool = await schoolModel.findById(schoolID);
    const getStudent = await authModel.findById(studentID);

    if (getSchool?.verified && getSchool?.token === "") {
      if (getStudent?.verified && getStudent?.token === "") {
        const createFee = await feeModel.create({
          ammountPaid,
          studentID: getStudent._id,
          schoolID: getSchool._id,
          schoolName: getSchool.schoolName,
        });
        return res.status(HTTP.CREATE).json({
          message: `Fees paid to ${getSchool.schoolName} successfully`,
          data: createFee,
        });
      } else {
        return res.status(HTTP.BAD).json({
          message: "Student is not verified to receive payment",
        });
      }
    } else {
      return res.status(HTTP.BAD).json({
        message: "School is not verified to receive Payments",
      });
    }
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: `Error ${error.message}`,
    });
  }
};
