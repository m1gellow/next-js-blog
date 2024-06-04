"use client"

import { ThemeProvider as NextThemProvider } from "next-themes"
import { ThemeProviderProps } from "next-themes/dist/types"


export function ThemeProvider({children, ...props}: ThemeProviderProps){
    return <NextThemProvider {...props}>{children}</NextThemProvider>
}