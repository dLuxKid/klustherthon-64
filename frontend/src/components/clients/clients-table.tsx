import { useEffect, useState } from 'react';

import { UpdateBtn } from '../buttons';
import ErrorMessage from '../err-message';
import Loader from '../loader';
import EditClient from './edit-clients';

import { clientsType } from '../../utils/types';

import { useSearchParams } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';
import useFetchData from '../../hooks/useFetchData';

export default function ClientsTable() {
    const { fetchClients } = useFetchData()
    const { data: clients, isLoading: isLoadingClients, error: clientsErrMsg } = fetchClients()

    const [editModal, setEditModal] = useState<boolean>(false)
    const [selectedClient, setSelectedClient] = useState<clientsType | null>(null)
    const [filteredClients, setFilteredClients] = useState<clientsType[]>(clients as clientsType[])

    const [searchParams] = useSearchParams();
    const query = searchParams.get('query')

    const filterClients = useDebouncedCallback(() => {
        if (query && clients) {
            setFilteredClients(clients.filter(clients => clients.name.toLowerCase().includes(query.toLowerCase()) || clients.email.toLowerCase().includes(query.toLowerCase())))
        } else {
            setFilteredClients(clients as clientsType[])
        }
    }, 500)

    useEffect(() => {
        filterClients()
    }, [query])

    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                {
                    isLoadingClients &&
                    <div className="w-full flex items-center justify-center pt-20">
                        <Loader dark />
                    </div>
                }

                {!isLoadingClients && clients?.length === 0 && !clientsErrMsg &&
                    <p className='text-black font-semibold text-base w-full text-center mt-8'>No Clients is associated with your business, Please create one.</p>
                }

                {!isLoadingClients && clientsErrMsg && <ErrorMessage>{clientsErrMsg}</ErrorMessage>}

                {editModal &&
                    <EditClient
                        client={selectedClient as clientsType}
                        setOpenEditModal={setEditModal}
                    />}

                {!!clients?.length && !isLoadingClients &&
                    <div className="rounded-lg bg-background w-full p-2 md:pt-0">
                        <div className="md:hidden">
                            {(query ? filteredClients : clients).map((client) => (
                                <div
                                    key={client._id}
                                    className="mb-2 w-full rounded-md bg-white p-4"
                                >
                                    <div className="flex items-center justify-between border-b pb-4">
                                        <div>
                                            <div className="mb-2 flex items-center">
                                                {/* <div
                                                className="mr-2 rounded-full w-7 h-7 bg-slate-600"
                                            /> */}
                                                <p className="text-base font-semibold text-black">{client.name}</p>
                                            </div>
                                            <p className="text-sm text-text">{client.email}</p>
                                        </div>

                                    </div>
                                    <div className="flex w-full items-center justify-between pt-4">
                                        <div className='text-text'>
                                            <p className="text-xl font-medium">
                                                {client.phoneNumber}
                                            </p>
                                            <p className='overflow-x-scroll'>{(client.address)}</p>
                                        </div>
                                        <div className="flex justify-end gap-2">
                                            <div onClick={() => {
                                                setEditModal(true)
                                                setSelectedClient(client)
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
                                {(query ? filteredClients : clients).map((client) => (
                                    <tr
                                        key={client._id}
                                        className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                    >
                                        <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                            <div className="flex items-center gap-3">
                                                {/* <div
                                                className="mr-2 rounded-full w-7 h-7 bg-slate-600"
                                            /> */}
                                                <p className="text-base font-semibold text-black">{client.name}</p>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-3 text-text">
                                            {client.email}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-3 text-text">
                                            {client.phoneNumber}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-3 text-text">
                                            {(client.address)}
                                        </td>
                                        <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                            <div className="flex justify-end gap-3">
                                                <div onClick={() => {
                                                    setEditModal(true)
                                                    setSelectedClient(client)
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
        </div >
    );
}