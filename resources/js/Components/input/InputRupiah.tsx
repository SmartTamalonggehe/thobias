/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
/** @format */
"use client";

import { FC } from "react";
import { Controller } from "react-hook-form";
import { NumericFormat } from "react-number-format";

type Props = {
  label?: string;
  required?: boolean;
  name: string;
  minLength?: number;
  maxLength?: number;
  errors?: any;
  control: any;
  addClass?: string;
};

const InputRupiah: FC<Props> = ({
  label,
  required,
  name,
  minLength,
  maxLength,
  errors,
  control,
  addClass,
}) => {
  return (
    <div className={addClass}>
      <label
        htmlFor={name}
        className="text-sm font-medium text-gray-700 tracking-wide"
      >
        {label}
      </label>
      {required && <span className="ml-1 text-red-600">*</span>}
      <div className="relative">
        <Controller
          name={name}
          control={control}
          rules={{ required }}
          render={({ field }) => (
            <NumericFormat
              id={name}
              type="text"
              autoComplete="off"
              thousandSeparator=","
              prefix={"Rp. "}
              value={field.value} // Menggunakan field.value sebagai nilai default
              onValueChange={(values, sourceInfo) => {
                console.log(values, sourceInfo);
                // Setel nilai pada react-hook-form
                field.onChange(values.floatValue || ""); // Gunakan values.floatValue jika tersedia
              }}
              className="w-full text-gray-700 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
            />
          )}
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
    </div>
  );
};

export default InputRupiah;
