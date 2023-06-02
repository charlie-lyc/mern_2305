import mongoose from 'mongoose'


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        if (process.env.NODE_ENV === 'development') {
            console.log(`MongoDB connected on ${conn.connection.host}`)
        }
    } catch (error) {
        if (process.env.NODE_ENV === 'development') {
            console.error(error.message)
        }
        process.exit(1)
    }
}

export default connectDB