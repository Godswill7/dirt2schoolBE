import { Request, Response } from "express";
import profileModel from "../Model/profileModel";
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

    if (getSchool) {
      if (getSchool.verified) {
        if (getStudent) {
          if (getStudent.verified) {
            const createFee = await feeModel.create({
              ammountPaid,
              studentID,
              schoolID,
              schoolName: getSchool?.schoolName,
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
            message: "Student does not exist on this platform",
          });
        }
      } else {
        return res.status(HTTP.BAD).json({
          message: "School is not verified to receive payments",
        });
      }
    } else {
      return res.status(HTTP.BAD).json({
        message: "School does not exist on this platform",
      });
    }
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: `Error ${error.message}`,
    });
  }
};
