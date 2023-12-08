import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom'

export default function Back() {
    const navigate = useNavigate()
    return (
        <div
            className='absolute left-8 top-8 cursor-pointer flex items-center gap-1 justify-center text-black hover:text-primary font-semibold'
            onClick={() => navigate('/')}
        >
            <IoMdArrowRoundBack />
            <p className='text-base'>back</p>
        </div>
    )
}
