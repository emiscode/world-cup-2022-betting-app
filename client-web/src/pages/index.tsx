import * as dotenv from "dotenv";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Image from "next/image";
import appPreviewImg from "../assets/app-preview.png";
import logoImg from "../assets/logo.svg";
import usersAvatarImg from "../assets/users-avatar.png";
import iconCheckImg from "../assets/icon-check.svg";
import brazilFlagImg from "../assets/brazil-flag.png";
import usaFlagImg from "../assets/usa-flag.png";

interface Pools {
  count: number;
  locale: string;
  clientHost: string;
  clientPort: string;
}

export default function Home(props: Pools) {
  const { t } = useTranslation("common");
  const URL = `http://${props.clientHost}:${props.clientPort}`;

  return (
    <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center">
      <main>
        <div className="space-y-8 mt-8">
          <div className="flex space-x-4">
            <div>
              <a href={`${URL}/pt`}>
                <Image className="w-5" src={brazilFlagImg} alt="" />
              </a>
            </div>
            <div>
              <a href={`${URL}/en`}>
                <Image className="w-5" src={usaFlagImg} alt="" />
              </a>
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <div>
              <Image src={logoImg} alt="logo bet copa" />
            </div>
            <div>
              <h2 className="text-gray-100 text-2xl">{t("subTitle")}</h2>
            </div>
            <div>
              <h1 className="mt-14 text-white text-5xl font-bold leading-tight">
                {t("mainText")}
              </h1>
            </div>
          </div>
        </div>
        <div className="mt-10 flex items-center gap-2">
          <Image src={usersAvatarImg} alt="" />
          <strong className="text-gray-100 text-xl">
            <span className="text-green-500">+8.000</span> {t("peoplePlaying")}
          </strong>
        </div>
        <form className="mt-10 flex gap-2">
          <input
            className="flex-1 px-6 py-4 rounded border border-gray-600 text-sm"
            type="text"
            required
            placeholder={t("poolName")}
          />
          <button
            className="bg-blue-500 px-6 py-4 rounded text-white uppercase font-bold text-sm hover:bg-blue-700 "
            type="submit"
          >
            {t("createPool")}
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-300 leading-relaxed">
          ⚽ {t("infoCreatePool")}
        </p>
        <div className="mt-10 pt-10 border-t border-gray-600 flex items-center justify-between text-gray-100 mb-8">
          <div className="flex items-center gap-4">
            <Image src={iconCheckImg} alt="" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+2.000</span>
              <span>{t("infoPoolsCreated")}</span>
            </div>
          </div>
          <div className="w-px h-14 bg-gray-600"></div>
          <div className="flex items-center gap-4">
            <Image src={iconCheckImg} alt="" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+100.000</span>
              <span>{t("infoBetsMade")}</span>
            </div>
          </div>
        </div>
        <p className="text-gray-100 mt-8 mb-8 hidden">
          {t("pools")}: {props.count}
        </p>
      </main>
      <Image src={appPreviewImg} alt="app preview" quality={100} />
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
