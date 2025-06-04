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

// Loader Animation Script
class LoaderManager {
    constructor() {
        this.loadingScreen = document.getElementById('loadingScreen');
        this.loadingText = document.querySelector('.loading-text');
        this.mainContent = document.querySelector('.main-content');
        this.currentStep = 0;
        this.loadingSteps = [
            "Initializing Creative Environment...",
            "Loading Design Assets...",
            "Configuring User Interface...",
            "Optimizing Performance...",
            "Finalizing Setup...",
            "Welcome to DEV AVISHKAR!"
        ];
        
        this.init();
    }

    init() {
        // Set initial loading text
        if (this.loadingText) {
            this.loadingText.textContent = this.loadingSteps[0];
            this.loadingText.style.opacity = '0.8';
        }
        
        // Start the loading sequence
        this.startLoadingSequence();
        
        // Handle page load completion
        window.addEventListener('load', () => {
            this.handlePageLoad();
        });

        // Fallback timeout to ensure loader doesn't stay forever
        setTimeout(() => {
            this.completeLoading();
        }, 8000);
    }

    startLoadingSequence() {
        // Start cycling through loading messages
        this.cycleLoadingText();
        
        // Start progress animation
        this.animateProgress();
    }

    cycleLoadingText() {
        const interval = setInterval(() => {
            if (this.currentStep < this.loadingSteps.length - 1) {
                this.currentStep++;
                this.updateLoadingText(this.loadingSteps[this.currentStep]);
            } else {
                clearInterval(interval);
                // Wait a moment before completing
                setTimeout(() => {
                    this.completeLoading();
                }, 1000);
            }
        }, 1200);
    }

    updateLoadingText(text) {
        if (this.loadingText) {
            // Fade out
            this.loadingText.style.opacity = '0';
            
            setTimeout(() => {
                // Update text and fade in
                this.loadingText.textContent = text;
                this.loadingText.style.opacity = '0.8';
            }, 150);
        }
    }

    animateProgress() {
        // The progress animation is handled by CSS
        // This method can be extended for more complex progress tracking
        const progressFill = document.querySelector('.progress-fill');
        if (progressFill) {
            progressFill.style.animation = 'progressFill 4s ease-in-out forwards';
        }
    }

    handlePageLoad() {
        // Additional logic when page is fully loaded
        // Can be used to ensure all resources are ready
        console.log('Page fully loaded');
    }

    completeLoading() {
        if (this.loadingScreen && !this.loadingScreen.classList.contains('hidden')) {
            // Fade out loading screen
            this.loadingScreen.classList.add('hidden');
            
            // Show main content after a delay
            setTimeout(() => {
                if (this.mainContent) {
                    this.mainContent.classList.add('visible');
                }
                
                // Remove loading screen from DOM after transition
                setTimeout(() => {
                    if (this.loadingScreen && this.loadingScreen.parentNode) {
                        this.loadingScreen.parentNode.removeChild(this.loadingScreen);
                    }
                }, 500);
            }, 200);
        }
    }
}

// Theme Management
class ThemeManager {
    constructor() {
        this.themeToggle = document.querySelector('.theme-switch input');
        this.body = document.body;
        
        this.init();
    }

    init() {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            this.setTheme(savedTheme);
            if (this.themeToggle) {
                this.themeToggle.checked = savedTheme === 'light';
            }
        }

        // Add theme toggle listener
        if (this.themeToggle) {
            this.themeToggle.addEventListener('change', (e) => {
                const theme = e.target.checked ? 'light' : 'dark';
                this.setTheme(theme);
            });
        }
    }

    setTheme(theme) {
        if (theme === 'light') {
            this.body.setAttribute('data-theme', 'light');
        } else {
            this.body.removeAttribute('data-theme');
        }
        
        // Save theme preference
        localStorage.setItem('theme', theme);
    }
}

// Share Functionality
class ShareManager {
    constructor() {
        this.shareButtons = document.querySelectorAll('.share-button, .tile-share-button');
        this.init();
    }

    init() {
        this.shareButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleShare(e.target.closest('.tile') || e.target);
            });
        });
    }

    async handleShare(element) {
        const url = window.location.href;
        const title = document.title || 'DEV AVISHKAR';
        
        // Check if Web Share API is supported
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    url: url
                });
            } catch (err) {
                console.log('Error sharing:', err);
                this.fallbackShare(url);
            }
        } else {
            this.fallbackShare(url);
        }
    }

    fallbackShare(url) {
        // Copy to clipboard as fallback
        if (navigator.clipboard) {
            navigator.clipboard.writeText(url).then(() => {
                this.showShareFeedback('Link copied to clipboard!');
            });
        } else {
            // Older browser fallback
            const textArea = document.createElement('textarea');
            textArea.value = url;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showShareFeedback('Link copied to clipboard!');
        }
    }

    showShareFeedback(message) {
        // Create and show temporary feedback message
        const feedback = document.createElement('div');
        feedback.textContent = message;
        feedback.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--accent-gradient);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            font-size: 14px;
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
        `;
        
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            feedback.style.animation = 'slideOut 0.3s ease-in forwards';
            setTimeout(() => {
                document.body.removeChild(feedback);
            }, 300);
        }, 2000);
    }
}

// Tile Interactions
class TileManager {
    constructor() {
        this.tiles = document.querySelectorAll('.tile');
        this.init();
    }

    init() {
        this.tiles.forEach(tile => {
            // Add click analytics or special handling
            tile.addEventListener('click', (e) => {
                // Don't trigger if clicking share button
                if (e.target.closest('.tile-share-button')) {
                    return;
                }
                
                // Add click effect
                this.addClickEffect(tile);
                
                // Analytics or tracking can be added here
                console.log('Tile clicked:', tile.querySelector('p')?.textContent);
            });

            // Add hover sound effect (optional)
            tile.addEventListener('mouseenter', () => {
                this.addHoverEffect(tile);
            });
        });
    }

    addClickEffect(tile) {
        tile.style.transform = 'scale(0.98) translateY(-2px)';
        setTimeout(() => {
            tile.style.transform = '';
        }, 150);
    }

    addHoverEffect(tile) {
        // Optional: Add subtle sound or additional visual effects
        // This is where you could add audio feedback if desired
    }
}

// Performance Monitor
class PerformanceMonitor {
    constructor() {
        this.startTime = performance.now();
        this.init();
    }

    init() {
        // Monitor loading performance
        window.addEventListener('load', () => {
            const loadTime = performance.now() - this.startTime;
            console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
            
            // Optional: Send analytics data
            this.reportPerformance(loadTime);
        });
    }

    reportPerformance(loadTime) {
        // This is where you could send performance data to analytics
        // For example: Google Analytics, custom analytics endpoint, etc.
        console.log('Performance data:', {
            loadTime: loadTime,
            userAgent: navigator.userAgent,
            timestamp: new Date().toISOString()
        });
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all managers
    new LoaderManager();
    new ThemeManager();
    new ShareManager();
    new TileManager();
    new PerformanceMonitor();
    
    // Add some additional CSS animations for feedback
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

// Export for module usage (optional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        LoaderManager,
        ThemeManager,
        ShareManager,
        TileManager,
        PerformanceMonitor
    };
}