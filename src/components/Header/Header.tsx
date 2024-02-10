'use client'
import Link from 'next/link'
import Cards from '@/components/Header/Cards'
import { usePathname } from 'next/navigation'

type headerLink = {
    title: string
    address: string
}

export default function Header() {
    const headerLinks: headerLink[] = [
        { title: 'Összegzés', address: '/' },
        { title: 'Tételek', address: '/expenses' },
        { title: 'Utalások', address: '/transfers' },
        { title: 'QR kódok', address: '/qrs' },
    ]
    const curPathname = usePathname()

    return (
        <div>
            <h1>Lepedő</h1>

            {headerLinks.map((link, index) => (
                <Link key={index} href={link.address}>
                    <h2
                        className={
                            curPathname === link.address ? 'activeheader' : ''
                        }>
                        {link.title}
                    </h2>
                </Link>
            ))}
            <Cards summary={true} />
        </div>
    )
}
