
import { FaCheck, FaRegClock } from 'react-icons/fa';

export default function InvoiceStatus({ status }: { status: string }) {
    return (
        <span
            className={` inline-flex items-center rounded-full px-2 py-1 text-xs
             ${status === 'pending' && 'bg-gray-100 text-text'} 
            ${status === 'paid' && 'bg-success text-white'}
      `}
        >
            {status === 'pending' ? (
                <>
                    Pending
                    <div className="ml-1 w-4 text-gray-500" >
                        <FaRegClock />
                    </div>
                </>
            ) : null}
            {status === 'paid' ? (
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