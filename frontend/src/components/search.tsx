import { FaSearch } from "react-icons/fa";



export default function Search({ placeholder }: { placeholder: string }) {
    //   const searchParams = useSearchParams();
    //   const { replace } = useRouter();
    //   const pathname = usePathname();

    //   const handleSearch = useDebouncedCallback((term) => {
    //     console.log(`Searching... ${term}`);

    //     const params = new URLSearchParams(searchParams);

    //     params.set('page', '1');

    //     if (term) {
    //       params.set('query', term);
    //     } else {
    //       params.delete('query');
    //     }
    //     replace(`${pathname}?${params.toString()}`);
    //   }, 300);

    return (
        <div className="relative flex flex-1 flex-shrink-0">
            <label htmlFor="search" className="sr-only">
                Search
            </label>
            <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-text outline-2 placeholder:text-text"
                placeholder={placeholder}
                onChange={(e) => {
                    //   handleSearch(e.target.value);
                }}
            // defaultValue={ }
            />
            <div className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900">
                <FaSearch />
            </div>
        </div>
    );
}