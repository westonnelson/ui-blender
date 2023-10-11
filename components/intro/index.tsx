import Link from "next/link";
import { ApeCoinLogo } from "../svgs/ApeCoinLogo";
import styles from "./intro.module.scss";
import { useEffect, useState } from "react";
import { formatBigNumberTwoDecimals, setNewTime } from "@/utils/utils";
import { BigNumber } from "ethers";
import { useAlchemyContext } from "@/context/alchemy.context";

export default function Intro() {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [currentAward, setCurrentAward] = useState("0");
  const [totalDeposited, setTotalDeposited] = useState("0");

  const { alchemy } = useAlchemyContext();

  useEffect(() => {
    console.log(alchemy);
    const fetchedCurrentAward = alchemy?.apeBlendrData?.apeCoinStakeUnclaimed.toString() || "0";
    setCurrentAward(fetchedCurrentAward);
    const fetchedTotalDeposited = alchemy?.apeBlendrData?.apeCoinStakeDeposited.toString() || "0";
    setTotalDeposited(fetchedTotalDeposited);
  }, [alchemy]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNewTime(setCountdown, BigNumber.from(alchemy?.apeBlendrData?.epochEndAt || "0"));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [alchemy?.apeBlendrData?.epochEndAt]);

  return (
    <div className={styles.container}>
      <div className={styles.header_container}>
        <div className={styles.header}>
          <h1>
            Stake<span> $APE</span> and win<span> prizes</span>
          </h1>
          <h3>
            Enter the $APE Blendr and win prizes every week. No one loses ever.{" "}
          </h3>
        </div>
      </div>
      <div className={styles.stats_container}>
        <div className={styles.stat}>
          <h2>Current Prize</h2>
          <div className={styles.aligned}>
            <ApeCoinLogo />
            <h1>{formatBigNumberTwoDecimals(BigNumber.from(currentAward))}</h1>
          </div>
        </div>
        <div className={styles.stat}>
          <h2>Total Aped</h2>
          <div className={styles.aligned}>
            <h1>235 apes</h1>
          </div>
        </div>
      </div>
      <div className={styles.stats_container}>
        <div className={styles.stat}>
          <h2>Total Value Locked</h2>
          <div className={styles.aligned}>
            <ApeCoinLogo />
            <h1>{formatBigNumberTwoDecimals(BigNumber.from(totalDeposited))}</h1>
          </div>
        </div>
        <div className={styles.stat}>
          <h2>Next Prize Draw</h2>
          <div className={styles.aligned}>
            <h1>{`${countdown.days}d ${countdown.hours}h ${countdown.minutes}m ${countdown.seconds}s`}</h1>
          </div>
        </div>
      </div>
      <div className={styles.buttons_container}>
        <Link href={"/blendr"}>
          <div className={styles.button}>
            <p>Enter The Blendr</p>
          </div>
        </Link>
        <Link href={"/faq"}>
          <div className={styles.button}>
            <p>How It Works</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
