import { useState } from "react";
import { Raffle } from "./API";
import { Button } from "./components/Button"

export const CreateRaffleForm = ({raffle}: {raffle: Raffle}) => {

    // Set Start for the form
    // TODO: Fix so the data is definitely populated with possible null values
    const [formData, setFormData] = useState<Raffle>(raffle);


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('submitting form');
    }

    return (
        <form className='space-y-4 border rounded p-4'>
            <div>
                <label className='block text-sm font-medium '>Name</label>
                <input
                    type='text'
                    value={formData.name}
                    className='text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
            </div>
            <div>
                <label className='block text-sm font-medium '>Image (optional)</label>
                <input
                    type='file'
                    className='text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
            </div>
            <div>
                <label className='block text-sm font-medium '>Start Date</label>
                <input
                    type='datetime-local'
                    value={formData.start_date}
                    className='text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
            </div>
            <div>
                <label className='block text-sm font-medium '>End Date</label>
                <input
                    type='datetime-local'
                    value={formData.end_date}
                    className='text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
            </div>
            <div>
                <label className='block text-sm font-medium '>Drawing Date (optional)</label>
                <input
                    type='datetime-local'
                    className='text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                />
            </div>
            <div className='flex items-center'>
                <input
                    type='checkbox'
                    checked={formData.patreon}
                    className='h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500'
                />
                <label className='ml-2 block text-sm '>Patreon Only</label>
            </div>
            <div>
                <Button type='submit' title="Submit"/>
            </div>
        </form>
    );
}