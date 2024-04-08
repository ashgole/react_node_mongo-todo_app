import mongoose, { Schema } from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const todoSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    text: {
        type: String,
        required: true,
        trim: true
    },

},

    { timeStamps: true })

export const Todo = mongoose.model("Todo", todoSchema)
