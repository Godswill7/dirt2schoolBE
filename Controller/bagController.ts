import { Request, Response } from "express";
import bagModel from "../Model/bagModel";
import authModel from "../Model/authModel";
import { HTTP } from "../error/mainError";

export const createBag = async (req: Request, res: Response) => {
  try {
    const { studentID } = req.params;
    const { bag, cash } = req.body;

    const student = await authModel.findById(studentID);

    if (student) {
      if (student.verified && student.token === "") {
        const createBag = await bagModel.create({
          bag,
          cash,
          studentID,
        });
        return res.status(HTTP.CREATE).json({
          message:`Your ${bag} has been created successfully`,
          data:createBag
        });
      } else {
        return res.status(HTTP.BAD).json({
          message: "student not verified",
        });
      }
    } else {
      return res.status(HTTP.BAD).json({
        message: "student does not exist",
      });
    }
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: `Error: ${error.message}`,
    });
  }
};


