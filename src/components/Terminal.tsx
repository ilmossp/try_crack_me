import { UseTRPCQueryResult } from "@trpc/react-query/shared";
import { RouterOutputs } from "../utils/api";

type TerminalProps = {
  challenge: UseTRPCQueryResult<RouterOutputs["hacker"]["newChallenge"],{}>,
  answerValid: UseTRPCQueryResult<RouterOutputs["hacker"]["submitAnswer"],{}>

};

export function Terminal({ challenge, answerValid: answerValid }: TerminalProps) {
  const loading = "awaiting challenge ...";
  const success = "try crack this ";
  const error = "an error occured while fetching, Try again ";

  return (
    <div className=" w-96 break-words rounded-md bg-black p-3 text-green-500">
      <span className={challenge.isError ? "text-red-600" : ""}>{"> "}</span>
      {challenge.isFetching
        ? loading
        : challenge.isSuccess
        ? success + challenge.data.hashedPassword
        : challenge.isError
        ? error
        : "click the green button to start a challenge !!! "}
      <br />
      <span className={answerValid.isError || answerValid.data==false ? "text-red-600" : ""}>
        {answerValid.isFetching
          ? "> submitting answer ..."
          : answerValid.isSuccess
          ? `> your answer was ${answerValid.data}`
          : answerValid.isError
          ? "> an error occured while submitting"
          : ""}
      </span>
    </div>
  );
}
