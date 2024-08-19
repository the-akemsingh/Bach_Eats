"use client"
import Navbar from '@/components/Navbar';
import { usePathname } from 'next/navigation'


const NavbarProvider = () => {
    const pathname = usePathname()
    const hideNavbar = pathname === '/signin' || pathname === '/signup' || pathname === '/forgot-password';
    return (
        <>
            {!hideNavbar && <Navbar/>}
        </>
    )
}
export default NavbarProvider;