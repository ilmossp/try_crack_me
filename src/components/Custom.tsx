import { useFormContext } from "react-hook-form";

export function Custom() {
  const { register } = useFormContext();

  
  return (
    <div className="flex  flex-col gap-5">
      <div className="flex gap-5">
        <div className="flex flex-col">
          <label htmlFor="length" className="text-green-500">
            Length
          </label>
          <select {...register("length", { required: true , valueAsNumber: true })} name="length">
            <option value="6">6</option>
            <option value="8">8</option>
            <option value="12">12</option>
            <option value="16">16</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="hashingMethod" className="text-green-500">
            Hashing Method
          </label>
          <select {...register("hashingMethod", { required: true })}>
            <option value="Argon2">Argon2</option>
            <option value="bcrypt">bcrypt</option>
            <option value="scrypt">scrypt</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="saltRounds" className="text-green-500">
            Salt Rounds
          </label>
          <input
            type="number"
            placeholder="Salt Rounds"
            {...register("saltRounds", { max: 15, min: 10 ,valueAsNumber:true , })}
          />
        </div>
      </div>
      <div className="flex justify-evenly">
        <div className="flex items-center gap-2">
          <label htmlFor="special characters" className="text-green-500">
            Special Characters
          </label>
          <input
            type="checkbox"
            placeholder="special characters"
            {...register("specialChars", { required: true })}
            name="special Characters"
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="numbers" className="text-green-500">
            Numbers
          </label>
          <input
            type="checkbox"
            placeholder="Numbers"
            {...register("numbers", { required: true })}
            name="numbers"
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="upperCase" className="text-green-500">
            Upper Case
          </label>
          <input
            type="checkbox"
            placeholder="Upper Case"
            {...register("upperCase", { required: true })}
            name="upperCase"
          />
        </div>
      </div>
    </div>
  );
}
