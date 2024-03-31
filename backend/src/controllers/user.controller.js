import { User } from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js'

const registerUser = asyncHandler(async (req, res) => {
    const { username, password, email } = req.body;
    // {
    //     "username":"ashish",
    //     "password":12345,
    //     "email":"ashish@gmail.com"
    // }

    if ([username, password, email].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })
    // if (existedUser) {
    //     throw new ApiError(409, "user with email or username is already exist")
    // }

    const user = await User.create({
        username,
        password,
        email
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(200).json(
        new ApiResponse(200, createdUser, "user registed succesfully")
    )
})

export { registerUser }