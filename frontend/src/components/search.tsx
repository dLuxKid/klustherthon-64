import { FaSearch } from "react-icons/fa";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";



export default function Search({ placeholder }: { placeholder: string }) {
    const [searchParams] = useSearchParams();
    const location = useLocation();
    const navigate = useNavigate()

    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams(location.search);
        params.set('page', '1');
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }

        navigate(`${location.pathname}?${params.toString()}`)
    }, 500);


    return (
        <div className="relative flex flex-1 flex-shrink-0">
            <label htmlFor="search" className="sr-only">
                Search
            </label>
            <input
                className="peer block w-full rounded-md border border-background h-12 py-[9px] pl-10 text-text outline-2 placeholder:text-text"
                placeholder={placeholder}
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={searchParams.get('query')?.toString()}
            />
            <div className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900">
                <FaSearch />
            </div>
        </div>
    );
}