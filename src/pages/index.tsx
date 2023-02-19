import { type NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import { api } from "../utils/api";

const Home: NextPage =  () => {
  
  
  const password = api.hacker.newChallenge.useQuery({difficulty: {
    length: 24,
    specialChars: true,
    upperCase: false,
    numbers: true,
    hashingMethod: "scrypt",
  }}).data 
  
  return (
    <>
      <Head>
        <title>Try Crack Me</title>
        <meta name="description" content="Generated by create-t3-app" />
      </Head>
      <main className="bg-black h-screen flex flex-col items-center">
        <Header/>
        <span className="text-white">{password ? password : "loading ...."}</span>
      </main>
    </>
  );
};

export default Home;
