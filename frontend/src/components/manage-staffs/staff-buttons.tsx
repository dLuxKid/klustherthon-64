import { useState } from "react"

import { TiCancelOutline } from "react-icons/ti";
import { MdVerified } from "react-icons/md";


type staffMemberType = 'all' | 'verified' | 'unverified'
type staffMemberBtnType = { name: staffMemberType, icon?: React.ReactNode, iconColor?: string }[]

const btn_items: staffMemberBtnType = [
    { name: 'all' },
    { name: 'verified', icon: <MdVerified />, iconColor: 'text-success' },
    { name: 'unverified', icon: <TiCancelOutline />, iconColor: 'text-error' },
]

export default function StaffBtns() {
    const [staffType, setStaffType] = useState<staffMemberType>('all')
    return (
        <div className="flex items-center rounded-lg overflow-hidden">
            {btn_items.map((item, i) => (
                <div
                    className={`cursor-pointer flex items-center justify-center px-4 h-12 gap-2 text-sm font-medium text-white transition-colors  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${staffType === item.name ? 'bg-primary hover:bg-primary/90 focus-visible:outline-primary' : 'bg-text hover:bg-text/90 focus-visible:outline-text'} first:border-l-0 last:border-r-0 border-x border-white `}
                    onClick={() => setStaffType(item.name)}
                    key={i}
                >
                    {item.name === 'all' ?
                        <span className="block uppercase">{item.name}</span> :
                        <span className="hidden md:block uppercase">{item.name}</span>
                    }
                    {item.icon &&
                        <div className={item.iconColor}>
                            {item.icon}
                        </div>
                    }
                </div>
            ))}
        </div>
    )
}