import { CreateInvoice } from "../components/invoices/buttons";
import InvoicesTable from "../components/invoices/invoice-table";
import Search from "../components/search";


export default function Invoices() {
    return (
        <div className="w-full">
            <div className="w-full">
                <div className="flex w-full items-center justify-between">
                    <h1 className={'text-text text-2xl font-semibold uppercase'}>Invoices</h1>
                </div>
                <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                    <Search placeholder="Search invoices..." />
                    <CreateInvoice />
                </div>
                {/* <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
                        <Table query={query} currentPage={currentPage} />
                    </Suspense> */}
            </div>
            <div className="w-full">
                <InvoicesTable />
            </div>
        </div>

    )
}
