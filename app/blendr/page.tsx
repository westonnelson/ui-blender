'use client'
import styles from "./page.module.scss";
import "../globals.scss";
import ApeBlendr from "@/components/apeblendr";

export default function Blendr() {
  return (
    <main className={styles.main}>
      <ApeBlendr />
    </main>
  );
}
