
import { FaCheck, FaRegClock } from 'react-icons/fa';

export default function InvoiceStatus({ status }: { status: boolean }) {
    return (
        <span
            className={` inline-flex items-center rounded-full px-2 py-1 text-xs
             ${status === false && 'bg-gray-100 text-text'} 
            ${status === true && 'bg-success text-white'}
      `}
        >
            {status === false ? (
                <>
                    Pending
                    <div className="ml-1 w-4 text-gray-500" >
                        <FaRegClock />
                    </div>
                </>
            ) : null}
            {status === true ? (
                <>
                    Paid
                    <div className="ml-1 w-4 text-white" >
                        <FaCheck />
                    </div>
                </>
            ) : null}
        </span>
    );
}