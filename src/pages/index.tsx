import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { Challenge } from "../components/Challenge";
import Header from "../components/Header";
import { Terminal } from "../components/Terminal";
import { difficulty } from "../server/api/routers/hacker";
import { api } from "../utils/api";

const Home: NextPage = () => {
  const [difficulty, setDifficulty] = useState<difficulty>();
  const [answer, setAnswer] = useState<string>("");
  const { data, isSuccess, isRefetching, isError, refetch } =
    api.hacker.newChallenge.useQuery(
      { difficulty: difficulty as difficulty },
      { enabled: false }
    );

  
  
  return (
    <>
      <Head>
        <title>Try Crack Me</title>
        <meta name="description" content="Generated by create-t3-app" />
      </Head>
      <main className="flex  h-screen flex-col items-center space-y-5 bg-gray-900 ">
        <Header />
        <div className="flex gap-5">
          {difficulty && (
            <Terminal challenge={{ data, isError, isRefetching, isSuccess }} />
          )}
          <Challenge
            pickDifficulty={setDifficulty}
            newChallenge={refetch}
            challenge={data}
          />
        </div>
      </main>
    </>
  );
};

export default Home;
