'use client'
import styles from "./page.module.scss";
import "../globals.scss";
import FAQ from "@/components/faq";

export default function HowTo() {
  return (
    <main className={styles.main}>
      <FAQ />
    </main>
  );
}
