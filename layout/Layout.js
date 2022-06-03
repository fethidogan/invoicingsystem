import React from 'react'
import Footer from './Footer'
import Menu from './Menu'
import { useRouter } from 'next/router'

const Layout = ({ children }) => {
    const router = useRouter()
    return (
        <>
            {router.pathname.includes("/app/") ? "" : <Menu />}
            {children}
            <Footer />
        </>
    )
}

export default Layout