type TerminalProps = {
  challenge : {isLoading: boolean,
  isSuccess: boolean,
  isError: boolean,
  isRefetching: boolean,
  data: string}
}


export function Terminal({ challenge }: TerminalProps) {
  const { isLoading, isSuccess,isError,data } = challenge;

  const loading = "awaiting challenge ...";
  const success = "try crack this ";

  return (
    <div className=" w-96 break-words rounded-md bg-black p-3 text-green-500">
      <span className="">{"> "}</span>
      {isLoading ? loading : isSuccess ? success + data : ""}
    </div>
  );
}
