import { forwardRef } from "react";

interface ModalProps {
    title: string;
    children: React.ReactNode;
}

const ModalDefault = forwardRef<HTMLDialogElement, ModalProps>(
    ({ title, children }, ref) => {
        return (
            <dialog id="my_modal_1" ref={ref} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{title}</h3>
                    <div className="overflow-auto">{children}</div>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* Tombol dalam form akan otomatis menutup modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        );
    }
);

export default ModalDefault;
