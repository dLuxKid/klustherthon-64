import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"

import useManageBusinessStaff from "../../hooks/useManageBusinessStaff"

export default function StaffTable() {
    const { businessStaffs, businessStaffsErrMsg, fetchStaffs, isLoadingBusinessStaffs, unVerifyStaff, verifyStaff } = useManageBusinessStaff()
    useEffect(() => {
        fetchStaffs()
        if (businessStaffs) console.log(businessStaffs)
    }, [])


    const [searchParams] = useSearchParams();
    const query = searchParams.get('query')

    // useEffect(() => {
    //     if (query) {
    //         setFilteredClients(clients.filter(clients => clients.name.toLowerCase().includes(query.toLowerCase()) || clients.email.toLowerCase().includes(query.toLowerCase())))
    //     } else {
    //         setFilteredClients(clients)
    //     }
    // }, [query])

    return (
        <div className="mt-6 flow-root">
            staff-table
        </div>
    )
}
