



export function Terminal({challenge}) {
  
  const {isLoading,isSuccess,data} = challenge
  
  const loading = "awaiting challenge ...";
  const success = "try crack this ";

  return (
    <div className=" w-96 rounded-md bg-black p-3 text-green-500 break-words">
      <span className="">{"> "}</span>
      {isLoading ? loading : isSuccess ? success + data : ""}
    </div>
  );
}
