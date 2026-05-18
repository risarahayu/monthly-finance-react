import { useState, useEffect } from "react";

import { getTransactions } from '../services/transactionService';

function TransactionsPage() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData(){
            try {
                const data = await getTransactions();
                setTransactions(data);
            }
            catch (err) {
                console.log(err);
            }
            finally {                
                setLoading(false); 
            }
        }
        fetchData();
    }, []);

    if(loading) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <h2>Transactions</h2>

            {
                transactions.map(item => (
                    <div key={item.id} className="">
                         <h3>{item.description}</h3>
                         <p>
                            {item.category}
                            {' - '}
                            {item.type}
                            {' - '}
                            {item.amount}
                        </p>

                        <button>Edit</button>
                        <button>Delete</button>
                    </div>
                ))
            }
        </div>
    )
}

export default TransactionsPage;