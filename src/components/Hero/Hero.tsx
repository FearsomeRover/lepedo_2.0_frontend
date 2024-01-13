import React from 'react';
import styles from "./hero.module.css";
import LinkButton from "@/components/Button/LinkButton";

export default function Hero() {
    return (
        <>
            <div className={styles.root}>
                <div className={styles.heropanel}>
                    <h1>Lepedő</h1>
                </div>
                <div className={styles.heropanel}>
                    <h2>Manage group expenses. Easily.</h2>
                </div>
            </div>
            <LinkButton text={"Sign In"} href={"google.com"} textOnHover={"Sign In"}/>
        </>
    )
}
