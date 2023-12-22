import { Request, Response } from "express";
import authModel from "../Model/authModel";
import profileModel from "../Model/profileModel";
import { streamUpload } from "../utils/streamUpload";
import { Types } from "mongoose";
import { HTTP } from "../error/mainError";

export const createProfile = async (req: any, res: Response) => {
  try {
    const { userID } = req.params;

    const { motivation, fullName, schoolName, address, phoneNumber, gender } = req.body;

    const user = await authModel.findById(userID);

    const { secure_url, public_id }: any = await streamUpload(req);

    if (user) {
      const profiled = await profileModel.create({
        motivation,
        fullName,
        schoolName,
        address,
        phoneNumber,
        gender,
        avatar: secure_url,
        avatarID: public_id,
      });
      user.profile.push(new Types.ObjectId(profiled?._id!));
      await user.save();
      return res.status(HTTP.CREATE).json({
        message: "student profile created",
        data: profiled,
      });
    } else {
      return res.status(HTTP.BAD).json({
        message: "student not found",
      });
    }
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "Error creating profile",
      data: error.message,
    });
  }
};

export const viewProfile = async (req: Request, res: Response) => {
  try {
    const profiled = await profileModel.find();

    return res.status(HTTP.OK).json({
      message: "can see all profiles",
      data: profiled,
    });
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "error",
      data: error.message,
    });
  }
};

export const viewOneProfile = async (req: Request, res: Response) => {
  try {
    const { profileID } = req.params;
    const profiled = await profileModel.findById(profileID);

    return res.status(HTTP.OK).json({
      message: "can see one profile",
      data: profiled,
    });
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "error",
      data: error.message,
    });
  }
};

export const veiwStudentProfile = async (req: Request, res: Response) => {
  try {
    const { studentID } = req.params;

    const student = await authModel.findById(studentID).populate({
      path: "profile",
    });

    return res.status(HTTP.OK).json({
      message: "can see a student profile",
      data: student,
    });
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "error",
      data: error.message,
    });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { profileID } = req.params;

    const { schoolName, phoneNumber, address } = req.body;

    const profiled = await profileModel.findByIdAndUpdate(
      profileID,
      { schoolName, phoneNumber, address },
      { new: true }
    );
    return res.status(HTTP.UPDATE).json({
      message: "Profile updated",
      data: profiled,
    });
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "error",
      data: error.message,
    });
  }
};

export const deleteOneProfile = async (req: Request, res: Response) => {
  try {
    const { profileID } = req.params;
    const profiled = await profileModel.findByIdAndDelete(profileID);

    return res.status(HTTP.OK).json({
      message: "Profile Deleted",
      data: profiled,
    });
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "error",
      data: error.message,
    });
  }
};
