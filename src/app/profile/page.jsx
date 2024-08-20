"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react';


const Profile = () => {

    const [length, setLength] = useState([])
    const { data: session } = useSession()

    async function fetchTodos() {
        try {
            const url = "http://localhost:3000/api/todo";
            const response = await fetch(url);
            const data = await response.json();
            setLength(data.length);
        } catch (error) {
            console.error(error.message);
        }
    }


    useEffect(() => {
        fetchTodos();
    }, []);

    useEffect(() => {
        console.log(length);
    }, [length]);


    return (
        <div>
            <div className='flex ml-20 mt-20 gap-8 w-fit p-3'>
                <Image src={session?.user.image}
                    width={60}
                    height={60}
                    className='rounded-full'
                    alt='profile'>
                </Image>
                <h2 className='self-center'> {session?.user.name} </h2>
            </div>
            <div className='flex ml-44 w-fit p-3'>
                <p>Todo Counter: {length} </p>
            </div>
        </div>
    )
}

export default Profile