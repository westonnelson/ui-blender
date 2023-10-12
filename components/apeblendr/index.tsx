import Link from "next/link";
import { ApeCoinLogo } from "../svgs/ApeCoinLogo";
import styles from "./apeblendr.module.scss";
import { useEffect, useState } from "react";
import { useAlchemyContext } from "@/context/alchemy.context";
import {
    formatBigNumber,
    formatBigNumberTwoDecimals,
    formatUsdPrice,
    setNewTime,
} from "@/utils/utils";
import { BigNumber } from "ethers";
import Button from "../Button/Button";

export default function ApeBlendr() {
    const [countdown, setCountdown] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    const [currentAward, setCurrentAward] = useState("0");
    const [totalPrizeDraws, setTotalPrizeDraws] = useState("0");
    const [type, setType] = useState("add");

    const { alchemy } = useAlchemyContext();

    useEffect(() => {
        console.log(alchemy);
        const fetchedCurrentAward =
            alchemy?.apeBlendrData?.apeCoinStakeUnclaimed.toString() || "0";
        setCurrentAward(fetchedCurrentAward);
        const fetchedTotalPrizeDraws =
            alchemy?.apeBlendrData?.totalPrizeDraws.toString() || "0";
        setTotalPrizeDraws(fetchedTotalPrizeDraws);
    }, [alchemy]);

    useEffect(() => {
        const interval = setInterval(() => {
            setNewTime(
                setCountdown,
                BigNumber.from(alchemy?.apeBlendrData?.epochEndAt || "0")
            );
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [alchemy?.apeBlendrData?.epochEndAt]);

    const handleChange = (value: string) => {
        console.log(value);
    };

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
                                    <p>
                                        {formatBigNumberTwoDecimals(BigNumber.from(currentAward))}
                                    </p>
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
                            <div className={styles.stat}>
                                <h1>Odds</h1>
                                <div className={styles.aligned}>
                                    <p>1:∞</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles["blendr-deposit"]}>
                        <h3>Ape Coin Balance</h3>
                        <div className={styles["blendr-deposit-data"]}>
                            <div>
                                <h3>Staked in ApeBlendr</h3>
                                <p>420.6959 $APE</p>
                            </div>
                            <div>
                                <div className={styles["deposit-field-wrapper"]}>
                                    <div className={styles["input-field"]}>
                                        <input
                                            type="number"
                                            placeholder="0.000"
                                            value={0}
                                            onChange={(changeEvent) =>
                                                handleChange(changeEvent.target.value)
                                            }
                                        />
                                        <span>
                                            <ApeCoinLogo />
                                            $APE
                                        </span>
                                    </div>
                                    <div className={styles["balance"]}>
                                        {type === "remove" ? (
                                            <div>
                                                $ {formatUsdPrice("0", BigNumber.from("0" || "0"))}
                                            </div>
                                        ) : (
                                            <div>
                                                $ {formatUsdPrice("0", BigNumber.from("0" || "0"))}
                                            </div>
                                        )}
                                        {type === "remove" ? (
                                            <>
                                                <div>
                                                    <span
                                                        onClick={() =>
                                                            handleChange(
                                                                formatBigNumber(BigNumber.from("0" || "0"))
                                                            )
                                                        }
                                                    >
                                                        MAX
                                                    </span>
                                                    <p>
                                                        Balance:{" "}
                                                        {formatBigNumber(BigNumber.from("0" || "0"))}
                                                    </p>
                                                </div>
                                            </>
                                        ) : (
                                            <div>
                                                <span
                                                    onClick={() =>
                                                        handleChange(
                                                            formatBigNumber(BigNumber.from("0" || "0"))
                                                        )
                                                    }
                                                >
                                                    MAX
                                                </span>
                                                <p>
                                                    Balance: {formatBigNumber(BigNumber.from("0" || "0"))}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className={styles["blendr-deposit-buttons"]}>
                                <Button variant="secondary" size="medium">
                                    Deposit
                                </Button>
                                <Button variant="secondary" size="medium">
                                    Withdraw
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
