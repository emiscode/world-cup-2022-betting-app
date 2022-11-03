import * as dotenv from "dotenv";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Image from "next/image";
import appPreviewImg from "../assets/app-preview.png";
import logoImg from "../assets/logo.svg";
import usersAvatarImg from "../assets/users-avatar.png";
import iconCheckImg from "../assets/icon-check.svg";

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
    <div>
      <main>
        <a href={`${URL}/pt`}>{t("lang-pt")}</a> |{" "}
        <a href={`${URL}/en`}>{t("lang-en")}</a>
        <Image src={logoImg} alt="logo bet copa" />
        <h1>{t("title")}</h1>
        <div>
          <Image src={usersAvatarImg} alt="" />
          <strong>
            <span>+8.000</span> pessoas já estão jogando
          </strong>
        </div>
        <form>
          <input type="text" required placeholder="Qual o nome do seu bolão" />
          <button type="submit">Criar meu bolão</button>
        </form>
        <p>
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas
        </p>
        <div>
          <div>
            <Image src={iconCheckImg} alt="" />
            <div>
              <span>+2.000</span>
              <span>Bolões criados</span>
            </div>
          </div>
          <div>
            <Image src={iconCheckImg} alt="" />
            <div>
              <span>+100.000</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
        <p>
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
