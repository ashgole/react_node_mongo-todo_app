import { Todo } from "../models/todo.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const addTodo = asyncHandler(async (req, res) => {
    const { id, text } = req.body;
    try {
        const todo = await Todo.findOne({
            $or: [{ id }]
        })
        if (todo) {
            todo.text = text;
        }
        else {
            todo = await Todo.create({
                id,
                text
            })
        }
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    todo,
                    "todo added successfully...")
            )
    } catch (error) {
        throw new ApiError(400, error?.message || 'something went wrong.')

    }
})

export const getTodos = asyncHandler(async (req, res) => {
    try {
        const todoList = await Todo.find()
        res.status(200).json(
            new ApiResponse(
                200,
                todoList,
                "all todos fetched successfully..."
            )
        )
    } catch (error) {
        throw new ApiError(400, error?.message || 'something went wrong.')
    }
})

export const deleteTodo = asyncHandler(async (req, res) => {
    const { id } = req.body;
    let message = " "
    try {
        const todo = await Todo.findOneAndDelete({
            $or: [{ id }]
        })

        if (!todo) {
            message = `no todo exist of id ${id}`
        }
        else {
            message = `todo deleted successfully of id ${id}`

        }

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    {},
                    message
                )
            )

    } catch (error) {
        throw new ApiError(400, error?.message || 'wrong input.')
    }
})