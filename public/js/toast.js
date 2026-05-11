function showToast(message, type = 'success') {

    const container = document.getElementById('toastContainer');

    const toast = document.createElement('div');

    // define the style... 
    toast.classList.add('toast', 
        type === 'success' ? 'toast-success' : 'toast-error');
    
    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('fade-out');
        toast.addEventListener('transitionend', () => {
            toast.remove();
        });
    }, 3000);
}
    
