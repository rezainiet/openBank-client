import { signOut } from 'firebase/auth';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import auth from '../../../firebase.init';

const Main = () => {


    const handleLogOut = () => {
        signOut(auth);
    }

    const navItems = <>

        <li>
            <Link to='/my-account'>Dashboard</Link>
        </li>
        <li>
            <Link to='/my-wallet'>My Wallet</Link>
        </li>
        <li onClick={handleLogOut}>
            <p className='text-green-500'>LogOut</p>
        </li>
    </>

    return (
        <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* <!-- Navbar --> */}
                <div className="w-full navbar bg-base-300">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                    </div>
                    <div className="flex-1 px-2 mx-2 font-medium">Open Bank</div>
                    <div className="flex-none hidden lg:block">
                        <ul className="menu menu-horizontal">
                            {/* <!-- Navbar menu content here --> */}
                            {navItems}
                        </ul>
                    </div>
                </div>
                {/* <!-- Page content here --> */}
                <Outlet />
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
                <ul className="menu p-4 overflow-y-auto w-80 bg-base-100">
                    {/* <!-- Sidebar content here --> */}
                    {navItems}

                </ul>

            </div>
        </div>
    );
};

export default Main;