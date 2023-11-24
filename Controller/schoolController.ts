import { Request, Response } from "express";
import schoolModel from "../Model/schoolModel";
import bcrypt from "bcrypt";
import { sendSchoolMail } from "../utils/email";

export const createSchool = async (req: Request, res: Response) => {
  try {
    const { schoolName, email, password, address } = req.body;

    const encrypt = await bcrypt.genSalt(10);
    const decipher = await bcrypt.hash(password, encrypt);

    const school = await schoolModel.create({
      schoolName,
      email,
      password: decipher,
      address,
    });
    sendSchoolMail(school).then(() => {
      console.log("School Mail Sent ...");
    });
    return res.status(201).json({
      message: `${schoolName} school has been created successfully`,
      data: school,
    });
  } catch (error: any) {
    return res.status(404).json({
      message: `Error ${error.message}`,
    });
  }
};

export const loginSchool = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const findSchool = await schoolModel.findOne({ email });

    if (findSchool) {
      if (findSchool.verified === true) {
        const isPassword = await bcrypt.compare(findSchool?.password, password);
        if (isPassword) {
          return res.status(200).json({
            message: `Welcome back ${findSchool?.schoolName}`,
          });
        } else {
          return res.status(404).json({
            message: "Incorrect password",
          });
        }
      } else {
        return res.status(404).json({
          message: "School is not verified to operate on this platform",
        });
      }
    } else {
      return res.status(404).json({
        message: "School does not exist on this platform",
      });
    }
  } catch (error: any) {
    return res.status(404).json({
      message: `Error ${error.message}`,
    });
  }
};

export const verifySchool = async (req: Request, res: Response) => {
  try {
    const { schoolID } = req.params;

    const findSchool = await schoolModel.findById(schoolID);

    if (findSchool) {
      if (!findSchool.verified && findSchool.token !== "") {
        const verify = await schoolModel.findById(schoolID, {
          verified: true,
          token: "",
        });

        return res.status(201).json({
          message: "School has been verifeid",
          data: verify,
        });
      } else {
        return res.status(404).json({
          message: "School is already verified",
        });
      }
    } else {
      return res.status(404).json({
        message: "School does not exist",
      });
    }
  } catch (error: any) {
    return res.status(404).json({
      message: `Error ${error.message}`,
    });
  }
};
