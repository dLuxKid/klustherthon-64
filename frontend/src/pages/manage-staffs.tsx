import { useEffect, useState } from "react"
import { CreateBtn } from "../components/buttons"
import Search from "../components/search"


export default function Staffs() {
    const [openModal, setOpenModal] = useState<boolean>(false)

    useEffect(() => {
        (async () => {
            // const res = await fetch('http://localhost:5000/api/clients/')
        })()
    }, [])

    return (
        <div className="w-full">
            <h1 className={'text-black text-2xl font-semibold uppercase'}>Manage Staffs</h1>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search Customers..." />
                <CreateBtn setOpenModal={setOpenModal} text="Create New Staff" />
            </div>
            {openModal && ''}
            {/* <PaymentTable />
            {openModal && <CreateNewPayment setOpenModal={setOpenModal} />} */}
        </div >
    )
}
