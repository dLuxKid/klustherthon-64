import React, { useReducer } from "react";
import { MdCancel } from "react-icons/md";
import useMutateInvoice from "../../hooks/useMutateInvoice";
import { invoiceType } from "../../utils/types";
import Loader from "../loader";

type initialStateType = {
    name: string
    email: string,
    amount: string,
    paymentStatus: string
}

const invoiceReducer = (state: initialStateType, action: { name: string, value: string }) => {
    return { ...state, [action.name]: action.value }
}

type Props = {
    setOpenEditModal: React.Dispatch<React.SetStateAction<boolean>>
    invoice: invoiceType
}

const paymentStatus_options: Array<{ value: string, label: string }> = [
    { value: 'paid', label: 'Paid' },
    { value: 'pending', label: 'Pending' },
];

export default function EditInvoice({ setOpenEditModal, invoice }: Props) {
    const { editInvoice, loading } = useMutateInvoice()

    const [state, dispatch] = useReducer(invoiceReducer, {
        name: invoice.title,
        email: invoice.clientEmail ?? invoice.client,
        amount: invoice.amount.toString(),
        paymentStatus: invoice.paymentStatus ? 'paid' : 'pending'
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch({ name: e.target.name, value: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        editInvoice(state, setOpenEditModal, invoice)
    }

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
                        readOnly
                    />
                </label>
                <label>
                    <p>Email</p>
                    <input
                        required
                        type="email"
                        onChange={handleChange}
                        value={state.email}
                        name="email"
                        readOnly
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
                <label>
                    <p>Payment status</p>
                    <div className="flex items-start gap-2">
                        {
                            paymentStatus_options.map((item, i) => (
                                <div key={i} className="flex items-center justify-start gap-1">
                                    <div className="rounded-full w-4 h-4 overflow-hidden border border-black">
                                        <input
                                            type="radio"
                                            value={item.value}
                                            checked={state.paymentStatus === item.value}
                                            onChange={() => dispatch({ name: 'paymentStatus', value: item.value })}
                                            className="cursor-pointer appearance-none checked:bg-black checked:border-none focus:outline-none"
                                        />
                                    </div>
                                    <p className=" text-pure-black">{item.label}</p>
                                </div>
                            ))}
                    </div>
                </label>
                <button
                    type="submit"
                    className="w-full bg-primary flex items-center justify-center hover:bg-opacity-90 text-white font-semibold text-lg px-9 py-3 rounded-lg mt-4"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? <Loader /> : 'Save Invoice'}
                </button>
            </form>
        </div>
    )
}
