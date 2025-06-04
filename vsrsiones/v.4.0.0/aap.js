// Theme Toggle Functionality
const themeToggle = document.getElementById("themeToggle");
const toggleSlider = document.getElementById("toggleSlider");
const moonIcon = document.getElementById("moonIcon");
const sunIcon = document.getElementById("sunIcon");
const body = document.body;

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem("theme") || "dark";
if (currentTheme === "light") {
  body.classList.add("light");
  toggleSlider.style.transform = "translateX(32px)";
  moonIcon.classList.add("hidden");
  sunIcon.classList.remove("hidden");
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light");

  if (body.classList.contains("light")) {
    toggleSlider.style.transform = "translateX(32px)";
    moonIcon.classList.add("hidden");
    sunIcon.classList.remove("hidden");
    localStorage.setItem("theme", "light");
  } else {
    toggleSlider.style.transform = "translateX(0px)";
    moonIcon.classList.remove("hidden");
    sunIcon.classList.add("hidden");
    localStorage.setItem("theme", "dark");
  }
});

// Share Functionality
const shareBtn = document.getElementById("shareBtn");
const shareLinkBtns = document.querySelectorAll(".share-link-btn");

// Main share button - shares the current page
shareBtn.addEventListener("click", async () => {
  try {
    if (navigator.share) {
      await navigator.share({
        title: "Avishkar - The Developer",
        text: "Check out Avishkar's profile and links!",
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      await navigator.clipboard.writeText(window.location.href);
      showNotification("Page link copied to clipboard!");
    }
  } catch (error) {
    // Fallback if clipboard API also fails
    console.log("Share failed:", error);
    showNotification("Unable to share at this time");
  }
});

// Individual link share buttons
shareLinkBtns.forEach((btn) => {
  btn.addEventListener("click", async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const url = btn.getAttribute("data-url");
    const linkName = btn.closest("a").textContent.trim();

    try {
      if (navigator.share) {
        await navigator.share({
          title: `Avishkar's ${linkName}`,
          url: url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        showNotification(`${linkName} link copied to clipboard!`);
      }
    } catch (error) {
      console.log("Share failed:", error);
      showNotification("Unable to share link");
    }
  });
});

// Notification function
function showNotification(message) {
  // Create notification element
  const notification = document.createElement("div");
  notification.className =
    "fixed top-4 left-1/2 transform -translate-x-1/2 bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300";
  notification.textContent = message;

  // Add to page
  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.opacity = "1";
    notification.style.transform = "translate(-50%, 0)";
  }, 100);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.opacity = "0";
    notification.style.transform = "translate(-50%, -20px)";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Add some interactive effects
document.addEventListener("DOMContentLoaded", () => {
  // Add subtle parallax effect to background elements
  document.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    const floatingElements = document.querySelectorAll(".animate-float");
    floatingElements.forEach((el, index) => {
      const speed = (index + 1) * 0.5;
      const x = (mouseX - 0.5) * speed;
      const y = (mouseY - 0.5) * speed;
      el.style.transform = `translate(${x}px, ${y}px)`;
    });
  });

  // Add entrance animation
  const profileCard = document.querySelector(".bg-white\\/10");
  profileCard.style.opacity = "0";
  profileCard.style.transform = "translateY(30px)";

  setTimeout(() => {
    profileCard.style.transition = "all 0.8s ease-out";
    profileCard.style.opacity = "1";
    profileCard.style.transform = "translateY(0)";
  }, 200);

  // Stagger animation for links
  const links = document.querySelectorAll(".space-y-4 > a");
  links.forEach((link, index) => {
    link.style.opacity = "0";
    link.style.transform = "translateX(-20px)";

    setTimeout(() => {
      link.style.transition = "all 0.5s ease-out";
      link.style.opacity = "1";
      link.style.transform = "translateX(0)";
    }, 500 + index * 100);
  });
});

// Add light mode styles
const lightModeStyles = `
            .light {
                background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f8fafc 100%) !important;
            }
            .light .bg-white\\/10 {
                background: rgba(255, 255, 255, 0.8) !important;
                border-color: rgba(0, 0, 0, 0.1) !important;
            }
            .light .bg-white\\/5 {
                background: rgba(255, 255, 255, 0.6) !important;
            }
            .light .hover\\:bg-white\\/10:hover {
                background: rgba(255, 255, 255, 0.9) !important;
            }
            .light .text-white {
                color: #1a202c !important;
            }
            .light .text-gray-300 {
                color: #4a5568 !important;
            }
            .light .border-white\\/10 {
                border-color: rgba(0, 0, 0, 0.1) !important;
            }
            .light .hover\\:border-white\\/20:hover {
                border-color: rgba(0, 0, 0, 0.2) !important;
            }
            .light #themeToggle {
                background-color: #4299e1 !important;
            }
            .light .bg-gray-700 {
                background: linear-gradient(135deg, #2d3748, #1a202c) !important;
            }
        `;

// Inject light mode styles
const styleSheet = document.createElement("style");
styleSheet.textContent = lightModeStyles;
document.head.appendChild(styleSheet);

// Loader Animation Script
class LoaderManager {
  constructor() {
    this.loadingScreen = document.getElementById("loadingScreen");
    this.loadingText = document.querySelector(".loading-text");
    this.mainContent = document.querySelector(".main-content");
    this.currentStep = 0;
    this.loadingSteps = [
      "Building Your Link Universe...",
      "Fetching Featured Links...",
      "Loading Social Media Portals...",
      "Connecting to Avishkar's Services...",
      "Customizing Your Experience...",
      "Welcome to DEV AVISHKAR Link Hub!",
    ];

    this.init();
  }

