import React, { useReducer, useState } from "react";

import { MdCancel } from "react-icons/md";
import { toast } from "sonner";
import { useAuthContext } from "../../context/useAuthContext";
import Loader from "../loader";
import { customerType } from "../../pages/customers";
import { clientUrl } from "../../utils/urls";

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
    fetchCustomers: () => void
    customer: customerType
}

export default function EditCustomer({ setOpenEditModal, fetchCustomers, customer }: Props) {

    const { user } = useAuthContext()

    const [state, dispatch] = useReducer(customerReducer, {
        name: customer.name,
        email: customer.email,
        phoneNumber: customer.phoneNumber,
        address: customer.address
    })

    const [loading, setLoading] = useState<boolean>(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch({ name: e.target.name, value: e.target.value })
    }

    const editInvoice = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true)

        if (!state.email || !state.address || !state.name || !state.phoneNumber) {
            setLoading(false)
            return toast.error('Please fill all values')
        }

        try {
            const response = await fetch(clientUrl + `/profile/${customer._id}`, {
                method: 'PUT',
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
                toast.success('Client successfully saved')
                fetchCustomers()
                setTimeout(() => {
                    setLoading(false)
                    setOpenEditModal(false)
                }, 500);
            } else {
                toast.error('Error updating client');
                setTimeout(() => {
                    setLoading(false)
                }, 500);
            }
        } catch (error) {
            console.error(error);
            toast.error('Error updating client');
            setTimeout(() => {
                setLoading(false)
            }, 500);
        }
    };

    return (
        <div className="w-full h-screen flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 bg-white/20 z-50 backdrop-blur-sm">
            <form onSubmit={editInvoice} className="form relative">
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
                    onClick={editInvoice}
                >
                    {loading ? <Loader /> : 'Save Client'}
                </button>
            </form>
        </div>
    )
}
