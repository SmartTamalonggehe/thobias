/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
/** @format */
import { FC } from "react";
type Props = {
  value: string;
  register: any;
  required?: boolean;
  name: string;
  defaultChecked?: boolean;
  id: number | string;
  errors?: any;
};

const InputRadio: FC<Props> = ({
  value,
  register,
  required,
  name,
  defaultChecked,
  id,
  errors,
}) => {
  return (
    <div>
      <div className="flex gap-1 items-start">
        <input
          type="radio"
          value={value}
          id={id.toString()}
          name={name}
          {...register(name, { required })}
          className={`form-radio h-4 w-4 text-primary`}
          defaultChecked={defaultChecked}
        />
        <label htmlFor={id.toString()}>{value}</label>
      </div>
      {errors?.type === "required" && (
        <p className="text-red-500 font-inter italic text-sm">
          Tidak boleh kosong
        </p>
      )}
    </div>
  );
};

export default InputRadio;
