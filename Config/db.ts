import { connect } from "mongoose";
import env from "dotenv";
env.config();

const URL: string = process.env.APPLICATION_URL!

const db = () => {
  try {
    connect(URL).then(() => {
      console.log("db connection established");
    });
  } catch (error: any) {
    console.log("first");
  }
};

export default db;
