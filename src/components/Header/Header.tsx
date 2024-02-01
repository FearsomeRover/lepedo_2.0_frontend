import styles from './header.module.css'
import Link from 'next/link'
import Cards from '@/components/Header/Cards'
export default function Header() {
    return (
        <div>
            <h1>Lepedő</h1>

            <Link href="/">
                <h2>Összegzés</h2>
            </Link>
            <Link href="/list">
                <h2>Tételek</h2>
            </Link>
            <Cards summary={true} />
        </div>
    )
}
