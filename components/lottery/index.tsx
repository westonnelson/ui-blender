import Link from "next/link";
import { ApeCoinLogo } from "../svgs/ApeCoinLogo";
import styles from "./lottery.module.scss";
import { useEffect, useState } from "react";
import { useAlchemyContext } from "@/context/alchemy.context";
import { formatBigNumberTwoDecimals, setNewTime } from "@/utils/utils";
import { BigNumber } from "ethers";

export default function Lottery() {
    const [countdown, setCountdown] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    const [currentAward, setCurrentAward] = useState("0");
    const [totalPrizeDraws, setTotalPrizeDraws] = useState("0");

    const { alchemy } = useAlchemyContext();

    useEffect(() => {
        console.log(alchemy);
        const fetchedCurrentAward = alchemy?.apeBlendrData?.apeCoinStakeUnclaimed.toString() || "0";
        setCurrentAward(fetchedCurrentAward);
        const fetchedTotalPrizeDraws= alchemy?.apeBlendrData?.totalPrizeDraws.toString() || "0";
        setTotalPrizeDraws(fetchedTotalPrizeDraws);
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
        <div className={styles["blendr-wrapper"]}>
            <div className="container">
                <div className={styles["blendr-grid"]}>
                    <div className={styles["blendr-stats"]}>
                        <h3>Ape Coin Draw #{totalPrizeDraws}</h3>
                        <div className={styles["blendr-stats-data"]}>
                            <div className={styles.stat}>
                                <h1>Reward</h1>
                                <div className={styles.aligned}>
                                    <ApeCoinLogo />
                                    <p>{formatBigNumberTwoDecimals(BigNumber.from(currentAward))}</p>
                                </div>
                            </div>
                            <div className={styles.stat}>
                                <h1>Ends In</h1>
                                <div className={styles.aligned}>
                                    <p>{`${countdown.days}d ${countdown.hours}h ${countdown.minutes}m`}</p>
                                </div>
                            </div>
                            <div className={styles.stat}>
                                <h1>Draw No</h1>
                                <div className={styles.aligned}>
                                    <p>#{totalPrizeDraws}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles["blendr-deposit"]}>
                        <h3>Ape Coin Balance</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}
