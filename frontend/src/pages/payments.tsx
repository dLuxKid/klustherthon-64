import { useState } from "react";

import { CreateBtn } from "../components/buttons";
import CreateNewPayment from "../components/payments/create-payment";
import PaymentTable from "../components/payments/payment-table";
import Search from "../components/search";


export default function Payments() {
    const [openModal, setOpenModal] = useState<boolean>(false)

    return (
        <div className="w-full">
            <h1 className={'text-black text-2xl font-semibold uppercase'}>Payments</h1>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search Payments..." />
                <CreateBtn setOpenModal={setOpenModal} text="Create Payment" />
            </div>
            <PaymentTable />
            {openModal && <CreateNewPayment setOpenModal={setOpenModal} />}
        </div >
    )
}
