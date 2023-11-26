import { formatCurrency } from "../../utils/formatter";

import { GrUpdate } from "react-icons/gr";

const invoices = [
    {
        id: '4419c858-598a-4a0b-a2f7-2996ffc76313',
        name: 'Marvellous',
        email: 'group64@gmail.com',
        amount: 15795,
        status: 'pending',
        date: ('Tue Dec 06 2022 00:00:00 GMT+0100 (West Africa Standard Time)'),
    },
    {
        id: '62b3c90a-ef52-4637-9b9b-9b3f247bfb14',
        name: 'Marvellous',
        email: 'group64@gmail.com',
        amount: 20348,
        status: 'pending',
        date: ('Mon Nov 14 2022 00:00:00 GMT+0100 (West Africa Standard Time)'),
    },
    {
        id: '9d133a5d-6f31-41f8-99a0-fdf432d97233',
        name: 'Marvellous',
        email: 'group64@gmail.com',
        amount: 3040,
        status: 'paid',
        date: ('Sat Oct 29 2022 00:00:00 GMT+0100 (West Africa Standard Time)'),
    },
    {
        id: '729cade7-307f-407e-a4ca-c50e1b313821',
        name: 'Marvellous',
        email: 'group64@gmail.com',
        amount: 44800,
        status: 'paid',
        date: ('Sun Sep 10 2023 00:00:00 GMT+0100 (West Africa Standard Time)'),
    },
    {
        id: 'd882f2f8-b86a-4ec5-b5a8-b8d9fcc11b94',
        name: 'Marvellous',
        email: 'group64@gmail.com',
        amount: 34577,
        status: 'pending',
        date: ('Sat Aug 05 2023 00:00:00 GMT+0100 (West Africa Standard Time)'),
    },
]

export default function LatestInvoices() {
    return (
        <div className="flex w-full flex-col md:col-span-4 lg:col-span-4">
            <h2 className={`mb-4 text-xl md:text-2xl`}>
                Latest Invoices
            </h2>
            <div className="flex grow flex-col justify-between rounded-xl bg-background p-2">
                <div className="bg-white px-4">
                    {invoices.map((invoice, i) => {
                        return (
                            <div
                                key={invoice.id}
                                className={`flex flex-row items-center justify-between py-4
                                   ${i !== 0 && 'border-t'}`}
                            >
                                <div className="flex items-center">
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-semibold md:text-base text-black">
                                            {invoice.name}
                                        </p>
                                        <p className="hidden text-sm text-text sm:block">
                                            {invoice.email}
                                        </p>
                                    </div>
                                </div>
                                <p
                                    className={` truncate text-sm font-medium md:text-base`}
                                >
                                    {formatCurrency(invoice.amount)}
                                </p>
                            </div>
                        );
                    })}
                </div>
                <div className="flex items-center pb-2 pt-6">
                    <span className="h-5 w-5 text-text">
                        <GrUpdate />
                    </span>
                    <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
                </div>
            </div>
        </div>
    )
}
