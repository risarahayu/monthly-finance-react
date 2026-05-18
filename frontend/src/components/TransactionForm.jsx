import { useState } from "react";
import { addTransaction } from '../services/transactionService';

export default function TransactionForm() {
    // prepare the input form state
    const [form, setForm] = useState(
        {
            trans_date: '',
            description: '',
            category: '',
            type: 'Income',
            amount: ''
        }
    );
}