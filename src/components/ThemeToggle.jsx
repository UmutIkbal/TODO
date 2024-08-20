import { useEffect, useState } from "react"

const ThemeToggle = () => {
    const [darkMode, setDarkMode] = useState(true)

    useEffect(() => {
        const theme = localStorage.getItem("theme")

    }, [third])


    return (
        <div>ThemeToggle</div>
    )
}

export default ThemeToggle