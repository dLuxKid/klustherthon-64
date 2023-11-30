import React, { useReducer } from "react";

import { MdCancel } from "react-icons/md";

import useMutatePayments from "../../hooks/useMutatePayments";
import { paymentType } from "../../utils/types";
import Loader from "../loader";

type initialStateType = {
    name: string
    notes: string,
    amount: string
}

const invoiceReducer = (state: initialStateType, action: { name: string, value: string }) => {
    return { ...state, [action.name]: action.value }
}

type Props = {
    setOpenEditModal: React.Dispatch<React.SetStateAction<boolean>>
    payment: paymentType
}

export default function EditPayment({ setOpenEditModal, payment }: Props) {
    const { editPayments, loading } = useMutatePayments()

    const [state, dispatch] = useReducer(invoiceReducer, {
        name: payment.name,
        notes: payment.notes,
        amount: payment.amount.toString()
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch({ name: e.target.name, value: e.target.value })
    }

    const editPayment = async (e: React.FormEvent) => {
        e.preventDefault();
        editPayments(payment._id, { ...state, amount: Number(state.amount) }, setOpenEditModal)
    };

    return (
        <div className="w-full h-screen flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 bg-white/20 z-50 backdrop-blur-sm">
            <form onSubmit={editPayment} className="form relative">
                <div className="absolute top-0 right-0 text-primary text-2xl cursor-pointer" onClick={() => setOpenEditModal(prev => !prev)}>
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
                    <p>Description</p>
                    <textarea
                        required
                        onChange={handleChange}
                        value={state.notes}
                        name="description"
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
                    onClick={editPayment}
                >
                    {loading ? <Loader /> : 'Update Payment'}
                </button>
            </form>
        </div>
    )
}
