import { useState } from "react";

import { CreateBtn } from "../components/buttons";
import CreateNewPayment from "../components/payments/create-payment";
import PaymentTable from "../components/payments/payment-table";
import Search from "../components/search";


export default function Payments() {
    const [openModal, setOpenModal] = useState<boolean>(false)

    return (
        <div className="w-full">
            <div className="w-full">
                <div className="flex w-full items-center justify-between">
                    <h1 className={'text-black text-2xl font-semibold uppercase'}>Payments</h1>
                </div>
                <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                    <Search placeholder="Search Payments..." />
                    <CreateBtn setOpenModal={setOpenModal} text="Create Payment" />
                </div>
                {/* <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
                        <Table query={query} currentPage={currentPage} />
                    </Suspense> */}
            </div>
            <div className="w-full">
                <PaymentTable />
            </div>
            {openModal && <CreateNewPayment setOpenModal={setOpenModal} />}
        </div>
    )
}
