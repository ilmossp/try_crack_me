import { type AppType } from "next/app";

import {  VT323 } from "@next/font/google";

import { api } from "../utils/api";

import "../styles/globals.css";

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <style jsx global>
        {`
          html {
            font-family: ${vt323.style.fontFamily};
          }
        `}
      </style>
      <Component {...pageProps} />
    </>
  );
};

export default api.withTRPC(MyApp);
