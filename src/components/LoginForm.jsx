"use client"

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

const LoginForm = () => {
    const registerUrl = "/register"
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const email = formData.get('email')
        const password = formData.get('password')


        signIn('credentials', {
            email: email,
            password: password
        })
        router.push("/profile")
    }

    return (
        <div className='flex justify-center content-center mt-24'>
            <div className='todos p-24'>
                <form className="flex flex-col mb-5" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name='email'
                        placeholder='email'
                        className='input'
                    />
                    <input
                        type="password"
                        name='password'
                        placeholder='password'
                        className='input'
                    />
                    <button type='submit' className='sign_button'>
                        Log In
                    </button>
                </form>
                <div className='flex flex-col justify-center content-center gap-8'>
                    <div className='flex flex-col content-center justify-center'>
                        <p className='self-center'>
                            if you don't have an account
                        </p>
                        <Link
                            href={registerUrl}
                            className='self-center blue_gradient'
                        >
                            register
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginForm;
