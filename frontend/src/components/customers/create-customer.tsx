import React, { useReducer, useState } from "react";

import { MdCancel } from "react-icons/md";
import { toast } from "sonner";
import { useAuthContext } from "../../context/useAuthContext";
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
    fetchCustomers: () => void
}

export default function CreateNewCustomer({ setOpenModal, fetchCustomers }: Props) {

    const { user } = useAuthContext()

    const [state, dispatch] = useReducer(invoiceReducer, initialState)

    const [loading, setLoading] = useState<boolean>(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch({ name: e.target.name, value: e.target.value })
    }

    const createInvoice = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true)

        if (!state.email || !state.address || !state.name || !state.phoneNumber) {
            setLoading(false)
            return toast.error('Please fill all values')
        }

        const apiUrl = 'http://localhost:5000/api/clients/create'
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    "name": state.name,
                    "email": state.email,
                    "phoneNumber": state.phoneNumber,
                    'address': state.address,
                    'businessId': user.id
                }),
            });

            console.log(response)

            if (response.ok) {
                toast.success('Client successfully registered')
                fetchCustomers()
                setTimeout(() => {
                    setLoading(false)
                    setOpenModal(false)
                }, 500);
            } else {
                console.error('Failed to send data to the server');
                toast.error('Error registering client');
                setTimeout(() => {
                    setLoading(false)
                }, 500);
            }
        } catch (error) {
            console.error(error);
            toast.error('Error registering client');
            setTimeout(() => {
                setLoading(false)
            }, 500);
        }

        setTimeout(() => {
            setLoading(false)
        }, 500);
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
                    onClick={createInvoice}
                >
                    {loading ? <Loader /> : 'Register Client'}
                </button>
            </form>
        </div>
    )
}
