import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => console.log("DB Connected"));
        await mongoose.connect(`${process.env.MONGO_URL}/social-media`);
    } catch (error) {
        console.log(error.message);
    }
}

export default connectDB;