'use client';

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Logo from '@public/logo.png'
import Plus from '@public/plus.png'
import RegisterForm from './RegisterForm';
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import DarkMode from './DarkMode';
import { useRouter } from 'next/navigation'

const Nav = () => {
    const router = useRouter()
    const { data: session } = useSession()
    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);

    const handleRoute = () => {
        router.push('/login')
    }

    useEffect(() => {
        (async () => {
            const res = await getProviders();
            setProviders(res);
        })();
    }, []);

    return (
        <div className='flex justify-between nav-bg flex-row p-5 w-full mb-8 duration-150' >
            <Link href='/' className='flex justify-between gap-3 '>
                <Image
                    src={Logo}
                    width={50} height={50}
                    alt='logo'
                    className='object-contain rounded-2xl' />
            </Link>
            <div className='self-center sm:flex hidden w-auto'>
                {
                    session?.user
                        ? (
                            <div className='flex gap-5'>
                                <div>
                                    <DarkMode>
                                    </DarkMode>
                                </div>

                                <Link href='/todo-create' className='flex justify-between gap-2 self-center scale_anime'>
                                    <p>Create</p>
                                    <Image src={Plus}
                                        width={20}
                                        height={20}
                                        alt='asd'
                                        className='object-contain' />
                                </Link>
                                <button
                                    type='button'
                                    className='sign_button'
                                    onClick={signOut}>
                                    Sign Out
                                </button>

                                <Link href='/profile'>
                                    <Image
                                        src={session?.user.image}
                                        width={37}
                                        height={37}
                                        className='rounded-full'
                                        alt='profile'
                                    />
                                </Link>
                            </div>
                        ) : (
                            <>
                                <button
                                    type='button'
                                    onClick={handleRoute}
                                    className='sign_button'>
                                    Log In
                                </button>
                            </>
                        )
                }
            </div>
            {/**Mobil */}
            <div className='sm:hidden flex relative w-auto'>
                {session?.user ? (
                    <div className='flex'>
                        <Image
                            src={session?.user.image}
                            width={50}
                            height={50}
                            className='rounded-full'
                            alt='profile'
                            onClick={() => setToggleDropdown(!toggleDropdown)}
                        />

                        {toggleDropdown && (
                            <div className='dropdown'>
                                <Link
                                    href='/profile'
                                    className='dropdown_link'
                                    onClick={() => setToggleDropdown(false)}>
                                    My Profile
                                </Link>
                                <Link
                                    href='/todo-create'
                                    className='dropdown_link'
                                    onClick={() => setToggleDropdown(false)}>
                                    TODO
                                </Link>
                                <button
                                    type='button'
                                    onClick={() => {
                                        setToggleDropdown(false);
                                        signOut();
                                    }}
                                    className='mt-5 w-full sign_button'
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <button
                            type='button'
                            onClick={handleRoute}
                            className='sign_button'>
                            Log In
                        </button>
                    </>
                )}
            </div>
        </div >
    )
}


export default Nav