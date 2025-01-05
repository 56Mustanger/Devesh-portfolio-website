// scroll-optimized.js

// Initialize LocomotiveScroll with optimized settings
document.addEventListener("DOMContentLoaded", function () {
    const scroller = new LocomotiveScroll({
      el: document.querySelector("[data-scroll-container]"),
      smooth: true,
      inertia: 0.8, // Reduced inertia for smoother performance
      smartphone: {
        smooth: false, // Disable smooth scrolling on mobile for better performance
      },
      tablet: {
        smooth: true, // Enable smooth scrolling for tablets
      },
    });
  
    // Lazy load images using IntersectionObserver
    const lazyImages = document.querySelectorAll("img[data-lazy]");
    if ("IntersectionObserver" in window) {
      const lazyImageObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target;
              img.src = img.dataset.src; // Load the image
              img.removeAttribute("data-lazy"); // Clean up
              lazyImageObserver.unobserve(img);
            }
          });
        },
        { rootMargin: "100px 0px", threshold: 0.1 }
      );
  
      lazyImages.forEach((img) => {
        lazyImageObserver.observe(img);
      });
    } else {
      // Fallback for browsers without IntersectionObserver
      lazyImages.forEach((img) => {
        img.src = img.dataset.src;
      });
    }
  
    // Reduce heavy computations by throttling scroll events
    let isTicking = false;
    scroller.on("scroll", () => {
      if (!isTicking) {
        window.requestAnimationFrame(() => {
          // Perform lightweight tasks here, like updating UI
          isTicking = false;
        });
        isTicking = true;
      }
    });
  
    // Resize observer to update LocomotiveScroll on element changes
    const resizeObserver = new ResizeObserver(() => {
      scroller.update();
    });
    resizeObserver.observe(document.querySelector("[data-scroll-container]"));
  
    // Handle dynamic content updates (if needed)
    const mutationObserver = new MutationObserver(() => {
      scroller.update();
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });
  
    // Cleanup observers when necessary
    window.addEventListener("beforeunload", () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      scroller.destroy();
    });
  });
  