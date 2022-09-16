import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../../firebase.init';

const MyAccount = () => {
    const [user] = useAuthState(auth);
    const [isLoading, setLoading] = useState(false);
    const [getTransaction, setGetTransactions] = useState([]);


    // Generate invoice
    const getRandomId = (min = 875487, max = 99999999999) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        const num = Math.floor(Math.random() * (max - min + 1)) + min;
        return num;
    };

    const invoiceID = getRandomId();

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:4000/getTransactionByEmail/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setGetTransactions(data);
                setLoading(false);
            });
    }, [user.email]);

    // useEffect( () =>{
    //     setLoading(true);
    //     fetch(`http://localhost:4000/getReceievedBalance/${user?.email}`)
    //     .then(res => res.json())
    //     .then(data => {
    //         s
    //     })
    // }, [])

    const handleAddMoney = (event) => {
        event.preventDefault();
        setLoading(true);
        const amount = parseFloat(event.target.amount.value);
        const email = user?.email;
        const url = `http://localhost:4000/addMoney/${email}`
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ amount })
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    const transaction = { email: user?.email, amount, status: 'success', type: 'Add Money', invoiceID, userName: user?.displayName }
                    fetch(`http://localhost:4000/addTransaction`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(transaction)
                    })
                        .then(res => res.json())
                        .then(data => {
                            // console.log(data)
                            if (data.acknowledged) {
                                setLoading(false)
                                window.location.reload();
                            }
                        });
                }
            });

    };

    const handleSendMoney = (event) => {
        event.preventDefault();
        const amount = parseFloat(event.target.amount.value);
        const payee = event.target.payee.value;
        setLoading(true);
        const url = `http://localhost:4000/cutBalance/${user?.email}`
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ amount })
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    const sendMoney = { sender: user?.email, payee, amount, status: 'success' }
                    fetch(`http://localhost:4000/confirmRecieve`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(sendMoney)
                    })
                        .then(res => res.json())
                        .then(data => {
                            // console.log(data);
                            setLoading(false)
                            if (data.acknowledged) {
                                setLoading(true);
                                fetch(`http://localhost:4000/updatePayeeBalance/${payee}`, {
                                    method: 'PUT',
                                    headers: {
                                        'content-type': 'application/json'
                                    },
                                    body: JSON.stringify({ amount })
                                })
                                    .then(res => res.json())
                                    .then(data => {
                                        // console.log(data);
                                        setLoading(false);
                                        if (data.acknowledged) {
                                            // window.location.reload();
                                            setLoading(true);
                                            const transaction = { email: user?.email, amount, payee, status: 'success', type: 'Send Money', invoiceID, userName: user?.displayName }
                                            const url = 'http://localhost:4000/addTransaction'
                                            fetch(url, {
                                                method: 'POST',
                                                headers: {
                                                    'content-type': 'application/json'
                                                },
                                                body: JSON.stringify(transaction)
                                            })
                                                .then(res => res.json())
                                                .then(data => {
                                                    if (data.acknowledged) {
                                                        setLoading(false)
                                                        // window.location.reload();
                                                        if (data.acknowledged) {
                                                            const url = `http://localhost:4000/updateRecievedBalance/${payee}`;
                                                            fetch(url, {
                                                                method: 'PUT',
                                                                headers: {
                                                                    'content-type': 'application/json'
                                                                },
                                                                body: JSON.stringify({ amount })
                                                            })
                                                                .then(res => res.json())
                                                                .then(data => {
                                                                    // console.log(data);
                                                                    window.location.reload();
                                                                })
                                                        }
                                                    }
                                                });
                                        }
                                    })
                            }
                        })
                }
            })
    }





    return (
        <div>
            <div className='px-10 grid grid-cols-3 md-:grid-cols-2 w-4/5 items-center justify-items-center my-12'>
                <div className='px-5 bg-base-200 rounded-lg w-auto py-5 text-sky-500 font-medium text-xl'>
                    <div>
                        <div className="card-body w-96">
                            <p>Add money</p>
                            <form onSubmit={handleAddMoney}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Amount</span>
                                    </label>
                                    <input name='amount' type="text" placeholder="Amount" className="input input-bordered" />
                                </div>
                                <div className="form-control mt-6">
                                    <button disabled={isLoading} className="btn btn-primary">
                                        {
                                            isLoading ? 'Loading' : 'Add Now'
                                        }
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className='px-5 bg-base-200 rounded-lg w-auto py-5 text-sky-500 font-medium text-xl'>
                    <div>
                        <div className="card-body w-96">
                            <p>Send Money to the user</p>
                            <form onSubmit={handleSendMoney}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">User</span>
                                    </label>
                                    <input type="text" name='payee' placeholder="Payee email" className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Amount</span>
                                    </label>
                                    <input type="text" name='amount' placeholder="Amount" className="input input-bordered" />
                                </div>
                                <div className="form-control mt-6">
                                    <button disabled={isLoading} className="btn btn-primary">{
                                        isLoading ? 'Loading...' : 'Send Now'
                                    }</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className='px-5 bg-base-200 rounded-lg w-auto py-5 text-sky-500 font-medium text-xl'>
                    <div>
                        <div className="card-body w-96">
                            <p>Request money</p>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" placeholder="Email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Amount</span>
                                </label>
                                <input type="text" placeholder="Amount" className="input input-bordered" />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Request Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 px-10 mt-10'>
                <div className='w-full h-40 bg-blue-500'>
                    <div>
                        <div>
                            <h2 className='px-5 pt-3 text-gray-200'>Recent Transactions</h2>
                            <div className="overflow-x-auto mt-2 ">
                                <table className="table w-full">

                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Type</th>
                                            <th>Amount</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>


                                        {
                                            getTransaction.map((transaction, index) => <React.Fragment>
                                                <tr>
                                                    <th>{index + 1}</th>
                                                    <td>{transaction.type}</td>
                                                    <td>${transaction.amount}</td>
                                                    <td>
                                                        <span className='bg-green-300 text-green-500 px-3 py-1 rounded-full text-sm'>
                                                            {transaction.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            </React.Fragment>)
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full bg-green-500'>
                    <div>
                        <div>
                            <h2 className='px-5 pt-3 text-gray-200'>Invoices</h2>
                            <div className="overflow-x-auto mt-2 ">
                                <table className="table w-full">

                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Client</th>
                                            <th>Amount</th>
                                            <th>Invoice</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            getTransaction.map((transaction, index) => <React.Fragment>
                                                <tr>
                                                    <th>{index + 1}</th>
                                                    <td>{transaction.userName}</td>
                                                    <td>{transaction.amount} USD</td>
                                                    <td>
                                                        <span className='bg-green-300 text-green-500 px-3 py-1 rounded-full text-sm font-medium'>
                                                            {
                                                                transaction.invoiceID.toString().slice(0, 4)
                                                            }***
                                                            {
                                                                transaction.invoiceID.toString().slice(-3)
                                                            }
                                                        </span>
                                                    </td>
                                                </tr>
                                            </React.Fragment>)
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MyAccount;