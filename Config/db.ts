import {connect} from "mongoose"
import env from "dotenv"
env.config()

const url:string = process.env.APPLICATION_URL!

const db=()=>{
   try {
     connect(url).then(() => {
       console.log("db connection established");
     });
   } catch (error:any) {
    console.log("Error connecting Database ...")
   }
}

export default db