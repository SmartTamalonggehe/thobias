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
  type?: string;
  readOnly?: boolean;
  placeholder?: string;
  autoComplete?: string;
  addClass?: string;
};

const InputTextArea: FC<Props> = ({
  label,
  register,
  required,
  name,
  minLength,
  maxLength,
  errors,
  valueAsNumber,
  readOnly,
  placeholder,
  autoComplete = "on",
  addClass,
}) => {
  return (
    <div className={addClass}>
      <label className="text-sm font-medium text-gray-700 tracking-wide">
        {label} {required && <span className="ml-1 text-red-600">*</span>}
      </label>

      <div className="relative">
        <textarea
          className="w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
          id={name}
          readOnly={readOnly}
          placeholder={placeholder}
          autoComplete={autoComplete}
          {...register(name, {
            required,
            minLength,
            maxLength,
            valueAsNumber,
          })}
        ></textarea>
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
    </div>
  );
};

export default InputTextArea;
