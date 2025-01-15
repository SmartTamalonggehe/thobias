/** @format */
"use client";
import { FC, useEffect } from "react";
import { BsX } from "react-icons/bs";
import { UseFormRegister, UseFormWatch } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  label?: string;
  register: UseFormRegister<never>;
  required?: boolean;
  name: string;
  minLength?: number;
  maxLength?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors?: any;
  valueAsNumber?: boolean;
  type?: "text" | "password" | "number" | "email" | "date" | "time" | "hidden";
  readOnly?: boolean;
  placeholder?: string;
  autoComplete?: string;
  addClass?: string;
  value?: string | number;
  setValue: (name: string, value: string | number) => void;
  watch: UseFormWatch<never>;
};

const InputTextSearch: FC<Props> = ({
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
  setValue,
  watch,
}) => {
  const watchedValue = watch(name as never);
  const searchParams = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    if (watchedValue !== undefined) {
      const params = new URLSearchParams(window.location.search);
      if (watchedValue) {
        params.set(name, watchedValue.toString());
      } else {
        params.delete(name);
      }
      router.replace(`?${params.toString()}`);
    }
  }, [watchedValue, name, router]);

  useEffect(() => {
    if (searchParams.get(name) !== null) {
      setValue(name, searchParams.get(name) || "");
    }
  }, [searchParams, name, setValue]);
  // ketika x diklik
  const handleClickX = () => {
    setValue(name, "");
  };
  return (
    <div className={addClass}>
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium text-gray-700 tracking-wide"
        >
          {label}
        </label>
      )}
      {required && label && <span className="ml-1 text-red-600">*</span>}
      <div className="relative">
        <input
          className="w-full text-gray-700 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
          type={type}
          id={name}
          readOnly={readOnly}
          placeholder={placeholder}
          autoComplete={autoComplete}
          {...register(name as never, {
            required,
            minLength,
            maxLength,
            valueAsNumber,
          })}
          defaultValue={value}
        />
        {watchedValue && (
          <BsX
            className="absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer"
            onClick={handleClickX}
          />
        )}
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

export default InputTextSearch;
