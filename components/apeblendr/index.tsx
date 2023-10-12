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
import { BigNumber, Contract, ethers, providers } from "ethers";
import Button from "../Button/Button";
import {
  WalletClient,
  useAccount,
  useConnect,
  useDisconnect,
  useWalletClient,
} from "wagmi";

import ApeBlendrContract from "../../contracts/ApeBlendr.json";

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
  const [userApeCoinBalance, setUserApeCoinBalance] = useState("0");
  const [userStakedBalance, setUserStakedBalance] = useState("0");
  const [valueForDepositOrWithdraw, setValueForDepositOrWithdraw] =
    useState("");
  const [walletClientSigner, setWalletClientSginer] = useState({} as any);

  const { alchemy } = useAlchemyContext();

  const { address, isConnected } = useAccount();
  const { data: walletClient, isError, isLoading } = useWalletClient();

  useEffect(() => {
    if (address) {
      console.log(address);
      setWalletClientSginer(walletClient);
    }
  }, [address, walletClient]);

  useEffect(() => {
    const fetchedCurrentAward =
      alchemy?.apeBlendrData?.apeCoinStakeUnclaimed.toString() || "0";
    setCurrentAward(fetchedCurrentAward);
    const fetchedTotalPrizeDraws =
      alchemy?.apeBlendrData?.totalPrizeDraws.toString() || "0";
    setTotalPrizeDraws(fetchedTotalPrizeDraws);
    const fetchedUserStakedBalance =
      alchemy?.apeBlendrData?.userStakedBalance.toString() || "0";
    setUserStakedBalance(fetchedUserStakedBalance);
    const fetchedUserApeCoinBalance =
      alchemy?.apeBlendrData?.userApeCoinBalance.toString() || "0";
    setUserApeCoinBalance(fetchedUserApeCoinBalance);
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

  function walletClientToSigner(walletClient: WalletClient) {
    const { account, chain, transport } = walletClient;
    const network = {
      chainId: chain.id,
      name: chain.name,
      ensAddress: chain.contracts?.ensRegistry?.address,
    };
    const provider = new providers.Web3Provider(transport, network);
    const signer = provider.getSigner(account.address);
    return signer;
  }

  const handleChange = (value: string) => {
    setValueForDepositOrWithdraw(value);
  };

  // TODO:: Add approval, refactor to get contract instance from context, clean up code

  const handleDeposit = async () => {
    const apeBlendrContractInstance = new Contract(
      process.env.APE_BLENDR_CONTRACT as any,
      ApeBlendrContract?.abi,
      walletClientToSigner(walletClientSigner)
    );
    try {
      const handleDepositTxn = await apeBlendrContractInstance.enterApeBlendr(
        ethers.utils.parseEther(valueForDepositOrWithdraw)
      );

      await handleDepositTxn.wait();
    } catch (error: any) {}
  };

  const handleWithdraw = async () => {
    const apeBlendrContractInstance = new Contract(
      process.env.APE_BLENDR_CONTRACT as any,
      ApeBlendrContract?.abi,
      walletClientToSigner(walletClientSigner)
    );
    try {
      const handleWithdrawTxn = await apeBlendrContractInstance.exitApeBlendr(
        ethers.utils.parseEther(valueForDepositOrWithdraw)
      );

      await handleWithdrawTxn.wait();
    } catch (error: any) {}
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
                  <p>{formatBigNumber(BigNumber.from(currentAward))}</p>
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
                <p
                  onClick={() =>
                    handleChange(
                      formatBigNumber(BigNumber.from(userStakedBalance || "0"))
                    )
                  }
                >
                  {formatBigNumber(BigNumber.from(userStakedBalance))} $APE
                </p>
              </div>
              <div>
                <div className={styles["deposit-field-wrapper"]}>
                  <div className={styles["input-field"]}>
                    <input
                      type="number"
                      placeholder="0.000"
                      value={valueForDepositOrWithdraw}
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
                    <div>
                      $ {formatUsdPrice("0", BigNumber.from("0" || "0"))}
                    </div>

                    <>
                      <div>
                        <span
                          onClick={() =>
                            handleChange(
                              formatBigNumber(
                                BigNumber.from(userApeCoinBalance || "0")
                              )
                            )
                          }
                        >
                          MAX
                        </span>
                        <p>
                          Balance:{" "}
                          {formatBigNumber(BigNumber.from(userApeCoinBalance))}
                        </p>
                      </div>
                    </>
                  </div>
                </div>
              </div>
              <div className={styles["blendr-deposit-buttons"]}>
                <Button
                  variant="secondary"
                  size="medium"
                  onClick={() => handleDeposit()}
                >
                  Deposit
                </Button>
                <Button
                  variant="secondary"
                  size="medium"
                  onClick={() => handleWithdraw()}
                >
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
