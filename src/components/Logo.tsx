import { Link, Outlet } from "react-router"

export const Logo = () => {
    return (
        <>
            <Link to='https://theratclub.com/'>
                <img
                    className='fixed start-4 bottom-4 max-w-16 lg:max-w-24'
                    src='https://theratclub.com/cdn/shop/files/ratLogo_800x.png?v=1650935788'
                    alt='The Rat Club'
                />
            </Link>
            <Outlet />
        </>
    );
}