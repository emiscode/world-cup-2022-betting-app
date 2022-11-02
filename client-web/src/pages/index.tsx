import * as dotenv from "dotenv";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

interface Pools {
  count: number;
}

export default function Home(props: Pools) {
  const { t } = useTranslation("common");

  return (
    <div>
      <h1>{t("title")}</h1>
      <p>Pools: {props.count}</p>
    </div>
  );
}
export async function getServerSideProps({ locale }: any) {
  dotenv.config({ path: __dirname + "/.env" });

  const SERVER_HOST = process.env.SERVER_HOST || "localhost";
  const SERVER_PORT = process.env.SERVER_PORT || "5000";
  const POOLS_COUNT = "pools/count";
  const URL = `http://${SERVER_HOST}:${SERVER_PORT}/${POOLS_COUNT}`;

  const res = await fetch(URL);
  const data = await res.json();

  return {
    props: {
      count: data.count,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
