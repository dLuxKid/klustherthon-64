import React, { useReducer } from "react"

import { MdCancel } from "react-icons/md";
import { toast } from "sonner";

const initialState = {
    name: '',
    email: '',
    amount: 300,
    paymentStatus: '',
    paymentType: '',
    periodicPayment: 0, // optional
    installmentalPaymentAmount: 0 // optional
}

const paymentStatus_options: Array<{ value: string, label: string }> = [
    { value: 'paid', label: 'Paid' },
    { value: 'pending', label: 'Pending' },
];

const paymentType_options: Array<{ value: string, label: string }> = [
    { value: 'single', label: 'Single' },
    { value: 'installment', label: 'Installmentally' },
    { value: 'reoccurring', label: 'Reoccurring' },
];

const invoiceReducer = (state: typeof initialState, action: { name: string, value: string }) => {
    return { ...state, [action.name]: action.value }
}

export default function CreateNewInvoice({ setOpenModal }: { setOpenModal: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [state, dispatch] = useReducer(invoiceReducer, initialState)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        dispatch({ name: e.target.name, value: e.target.value })
    }

    const createInvoice = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!initialState.amount || !initialState.email || !initialState.name || !initialState.paymentStatus || !initialState.paymentType)
            return toast.error('Please fill all values')

        const apiUrl = 'http://localhost:5000/api/invoices/create'
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "title": initialState.name,
                    "email": initialState.email,
                    "amount": initialState.amount,
                    "paymentStatus": initialState.paymentStatus,
                    "paymentType": initialState.paymentType,
                }),
            });

            if (response.ok) {
                toast.success('invoice successfully created')
                console.log('Data successfully sent to the server', await response.json());
                // Handle success, e.g., show a success message or redirect
            } else {
                console.error('Failed to send data to the server');
                toast.error('Error creating invoice');
                // Handle error, e.g., show an error message to the user
            }
        } catch (error) {
            console.error('Error sending data:', error);
            toast.error('Error creating invoice');
            // Handle network errors or other issues
        }
    };

    return (
        <div className="w-full h-screen flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 bg-white/20 z-50 backdrop-blur-sm">
            <form onSubmit={createInvoice} className="form relative">
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
                        type="email"
                        onChange={handleChange}
                        value={state.email}
                        name="email"
                    />
                </label>
                <label >
                    <p>Amount</p>
                    <input
                        required
                        type="number"
                        onChange={handleChange}
                        value={state.paymentType !== 'installment' ? '300' : state.amount}
                        name="amount"
                        readOnly={state.paymentType !== 'installment'}
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
                <label>
                    <p>Payment type</p>
                    <div className="flex items-start gap-2">
                        {
                            paymentType_options.map((item, i) => (
                                <div key={i} className="flex items-center justify-start gap-1">
                                    <div className="rounded-full w-4 h-4 overflow-hidden border border-black">
                                        <input
                                            type="radio"
                                            value={item.value}
                                            checked={state.paymentType === item.value}
                                            onChange={() => {
                                                dispatch({ name: 'paymentType', value: item.value })
                                                if (state.paymentType !== 'single') dispatch({ name: 'periodicPayment', value: '1' })
                                            }}
                                            className="cursor-pointer appearance-none checked:bg-black checked:border-none focus:outline-none"
                                        />
                                    </div>
                                    <p className=" text-pure-black">{item.label}</p>
                                </div>

                            ))}
                    </div>
                    <div className="flex gap-4 items-center justify-start">
                        {state.paymentType !== 'single' &&
                            <select value={state.periodicPayment} onChange={handleChange} name="periodicPayment" >
                                <option value={1}>Daily</option>
                                <option value={2}>Weekly</option>
                                <option value={3}>Monthly</option>
                                <option value={4}>Yearly</option>
                            </select>
                        }
                        {state.paymentType === 'installment' &&
                            <input
                                required
                                type="number"
                                onChange={handleChange}
                                value={state.installmentalPaymentAmount}
                                name="installmentalPaymentAmount"
                            />
                        }
                    </div>
                </label>

                <button type="submit" className="w-full bg-primary  disabled:bg-slate-600 hover:bg-opacity-90 text-white font-semibold text-lg px-9 py-3 rounded-lg mt-4" onClick={createInvoice}>Create Invoice</button>
            </form>
        </div>
    )
}
