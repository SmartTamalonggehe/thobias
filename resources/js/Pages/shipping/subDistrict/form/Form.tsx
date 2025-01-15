import ModalDefault from "@/Components/modal/ModalDefault";
import React from "react";

type Props = {
    modalRef: React.Ref<HTMLDialogElement>;
    halaman: string;
};

const Form = ({ modalRef, halaman }: Props) => {
    return (
        <ModalDefault title={`Form ${halaman}`} ref={modalRef}>
            <p>tes</p>
        </ModalDefault>
    );
};

export default Form;
