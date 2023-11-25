import { useEffect } from "react";
import { DeleteBtn, UpdateBtn } from "../buttons";

const payments = [
    {
        productName: "Widget A",
        description: "High-quality widget",
        amount: 29.99
    },
    {
        productName: "Gadget B",
        description: "Feature-rich gadget",
        amount: 49.99
    },
    {
        productName: "Tool C",
        description: "Versatile tool",
        amount: 19.99
    },
    {
        productName: "Accessory D",
        description: "Enhance your setup",
        amount: 9.99
    },
    {
        productName: "Service E",
        description: "Premium service package",
        amount: 79.99
    },
    {
        productName: "Product F",
        description: "Standard product",
        amount: 39.99
    },
    {
        productName: "Tool G",
        description: "Handy tool for everyday use",
        amount: 14.99
    },
    {
        productName: "Widget H",
        description: "Advanced widget technology",
        amount: 59.99
    },
    {
        productName: "Gadget I",
        description: "Compact and efficient gadget",
        amount: 34.99
    },
    {
        productName: "Accessory J",
        description: "Customizable accessory",
        amount: 24.99
    },
];

export default function PaymentTable() {
    // useEffect(() => {
    //     (async () => {
    //         const res = await fetch('http://localhost:5000/api/payments/all')
    //         console.log(await res.json())
    //     })()
    // }, [])

    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-background p-2 md:pt-0">
                    <div className="md:hidden">
                        {payments?.map((payment, idx) => (
                            <div
                                key={idx}
                                className="mb-2 w-full rounded-md bg-white p-4"
                            >
                                <div className="flex items-center justify-between border-b pb-4">
                                    <div>
                                        <div className="mb-2 flex items-center">
                                            {/* <div
                                                className="mr-2 rounded-full w-7 h-7 bg-slate-600"
                                            /> */}
                                            <p className="text-base font-semibold text-black">{payment.productName}</p>
                                        </div>
                                        <p className="text-sm text-text">{payment.description}</p>
                                    </div>
                                </div>
                                <div className="flex w-full items-center justify-between pt-4">
                                    <p className="text-xl font-medium tex-text">
                                        {payment.amount}
                                    </p>
                                    <div className="flex justify-end gap-2">
                                        <UpdateBtn id={idx.toString()} />
                                        <DeleteBtn id={idx.toString()} />
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
                                    About
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Amount
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {payments?.map((payment, idx) => (
                                <tr
                                    key={idx}
                                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                >
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        <div className="flex items-center gap-3">
                                            {/* <div
                                                className="mr-2 rounded-full w-7 h-7 bg-slate-600"
                                            /> */}
                                            <p className="text-base font-semibold text-black">{payment.productName}</p>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3 text-text">
                                        {payment.description}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3 text-text">
                                        {payment.amount}
                                    </td>
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        <div className="flex justify-end gap-3">
                                            <UpdateBtn id={idx.toString()} />
                                            <DeleteBtn id={idx.toString()} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
