'use client'

import Form from '@components/Form'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from "react"

const Todo = () => {

    const router = useRouter()
    const { data: session } = useSession()

    const [submit, setSubmit] = useState(false)
    const [post, setPost] = useState({
        todo: ""
    })

    const createTodo = async (e) => {
        e.preventDefault();
        setSubmit(true);

        try {
            const res = await fetch("/api/todo/new", {
                method: "POST",
                body: JSON.stringify({
                    todo: post.todo,
                    userId: session.user.id
                }),
            });

            if (res.ok) {
                router.push("/");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmit(false);
        }
    };


    return (
        <Form
            type="Create"
            post={post}
            setPost={setPost}
            submit={submit}
            handleSubmit={createTodo}
        />
    )
}

export default Todo