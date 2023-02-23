import { Dispatch, SetStateAction, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
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
  pickDifficulty: Dispatch<SetStateAction<difficulty|undefined>>;
  newChallenge: () => void;
  challenge: string | undefined;
};

export function Challenge({
  pickDifficulty,
  newChallenge,
  challenge,
}: ChallengeProps) {
  const [selected, setSelected] = useState(0);
  const methods = useForm<difficulty>({
    defaultValues: {
      saltRounds: 10,
    },
  });

  const { register, getValues } = useForm<{ answer: string }>();

  function handleClick(id: number) {
    setSelected(id + 1);
    pickDifficulty(difficulties[id] as difficulty);
  }

  function handleStart(e: any) {
    e?.preventDefault();
    newChallenge();
  }

  function submitAnswer() {}

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

      <FormProvider {...methods}>
        <form className="flex flex-col items-center space-y-4">
          {selected == 4 && <Custom />}
          {challenge && (
            <input
              type="text"
              {...(register("answer"),
              { required: true, minLength: 6, maxLength: 16 })}
            />
          )}
          <div>
            {challenge && (
              <button
                className="rounded-md  bg-green-500 py-3 px-4 text-lg font-bold text-white transition-all hover:scale-105 disabled:bg-gray-500 disabled:hover:scale-100"
                onClick={submitAnswer}
              >
                Submit Answer
              </button>
            )}
            <button
              disabled={selected ? false : true}
              className="rounded-md  bg-green-500 py-3 px-4 text-lg font-bold text-white transition-all hover:scale-105 disabled:bg-gray-500 disabled:hover:scale-100"
              onClick={
                selected !== 4
                  ? handleStart
                  : (e) => {
                      e.preventDefault();
                      const values = methods.getValues();
                      difficulties.push(values);
                      handleStart(e);
                    }
              }
            >
              start challenge
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
