import { Suspense } from "react";

import CardWrapper from "../components/dashboard/card";
import LatestInvoices from "../components/dashboard/latest-invoices";
import LatestPayments from "../components/dashboard/latest-payments";

import { CardSkeleton, LatestInvoicesSkeleton } from "../components/skeletons";

export default function Dashboard() {
    return (
        <main>
            <h1 className={'text-black text-2xl font-semibold uppercase mb-4'}>Dashboard</h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Suspense fallback={<CardSkeleton />}>
                    <CardWrapper />
                </Suspense>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                <Suspense fallback={<LatestInvoicesSkeleton />}>
                    <LatestInvoices />
                </Suspense>
                <Suspense fallback={<LatestInvoicesSkeleton />}>
                    <LatestPayments />
                </Suspense>
            </div>
        </main>
    )
}
