import nodemailer from "nodemailer";
import { google } from "googleapis";
import ejs from "ejs";
import path from "path";
import jwt from "jsonwebtoken";
import env from "dotenv";
env.config();

const GOOGLE_ID = process.env.G_ID!;
const GOOGLE_SECRET = process.env.G_SECRET!;
const GOOGLE_REFRESH_TOKEN = process.env.G_REFRESH_TOKEN!;
const GOOGLE_URL = process.env.G_URL!;

const oAuth = new google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_URL);
oAuth.setCredentials({ access_token: GOOGLE_REFRESH_TOKEN });

export const sendAccountMail = async (user: any) => {
  try {
    const getAccess: any = (await oAuth.getAccessToken()).token;

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "eumeh3882@gmail.com",
        clientId: GOOGLE_ID!,
        clientSecret: GOOGLE_SECRET!,
        refreshToken: GOOGLE_REFRESH_TOKEN!,
        accessToken: getAccess,
      },
    });

    const token = jwt.sign(
      {
        id: user._id,
        userToken: user.token,
      },
      process.env.SECRET!
    );

    const readData = path.join(__dirname, "../views/verifyAccount.ejs");

    const data = await ejs.renderFile(readData, {
      // name: user.userName,
      email: user.email,
      token: user.token,
      url: `http://localhost:5173/api/${token}/verify-user`,
    });

    const mailer = {
      from: " <eumeh3882@gmail.com> ",
      to: user.email,
      subject: "Dirt2school",
      html: data,
    };

    transport.sendMail(mailer);
  } catch (error: any) {
    console.log(error.message);
  }
};

export const resetAccountPassword = async (user: any) => {
  try {
    const getAccess: any = (await oAuth.getAccessToken()).token;

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "eumeh3882@gmail.com",
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        refreshToken: GOOGLE_REFRESH_TOKEN,
        accessToken: getAccess,
      },
    });

    const token = jwt.sign({ id: user._id }, process.env.SECRET!);

    const readData = path.join(__dirname, "../views/resetPassword.ejs");

    const data = await ejs.renderFile(readData, {
      //  name: user.userName,
      token: user.token,
      email: user.email,
      url: `http://localhost:3783/api/${token}/reset-password`,
    });

    const mailer = {
      from: " <eumeh3882@gmail.com > ",
      to: user.email,
      subject: `Welcome ${user.email} you can now reset your password`,
      html: data,
    };

    transport.sendMail(mailer);
  } catch (error) {
    console.log(error);
  }
};

export const sendFirstAccountMail = async (student: any) => {
  try {
    const getAccess: any = (await oAuth.getAccessToken()).token;

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "eumeh3882@gmail.com",
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        refreshToken: GOOGLE_REFRESH_TOKEN,
        accessToken: getAccess,
      },
    });

    const token = jwt.sign(
      {
        id: student._id,
        userToken: student.token,
      },
      process.env.SECRET!
    );

    const readData = path.join(__dirname, "../views/studentOTP.ejs");

    const data = await ejs.renderFile(readData, {
      // name: user.userName,
      email: student.email,
      token: student.token,
      code: student?.secretKey,
      url: `http://localhost:3783/api/${token}/student-secret-key`,
    });

    const mailer = {
      from: " <eumeh3882@gmail.com> ",
      to: student.email,
      subject: "Dirt2school",
      html: data,
    };

    transport.sendMail(mailer);
  } catch (error) {
    console.log(error);
  }
};

export const sendSchoolMail = async (user: any) => {
  try {
    const getAccess: any = (await oAuth.getAccessToken()).token;

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "eumeh3882@gmail.com",
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        refreshToken: GOOGLE_REFRESH_TOKEN,
        accessToken: getAccess,
      },
    });

    const token = jwt.sign({ id: user._id }, process.env.SECRET!);

    const readData = path.join(__dirname, "../views/verifySchool.ejs");

    const data = await ejs.renderFile(readData, {
      // name: user.userName,
      email: user?.email,
      token: user?.token,
      code: user?.secretKey,
      url: `http://localhost:3783/api/${token}/verify-user`,
    });

    const mailer = {
      from: " <eumeh3882@gmail.com> ",
      to: user.email,
      subject: " dirt2school",
      html: data,
    };

    transport.sendMail(mailer);
  } catch (error) {
    console.log(error);
  }
};

export const InputOtp = async (user: any) => {
  try {
    const getAccess: any = (await oAuth.getAccessToken()).token;

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "eumeh3882@gmail.com",
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        refreshToken: GOOGLE_REFRESH_TOKEN,
        accessToken: getAccess,
      },
    });

    const token = jwt.sign(
      { id: user._id, userToken: user.token },
      process.env.SECRET!
    );

    const readData = path.join(__dirname, "../views/inputOtp.ejs");

    const data = await ejs.renderFile(readData, {
      name:  user?.profile?.fullName,
      token: user.token,
      email: user.email,
      url: `http://localhost:3783/api/${user._id}/input-otp`,
    });

    const mailer = {
      from: " <eumeh3882@gmail.com > ",
      to: user.email,
      subject: `Welcome ${user.email} you will be directed to input your otp`,
      html: data,
    };

    transport.sendMail(mailer);
  } catch (error) {
    console.log(error);
  }
};
