import { Request, Response, response } from "express";
import authModel from "../Model/authModel";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { role } from "../utils/roles";
import {
  InputOtp,
  resetAccountPassword,
  sendAccountMail,
  sendFirstAccountMail,
} from "../utils/email";
import env from "dotenv";
import { HTTP } from "../error/mainError";
env.config();

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const token = crypto.randomBytes(2).toString("hex");

    const user = await authModel.create({
      email,
      password: hash,
      token,
      role: role.USER,
    });
    sendAccountMail(user).then(() => {
      console.log("sent verify email");
    });
    return res.status(HTTP.CREATE).json({
      message: "created successfully",
      data: user,
    });
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "Error registering user",
      data: error.message,
    });
  }
};

export const registerStudent = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const secretKey = crypto.randomBytes(2).toString("hex");

    const student = await authModel.create({
      email,
      password: hash,
      secretKey,
      role: role.STUDENT,
    });
    sendFirstAccountMail(student).then(() => {
      console.log("sent student otp");
    });
    return res.status(HTTP.CREATE).json({
      message: "created successfully",
      data: student,
    });
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "Error registering user",
      data: error.message,
    });
  }
};

export const signInUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await authModel.findOne({ email });

    if (user) {
      const check = await bcrypt.compare(password, user.password);
      if (check) {
        if (user.verified && user.token === "") {
          return res.status(HTTP.CREATE).json({
            message: `${user.email} signed in successfully`,
            data: user,
          });
        } else {
          return res.status(HTTP.BAD).json({
            message: "user not verified",
          });
        }
      } else {
        return res.status(HTTP.BAD).json({
          message: "invalid password",
        });
      }
    } else {
      return res.status(HTTP.BAD).json({
        message: "user not found",
      });
    }
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "error signing in",
      data: error.message,
    });
  }
};

export const signInStudent = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const student = await authModel.findOne({ email });
    if (student) {
      const check = await bcrypt.compare(password, student.password);
      if (check) {
        if (student.verified && student.token === "") {
          return res.status(HTTP.CREATE).json({
            message: `${student.email} signed in successfully`,
            data: student,
          });
        } else {
          return res.status(HTTP.BAD).json({
            message: "student not verified ",
          });
        }
      } else {
        return res.status(HTTP.BAD).json({
          message: "invalid password",
        });
      }
    } else {
      return res.status(HTTP.BAD).json({
        message: "student not found",
      });
    }
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "error signing in",
      data: error.message,
    });
  }
};

export const verifyUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;

    const user = await authModel.findByIdAndUpdate(
      userID,
      { verified: true, token: "" },
      { new: true }
    );
    return res.status(HTTP.UPDATE).json({
      message: "user verified successfully",
      data: user,
    });
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "error",
      data: error.message,
    });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await authModel.findOne({ email });

    if (user?.verified && user.token === "") {
      const token = crypto.randomBytes(2).toString("hex");
      const reset = await authModel.findByIdAndUpdate(
        user._id,
        { token },
        { new: true }
      );
      resetAccountPassword(user).then(() => {
        console.log("sent reset password email notification");
      });
      return res.status(HTTP.UPDATE).json({
        message: "you can reset your password go to your mail",
        data: reset,
      });
    } else {
      return res.status(HTTP.BAD).json({
        message: "something went wrong",
      });
    }
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "error",
      data: error.message,
    });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { password } = req.body;

    const user = await authModel.findById(userID);

    if (user?.verified && user.token !== "") {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const change = await authModel.findByIdAndUpdate(
        userID,
        { password: hash, token: "" },
        { new: true }
      );

      return res.status(HTTP.UPDATE).json({
        message: "changed password successfully",
        data: change,
      });
    } else {
      return res.status(HTTP.BAD).json({
        message: "user not verified",
      });
    }
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "Error changing password",
      data: error.message,
    });
  }
};

export const inputOtp = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { token } = req.body;

    const user = await authModel.findById(userID);

    if (user?.verified) {
      if (token === user.token) {
        const update = await authModel.findByIdAndUpdate(
          user._id,
          {
            token: "",
          },
          { new: true }
        );
        InputOtp(user).then(() => {
          console.log("OTP mail sent ...")
        })

        return res.status(HTTP.UPDATE).json({
          message: "You can now proceed to change Password",
          data: update,
        });
      } else {
        return res.status(HTTP.BAD).json({
          message: "Incorrect Token",
        });
      }
    } else {
      return res.status(HTTP.BAD).json({
        message: "User is Not Verified",
      });
    }
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "Error with Your Token",
    });
  }
};

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const user = await authModel.find();

    return res.status(HTTP.OK).json({
      message: `viewing all users ${user.length}`,
      data: user,
    });
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "error",
      data: error.message,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;

    await authModel.findByIdAndDelete(userID);

    return res.status(HTTP.DELETE).json({
      message: "User deleted successfully",
    });
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "error deleting user",
      data: error.message,
    });
  }
};

export const firstStudentVerify = async (req: Request, res: Response) => {
  try {
    const { studentID } = req.params;
    const { secretKey } = req.body;

    const user = await authModel.findById(studentID);

    if (user?.secretKey === secretKey) {
      sendAccountMail(user).then(() => {
        console.log("sent verification email");
      });

      return res.status(HTTP.OK).json({
        message: "Verification email",
        data: user,
      });
    } else {
      return res.status(HTTP.BAD).json({
        message: "error",
      });
    }
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "error",
      data: error.message,
    });
  }
};
