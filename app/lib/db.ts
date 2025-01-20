import mongoose from "mongoose";

async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_URL as string);
        console.log("Connected to MongoDB!");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
}

export default connect;