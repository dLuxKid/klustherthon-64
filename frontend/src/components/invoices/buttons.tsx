import { FaPlus, FaTrash } from "react-icons/fa";
import { HiPencil } from "react-icons/hi2";

import { NavLink } from "react-router-dom";

export function CreateInvoice() {
    return (
        <NavLink
            //   href="/dashboard/invoices/create"
            className="flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
            <span className="hidden md:block">Create Invoice</span>
            <div className="md:ml-4">
                <FaPlus />
            </div>
        </NavLink>
    );
}

export function UpdateInvoice({ id }: { id: string }) {
    return (
        <NavLink
            href={`/dashboard/invoices/${id}/edit`}
            className="rounded-md border p-2 hover:bg-gray-100"
        >
            <div className="text-slate-600">
                <HiPencil />
            </div>
        </NavLink>
    );
}

export function DeleteInvoice({ id }: { id: string }) {
    // const deleteInvoiceWithId = deleteInvoice.bind(null, id);

    return (
        <form>
            <button className="rounded-md border p-2 hover:bg-gray-100">
                <span className="sr-only">Delete</span>
                <div className="text-slate-600">
                    <FaTrash />
                </div>
            </button>
        </form>
    );
}