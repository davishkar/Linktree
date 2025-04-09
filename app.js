const shareButtons = document.querySelectorAll('.tile-share-button');

async function copyText(e) {
    e.preventDefault();
    const link = this.getAttribute('link');
    
    try {
        await navigator.clipboard.writeText(link);
        showToast("Copied: " + link); // Custom toast notification
    } catch (err) {
        console.error(err);
    }
}

shareButtons.forEach(shareButton =>
    shareButton.addEventListener('click', copyText)
);

// Custom toast notification function
function showToast(message) {
    const toast = document.createElement("div");
    toast.classList.add("toast");
    toast.textContent = message;
    
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("show");
    }, 100); 

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}
