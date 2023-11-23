import { CreateInvoice } from "../components/invoices/buttons";
import InvoicesTable from "../components/invoices/invoice-table";
import Search from "../components/search";
import SideNavbar from "../components/side-navbar";


export default function Invoices() {
    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-64">
                <SideNavbar />
            </div>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
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
                    {/* <div className="mt-5 flex w-full justify-center">
                        <Pagination totalPages={totalPages} />
                    </div> */}
                </div>
                <div className="w-full">
                    <InvoicesTable />
                </div>
            </div>
        </div>

    )
}
