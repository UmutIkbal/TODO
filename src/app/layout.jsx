import '@styles/globals.css'
import Provider from '@components/Provider'
import { ThemeProvider } from 'next-themes';

import Nav from '@components/Nav'

const RootLayout = ({ children }) => {
    return (
        <html lang='en'>
            <body>
                <Provider>
                    <ThemeProvider enableSystem={true} attribute="class">
                        <Nav />
                        {children}
                    </ThemeProvider>
                </Provider>
            </body>
        </html>
    )
}

export default RootLayout