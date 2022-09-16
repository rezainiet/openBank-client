import React, { useEffect } from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../../../firebase.init';

const RecentTransaction = () => {
    const [user] = useAuthState(auth);
    const [getTransactions, setGetTransactions] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:4000/getTransactionByEmail/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setGetTransactions(data);
                setLoading(false);
            });
    }, [user.email]);

    return (
        <React.Fragment className="overflow-x-auto">
            <table className="table w-3/5">

                <thead>
                    <tr>
                        <th></th>
                        <th>Amount</th>
                        <th>Type</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        getTransactions.map((transaction, index) => <React.Fragment>
                            <tr>
                                <th>{index + 1}</th>
                                <td>{
                                    transaction.type === 'Add Money' ? `+${transaction.amount}` : `-${transaction.amount}`
                                }</td>
                                <td>{transaction.type}</td>
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
        </React.Fragment>
    );
};

export default RecentTransaction;