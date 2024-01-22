import mongoose, { connect, ConnectionStates } from "mongoose"
import { configFile } from "./config";
export default () =>{
    const connect = async () =>{
        mongoose.set('strictQuery',true);
        try{
            const connection = await mongoose.connect(`${configFile.DATABASE_URL}`);
            console.log("connection established");
        }
        catch(error){
            console.log("trouble connecting");
            return process.exit(1);
        }
    }
    connect();
    mongoose.connection.on('disconnected',connect);
}