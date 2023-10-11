
'use client'

import { ConnectKitButton } from "connectkit";
import styles from "./navbar.module.scss";
import { ApeBlendrLogo } from "@/components/svgs/ApeBlendrLogo";
import Link from "next/link";
export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link href={'/'}>
        <ApeBlendrLogo />
      </Link>
      <ConnectKitButton />
    </nav>
  );
}
