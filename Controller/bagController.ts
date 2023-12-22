import { Request, Response } from "express";
import bagModel from "../Model/bagModel";
import authModel from "../Model/authModel";
import { HTTP } from "../error/mainError";
import { Types } from "mongoose";

export const createBag = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { bag, cash } = req.body;

    const user = await authModel.findById(userID);

    if (user) {
      if (user.verified && user.token === "") {
        const createBag = await bagModel.create({
          bag,
          cash,
          userID,
        });

        user.bagHistory.push(new Types.ObjectId(createBag._id));
        user.save();

        return res.status(HTTP.CREATE).json({
          message: `Your ${bag} has been created successfully`,
          data: createBag,
        });
      } else {
        return res.status(HTTP.BAD).json({
          message: "user not verified",
        });
      }
    } else {
      return res.status(HTTP.BAD).json({
        message: "user does not exist",
      });
    }
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: `Error: ${error.message}`,
    });
  }
};

export const viewBagDetails = async (req: Request, res: Response) => {
  try {
    const { bagID } = req.params;

    const bagDetails = await bagModel.findById(bagID);

    return res.status(HTTP.OK).json({
      message: "Viewing bag details",
      data: bagDetails,
    });

  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "Error viewing bag details",
      data: error.message,
    });
  }
};

export const deleteBag = async (req: Request, res: Response) => {
  try {

    const { bagID } = req.params;

    await bagModel.findByIdAndDelete(bagID);

    return res.status(HTTP.DELETE).json({
      message: "Bag Deleted successfully",
    })

  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "Error deleting bag",
      data: error.message,
    });
  }
};
