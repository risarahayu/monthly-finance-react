console.log("SCRIPT LOADED");

function showLoading() {
    document.getElementById('loading').style.display = 'block';
}

function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}



const list = document.getElementById('transactionList');


let transactions = [];

async function loadTransactions() {

    try {
        showLoading();

        const res = await fetch('/transactions');
        if (!res.ok) {
            throw new Error('Failed to fetch transactions');
        }
    const data = await res.json();

    transactions = data;
    list.innerHTML =  '';

    data.forEach(item=>{
        list.innerHTML += `
            <div class="" style="padding: 10px; border: 1px solid #ccc; margin-bottom: 10px; border-radius: 8px;">
            <h3>${item.description}</h3>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <p>${item.category} - ${item.type} - ${item.amount}</p>
                    <div style="display: flex; gap: 10px;">
                        <button onclick="editTransaction(${item.id})">Edit</button>
                        <button onclick="deleteTransaction(${item.id})">Delete</button>
                    </div>
                </div>
            </div>
        `;
    });
} catch (error) {
    console.error('Error loading transactions:', error);
} finally {
    hideLoading();
} 
}      

loadTransactions();


const form = document.getElementById('transactionForm');

// update form
let editId = null;

//when submit
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if(editId===null){
        await addTransaction(e);
    }else{
        await updateTransaction();
    }
});


async function addTransaction(e) {
    e.preventDefault();

    // get the input value
    const newData = {
        trans_date: document.getElementById('trans_date').value,
        description: document.getElementById('description').value,
        category: document.getElementById('category').value,
        type: document.getElementById('typeInput').value,
        amount: document.getElementById('amount').value
    };

    try {
        showLoading();

        const res = await fetch('/transactions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newData)
        });

        if (!res.ok) {
            throw new Error('Failed to save data');
        }

        showToast('Transaction added successfully', 'success');

        form.reset();
        loadTransactions();

    } catch (error) {
        console.error('Error adding transaction:', error);
        showError('Gagal menyimpan data');
    } finally {
        hideLoading();
    }
}


async function editTransaction(id) {
    const res = await fetch(`/transactions/${id}`);

    
    // const text = await res.text(); // 🔥 lihat isi mentah
    // console.log('RESPONSE:', text);
    const transaction = await res.json();
    console.log('STATUS:', transaction);

    editId = id;

    document.getElementById('trans_date').value = transaction.trans_date.split('T')[0];
    document.getElementById('description').value = transaction.description;
    document.getElementById('category').value = transaction.category;
    document.getElementById('typeInput').value = transaction.type;
    document.getElementById('amount').value = Number(transaction.amount);

}



async function updateTransaction() {
    const updatedData = {
        trans_date : document.getElementById('trans_date').value,
        description : document.getElementById('description').value,
        category : document.getElementById('category').value,
        type : document.getElementById('typeInput').value,
        amount : document.getElementById('amount').value
    };

    await fetch(`/transactions/${editId}`, {
        method: 'PUT',
        headers: {  
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
    });
    showToast('Transaction updated successfully', 'success');
    form.reset();
    loadTransactions();
}


async function deleteTransaction(id) {
    await fetch(`/transactions/${id}`, {
        method: 'DELETE'
    });
    loadTransactions();
}


// filter
const filterForm = document.getElementById('filterForm');

filterForm.addEventListener('submit', (e) => {
    e.preventDefault();


    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const type = document.getElementById('typeFilter').value;

    fetchFilteredData(startDate, endDate, type);
});



// Filter concept with 2 function fetch and render, fetch will get data from API and render will display the data to UI
// send to API
async function fetchFilteredData(startDate, endDate, type) {
    try{
        showLoading();
        let url = `/transactions?startDate=${startDate}&endDate=${endDate}`;

        if(type) {
            url += `&type=${type}`;
        }
        const res = await fetch(url);
        console.log('STATUS: ', res.status);
        // console.log(url);

        // check if HTTP response is ok (status code 200-299)
        // meanwhile try catch will catch network error, but not HTTP error, so we need to check manually
        if (!res.ok) {
            throw new Error('Failed to fetch filtered transactions');
        }
        // get data from controller
        const data = await res.json();
        // console.log('DATA FILTER:', data);
    
        // render to UI
        renderTransactionData(data);

    } catch (error) {
        console.error('Error fetching filtered transactions:', error);
        showError('Gagal memuat data');
    } finally {
        hideLoading();
    }

}


// this UI will replace the loadTransactions, because this function will render the data based on filter, so we need to separate the render function and fetch function
function renderTransactionData(data) {
    list.innerHTML =  '';

    data.forEach(item=>{
        list.innerHTML += `
            <div class="">
                <h3>${item.description}</h3>
                <p>${item.category} - ${item.amount}</p>
                <button onclick="editTransaction(${item.id})">Edit</button>
                <button onclick="deleteTransaction(${item.id})">Delete</button>
            </div>
        `;
    });
}


