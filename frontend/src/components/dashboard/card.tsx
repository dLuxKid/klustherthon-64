import { BsCash, BsPeopleFill } from "react-icons/bs";
import { FaFileInvoice } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";

import { useDataContext } from "../../context/useFetchDataContext";

const iconMap = {
    staff: <FaPeopleGroup />,
    customers: <BsPeopleFill />,
    payments: <BsCash />,
    invoices: <FaFileInvoice />,
};

export default function CardWrapper() {

    const { payments, clients, invoices } = useDataContext()

    return (
        <>
            <Card title="Total Payments" value={payments.length || '-'} type="payments" />
            <Card title="Total Clients" value={clients.length || '-'} type="customers" />
            <Card title="Total Invoices" value={invoices.length || '-'} type="invoices" />
        </>
    );
}

export function Card({
    title,
    value,
    type,
}: {
    title: string;
    value: number | string;
    type: 'invoices' | 'customers' | 'payments' | 'staff';
}) {
    const Icon = iconMap[type]

    return (
        <div className="rounded-xl bg-background p-2 shadow-sm">
            <div className="flex p-4">
                <div className="h-5 w-5 text-text">
                    {Icon ?
                        iconMap[type]
                        : null}
                </div>
                <h3 className="ml-2 text-sm font-medium text-black">{title}</h3>
            </div>
            <p
                className='truncate rounded-xl bg-white px-4 py-8 text-center text-2xl'
            >
                {value}
            </p>
        </div>
    );
}
