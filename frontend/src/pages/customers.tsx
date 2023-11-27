import { useEffect, useState } from "react"
import { CreateBtn } from "../components/buttons"
import CustomersTable from "../components/customers/customers-table"
import Search from "../components/search"
import CreateNewCustomer from "../components/customers/create-customer"
import { useAuthContext } from "../context/useAuthContext"
import { toast } from "sonner"

export type customerType = {
    _id: string;
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
};

export default function Customers() {
    const [openModal, setOpenModal] = useState<boolean>(false)

    const [customers, setCustomers] = useState<customerType[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const { user } = useAuthContext()

    const fetchCustomers = async () => {
        setLoading(true)
        setCustomers([])
        try {
            const res = await fetch(`http://localhost:5000/api/clients/all-business/${user.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const data = await res.json()
            console.log(data)

            if (res.ok) {
                setCustomers(data)
                setLoading(false)
            } else {
                toast.error('Error fetching clients')
                setLoading(false)
            }
        } catch (error) {
            toast.error('Error fetching clients')
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCustomers()
    }, [])


    return (
        <div className="w-full">
            <h1 className={'text-black text-2xl font-semibold uppercase'}>Clients</h1>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search Clients..." />
                <CreateBtn setOpenModal={setOpenModal} text="Create New CLient" />
            </div>
            {/* <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
                        <Table query={query} currentPage={currentPage} />
                    </Suspense> */}
            <CustomersTable customers={customers} fetchCustomers={fetchCustomers} loading={loading} />
            {openModal && <CreateNewCustomer setOpenModal={setOpenModal} />}
        </div >
    )
}
