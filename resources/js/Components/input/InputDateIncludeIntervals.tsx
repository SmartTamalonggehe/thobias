/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
/** @format */

import { FC } from "react";
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
  label: string;
  startDate: any;
  setStartDate: any;
  includeDateIntervals: any;
};

const InputDateIncludeIntervals: FC<Props> = ({
  control,
  required,
  name,
  errors,
  addClass,
  label,
  startDate,
  setStartDate,
  includeDateIntervals,
}) => {
  // function subDays(date: Date, days: number) {
  //   return new Date(date.getTime() - days * 24 * 60 * 60 * 1000);
  // }

  // function addDays(date: Date, days: number) {
  //   return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
  // }
  return (
    <div className={`flex flex-col ${addClass}`}>
      <label className="text-sm font-medium text-gray-700 tracking-wide block">
        {label}
        {required && <span className="ml-1 text-red-600">*</span>}
      </label>
      <Controller
        name={name}
        control={control}
        rules={{ required }}
        render={({ field }) => (
          <DatePicker
            selected={startDate}
            onChange={(date) => {
              if (date) {
                setStartDate(date);
                const mtDate = moment(date).format("YYYY-MM-DD");
                field.onChange(mtDate);
              } else {
                setStartDate(null); // or set to an empty value that works for your use case
                field.onChange(""); // Set the value in react-hook-form
              }
            }}
            dateFormat={"dd/MM/yyyy"}
            value={startDate || ""}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            className="w-full border rounded-lg py-2 px-4"
            includeDateIntervals={includeDateIntervals}
            placeholderText="dd/mm/yyyy"
          />
        )}
      />
      {errors?.type === "required" && (
        <p className="text-red-500 font-inter italic text-sm">
          {label} tidak boleh kosong
        </p>
      )}
    </div>
  );
};

export default InputDateIncludeIntervals;
