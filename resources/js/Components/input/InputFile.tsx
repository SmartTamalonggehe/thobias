/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
/** @format */

"use client";
import { BASE_URL } from "@/services/baseURL";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import Resizer from "react-image-file-resizer";

type Props = {
  label?: string;
  register: any;
  watch: any;
  required?: boolean;
  name: string;
  errors?: any;
  accept?: any;
  addClass?: string;
  setValue: any;
  fileEdit?: any;
  initialValue?: any;
  size?: "sm" | "md" | "lg";
  labelCss?: string;
};

const InputFile: FC<Props> = ({
  label,
  register,
  required,
  name,
  errors,
  addClass,
  accept,
  setValue,
  fileEdit,
  initialValue,
  watch,
  size = "md",
  labelCss = "text-gray-700",
}) => {
  const [typeFile, setTypeFile] = useState<string>();
  const [myFile, setMyFile] = useState<any>(initialValue || "");

  const watchValue = watch(name);

  useEffect(() => {
    if (!watchValue) {
      setMyFile("");
    }
  }, [watchValue]);

  const resizeFile = (file: any) =>
    new Promise(() => {
      const mkSize = size === "sm" ? 500 : size === "md" ? 1000 : 1600;
      if (file) {
        const splitType = file?.type?.split("/") || [];
        const type = splitType[0];
        if (type !== "image") {
          return onSelectFile(file);
        }
        Resizer.imageFileResizer(
          file,
          mkSize,
          mkSize,
          splitType[1],
          100,
          0,
          (uri) => {
            onSelectFile(uri);
          },
          "file"
        );
      } else {
        onSelectFile(null);
      }
    });
  const onSelectFile = (file: any) => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setMyFile(reader.result as string);
      };
    }
    const splitType = file?.type?.split("/") || [];
    setTypeFile(splitType[0]);
    setValue(name, file);
  };
  return (
    <div className={addClass}>
      {label && (
        <>
          <label className={`text-sm font-medium tracking-wide ${labelCss}`}>
            {label}
          </label>
          {required && <span className="ml-1 text-red-600">*</span>}
          {/* optional */}
          {!required && (
            <span className={`text-sm font-medium tracking-wide ${labelCss}`}>
              (Optional)
            </span>
          )}
        </>
      )}

      <input
        className="w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
        id="fileInput"
        type="file"
        accept={accept}
        onChange={(event: any) => {
          const selectedFile = event.target?.files[0] || null;
          resizeFile(selectedFile);
        }}
      />
      <input
        type="hidden"
        id={label}
        {...register(name, {
          required,
        })}
      />
      {/* review file */}
      <div className="flex gap-4 mt-2">
        {/* jika myFile type image */}
        {myFile && typeFile === "image" && (
          <Image
            className="rounded-lg"
            src={myFile as string}
            width={100}
            height={100}
            alt=""
          />
        )}
        {/* jika fileEdit ada */}

        {fileEdit && name !== "file" && name !== "file_materi" && (
          <div>
            <Image
              src={`${BASE_URL}/${fileEdit}`}
              width={100}
              height={100}
              alt=""
            />
          </div>
        )}
      </div>
      {/* jika type password */}
      {errors?.type === "required" && (
        <p className="text-red-500 font-inter italic text-sm">
          {label} tidak boleh kosong
        </p>
      )}
    </div>
  );
};

export default InputFile;
