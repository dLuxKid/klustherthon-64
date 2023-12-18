import { useState } from "react"
import { CreateBtn } from "../components/buttons"
import CustomersTable from "../components/clients/clients-table"
import CreateNewClient from "../components/clients/create-client"
import Search from "../components/search"

export default function Clients() {
    const [openModal, setOpenModal] = useState<boolean>(false)

    return (
        <div className="w-full">
            <h1 className={'text-black text-2xl font-semibold uppercase'}>Clients</h1>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search Clients..." />
                <CreateBtn setOpenModal={setOpenModal} text="Create New Client" />
            </div>
            <CustomersTable />
            {openModal && <CreateNewClient setOpenModal={setOpenModal} />}
        </div >
    )
}