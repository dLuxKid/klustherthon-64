import { FaPlus, FaTrash } from "react-icons/fa";
import { HiPencil } from "react-icons/hi2";

export function CreateBtn({ setOpenModal, text }: { setOpenModal: React.Dispatch<React.SetStateAction<boolean>>, text: string }) {
    return (
        <div
            className="cursor-pointer flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-white transition-colors hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            onClick={() => setOpenModal(true)}

        >
            <span className="hidden md:block">{text}</span>
            <div className="md:ml-4">
                <FaPlus />
            </div>
        </div>
    );
}

export function UpdateBtn() {
    return (
        <div
            className="rounded-md border p-2 hover:bg-gray-100 cursor-pointer"
        >
            <div className="text-slate-600">
                <HiPencil />
            </div>
        </div>
    );
}

export function DeleteBtn() {
    return (
        <div className="rounded-md border p-2 hover:bg-gray-100 cursor-pointer">
            <span className="sr-only">Delete</span>
            <div className="text-slate-600">
                <FaTrash />
            </div>
        </div>
    );
}