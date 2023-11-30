import React, { useReducer, useState } from "react"

import { MdCancel } from "react-icons/md";
import { toast } from "sonner";
import Loader from "../loader";
import { useDataContext } from "../../context/useFetchDataContext";
import { useAuthContext } from "../../context/useAuthContext";
import { paymentsUrl } from "../../utils/urls";
import useMutatePayments from "../../hooks/useMutatePayments";

const initialState = {
    name: '',
    notes: '',
    amount: ''
}

const invoiceReducer = (state: typeof initialState, action: { name: string, value: string }) => {
    return { ...state, [action.name]: action.value }
}

type Props = {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CreateNewPayment({ setOpenModal }: Props) {
    const { createPayments, loading } = useMutatePayments()

    const [state, dispatch] = useReducer(invoiceReducer, initialState)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch({ name: e.target.name, value: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        createPayments({ ...state, amount: Number(state.amount) }, setOpenModal)
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
                    <p>Descrition</p>
                    <textarea
                        required
                        onChange={handleChange}
                        value={state.notes}
                        name="notes"
                        className="w-full h-40 rounded-lg text-text outline-none border-none p-4"
                        maxLength={250}
                        minLength={10}
                    />
                </label>
                <label >
                    <p>Amount</p>
                    <input
                        required
                        type="number"
                        onChange={handleChange}
                        value={state.amount}
                        name="amount"
                    />
                </label>
                <button
                    disabled={loading}
                    type="submit"
                    className="w-full bg-primary disabled:bg-gray-500 hover:bg-opacity-90 text-white font-semibold text-lg px-9 py-3 rounded-lg mt-4 flex items-center justify-center"
                    onClick={handleSubmit}
                >
                    {loading ? <Loader /> : 'Create Payment'}
                </button>
            </form>
        </div>
    )
}
