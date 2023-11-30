import React, { useReducer, useState } from "react";

import { MdCancel } from "react-icons/md";
import { toast } from "sonner";
import { useAuthContext } from "../../context/useAuthContext";
import Loader from "../loader";
import { clientUrl } from "../../utils/urls";
import { clientsType } from "../../utils/types";
import { useDataContext } from "../../context/useFetchDataContext";
import useMutateClient from "../../hooks/useMutateClient";

const formState = {
    name: '',
    email: '',
    phoneNumber: '',
    address: ''
}

const customerReducer = (state: typeof formState, action: { name: string, value: string }) => {
    return { ...state, [action.name]: action.value }
}

type Props = {
    setOpenEditModal: React.Dispatch<React.SetStateAction<boolean>>,
    client: clientsType
}

export default function EditClient({ setOpenEditModal, client }: Props) {
    const { editClient, loading } = useMutateClient()

    const [state, dispatch] = useReducer(customerReducer, {
        name: client.name,
        email: client.email,
        phoneNumber: client.phoneNumber,
        address: client.address
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch({ name: e.target.name, value: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        editClient(client._id, state, setOpenEditModal)
    };

    return (
        <div className="w-full h-screen flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 bg-white/20 z-50 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="form relative">
                <div className="absolute top-0 right-0 text-primary text-2xl cursor-pointer" onClick={() => setOpenEditModal(false)}>
                    <MdCancel />
                </div>
                <label>
                    <p>Name</p>
                    <input
                        required
                        type="name"
                        onChange={handleChange}
                        value={state.name}
                        name="name"
                    />
                </label>
                <label>
                    <p>Email</p>
                    <input
                        required
                        onChange={handleChange}
                        value={state.email}
                        name="email"
                        className="w-full h-40 rounded-lg text-text outline-none border-none p-4"
                    />
                </label>
                <label >
                    <p>Phone Number</p>
                    <input
                        required
                        type="number"
                        onChange={handleChange}
                        value={state.phoneNumber}
                        name="phoneNumber"
                    />
                </label>
                <label >
                    <p>Address</p>
                    <textarea
                        required
                        onChange={handleChange}
                        value={state.address}
                        name="address"
                    />
                </label>
                <button
                    disabled={loading}
                    type="submit"
                    className="w-full bg-primary disabled:bg-gray-500 hover:bg-opacity-90 text-white font-semibold text-lg px-9 py-3 rounded-lg mt-4 flex items-center justify-center"
                    onClick={handleSubmit}
                >
                    {loading ? <Loader /> : 'Save Client'}
                </button>
            </form>
        </div>
    )
}
