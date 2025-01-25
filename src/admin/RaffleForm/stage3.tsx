import { useState } from "react";
import { validateDrawingDate, validateEndDate, validateStartDate } from "./utils";
import { CreateRaffleInput, UpdateRaffleInput } from "../../API";

const DateInput = ({ title, value, onChange, checked }: React.InputHTMLAttributes<HTMLInputElement>) => {
    return (
        <div>
            <div className='flex gap-4 justify-between'>
                <label htmlFor={title} className='block text-sm font-medium '>{title}</label>
                {checked && onChange && (
                    <a
                        className='text-xs border rounded cursor-pointer px-2 py-0.5'
                        onClick={() => onChange({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>)}
                    >
                        CLEAR
                    </a>
                )}
            </div>
            <input
                id={title}
                type='datetime-local'
                onChange={onChange}
                value={value}
                className='bg-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            />
        </div>
    );
};

export const Stage3 = ({
    updateForm,
    raffle,
    children,
}: {
    updateForm: (dates: { start_date: string; end_date: string; drawing_date: string }) => void;
    raffle: CreateRaffleInput | UpdateRaffleInput;
    children: React.ReactNode;
}) => {
    const [start_date, setStartDate] = useState<string>(raffle.start_date ?? '');
    const [end_date, setEndDate] = useState<string>(raffle.end_date ?? '');
    const [drawing_date, setDrawingDate] = useState<string>(raffle.drawing_date ?? '' );
    const [error, setError] = useState("");

    const validateDates = ({
        startDate = start_date,
        endDate = end_date,
        drawingDate = drawing_date,
    }: {
        startDate?: string;
        endDate?: string;
        drawingDate?: string;
    }) => {
        if (!startDate) {
            setError("Start date required");
            return false;
        }

        if (!validateStartDate(startDate)) {
            setError("Start date must be after current date");
            return false;
        } else setError("");

        if (!endDate) {
            return false;
        }

        if (!validateEndDate(endDate, startDate)) {
            setError("End date must be after start date");
            return false;
        }

        if (drawingDate && !validateDrawingDate(drawingDate, startDate, endDate)) {
            setError("Drawing date must be after start and end date");
            return false;
        }

        setError("");
        return true;
    };

    const handleStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        validateDates({ startDate: e.target.value });
        setStartDate(e.target.value);
    };

    const handleEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        validateDates({ endDate: e.target.value });
        setEndDate(e.target.value);
    };

    const handleDrawingDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        validateDates({ drawingDate: e.target.value });
        setDrawingDate(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const validDates = validateDates({
            startDate: start_date,
            endDate: end_date,
            drawingDate: drawing_date,
        });
        if (!validDates) {
            return;
        }
        // Update form values
        updateForm({
            start_date,
            end_date,
            drawing_date
        });
    };

    return (
        <form className='space-y-4 border rounded p-4' onSubmit={handleSubmit}>
            {error && <div className='text-red-500'>{error}</div>}
            <DateInput title='Start Date' value={start_date} onChange={handleStartDate} />
            <DateInput title='End Date' value={end_date} onChange={handleEndDate} />
            <DateInput title='Drawing Date (optional)' value={drawing_date} onChange={handleDrawingDate} checked />
            {children}
        </form>
    );
};
