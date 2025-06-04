// Theme switch functionality
const themeToggle = document.getElementById('checkbox');
const body = document.body;

// Check for saved theme preference or use default dark theme
const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
    body.classList.add('light-theme');
    themeToggle.checked = true;
}

// Toggle theme when switch is clicked
themeToggle.addEventListener('change', function() {
    if (this.checked) {
        body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.remove('light-theme');
        localStorage.setItem('theme', 'dark');
    }
});

// Share button functionality (existing code)
const shareButtons = document.querySelectorAll('.tile-share-button');

async function copyText(e) {
    e.preventDefault();
    const link = this.getAttribute('link');
    
    try {
        await navigator.clipboard.writeText(link);
        
        // Create toast notification
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = 'Link copied to clipboard!';
        document.body.appendChild(toast);
        
        // Show toast with animation
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        // Hide and remove toast after 2 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 2000);
        
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
}

shareButtons.forEach(shareButton => {
    shareButton.addEventListener('click', copyText);
});