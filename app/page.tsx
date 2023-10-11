'use client'
import Intro from "@/components/intro";
import styles from "./page.module.css";
import "./globals.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <Intro></Intro>
    </main>
  );
}
