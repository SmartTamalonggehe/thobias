/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */
/* eslint-disable @typescript-eslint/no-unused-expressions */

/* eslint-disable @typescript-eslint/no-explicit-any */
/** @format */

import { FC, useState } from "react";
import { Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";
import { momentId } from "@/utils/momentIndonesia";

type Props = {
  control: any;
  required?: boolean;
  name: string;
  errors?: any;
  addClass?: any;
  label?: string;
  initialValue?: string;
  onChange?: (value: string) => void;
};

const InputTime: FC<Props> = ({
  control,
  required,
  name,
  errors,
  addClass,
  label,
  initialValue,
  onChange,
}) => {
  const momentTime = (time: string) => {
    const date = momentId(time, "HH:mm").toDate();
    return date;
  };
  const [localTimeStart, setLocalTimeStart] = useState<string | Date>(
    momentTime(initialValue || "")
  );
  return (
    <div className={`flex flex-col ${addClass}`}>
      {label && (
        <label className="text-sm font-medium text-gray-700 tracking-wide block">
          {label}
          {required && <span className="ml-1 text-red-600">*</span>}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        rules={{ required }}
        render={({ field }) => (
          <DatePicker
            selected={initialValue ? (localTimeStart as Date) : ("" as any)} // Gunakan localTimeStart di sini
            onChange={(date) => {
              if (date) {
                setLocalTimeStart(date);
                const mtDate = moment(date).format("HH:mm");
                field.onChange(mtDate);
                // Panggil onChange yang diberikan dari props saat nilai berubah
                onChange && onChange(mtDate);
              } else {
                setLocalTimeStart("");
                field.onChange("");
                onChange && onChange("");
              }
            }}
            value={field.value} // Gunakan field.value di sini
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Jam"
            dateFormat="HH:mm"
            timeFormat="HH:mm"
            // className="timepick-datepicker"
            className="w-full border rounded-lg py-2 px-4"
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

export default InputTime;
