import { difficulty } from "../server/api/routers/hacker";
import { api } from "../utils/api";

type TerminalProps = {
  difficulty: difficulty;
};

export function Terminal({ difficulty }: TerminalProps) {
  const { data, isLoading, isSuccess } = api.hacker.newChallenge.useQuery({difficulty});

  const loading = "awaiting challenge ...";
  const success = "try crack this ";

  return (
    <div className="h-5/6 w-60 rounded-md bg-black p-3 text-green-500">
      <span>{"> "}</span>
      {isLoading ? loading : isSuccess ? success + data : ""}
    </div>
  );
}
