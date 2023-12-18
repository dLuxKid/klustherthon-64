import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { formatCurrency, formatDateToLocal } from '../../utils/formatter';
import { invoiceType } from '../../utils/types';

import { useDebouncedCallback } from 'use-debounce';
import useFetchData from '../../hooks/useFetchData';
import { UpdateBtn } from '../buttons';
import ErrorMessage from '../err-message';
import Loader from '../loader';
import EditInvoice from './edit-invoice';
import InvoiceStatus from './invoice-status';


export default function InvoicesTable() {
    const { fetchInvoices } = useFetchData()
    const { data: invoices, isLoading: isLoadingInvoices, error: invoicesErrMsg } = fetchInvoices()

    const [editModal, setEditModal] = useState<boolean>(false)
    const [selectedInvoice, setSelectedInvoice] = useState<invoiceType | null>(null)
    const [filteredInvoices, setFilteredInvoices] = useState<invoiceType[]>(invoices as invoiceType[])

    const [searchParams] = useSearchParams();
    const query = searchParams.get('query')

    const filterInvoices = useDebouncedCallback(() => {
        if (query && invoices) {
            setFilteredInvoices(invoices.filter((invoice: invoiceType) => invoice.title.toLowerCase().includes(query.toLowerCase()) || invoice.clientEmail.toLowerCase().includes(query.toLowerCase())))
        } else {
            setFilteredInvoices(invoices as invoiceType[])
        }
    }, 500)

    useEffect(() => {
        filterInvoices()
    }, [query])

    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                {
                    isLoadingInvoices &&
                    <div className="w-full flex items-center justify-center pt-20">
                        <Loader dark />
                    </div>
                }

                {!isLoadingInvoices && invoicesErrMsg && <ErrorMessage>{invoicesErrMsg}</ErrorMessage>}

                {!isLoadingInvoices && invoices?.length === 0 && !invoicesErrMsg && <p className="w-full text-center mt-8">No available invoices</p>}

                {editModal &&
                    <EditInvoice
                        invoice={selectedInvoice as invoiceType}
                        setOpenEditModal={setEditModal}
                    />}

                {!!invoices?.length && !isLoadingInvoices &&
                    <div className="rounded-lg bg-background p-2 md:pt-0">
                        <div className="md:hidden">
                            {(query ? filteredInvoices : invoices).map((invoice: invoiceType) => (
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
                                {(query ? filteredInvoices : invoices).map((invoice: invoiceType) => (
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