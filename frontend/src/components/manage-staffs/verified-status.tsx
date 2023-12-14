import { MdVerified } from 'react-icons/md';
import { TiCancelOutline } from 'react-icons/ti';

export default function VerifiedStatus({ status }: { status: boolean }) {
    return (
        <span
            className={` inline-flex items-center rounded-full px-2 py-1 text-xs
             ${status === false && 'bg-gray-100 text-text'} 
            ${status === true && 'bg-success text-white'}
      `}
        >
            {status === false &&
                <>
                    Unverified
                    <div className="ml-1 w-4 text-gray-500" >
                        <TiCancelOutline />
                    </div>
                </>
            }
            {status === true &&
                <>
                    Verified
                    <div className="ml-1 w-4 text-white" >
                        <MdVerified />
                    </div>
                </>
            }
        </span>
    );
}