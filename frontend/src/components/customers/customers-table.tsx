import { useState } from 'react';
import { formatDateToLocal } from '../../utils/formatter';
import { UpdateBtn } from '../buttons';
import Loader from '../loader';
import { customerType } from '../../pages/customers';
import EditCustomer from './edit-customer';


type Props = {
    fetchCustomers: () => void
    customers: customerType[]
    loading: boolean
}

export default function CustomersTable({ fetchCustomers, customers, loading }: Props) {
    const [editModal, setEditModal] = useState<boolean>(false)

    const [selectedCustomer, setSelectedCustomer] = useState<customerType | null>(null)

    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                {
                    loading &&
                    <div className="w-full flex items-center justify-center pt-20">
                        <Loader dark />
                    </div>
                }

                {!loading && customers.length === 0 && <p className='text-black font-semibold text-base w-full text-center mt-8'>No Clients is associated with your business, Please create one.</p>}

                {editModal &&
                    <EditCustomer
                        customer={selectedCustomer as customerType}
                        setOpenEditModal={setEditModal}
                        fetchCustomers={fetchCustomers}
                    />}
                {!!customers.length &&
                    <div className="rounded-lg bg-background w-full p-2 md:pt-0">
                        <div className="md:hidden">
                            {customers.map((customer) => (
                                <div
                                    key={customer._id}
                                    className="mb-2 w-full rounded-md bg-white p-4"
                                >
                                    <div className="flex items-center justify-between border-b pb-4">
                                        <div>
                                            <div className="mb-2 flex items-center">
                                                {/* <div
                                                className="mr-2 rounded-full w-7 h-7 bg-slate-600"
                                            /> */}
                                                <p className="text-base font-semibold text-black">{customer.name}</p>
                                            </div>
                                            <p className="text-sm text-text">{customer.email}</p>
                                        </div>

                                    </div>
                                    <div className="flex w-full items-center justify-between pt-4">
                                        <div className='text-text'>
                                            <p className="text-xl font-medium">
                                                {customer.phoneNumber}
                                            </p>
                                            <p className='overflow-x-scroll'>{(customer.address)}</p>
                                        </div>
                                        <div className="flex justify-end gap-2">
                                            <div onClick={() => {
                                                setEditModal(true)
                                                setSelectedCustomer(customer)
                                            }}>
                                                <UpdateBtn />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <table className="hidden min-w-full text-gray-900 md:table">
                            <thead className="rounded-lg text-left text-sm font-normal">
                                <tr>
                                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                                        Name
                                    </th>
                                    <th scope="col" className="px-3 py-5 font-medium">
                                        Email
                                    </th>
                                    <th scope="col" className="px-3 py-5 font-medium">
                                        Phone Number
                                    </th>
                                    <th scope="col" className="px-3 py-5 font-medium">
                                        Address
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {customers?.map((customer) => (
                                    <tr
                                        key={customer._id}
                                        className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                    >
                                        <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                            <div className="flex items-center gap-3">
                                                {/* <div
                                                className="mr-2 rounded-full w-7 h-7 bg-slate-600"
                                            /> */}
                                                <p className="text-base font-semibold text-black">{customer.name}</p>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-3 text-text">
                                            {customer.email}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-3 text-text">
                                            {customer.phoneNumber}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-3 text-text">
                                            {(customer.address)}
                                        </td>
                                        <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                            <div className="flex justify-end gap-3">
                                                <div onClick={() => {
                                                    setEditModal(true)
                                                    setSelectedCustomer(customer)
                                                }}>
                                                    <UpdateBtn />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        </div>
    );
}