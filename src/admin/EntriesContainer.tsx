import { useState } from "react";
import { RaffleEntry } from "../API"
import { Button } from "../components/Button";
import { Search } from "lucide-react";


const loadCountDefault = 10
export const RaffleEntriesContainer = ({ entries }: { entries: RaffleEntry[] }) => {
    const [showEntries, setShowEntries] = useState<boolean>(false);
    const [loadCount, setLoadCount] = useState<number>(loadCountDefault);
    const [searchRes, setSearchRes] = useState<RaffleEntry[]>(entries);

    const handleShowMore = () => {
        setLoadCount(loadCount + 10);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const search = e.target.value.toLowerCase();
        const res = entries.filter((entry) => entry.name.toLowerCase().includes(search));
        setSearchRes(res);
    };

    return (
        <div>
            <div className='flex justify-between'>
                <h2 className='text-2xl'>Entries: {entries.length}</h2>
                <label className='flex items-center space-x-2'>
                    <input type='checkbox' checked={showEntries} onChange={() => setShowEntries(!showEntries)} />
                    <div className='text-sm font-semibold text-slate-200'>Show Entries</div>
                </label>
            </div>

            {showEntries && (
                <ul className='border p-4 rounded'>
                    {/* Searhc Input */}
                    <label className='relative block mb-4'>
                        <span className='sr-only'>Search</span>
                        <span className='absolute inset-y-0 left-0 flex items-center pl-2'>
                            <Search />
                        </span>
                        <input
                            onChange={handleSearch}
                            className='placeholder:italic placeholder:text-slate-400 block bg-black w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm'
                            placeholder='Search entries...'
                            type='text'
                            name='search'
                        />
                    </label>

                    {/* Show Entries */}
                    {searchRes.slice(0, loadCount).map((entry, index) => (
                        <li className='text-xl' key={entry.id + index}>
                            {entry.name}
                        </li>
                    ))}

                    {/* Show Button */}
                    {searchRes.length > loadCountDefault && (
                        <div className='mt-2'>
                            <Button title='Show More' onClick={handleShowMore} />
                        </div>
                    )}
                </ul>
            )}
        </div>
    );
};