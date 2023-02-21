import { useState } from "react";


const TITLE = "TRYCRACKME"



export default function Header() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const [title, setTitle] = useState("TRYCRACKME");

  const handleHover = () => {
    let iteration = 0;
    
    const interval = setInterval(() => {
      setTitle((oldTitle) =>
        oldTitle
          .split("")
          .map((letter, index) => {
            if(index<iteration) return TITLE[index]
            return letters[Math.floor(Math.random() * 26)];
          })
          .join("")
      );
      if (iteration >= title.length) clearInterval(interval);
      iteration+= 1/3;
    }, 30);
  };

  return (
    <h1 className="mt-8 text-8xl text-green-400 glow" onMouseOver={handleHover} >
      {title}
    </h1>
  );
}
