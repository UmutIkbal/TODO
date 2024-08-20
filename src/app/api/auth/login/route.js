// import { connectToDB } from "@utils/database";
// import User from "@models/user";
// import bcrypt from "bcrypt";

// export async function POST(request) {
//     const { email, password } = await request.json();
//     console.log(email, password)
//     try {
//         await connectToDB();
//         const user = await User.findOne({ email });
//         console.log(email, password)

//         if (!user) {
//             return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
//         }

//         const isPasswordCorrect = await bcrypt.compare(password, user.password);

//         if (!isPasswordCorrect) {
//             return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401 });
//         }

//         return new Response(JSON.stringify({ id: user._id, username: user.username }), { status: 200 });
//     } catch (error) {
//         return new Response(JSON.stringify({ error: "Failed to log in" }), { status: 500 });
//     }
// }