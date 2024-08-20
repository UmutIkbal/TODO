import Todo from "@models/todo";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
    try {
        await connectToDB()

        const todos = await Todo.find({}).populate("user")

        return new Response(JSON.stringify(todos), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all todos", { status: 500 })
    }
}

export const DELETE = async (request) => {
    try {
        await connectToDB()

        const { todoId } = await request.json();
        const result = await Todo.deleteOne({ _id: todoId });

        return new Response(JSON.stringify(result), { status: 200 })
    } catch (error) {
        return new Response("Failed to delete todo", { status: 500 })
    }
}