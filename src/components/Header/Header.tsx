import styles from "./header.module.css";
import Link from "next/link";
export default function Header() {
  return (
    <div>
      <h1 className={styles.title}>Lepedő</h1>
      
      <Link className={styles.link} href="/">
        <h2>Összegzés</h2>
      </Link>
      <Link className={styles.link} href="/list">
        <h2>Tételek</h2>
      </Link>
    </div>
  );
}
