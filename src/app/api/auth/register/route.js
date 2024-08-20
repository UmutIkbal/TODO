import { connectToDB } from "@utils/database"
import User from "@models/user";
import bcrypt from "bcrypt"

export async function POST(req) {
    const { email, password, username } = await req.json()

    try {
        await connectToDB();
        const isUser = await User.findOne({ email: email })

        if (!isUser) {
            const hashPassword = await bcrypt.hash(password, 10)
            const newUser = new User({ email: email, username: username, password: hashPassword })

            await newUser.save()
            return new Response(JSON.stringify(newUser), { status: 201 })
        }
        else {
            return new Response("User already exist")
        }

    } catch (error) {
        return new Response("Failed to create a new User", { status: 500 })
    }
}