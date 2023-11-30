import React, { useReducer } from "react";

import { MdCancel } from "react-icons/md";
import useMutateClient from "../../hooks/useMutateClient";
import Loader from "../loader";

const initialState = {
    name: '',
    email: '',
    phoneNumber: '',
    address: ''
}

const invoiceReducer = (state: typeof initialState, action: { name: string, value: string }) => {
    return { ...state, [action.name]: action.value }
}

type Props = {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CreateNewClient({ setOpenModal }: Props) {
    const { createClient, loading } = useMutateClient()

    const [state, dispatch] = useReducer(invoiceReducer, initialState)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch({ name: e.target.name, value: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        createClient(state, setOpenModal)
    };

    return (
        <div className="w-full h-screen flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 bg-white/20 z-50 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="form relative">
                <div className="absolute top-0 right-0 text-primary text-2xl cursor-pointer" onClick={() => setOpenModal(false)}>
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
                    {loading ? <Loader /> : 'Register Client'}
                </button>
            </form>
        </div>
    )
}
