import { connect } from "mongoose";
import env from "dotenv";
env.config();

const URL: string = process.env.APPLICATION_URL!

const Database = () => {
  try {
    connect(URL).then(() => {
      console.log("DB connected 🚀🚀🚀 ...");
    });
  } catch (error: any) {
    console.log("Error",error.message);
  }
};

export default Database;
