



export function Challenge() {
  return (
        <div className={"flex h-2/3 w-1/2 flex-col items-center rounded-md bg-gray-800 justify-center space-y-4"}>
          <h2 className="glow text-3xl text-green-500">challenge yourself !!!</h2>
          <span className="text-gray-200 max-w-sm text-center mt-1 mb-2">start by picking a difficulty or creating your own using custom parameters</span>
          <div className=" flex gap-1 border-gray-700 rounded-md border-2">
            <button className="py-2 px-3 rounded-md hover:bg-gray-700 text-gray-200">Easy</button>
            <button className="py-2 px-3 rounded-md hover:bg-gray-700 text-gray-200">Medium</button>
            <button className="py-2 px-3 rounded-md hover:bg-gray-700 text-gray-200">Hard</button>
            <button className="py-2 px-3 rounded-md hover:bg-gray-700 text-gray-200">Custom</button>
          </div>
          <button className=" py-3 px-4 text-white bg-green-500 rounded-md hover:scale-105 transition-all text-lg font-bold">start challenge</button>
        </div>
  );
}

