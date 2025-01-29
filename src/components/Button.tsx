export const Button = ({
  type = 'button',
  title,
  onClick,
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className='w-full rounded-sm border bg-black px-2 py-1 text-xl shadow-sm shadow-white hover:cursor-pointer hover:underline hover:shadow-inner'
    >
      {title}
    </button>
  );
};
