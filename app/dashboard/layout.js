import NavBar from '@/components/custom/navbar'
import React from 'react'

export default function Layout({ children }) {
    return (
        <main>
            <NavBar/>
            {children}
        </main>
    )
}
