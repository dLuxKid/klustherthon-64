import { formatCurrency } from "../../utils/formatter";
import { GrUpdate } from "react-icons/gr";
import { useDataContext } from "../../context/useFetchDataContext";

export default function LatestInvoices() {
    const { invoices } = useDataContext()

    return (
        <div className="flex w-full flex-col md:col-span-4 lg:col-span-4">
            <h2 className={`mb-4 text-xl md:text-2xl`}>
                Latest Invoices
            </h2>
            <div className="flex grow flex-col justify-between rounded-xl bg-background p-2">
                <div className="bg-white px-4">
                    {invoices && invoices.filter((_, idx) => idx < 5).map((invoice, i) => {
                        return (
                            <div
                                key={invoice._id}
                                className={`flex flex-row items-center justify-between py-4
                                   ${i !== 0 && 'border-t'}`}
                            >
                                <div className="flex items-center">
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-semibold md:text-base text-black">
                                            {invoice.title}
                                        </p>
                                        <p className="hidden text-sm text-text sm:block">
                                            {invoice.clientEmail}
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
