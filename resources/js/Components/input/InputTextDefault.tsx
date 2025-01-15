/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
/** @format */
"use client";

import { FC } from "react";

type Props = {
  label?: string;
  register: any;
  required?: boolean;
  name: string;
  minLength?: number;
  maxLength?: number;
  errors?: any;
  valueAsNumber?: boolean;
  type?: "text" | "password" | "number" | "email" | "date" | "time" | "hidden";
  readOnly?: boolean;
  placeholder?: string;
  autoComplete?: string;
  addClass?: string;
  value?: string | number;
  defaultValue?: string | number;
  max?: number;
  min?: number;
  step?: number;
  labelCss?: string;
};

const InputTextDefault: FC<Props> = ({
  label,
  register,
  required,
  name,
  minLength,
  maxLength,
  errors,
  valueAsNumber,
  type = "text",
  readOnly,
  placeholder,
  autoComplete = "on",
  addClass,
  value,
  defaultValue,
  max,
  min,
  step,
  labelCss = "text-gray-700",
}) => {
  return (
    <div className={addClass}>
      <label
        htmlFor={name}
        className={`text-sm font-medium  tracking-wide ${labelCss}`}
      >
        {label}
      </label>
      {required && <span className="ml-1 text-red-600">*</span>}
      <div className="relative">
        <input
          className="w-full text-gray-700 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
          type={type}
          id={name}
          readOnly={readOnly}
          placeholder={placeholder}
          autoComplete={autoComplete}
          {...register(name, {
            required,
            minLength,
            maxLength,
            valueAsNumber,
            max,
            min,
            step,
          })}
          defaultValue={defaultValue}
          value={value}
        />
      </div>
      {/* jika type password */}
      {errors?.type === "required" && (
        <p className="text-red-500 font-inter italic text-sm">
          {label} tidak boleh kosong
        </p>
      )}
      {errors?.type === "minLength" && (
        <p className="text-red-500 font-inter italic text-sm">
          {label} tidak boleh kurang dari {minLength} karakter
        </p>
      )}
      {errors?.type === "maxLength" && (
        <p className="text-red-500 font-inter italic text-sm">
          {label} tidak boleh lebih dari {maxLength} karakter
        </p>
      )}
      {errors?.type === "pattern" && (
        <p className="text-red-500 font-inter italic text-sm">
          {label} hanya boleh angka.
        </p>
      )}
      {errors?.type === "max" && (
        <p className="text-red-500 font-inter italic text-sm">
          {label} tidak boleh lebih dari {max}.
        </p>
      )}
      {errors?.type === "min" && (
        <p className="text-red-500 font-inter italic text-sm">
          {label} tidak boleh kurang dari {min}.
        </p>
      )}
    </div>
  );
};

export default InputTextDefault;
