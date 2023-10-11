import Link from "next/link";
import { ApeCoinLogo } from "../svgs/ApeCoinLogo";
import styles from "./faq.module.scss";

export default function FAQ() {
    return (
        <div className={styles.container}>
            <div>

                <h3>What is the ApeBlendr Protocol?</h3>
                <p>
                    ApeBlendr is a no loss savings game inspired initially by PoolTogether and built on top of ApeCoin protocol.
                    As currently ApeCoin provides a staking program with juicy yields, why not gamify it?
                </p>
            </div>
            <div>

                <h3>
                    How does ApeBlendr work?
                </h3>
                <p>
                    Ape coin holders deposit $APE into the ApeBlendr, which stakes the deposited $APE into the
                    ApeCoin staking contract. The generated yield is awarded to one lucky winner every week. The other players never lose
                    their principal.
                </p>
            </div>
            <div>

                <h3>Is ApeBlendr decentralized?</h3>
                <p>
                    The ApeBlendr protocol is non-custodial, permissionless and decentralised.
                    This means that the protocol deployer never has access to users $APE and cannot withdraw them.
                </p>
            </div>
            <div>

                <h3>How does ApeBlendr make money?</h3>
                <p>
                    The ApeBlendr protocol will charge a small fee on every award, so it can sustain itself in the long run.
                </p>
            </div>
        </div>
    );
}
