import React, { useReducer } from "react"

const initialState = {
    name: '',
    email: '',
    price: '',
    paymentStatus: '',
    paymentType: '',
    periodicPayment: '',
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

export default function CreateNewInvoice() {
    const [state, dispatch] = useReducer(invoiceReducer, initialState)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        dispatch({ name: e.target.name, value: e.target.value })
    }

    const createInvoice = async (e: React.FormEvent) => {
        e.preventDefault();
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
                    "amount": initialState.price,
                    "paymentStatus": initialState.paymentStatus,
                    "paymentType": initialState.paymentType,


                }),
            });

            if (response.ok) {
                console.log('Data successfully sent to the server');
                // Handle success, e.g., show a success message or redirect
            } else {
                console.error('Failed to send data to the server');
                // Handle error, e.g., show an error message to the user
            }
        } catch (error) {
            console.error('Error sending data:', error);
            // Handle network errors or other issues
        }
    };



    return (
        <div className="w-full h-screen flex items-center justify-center">
            <form onSubmit={createInvoice} className="invoice-form">
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
                    <p>Price</p>
                    <input
                        required
                        type="number"
                        onChange={handleChange}
                        value={state.price}
                        name="price"
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
                                            onChange={() => dispatch({ name: 'paymentType', value: item.value })}
                                            className="cursor-pointer appearance-none checked:bg-black checked:border-none focus:outline-none"
                                        />
                                    </div>
                                    <p className=" text-pure-black">{item.label}</p>
                                </div>

                            ))}
                    </div>
                    {state.paymentType && state.paymentType !== 'single' &&
                        <select value={state.periodicPayment} onChange={handleChange} >
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Yearly</option>
                        </select>
                    }
                </label>

                <button type="submit" className="w-full bg-primary hover:bg-opacity-90 text-white font-semibold text-lg px-9 py-3 rounded-lg mt-4" onClick={createInvoice}>Create Invoice</button>

            </form>
        </div >
    )
}
