import { FC } from "react";
type Props = {
    value: any;
    register: any;
    required?: boolean;
    name: string;
    defaultChecked?: boolean;
    id: number | string;
    errors?: any;
    label?: string;
    onChange?: any;
    checked?: boolean;
};

const InputCheck: FC<Props> = ({
    value,
    register,
    required,
    name,
    defaultChecked,
    id,
    errors,
    label,
    onChange,
    checked,
}) => {
    return (
        <div>
            <div className="flex gap-1 items-start justify-center">
                <input
                    type="checkbox"
                    value={value}
                    id={id.toString()}
                    name={name}
                    {...register(name, { required })}
                    className={`form-radio h-4 w-4 text-primary`}
                    defaultChecked={defaultChecked}
                    checked={checked}
                    onChange={onChange}
                />
                {label && <label htmlFor={id.toString()}>{label}</label>}
            </div>
            {errors?.type === "required" && (
                <p className="text-red-500 font-inter italic text-sm">
                    Tidak boleh kosong
                </p>
            )}
        </div>
    );
};

export default InputCheck;
