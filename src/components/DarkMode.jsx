import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

export default function DarkMode() {
    const { systemTheme, theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;
    const currentTheme = theme === 'system' ? systemTheme : theme;

    return (
        <div>
            <div className="flex justify-center">
                {currentTheme === 'dark' ? (
                    <button
                        className="sign_button"
                        onClick={() => setTheme('light')}
                    >
                        {' '}
                        Light
                    </button>
                ) : (
                    <button
                        className="sign_button"
                        onClick={() => setTheme('dark')}
                    >
                        Dark
                    </button>
                )}
            </div>
        </div>
    );
}