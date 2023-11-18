import { Request, Response } from "express";
import bagModel from "../Model/bagModel";
import authModel from "../Model/authModel";

export const createBag = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { bag, cash } = req.body;

    const user = await authModel.findById(userID);

    if (user) {
      if (user.verify === true && user.token === "") {
        const createBag = await bagModel.create({
          bag,
          cash,
          userID,
        });
        return res.status(201).json({
          message: `Your ${bag} has been created successfully`,
          data:createBag
        });
      } else {
        return res.status(404).json({
          message: "user not verified",
        });
      }
    } else {
      return res.status(404).json({
        message: "user does not exist",
      });
    }
  } catch (error: any) {
    return res.status(404).json({
      message: `Error: ${error.message}`,
    });
  }
};


