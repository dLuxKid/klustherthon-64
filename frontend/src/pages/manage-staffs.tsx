import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import StaffBtns from "../components/manage-staffs/staff-buttons"
import StaffTable from "../components/manage-staffs/staff-table"
import Search from "../components/search"

import { toast } from "sonner"

import { useAuthContext } from "../context/useAuthContext"

export type staffMemberType = 'all' | 'verified' | 'unverified'

export default function ManageStaffs() {
    const navigate = useNavigate()
    const { user } = useAuthContext()

    const [staffType, setStaffType] = useState<staffMemberType>('all')

    useEffect(() => {
        if (!user.isBusiness) {
            toast.warning('Only Admins can access this page')
            navigate('/dashboard')
        }
    }, [])

    if (user.isBusiness)
        return (
            <div className="w-full">
                <h1 className={'text-black text-2xl font-semibold uppercase'}>Manage Staffs</h1>
                <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                    <Search placeholder="Search staffs..." />
                    <StaffBtns staffType={staffType} setStaffType={setStaffType} />
                </div>
                <StaffTable staffType={staffType} />
            </div >
        )
}
