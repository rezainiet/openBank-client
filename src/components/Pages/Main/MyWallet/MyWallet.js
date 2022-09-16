import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../../firebase.init';
import Loading from '../../../Shared/Loading/Loading';
import wallet from './../../../../assets/icons/walletImage.png'
import Chart from './Chart/Chart';
import RecentTransaction from './RecentTransaction/RecentTransaction';

const MyWallet = () => {

    const [user] = useAuthState(auth);
    const [getUser, setGetUser] = useState({});
    const [isLoading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        const url = `http://localhost:4000/getUser/${user.email}`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                setGetUser(data);
                setLoading(false);
            })
    }, [user.email, user]);

    if (isLoading) {
        return <Loading />
    };

    return (
        <div className='px-12'>
            <div className='grid items-center justify-items-center w-full'>
                <div className='w-3/5'>
                    <h2 className='font-bold mt-16 mb-3'>Accounts</h2>


                    {/* Cards */}

                    <div className='grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-5'>
                        <div className='w-4/5 h-28 rounded-lg bg-blue-400 px-5'>
                            <div className='flex items-center justify-between mt-2'>
                                <div><img src="https://img.icons8.com/ultraviolet/40/000000/bitcoin.png" /></div>
                                <p className='text-white font-semibold text-xl'>Bitcoin</p>
                            </div>
                            <div>
                                <p className='text-white text-2xl font-bold mt-5'>.234 <span className='text-xs'>(demo)</span></p>
                            </div>
                        </div>
                        <div className='w-4/5 h-28 rounded-lg bg-purple-400 px-5'>
                            <div className='flex items-center justify-between mt-2'>
                                <div><img src="https://img.icons8.com/ultraviolet/40/000000/bitcoin.png" /></div>
                                <p className='text-white font-semibold text-xl'>Bitcoin</p>
                            </div>
                            <div>
                                <p className='text-white text-2xl font-bold mt-5'>.234 <span className='text-xs'>(demo)</span></p>
                            </div>
                        </div>
                        <div className='w-4/5 h-28 rounded-lg bg-sky-400 px-5'>
                            <div className='flex items-center justify-between mt-2'>
                                <div><img src="https://img.icons8.com/ultraviolet/40/000000/bitcoin.png" /></div>
                                <p className='text-white font-semibold text-xl'>Bitcoin</p>
                            </div>
                            <div>
                                <p className='text-white text-2xl font-bold mt-5'>.234 <span className='text-xs'>(demo)</span></p>
                            </div>
                        </div>
                        <div className='w-4/5 h-28 rounded-lg bg-green-500 px-5'>
                            <div className='flex items-center justify-between mt-2'>
                                <div><img src="https://img.icons8.com/ultraviolet/40/000000/bitcoin.png" /></div>
                                <p className='text-white font-semibold text-xl'>Bitcoin</p>
                            </div>
                            <div>
                                <p className='text-white text-2xl font-bold mt-5'>.234 <span className='text-xs'>(demo)</span></p>
                            </div>
                        </div>
                    </div>




                    <h2 className='font-bold mt-10 mb-3'>My Balance</h2>
                    <div>
                        <div className='bg-blue-500 pl-5 w-full h-auto py-5 rounded-lg '>
                            <div className='flex items-center justify-around '>
                                <div>
                                    <img src={wallet} alt="Wallet" />
                                </div>
                                <div className='text-white ml-3'>
                                    <p className='font-light text-sm'>Total balance</p>
                                    <h3 className='font-medium text-xl'>${getUser?.balance}</h3>
                                </div>
                                <div className='text-white'>
                                    <p className='font-light text-sm'>Main Balance</p>
                                    <h3 className='font-medium text-xl'>$1,000 (Demo)</h3>
                                </div>
                                <div className='text-white'>
                                    <p className='font-light text-sm'>Recieved Balance</p>
                                    <h3 className='font-medium text-xl'>${getUser?.dBalance}</h3>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div>
                        <div className='flex items-center justify-between mt-10'>
                            <h2 className='font-bold mb-3'>Statistics</h2>
                            <div class="flex items-center">
                                <div class="mb-3">
                                    <select class="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
                                        <option selected>Select the currency</option>
                                        <option value="1">Dash</option>
                                        <option value="2">Binance</option>
                                        <option value="3">Litecoin</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='flex items-center justify-center mt-5 mb-10'>
                            <Chart />
                        </div>
                    </div>
                </div>
                <div className='w-2/5 bg-green-300'></div>
                <h2 className='font-bold mb-3'>Recent Transaction</h2>
                <RecentTransaction />
            </div>
        </div>
    );
};

export default MyWallet;