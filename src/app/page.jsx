"use client"

import Feed from "@components/Feed"

import { useEffect } from "react"
import { ThemeProvider } from 'next-themes';


const Home = () => {

    console.log("here!")

    return (
        <div className=" w-full h-full mt-16">
            <div>
                <div className="flex justify-center content-center">
                    <h1 className="text-4xl">TODO your list and be effecient all day.</h1>
                </div>
                <Feed />
            </div>
        </div>
    )
}



export default Home