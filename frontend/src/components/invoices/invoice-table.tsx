import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useAuthContext } from '../../context/useAuthContext';
import { formatCurrency, formatDateToLocal } from '../../utils/formatter';
import { DeleteBtn, UpdateBtn } from '../buttons';
import Loader from '../loader';
import EditInvoice from './edit-invoice';
import InvoiceStatus from './invoice-status';

export type invoiceType = {
    id: string;
    name: string;
    email: string;
    amount: number;
    status: string;
    date: string;
};


const invoices: invoiceType[] = [
    {
        id: '4419c858-598a-4a0b-a2f7-2996ffc76313',
        name: 'Marvellous',
        email: 'group64@gmail.com',
        amount: 15795,
        status: 'pending',
        date: ('Tue Dec 06 2022 00:00:00 GMT+0100 (West Africa Standard Time)'),
    },
    {
        id: '62b3c90a-ef52-4637-9b9b-9b3f247bfb14',
        name: 'Marvellous',
        email: 'group64@gmail.com',
        amount: 20348,
        status: 'pending',
        date: ('Mon Nov 14 2022 00:00:00 GMT+0100 (West Africa Standard Time)'),
    },
    {
        id: '9d133a5d-6f31-41f8-99a0-fdf432d97233',
        name: 'Marvellous',
        email: 'group64@gmail.com',
        amount: 3040,
        status: 'paid',
        date: ('Sat Oct 29 2022 00:00:00 GMT+0100 (West Africa Standard Time)'),
    },
    {
        id: '729cade7-307f-407e-a4ca-c50e1b313821',
        name: 'Marvellous',
        email: 'group64@gmail.com',
        amount: 44800,
        status: 'paid',
        date: ('Sun Sep 10 2023 00:00:00 GMT+0100 (West Africa Standard Time)'),
    },
    {
        id: 'd882f2f8-b86a-4ec5-b5a8-b8d9fcc11b94',
        name: 'Marvellous',
        email: 'group64@gmail.com',
        amount: 34577,
        status: 'pending',
        date: ('Sat Aug 05 2023 00:00:00 GMT+0100 (West Africa Standard Time)'),
    },
    {
        id: '3bacdcd9-74e3-4983-a318-952b1d25e795',
        name: 'Marvellous',
        email: 'group64@gmail.com',
        amount: 54246,
        status: 'pending',
        date: ('Sun Jul 16 2023 00:00:00 GMT+0100 (West Africa Standard Time)'),
    },
    {
        id: '043bc0d2-ff8d-4138-93ce-1cd25805ef12',
        name: 'Marvellous',
        email: 'group64@gmail.com',
        amount: 666,
        status: 'pending',
        date: ('Tue Jun 27 2023 00:00:00 GMT+0100 (West Africa Standard Time)'),
    },
    {
        id: '2de3723c-f39c-422f-aaa5-1a1081afa22b',
        name: 'Marvellous',
        email: 'group64@gmail.com',
        amount: 32545,
        status: 'paid',
        date: ('Fri Jun 09 2023 00:00:00 GMT+0100 (West Africa Standard Time)'),
    },
    {
        id: 'd54f1276-a482-4927-a14a-13b55865fb6e',
        name: 'Marvellous',
        email: 'group64@gmail.com',
        amount: 1250,
        status: 'paid',
        date: ('Sat Jun 17 2023 00:00:00 GMT+0100 (West Africa Standard Time)'),
    },
    {
        id: '85bf8f9d-d46d-4756-a115-13af7bd337b4',
        name: 'Marvellous',
        email: 'group64@gmail.com',
        amount: 8546,
        status: 'paid',
        date: ('Wed Jun 07 2023 00:00:00 GMT+0100 (West Africa Standard Time)'),
    },
]


