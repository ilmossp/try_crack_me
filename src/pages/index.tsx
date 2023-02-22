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
  console.log(difficulty)
  const {data,isLoading,isSuccess,isRefetching,isError,refetch} = api.hacker.newChallenge.useQuery({difficulty},{enabled: false})
  
  return (
    <>
      <Head>
        <title>Try Crack Me</title>
        <meta name="description" content="Generated by create-t3-app" />
      </Head>
      <main className="flex  h-screen flex-col items-center bg-gray-900 space-y-5 ">
        <Header />
        <div className="flex gap-5">
          {difficulty && <Terminal challenge={{data,isError,isLoading,isRefetching,isSuccess}}/>}
          <Challenge pickDifficulty={setDifficulty} newChallenge={refetch}/>
        </div>
      </main>
    </>
  );
};

export default Home;
