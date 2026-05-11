// Loading & Error helpers
function showLoading() {
    document.getElementById('loading').style.display = 'block';
}

function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

function showError(message) {
    const errorEl = document.getElementById('error');
    errorEl.textContent = message;
    errorEl.style.display = 'block';
    setTimeout(() => {
        errorEl.style.display = 'none';
    }, 5000);
}

async function loadDashboardSummary(month, year) {    
    try{
        showLoading();

        // get data from API
        // const res = await fetch('/dashboard/api/');
        // refactor to send month and year as query parameter
        let url = '/dashboard/api';
        const query = [];
        if (month) query.push(`month=${month}`);
        if (year) query.push(`year=${year}`);

        if (query.length > 0) {
            url += `?${query.join('&')}`;
        }
        const res = await fetch(url);
        
        if (!res.ok) {
            throw new Error('Failed to fetch dashboard summary');
        }
        const data = await res.json();
            console.log("RAW DATA API:", data); // 👈 ini penting
            // render to UI
            document.getElementById('income').textContent = data.total_income;
            document.getElementById('expense').textContent = data.total_expense;
            document.getElementById('balance').textContent = data.balance;
    } catch (error) {
        console.error('Error loading dashboard summary:', error);
        showError('Gagal memuat data dashboard');
    } finally {
        hideLoading();
    }
}

// loadDashboardSummary();

// document.addEventListener('DOMContentLoaded', loadDashboardSummary);
let myExpenseChart = null;
async function loadExpenseByCategory(month, year) {
    try {
        let url = '/dashboard/api/category-summary';
        const query = [];
        if (month) query.push(`month=${month}`);
        if (year) query.push(`year=${year}`);
        if (query.length > 0) {
            url += `?${query.join('&')}`;
        }
        const res = await fetch(url);

        
        const data = await res.json();
        
        console.log('Expense by Category:', data);
        
        // if chart already exist, destroy it before creating new one to prevent error
        // must before if, becasue if have return. if after return, chart will never destroy and cause error when create new chart
        if (myExpenseChart !== null) {
            myExpenseChart.destroy();
        }
        if (!data || data.length === 0) {
            console.log('no data to display in chart');
            return;
        }
        
        const labels = data.map(item => item.category);
        const amounts = data.map(item => Number(item.total));

        const ctx = document.getElementById('expenseChart').getContext('2d');

        // create new chart
        
        myExpenseChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: amounts,
                    backgroundColor: [
                        '#2ecc71',
                        '#e74c3c',
                        '#3498db',
                        '#f1c40f',
                        '#9b59b6',
                        '#1abc9c'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 15,
                            font: { size: 12 }
                        }
                    }
                },
                cutout: '65%'
            }
        });
    } catch (error) {
        console.error('Error loading expense chart:', error);
    }
}

loadDashboardSummary();
loadExpenseByCategory();



const form = document.getElementById('filterForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const  month = document.getElementById('month').value;
    const  year = document.getElementById('year').value;

    loadDashboardSummary(month, year);
    loadExpenseByCategory(month, year);
});
