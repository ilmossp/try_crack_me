import { difficulty } from "../server/api/routers/hacker";
import { api } from "../utils/api";

type TerminalProps = {
    difficulty : difficulty 
}

export function Terminal({difficulty}: TerminalProps) {
  
  const challenge = api.hacker.newChallenge.useQuery({difficulty})
  
  return <div className="h-5/6 w-60 bg-black rounded-md p-3">
    <span className="text-lg text-green-500"> ~ {`${challenge.data ? "loading challenge ..." : `try crack this ${challenge.data}`}`} </span>
  </div>;
}
