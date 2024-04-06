import mongoose from 'mongoose'
import { DB_NAME } from '../constants.js'

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}${DB_NAME}`)

        // Truncate the "users" collection
        // await mongoose.connection.db.collection('users').deleteMany({});
        // console.log('Users collection truncated successfully.');

        console.log('ok mongodb connection success :', connectionInstance.connection.host);
    } catch (error) {
        console.log('ok mongodb connection failed :', error);
        process.exit(1)
    }
}

export default connectDB