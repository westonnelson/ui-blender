import Link from "next/link";
import styles from "./footer.module.css";
import { ApeCoinLogoLarge } from "@/components/svgs/ApeCoinLogoLarge";
import { ChainlinkLogo } from "@/components/svgs/ChainlinkLogo";
import { TheGraphLogo } from "@/components/svgs/TheGraphLogo";
import { AlchemyLogo } from "@/components/svgs/AlchemyLogo";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div><h3>Powered by</h3></div>
      
      <div>
        <Link href="https://apecoin.com" target={"_blank"}>
          <ApeCoinLogoLarge />
        </Link>
      </div>
      <div>
        <Link href="https://chain.link" target={"_blank"}>
          <ChainlinkLogo />
        </Link>
      </div>
      <div>
        <Link href="https://thegraph.com" target={"_blank"}>
          <TheGraphLogo />
        </Link>
      </div>
      <div>
        <Link href="https://alchemy.com" target={"_blank"}>
          <AlchemyLogo />
        </Link>
      </div>
    </div>
  );
}
