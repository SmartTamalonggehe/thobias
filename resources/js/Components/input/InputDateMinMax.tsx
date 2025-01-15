/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
/** @format */

import { FC, useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  control: any;
  required?: boolean;
  name: string;
  errors?: any;
  addClass?: any;
  label?: string;
  minDate?: any;
  maxDate?: any;
  initialValue?: string | Date;
  placeholder?: string;
  labelCss?: string;
};

const InputDateMinMax: FC<Props> = ({
  control,
  required,
  name,
  errors,
  addClass,
  label,
  initialValue,
  minDate,
  maxDate,
  placeholder,
  labelCss = "text-gray-700",
}) => {
  const [menuPortalTarget, setMenuPortalTarget] = useState<any>(null);
  const [startDate, setStartDate] = useState<string | Date>(initialValue || "");
  useEffect(() => {
    // Pastikan kode ini hanya dijalankan di lingkungan browser
    if (typeof document !== "undefined") {
      setMenuPortalTarget(document.body);
    }
  }, []);
  return (
    <div className={`flex flex-col ${addClass}`}>
      <label
        className={`text-sm font-medium text-gray-700 tracking-wide ${labelCss}`}
      >
        {label}
        {required && <span className="ml-1 text-red-600">*</span>}
      </label>

      {menuPortalTarget && (
        <Controller
          name={name}
          control={control}
          rules={{ required }}
          render={({ field }) => (
            <DatePicker
              selected={startDate as Date}
              onChange={(date) => {
                if (date) {
                  setStartDate(date);
                  const mtDate = moment(date).format("YYYY-MM-DD");
                  field.onChange(mtDate);
                } else {
                  setStartDate(""); // or set to an empty value that works for your use case
                  field.onChange(""); // Set the value in react-hook-form
                }
              }}
              dateFormat={"dd/MM/yyyy"}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              className="w-full border rounded-lg py-2 px-4 bg-white"
              placeholderText={placeholder || "dd/mm/yyyy"}
              minDate={minDate}
              maxDate={maxDate}
            />
          )}
        />
      )}
      {errors?.type === "required" && (
        <p className="text-red-500 font-inter italic text-sm">
          {label} tidak boleh kosong
        </p>
      )}
    </div>
  );
};

export default InputDateMinMax;