  init() {
    // Set initial loading text
    if (this.loadingText) {
      this.loadingText.textContent = this.loadingSteps[0];
      this.loadingText.style.opacity = "0.8";
    }

    // Start the loading sequence
    this.startLoadingSequence();

    // Handle page load completion
    window.addEventListener("load", () => {
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
      this.loadingText.style.opacity = "0";

      setTimeout(() => {
        // Update text and fade in
        this.loadingText.textContent = text;
        this.loadingText.style.opacity = "0.8";
      }, 150);
    }
  }

  animateProgress() {
    // The progress animation is handled by CSS
    // This method can be extended for more complex progress tracking
    const progressFill = document.querySelector(".progress-fill");
    if (progressFill) {
      progressFill.style.animation = "progressFill 4s ease-in-out forwards";
    }
  }

  handlePageLoad() {
    // Additional logic when page is fully loaded
    // Can be used to ensure all resources are ready
    console.log("Page fully loaded");
  }

  completeLoading() {
    if (
      this.loadingScreen &&
      !this.loadingScreen.classList.contains("hidden")
    ) {
      // Fade out loading screen
      this.loadingScreen.classList.add("hidden");

      // Show main content after a delay
      setTimeout(() => {
        if (this.mainContent) {
          this.mainContent.classList.add("visible");
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
    this.themeToggle = document.querySelector(".theme-switch input");
    this.body = document.body;

    this.init();
  }

  init() {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      this.setTheme(savedTheme);
      if (this.themeToggle) {
        this.themeToggle.checked = savedTheme === "light";
      }
    }

    // Add theme toggle listener
    if (this.themeToggle) {
      this.themeToggle.addEventListener("change", (e) => {
        const theme = e.target.checked ? "light" : "dark";
        this.setTheme(theme);
      });
    }
  }

  setTheme(theme) {
    if (theme === "light") {
      this.body.setAttribute("data-theme", "light");
    } else {
      this.body.removeAttribute("data-theme");
    }

    // Save theme preference
    localStorage.setItem("theme", theme);
  }
}

// Share Functionality
class ShareManager {
  constructor() {
    this.shareButtons = document.querySelectorAll(
      ".share-button, .tile-share-button"
    );
    this.init();
  }

  init() {
    this.shareButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        this.handleShare(e.target.closest(".tile") || e.target);
      });
    });
  }

  async handleShare(element) {
    const url = window.location.href;
    const title = document.title || "DEV AVISHKAR";

    // Check if Web Share API is supported
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: url,
        });
      } catch (err) {
        console.log("Error sharing:", err);
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
        this.showShareFeedback("Link copied to clipboard!");
      });
    } else {
      // Older browser fallback
      const textArea = document.createElement("textarea");
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      this.showShareFeedback("Link copied to clipboard!");
    }
  }

  showShareFeedback(message) {
    // Create and show temporary feedback message
    const feedback = document.createElement("div");
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
      feedback.style.animation = "slideOut 0.3s ease-in forwards";
      setTimeout(() => {
        document.body.removeChild(feedback);
      }, 300);
    }, 2000);
  }
}

// Tile Interactions
class TileManager {
  constructor() {
    this.tiles = document.querySelectorAll(".tile");
    this.init();
  }

  init() {
    this.tiles.forEach((tile) => {
      // Add click analytics or special handling
      tile.addEventListener("click", (e) => {
        // Don't trigger if clicking share button
        if (e.target.closest(".tile-share-button")) {
          return;
        }

        // Add click effect
        this.addClickEffect(tile);

        // Analytics or tracking can be added here
        console.log("Tile clicked:", tile.querySelector("p")?.textContent);
      });

      // Add hover sound effect (optional)
      tile.addEventListener("mouseenter", () => {
        this.addHoverEffect(tile);
      });
    });
  }

  addClickEffect(tile) {
    tile.style.transform = "scale(0.98) translateY(-2px)";
    setTimeout(() => {
      tile.style.transform = "";
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
    window.addEventListener("load", () => {
      const loadTime = performance.now() - this.startTime;
      console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);

      // Optional: Send analytics data
      this.reportPerformance(loadTime);
    });
  }

  reportPerformance(loadTime) {
    // This is where you could send performance data to analytics
    // For example: Google Analytics, custom analytics endpoint, etc.
    console.log("Performance data:", {
      loadTime: loadTime,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
    });
  }
}

// Initialize everything when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all managers
  new LoaderManager();
  new ThemeManager();
  new ShareManager();
  new TileManager();
  new PerformanceMonitor();

  // Add some additional CSS animations for feedback
  // const style = document.createElement('style');
  // style.textContent = `
  //     @keyframes slideIn {
  //         from {
  //             transform: translateX(100%);
  //             opacity: 0;
  //         }
  //         to {
  //             transform: translateX(0);
  //             opacity: 1;
  //         }
  //     }

  //     @keyframes slideOut {
  //         from {
  //             transform: translateX(0);
  //             opacity: 1;
  //         }
  //         to {
  //             transform: translateX(100%);
  //             opacity: 0;
  //         }
  //     }
  // `;
  // document.head.appendChild(style);
});

// Export for module usage (optional)
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    LoaderManager,
    ThemeManager,
    ShareManager,
    TileManager,
    PerformanceMonitor,
  };
}
