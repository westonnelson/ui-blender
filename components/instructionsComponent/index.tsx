import { ApeCoinLogo } from "../svgs/ApeCoinLogo";
import styles from "./instructionsComponent.module.css";

export default function InstructionsComponent() {
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
          <div className={styles.aligned}><ApeCoinLogo /><h1>69.42 $APE</h1></div>
        </div>
        <div>
          <h2>Next prize draw</h2>
          <div className={styles.aligned}><h1>2d 3h 42m 23s</h1></div>
        </div>
      </div>

      {/* <div className={styles.buttons_container}>
        <div>
          <h2>Next prize draw</h2>
          <div className={styles.aligned}><h1>2d 3h 42m 23s</h1></div>
        </div>
      </div> */}

      <div className={styles.buttons_container}>
        <div className={styles.button}>
          <p>Enter The Blendr</p>
        </div>
      </div>

      {/* <p className={styles.get_started}>
        ApeBlendr is a permissionless and non-custodial game, built on top of ApeCoin.
      </p> */}
    </div>
  );
}
