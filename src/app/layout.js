"use client";

import "./globals.css";
import Header from "@/components/Header";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v13-appRouter";
import {CssBaseline, ThemeProvider} from "@mui/material";
import theme from "@/theme";


export default function RootLayout({children}) {
    return (
        <html lang="en">
        <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline/>

                <body>
                <Header/>
                {children}

                </body>
            </ThemeProvider>
        </AppRouterCacheProvider>

        </html>
    );
}
