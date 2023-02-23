type TerminalProps = {
  challenge: {
    isSuccess: boolean;
    isError: boolean;
    isRefetching: boolean;
    data: string | undefined;
  };
  answer: {
    isSuccess: boolean;
    isError: boolean;
    isRefetching: boolean;
    data: boolean | undefined
  };
};

export function Terminal({ challenge,answer }: TerminalProps) {
  const loading = "awaiting challenge ...";
  const success = "try crack this ";
  const error = "an error occured while fetching, Try again ";

  return (
    <div className=" w-96 break-words rounded-md bg-black p-3 text-green-500">
      <span className="">{"> "}</span>
      {challenge.isRefetching
        ? loading
        : challenge.isSuccess
        ? success + challenge.data
        : challenge.isError
        ? error
        : "click the green button to start a challenge !!! "}
        <br/>
        <span>
          {"> "}
          {
          answer.isRefetching ?
          "submitting answer ..." : 
          answer.isSuccess ? `your answer was ${answer.data}` : answer.isError ? "an error occured while submitting" : ""
          }</span>
    </div>
  );
}
