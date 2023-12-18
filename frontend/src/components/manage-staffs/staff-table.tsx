import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

import { useDebouncedCallback } from "use-debounce"
import useFetchData from "../../hooks/useFetchData"
import useManageBusinessStaff from "../../hooks/useManageBusinessStaff"
import { staffMemberType } from "../../pages/manage-staffs"
import { businessStaffType } from "../../utils/types"
import ErrorMessage from "../err-message"
import Loader from "../loader"
import VerifiedStatus from "./verified-status"

type Props = {
    staffType: staffMemberType,
}

export default function StaffTable({ staffType }: Props) {
    const { fetchStaffs } = useFetchData()
    const { data: businessStaffs, isLoading: isLoadingBusinessStaffs, error: businessStaffsErrMsg } = fetchStaffs()

    const { unVerifyStaff, verifyStaff, loading } = useManageBusinessStaff()

    const [filteredStaff, setFilteredStaff] = useState<businessStaffType[]>(businessStaffs as businessStaffType[])

    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('query')

    const filterStaffsByQuery = useDebouncedCallback(() => {
        if (query && businessStaffs) {
            setFilteredStaff(businessStaffs.filter(staff => staff.name.toLowerCase().includes(query.toLowerCase()) || staff.email.toLowerCase().includes(query.toLowerCase())))
        } else {
            setFilteredStaff(businessStaffs as businessStaffType[])
        }
    }, 500)

    useEffect(() => {
        setSearchParams(params => {
            params.set('query', '')
            return params
        })

        if (staffType === 'all') {
            setFilteredStaff(businessStaffs as businessStaffType[])
        } else {
            const isVerified = staffType === 'unverified' ? false : true
            businessStaffs && setFilteredStaff(businessStaffs.filter(staff => staff.isVerified === isVerified))
        }
    }, [staffType])

    useEffect(() => {
        filterStaffsByQuery()
    }, [query])

    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                {
                    isLoadingBusinessStaffs &&
                    <div className="w-full flex items-center justify-center pt-20">
                        <Loader dark />
                    </div>
                }

                {!isLoadingBusinessStaffs && businessStaffs?.length === 0 && !businessStaffsErrMsg &&
                    <p className='text-black font-semibold text-base w-full text-center mt-8'>No staff is associated with your business, Please create one.</p>
                }

                {!isLoadingBusinessStaffs && businessStaffsErrMsg && <ErrorMessage>{businessStaffsErrMsg}</ErrorMessage>}

                {!!businessStaffs?.length && !isLoadingBusinessStaffs &&
                    <div className="rounded-lg bg-background w-full p-2 md:pt-0">
                        <div className="md:hidden">
                            {(query || staffType !== 'all' ? filteredStaff : businessStaffs).map((staff) => (
                                <div
                                    key={staff._id}
                                    className="mb-2 w-full rounded-md bg-white p-4"
                                >
                                    <div className="flex items-center justify-between border-b pb-4">
                                        <div>
                                            <div className="mb-2 flex items-center">
                                                <p className="text-base font-semibold text-black">{staff.name}</p>
                                            </div>
                                            <p className="text-sm text-text">{staff.email}</p>
                                        </div>

                                    </div>
                                    <div className="flex w-full items-center justify-between pt-4">
                                        <div className='text-text'>
                                            <p className='overflow-x-scroll'>{staff.staffId}</p>
                                            <p className="text-xl font-medium">
                                                {staff.department}
                                            </p>
                                        </div>
                                        <div className="flex justify-end gap-2">
                                            {!loading &&
                                                <button
                                                    type="button"
                                                    title="click to change status"
                                                    onClick={() => {
                                                        staff.isVerified ? unVerifyStaff(staff._id, staff.business) : verifyStaff(staff._id, staff.business)
                                                    }}>
                                                    <VerifiedStatus status={staff.isVerified} />
                                                </button>
                                            }
                                            {loading && <Loader dark />}
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
                                        Email
                                    </th>
                                    <th scope="col" className="px-3 py-5 font-medium">
                                        Staff Id
                                    </th>
                                    <th scope="col" className="px-3 py-5 font-medium">
                                        Department
                                    </th>
                                    <th scope="col" className="px-3 py-5 font-medium">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {(query || staffType !== 'all' ? filteredStaff : businessStaffs).map((staff) => (
                                    <tr
                                        key={staff._id}
                                        className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                    >
                                        <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                            <div className="flex items-center gap-3">
                                                {/* <div
                                                className="mr-2 rounded-full w-7 h-7 bg-slate-600"
                                            /> */}
                                                <p className="text-base font-semibold text-black">{staff.name}</p>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-3 text-text">
                                            {staff.email}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-3 text-text">
                                            {(staff.staffId)}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-3 text-text">
                                            {staff.department}
                                        </td>
                                        <td className="whitespace-nowrap py-3 px-3">
                                            {!loading &&
                                                <button
                                                    type="button"
                                                    title="click to change status"
                                                    onClick={() => {
                                                        staff.isVerified ? unVerifyStaff(staff._id, staff.business) : verifyStaff(staff._id, staff.business)
                                                    }}>
                                                    <VerifiedStatus status={staff.isVerified} />
                                                </button>
                                            }
                                            {loading && <Loader dark />}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        </div >
    )
}
