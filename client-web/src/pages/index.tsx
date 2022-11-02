import * as dotenv from "dotenv";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextResponse } from "next/server";
import { useState } from "react";

interface Pools {
  count: number;
  locale: string;
  clientHost: string;
  clientPort: string;
}

export default function Home(props: Pools) {
  const { t } = useTranslation("common");
  const [lang, setLang] = useState(props.locale);
  const URL = `http://${props.clientHost}:${props.clientPort}`;

  return (
    <div>
      <a href={`${URL}/pt`}>{t("lang-pt")}</a> |{" "}
      <a href={`${URL}/en`}>{t("lang-en")}</a>
      <h1>{t("title")}</h1>
      <p>
        {t("pools")}: {props.count}
      </p>
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
      locale,
      clientHost: process.env.CLIENT_HOST || "localhost",
      clientPort: process.env.CLIENT_PORT || "3000",
      count: data.count,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
