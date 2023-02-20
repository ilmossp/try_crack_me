import { Dispatch, SetStateAction, useState } from "react";
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
} from "react-hook-form";
import { difficulty } from "../server/api/routers/hacker";
import { Custom } from "./Custom";

let difficulties: difficulty[] = [
  {
    length: 6,
    specialChars: false,
    upperCase: false,
    numbers: false,
    hashingMethod: "scrypt",
  },
  {
    length: 8,
    specialChars: false,
    upperCase: false,
    numbers: true,
    hashingMethod: "bcrypt",
  },
  {
    length: 16,
    specialChars: true,
    upperCase: true,
    numbers: true,
    hashingMethod: "Argon2",
  },
];

type ChallengeProps = {
  pickDifficulty: Dispatch<SetStateAction<difficulty | undefined>>;
};

export function Challenge({ pickDifficulty }: ChallengeProps) {
  const [selected, setSelected] = useState(0);
  const methods = useForm<difficulty>();

  function handleClick(id: number) {
    setSelected(id + 1);
  }

  function handleStart() {
    pickDifficulty(difficulties[selected - 1]);
  }

  const submitHandler: SubmitHandler<difficulty> = (data) => console.log(data);

  return (
    <div className="flex flex-col items-center justify-center space-y-4 rounded-md bg-gray-800 py-8 px-3">
      <h2 className="glow text-3xl text-green-400">challenge yourself !!!</h2>
      <span className="mt-1 mb-2 max-w-sm text-center text-gray-200">
        start by picking a difficulty or creating your own using custom
        parameters
      </span>
      <div className=" flex gap-1 rounded-md border-2 border-gray-700">
        <button
          className={`rounded-md py-2 px-3 text-gray-200 transition-all hover:bg-gray-700 ${
            selected == 1 ? "scale-105 bg-green-500 hover:bg-green-500" : ""
          }`}
          onClick={() => {
            handleClick(0);
          }}
        >
          Easy
        </button>
        <button
          className={`rounded-md py-2 px-3 text-gray-200 transition-all hover:bg-gray-700 ${
            selected == 2 ? "scale-105 bg-green-500 hover:bg-green-500" : ""
          }`}
          onClick={() => {
            handleClick(1);
          }}
        >
          Medium
        </button>
        <button
          className={`rounded-md py-2 px-3 text-gray-200 transition-all hover:bg-gray-700 ${
            selected == 3 ? "scale-105 bg-green-500 hover:bg-green-500" : ""
          }`}
          onClick={() => {
            handleClick(2);
          }}
        >
          Hard
        </button>
        <button
          className={`rounded-md py-2 px-3 text-gray-200 transition-all hover:bg-gray-700 ${
            selected == 4 ? "scale-105 bg-green-500 hover:bg-green-500" : ""
          }`}
          onClick={() => {
            handleClick(3);
          }}
        >
          Custom
        </button>
      </div>

      {selected == 4 && (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(submitHandler)}>
            <Custom />
            <input type="submit" />
          </form>
        </FormProvider>
      )}
      <button
        disabled={selected ? false : true}
        className="rounded-md bg-green-500 py-3 px-4 text-lg font-bold text-white transition-all hover:scale-105 disabled:bg-gray-500 disabled:hover:scale-100"
        onClick={handleStart}
      >
        start challenge
      </button>
    </div>
  );
}
