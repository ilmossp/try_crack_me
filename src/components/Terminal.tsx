type TerminalProps = {
  challenge : {
  isSuccess: boolean,
  isError: boolean,
  isRefetching: boolean,
  data: string | undefined}
}


export function Terminal({ challenge }: TerminalProps) {
  const { isRefetching,isSuccess,isError,data } = challenge;

  const loading = "awaiting challenge ...";
  const success = "try crack this ";
  const error = "an error occured while fetching, Try again "
  
  return (
    <div className=" w-96 break-words rounded-md bg-black p-3 text-green-500">
      <span className="">{"> "}</span>
      {isRefetching ? loading : isSuccess ? success + data : isError ? error :"click the green button to start a challenge !!! "}
    </div>
  );
}
