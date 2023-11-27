import { BsCash, BsPeopleFill } from "react-icons/bs";
import { FaFileInvoice } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";

const iconMap = {
    staff: <FaPeopleGroup />,
    customers: <BsPeopleFill />,
    payments: <BsCash />,
    invoices: <FaFileInvoice />,
};

interface Props {
    customers: number
    payments: number
    invoices: number
}

export default function CardWrapper({ customers, payments, invoices }: Props) {

    return (
        <>
            {payments && <Card title="Total Payments" value={payments ?? '-'} type="payments" />}
            {customers && <Card title="Total Clients" value={customers ?? '-'} type="customers" />}
            {invoices && <Card title="Total Invoices" value={invoices ?? '-'} type="invoices" />}
            <Card
                title="Total Staffs"
                value={10}
                type="staff"
            />
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
