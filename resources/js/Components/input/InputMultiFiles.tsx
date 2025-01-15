import { BASE_URL } from "@/services/baseURL";
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

const InputMultiFiles: FC<Props> = ({
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
    const [typeFile, setTypeFile] = useState<string>("");
    const [myFiles, setMyFiles] = useState<any[]>([initialValue || ""]);

    const watchValue = watch(name);

    useEffect(() => {
        if (!watchValue) {
            setMyFiles([]);
        }
    }, [watchValue]);

    const resizeFile = (file: any) =>
        new Promise((resolve) => {
            const mkSize = size === "sm" ? 500 : size === "md" ? 1000 : 1600;
            if (file) {
                const splitType = file?.type?.split("/") || [];
                const type = splitType[0];
                if (type !== "image") {
                    resolve(file);
                } else {
                    Resizer.imageFileResizer(
                        file,
                        mkSize,
                        mkSize,
                        splitType[1],
                        100,
                        0,
                        (uri) => {
                            resolve(uri);
                        },
                        "file"
                    );
                }
            } else {
                resolve(null);
            }
        });

    const onSelectFiles = async (files: FileList) => {
        const fileArray = Array.from(files);
        const resizedFiles = await Promise.all(fileArray.map(resizeFile));

        const newFiles = resizedFiles.map((file: any) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setMyFiles((prevFiles) => [
                    ...prevFiles,
                    reader.result as string,
                ]);
            };
            const splitType = file?.type?.split("/") || [];
            setTypeFile(splitType[0]);
            return file;
        });

        setValue(name, newFiles);
    };

    return (
        <div className={addClass}>
            {label && (
                <>
                    <label
                        className={`text-sm font-medium tracking-wide ${labelCss}`}
                    >
                        {label}
                    </label>
                    {required && <span className="ml-1 text-red-600">*</span>}
                    {!required && (
                        <span
                            className={`text-sm font-medium tracking-wide ${labelCss}`}
                        >
                            (Optional)
                        </span>
                    )}
                </>
            )}

            <input
                className="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
                id="fileInput"
                type="file"
                accept={accept}
                multiple={initialValue ? false : true} // Tambahkan multiple untuk mengizinkan unggahan beberapa file
                onChange={(event: any) => {
                    const selectedFiles = event.target.files;
                    if (selectedFiles) {
                        onSelectFiles(selectedFiles);
                    }
                }}
                onClick={() => {
                    setMyFiles([]);
                }}
            />
            <input
                type="hidden"
                id={label}
                {...register(name, {
                    required,
                })}
            />
            <div className="flex gap-4 mt-2 flex-wrap">
                {myFiles &&
                    myFiles.map((file, index) =>
                        typeFile === "image" ? (
                            <img
                                key={index}
                                className="rounded-lg w-36"
                                src={file}
                                alt=""
                            />
                        ) : (
                            <p key={index}>File: {file.name}</p>
                        )
                    )}
                {fileEdit &&
                    fileEdit.map((file: string, index: number) => (
                        <div key={index}>
                            <img
                                src={`${BASE_URL}/${file}`}
                                className="rounded-lg w-24"
                                alt=""
                            />
                        </div>
                    ))}
            </div>
            {errors?.type === "required" && (
                <p className="text-red-500 font-inter italic text-sm">
                    {label} tidak boleh kosong
                </p>
            )}
        </div>
    );
};

export default InputMultiFiles;
