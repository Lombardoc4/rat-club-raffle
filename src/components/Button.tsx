export const Button = ({type = "button", title, onClick}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return <button type={type} onClick={onClick} className='text-xl border rounded px-2 py-1 hover:underline hover:cursor-pointer bg-black shadow shadow-white hover:shadow-inner w-full'>{title}</button>;
}