export default function InvoicesTable() {
    const [editModal, setEditModal] = useState<boolean>(false)

    const [allInvoices, setAllInvoices] = useState<any>([])
    const [selectedInvoice, setSelectedInvoice] = useState<invoiceType | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const { user } = useAuthContext()

    const fetchInvoices = async () => {
        setLoading(true)
        setAllInvoices([])
        try {
            const res = await fetch(`http://localhost:5000/api/invoices/all-business/${user.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const data = await res.json()
            console.log(data)

            if (res.ok) {
                setAllInvoices(data)
                setTimeout(() => {
                    setLoading(false)
                }, 500);
            } else {
                toast.error('Error fetching invoices')
                setTimeout(() => {
                    setLoading(false)
                }, 500);
            }
        } catch (error) {
            toast.error('Error fetching invoices')
            setTimeout(() => {
                setLoading(false)
            }, 500);
        }
    }

    useEffect(() => {
        fetchInvoices()
    }, [])

    const handleDelete = (invoice: invoiceType) => {

    }

    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                {
                    loading &&
                    <div className="w-full flex items-center justify-center pt-20">
                        <Loader dark />
                    </div>
                }

                {editModal &&
                    <EditInvoice
                        invoice={selectedInvoice as invoiceType}
                        setOpenEditModal={setEditModal}
                    // fetchPayments={fetchPayments}
                    />}
                <div className="rounded-lg bg-background p-2 md:pt-0">
                    <div className="md:hidden">
                        {invoices?.map((invoice) => (
                            <div
                                key={invoice.id}
                                className="mb-2 w-full rounded-md bg-white p-4"
                            >
                                <div className="flex items-center justify-between border-b pb-4">
                                    <div>
                                        <div className="mb-2 flex items-center">
                                            {/* <div
                                                className="mr-2 rounded-full w-7 h-7 bg-slate-600"
                                            /> */}
                                            <p className="text-base font-semibold text-black">{invoice.name}</p>
                                        </div>
                                        <p className="text-sm text-text">{invoice.email}</p>
                                    </div>
                                    <InvoiceStatus status={invoice.status} />
                                </div>
                                <div className="flex w-full items-center justify-between pt-4">
                                    <div className='text-text'>
                                        <p className="text-xl font-medium">
                                            {formatCurrency(invoice.amount)}
                                        </p>
                                        <p>{formatDateToLocal(invoice.date)}</p>
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <div onClick={() => {
                                            setEditModal(true)
                                            setSelectedInvoice(invoice)
                                        }}>
                                            <UpdateBtn />
                                        </div>
                                        {user.isBusiness &&
                                            <div onClick={() => handleDelete(invoice)}>
                                                <DeleteBtn />
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <table className="hidden min-w-full text-gray-900 md:table">
                        <thead className="rounded-lg text-left text-sm font-normal">
                            <tr>
                                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                                    Customer
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Email
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Amount
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Date
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Status
                                </th>
                                <th scope="col" className="relative py-3 pl-6 pr-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {invoices?.map((invoice) => (
                                <tr
                                    key={invoice.id}
                                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                >
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        <div className="flex items-center gap-3">
                                            {/* <div
                                                className="mr-2 rounded-full w-7 h-7 bg-slate-600"
                                            /> */}
                                            <p className="text-base font-semibold text-black">{invoice.name}</p>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3 text-text">
                                        {invoice.email}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3 text-text">
                                        {formatCurrency(invoice.amount)}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3 text-text">
                                        {formatDateToLocal(invoice.date)}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3 text-text">
                                        <InvoiceStatus status={invoice.status} />
                                    </td>
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        <div className="flex justify-end gap-3">
                                            <div onClick={() => {
                                                setEditModal(true)
                                                setSelectedInvoice(invoice)
                                            }}>
                                                <UpdateBtn />
                                            </div>
                                            {user.isBusiness &&
                                                <div onClick={() => handleDelete(invoice)}>
                                                    <DeleteBtn />
                                                </div>
                                            }
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}