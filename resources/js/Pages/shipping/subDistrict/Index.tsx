import { useWelcomeContext } from "@/context/WelcomeContext";
import PaginateTypes from "@/types/Paginate";
import SubDistrictsTypes from "@/types/SubDistricts";
import { Head } from "@inertiajs/react";
import { useEffect, useRef } from "react";
import ShowData from "./ShowData";
import ModalDefault from "@/Components/modal/ModalDefault";
import Form from "./form/Form";

type Props = {
    data: PaginateTypes<SubDistrictsTypes[]>;
};

const Index = ({ data }: Props) => {
    // context
    const { setWelcome, welcome } = useWelcomeContext();
    useEffect(() => {
        setWelcome("Kecamatan");
    }, []);
    const modalRef = useRef<HTMLDialogElement>(null);

    const openModal = () => {
        if (modalRef.current) {
            modalRef.current.showModal();
        }
    };
    return (
        <>
            <Head>
                <title>{welcome}</title>
            </Head>
            <section className="flex flex-col gap-y-4 mt-6">
                <Form modalRef={modalRef} halaman={welcome} />
                <div className="flex">
                    <p>Silahkan mengolah data {welcome}</p>
                    <button
                        className="btn btn-primary ml-auto"
                        onClick={openModal}
                    >
                        Tambah
                    </button>
                </div>
                <ShowData data={data} />
            </section>
        </>
    );
};

export default Index;
