const BASE_URL = 'http://localhost:3000/transactions';

export async function getTransactions() {
    const res = await fetch(BASE_URL);

    if (!res.ok) {
        throw new Error('Failed fetch');
    }

    return res.json();
}

export async function getTransactionById(id) {
    const res = await fetch(`${BASE_URL}/${id}`);
    return res.json();
}

export async function addTransaction(data) {
    const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    });

    return res;
}

export async function updateTransaction(id,data) {
    return fetch(`${BASE_URL}/${id}`, {
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    });
}

export async function deleteTransaction(id) {
    return fetch(`${BASE_URL}/${id}`, {
        method:'DELETE'
    });
}