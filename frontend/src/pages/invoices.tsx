import { useState } from "react";

import { CreateBtn } from "../components/buttons";
import InvoicesTable from "../components/invoices/invoice-table";
import Search from "../components/search";
import CreateNewInvoice from "../components/invoices/create-invoice";


export default function Invoices() {
    const [openModal, setOpenModal] = useState<boolean>(false)

    return (
        <div className="w-full">
            <div className="w-full">
                <h1 className={'text-black text-2xl font-semibold uppercase'}>Invoices</h1>
                <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                    <Search placeholder="Search invoices..." />
                    <CreateBtn setOpenModal={setOpenModal} text="Create Invoice" />
                </div>
                {/* <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
                        <Table query={query} currentPage={currentPage} />
                    </Suspense> */}
            </div>
            <div className="w-full">
                <InvoicesTable />
            </div>
            {openModal && <CreateNewInvoice setOpenModal={setOpenModal} />}
        </div>

    )
}
