import * as dotenv from "dotenv";

interface Pools {
  count: number;
}

export default function Home(props: Pools) {
  return (
    <div>
      <h1>World Cup 2022 Betting App</h1>
      <p>Pools: {props.count}</p>
    </div>
  );
}

export const getServerSideProps = async () => {
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
    },
  };
};
