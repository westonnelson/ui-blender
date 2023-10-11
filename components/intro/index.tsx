import Link from "next/link";
import { ApeCoinLogo } from "../svgs/ApeCoinLogo";
import styles from "./intro.module.css";

export default function Intro() {
  return (
    <div className={styles.container}>
      <header className={styles.header_container}>
        <div className={styles.header}>
          <h1>
            Stake<span> $APE</span> and win<span> prizes</span>
          </h1>
          <h3>Enter the $APE Blendr and win prizes every week. No one loses ever.  </h3>
        </div>
      </header>

      <div className={styles.buttons_container}>
        <div>
          <h2>Current prize</h2>
          <div className={styles.aligned}><ApeCoinLogo /><h1>69.42</h1></div>
        </div>
        <div>
          <h2>Total aped</h2>
          <div className={styles.aligned}><h1>235 apes</h1></div>
        </div>
        <div>
          <h2>Next prize draw</h2>
          <div className={styles.aligned}><h1>2d 3h 42m 23s</h1></div>
        </div>
      </div>

      <div className={styles.buttons_container}>
        <Link href={'/blendr'}>
          <div className={styles.button}>
            <p>Enter The Blendr</p>
          </div>
        </Link>
        <Link href={'/how-to'}>
          <div className={styles.button}>
            <p>How It Works</p>
          </div>
        </Link>
      </div>

      {/* <div className={styles.buttons_container}>
        <div>
          <h2>Next prize draw</h2>
          <div className={styles.aligned}><h1>2d 3h 42m 23s</h1></div>
        </div>
      </div> */}

      {/* <p className={styles.get_started}>
        ApeBlendr is a permissionless and non-custodial game, built on top of ApeCoin.
      </p> */}
    </div>
  );
}
