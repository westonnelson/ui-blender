'use client'
import styles from "./page.module.scss";
import "../globals.scss";
import Lottery from "@/components/lottery";

export default function Blendr() {
  return (
    <main className={styles.main}>
      <Lottery />
    </main>
  );
}
