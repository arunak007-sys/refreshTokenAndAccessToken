import mongoose from "mongoose";


const dbConnected = async () => {
    try {
       await mongoose.connect(process.env.DB_URL)
            .then(() => {
                console.log("DB is connected")
            })
    }
    catch (error) {
        console.log(error.message)
    }
}

export default dbConnected