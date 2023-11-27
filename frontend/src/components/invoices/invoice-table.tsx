import { useState } from 'react';
import { useAuthContext } from '../../context/useAuthContext';
import { formatCurrency, formatDateToLocal } from '../../utils/formatter';
import { DeleteBtn, UpdateBtn } from '../buttons';
import Loader from '../loader';
import EditInvoice from './edit-invoice';
import InvoiceStatus from './invoice-status';

export interface invoiceType {
    amount: number;
    business: string;
    client: string;
    clientEmail: string;
    createdAt: string;
    installmentAmount: number;
    nextPayment: string;
    paymentInterval: number;
    paymentStatus: boolean;
    paymentType: number;
    title: string;
    updatedAt: string;
    __v: number;
    _id: string;
}

type Props = {
    loading: boolean
    allInvoices: invoiceType[]
    fetchInvoices: () => void
}

export default function InvoicesTable({ loading, allInvoices, fetchInvoices }: Props) {
    const [editModal, setEditModal] = useState<boolean>(false)

    const [selectedInvoice, setSelectedInvoice] = useState<invoiceType | null>(null)

    const handleDelete = (invoice: invoiceType) => {

    }

    const { user } = useAuthContext()

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
                        fetchInvoices={fetchInvoices}
                    />}
                {!!allInvoices.length &&
                    <div className="rounded-lg bg-background p-2 md:pt-0">
                        <div className="md:hidden">
                            {allInvoices?.map((invoice) => (
                                <div
                                    key={invoice._id}
                                    className="mb-2 w-full rounded-md bg-white p-4"
                                >
                                    <div className="flex items-center justify-between border-b pb-4">
                                        <div>
                                            <div className="mb-2 flex items-center">
                                                {/* <div
                                                className="mr-2 rounded-full w-7 h-7 bg-slate-600"
                                            /> */}
                                                <p className="text-base font-semibold text-black">{invoice.title}</p>
                                            </div>
                                            <p className="text-sm text-text">{invoice.clientEmail ?? invoice.client}</p>
                                        </div>
                                        <InvoiceStatus status={invoice.paymentStatus} />
                                    </div>
                                    <div className="flex w-full items-center justify-between pt-4">
                                        <div className='text-text'>
                                            <p className="text-xl font-medium">
                                                {formatCurrency(invoice.amount)}
                                            </p>
                                            <p>{formatDateToLocal(invoice.updatedAt)}</p>
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
                                        Item
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
                                {allInvoices?.map((invoice) => (
                                    <tr
                                        key={invoice._id}
                                        className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                    >
                                        <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                            <div className="flex items-center gap-3">
                                                {/* <div
                                                className="mr-2 rounded-full w-7 h-7 bg-slate-600"
                                            /> */}
                                                <p className="text-base font-semibold text-black">{invoice.title}</p>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-3 text-text">
                                            {invoice.clientEmail ?? invoice.client}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-3 text-text">
                                            {formatCurrency(invoice.amount)}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-3 text-text">
                                            {formatDateToLocal(invoice.updatedAt)}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-3 text-text">
                                            <InvoiceStatus status={invoice.paymentStatus} />
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
                }
            </div>
        </div>
    );
}