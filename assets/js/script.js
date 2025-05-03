// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", () => {
  // Quick Access Dropdown
  const quickAccessBtn = document.querySelector(".quick-access-btn");
  const quickAccessDropdown = document.querySelector(".quick-access-dropdown");

  if (quickAccessBtn) {
    quickAccessBtn.addEventListener("click", () => {
      quickAccessDropdown.classList.toggle("active");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (!quickAccessBtn.contains(e.target)) {
        quickAccessDropdown.classList.remove("active");
      }
    });
  }

  // Form validation and email submission
  const admissionsForm = document.getElementById("admissions-form");
  const contactForm = document.getElementById("contact-form");

  function validateForm(form) {
    if (!form) return true;
    const fields = form.querySelectorAll("input, textarea, select");
    for (let field of fields) {
      if (field.required && !field.value) {
        alert(`${field.name || field.id} is required`);
        field.focus();
        return false;
      }
    }
    return true;
  }

  if (admissionsForm) {
    admissionsForm.addEventListener("submit", (e) => {
      e.preventDefault(); // Prevent default form submission
      if (validateForm(admissionsForm)) {
        // Collect form data
        const formData = new FormData(admissionsForm);
        const data = {};
        formData.forEach((value, key) => {
          data[key] = value;
        });

        // Create email body
        const emailBody = `
          Admission Application Details:
          Full Name: ${data.name}
          Date of Birth: ${data.dob}
          Gender: ${data.gender}
          Parent/Guardian Name: ${data['parent-name']}
          Email Address: ${data.email || 'Not provided'}
          Phone Number: ${data.phone}
          Address: ${data.address}
          Class Applying For: ${data.class}
          Previous School: ${data['previous-school'] || 'Not provided'}
          Additional Information: ${data['additional-info'] || 'Not provided'}
        `.trim();

        // Encode email components
        const subject = encodeURIComponent("Admission Application - Morning Bells School");
        const body = encodeURIComponent(emailBody);
        const recipient = "admissions@morningbellsschool.in";

        // Create mailto URL
        const mailtoUrl = `mailto:${recipient}?subject=${subject}&body=${body}`;

        // Open email client
        window.location.href = mailtoUrl;

        // Show success message
        alert("Form submitted successfully! Your email client has been opened to send the application details.");
      }
    });
  }

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      if (!validateForm(contactForm)) {
        e.preventDefault();
      } else {
        alert(
          "Your message has been sent successfully! We will get back to you soon."
        );
      }
    });
  }

  // Mobile Menu Toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("nav");

  if (menuToggle) {
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent document click from immediately closing it
      nav.classList.toggle("active");
      menuToggle.classList.toggle("active");
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        nav.classList.contains("active") &&
        !nav.contains(e.target) &&
        !menuToggle.contains(e.target)
      ) {
        nav.classList.remove("active");
        menuToggle.classList.remove("active");
      }
    });

    // Prevent clicks inside nav from closing it
    nav.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }

  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href !== "#") {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 100,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // Stats Counter Animation (using Intersection Observer below)
  const statsSection = document.querySelector(".stats");
  const counters = document.querySelectorAll(".stat-number"); // Keep counters selector

  // Image lazy loading for gallery
  if ("loading" in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach((img) => {
      img.src = img.dataset.src;
    });
  } else {
    // Fallback for browsers that don't support native lazy loading
    const lazyImageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          observer.unobserve(lazyImage);
        }
      });
    });

    const lazyImages = document.querySelectorAll(".lazy-image");
    lazyImages.forEach((image) => {
      lazyImageObserver.observe(image);
    });
  }

  // Accordion functionality for FAQ sections
  const accordionItems = document.querySelectorAll(".accordion-item");
  if (accordionItems.length > 0) {
    accordionItems.forEach((item) => {
      const header = item.querySelector(".accordion-header");
      header.addEventListener("click", () => {
        item.classList.toggle("active");
      });
    });
  }

  // Testimonial slider
  const testimonialSlider = document.querySelector(".testimonial-slider");
  if (testimonialSlider) {
    const slides = testamentSlider.querySelectorAll(".testimonial");
    const dotsContainer = testimonialSlider.querySelector(".slider-dots");
    let currentSlide = 0;

    // Create dots
    slides.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll(".dot");

    function goToSlide(n) {
      slides[currentSlide].classList.remove("active");
      dots[currentSlide].classList.remove("active");

      currentSlide = (n + slides.length) % slides.length;

      slides[currentSlide].classList.add("active");
      dots[currentSlide].classList.add("active");
    }

    function nextSlide() {
      goToSlide(currentSlide + 1);
    }

    // Auto slide every 5 seconds
    setInterval(nextSlide, 5000);
  }

  // Promo banner close functionality
  const promoBanner = document.querySelector(".promo-banner");
  if (promoBanner) {
    document.querySelector(".close-banner").addEventListener("click", () => {
      promoBanner.style.display = "none";
    });
  }

  // Admission Flyer Modal functionality
  const modal = document.querySelector(".modal-overlay");
  const closeModal = document.querySelector(".close-modal");

  // Show modal when page loads (after a small delay)
  window.addEventListener("load", () => {
    setTimeout(() => {
      modal.classList.add("active");
    }, 1000); // 1 second delay
  });

  // Close modal when clicking the close button or outside the modal
  closeModal.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });

  // Function to animate stats (moved from observer callback for clarity)
  function animateStats() {
    counters.forEach((counter) => {
      const target = +counter.getAttribute("data-count");
      const duration = 2000; // 2 seconds
      const increment = target / (duration / 16); // 60fps

      let current = 0;
      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counter.textContent = Math.ceil(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };
      updateCounter();
    });
  }

  // Start stats animation when section is in view
  if (statsSection) {
    let animationStarted = false; // Flag to ensure animation runs only once
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Check if intersecting and animation hasn't started
          if (entry.isIntersecting && !animationStarted) {
            animateStats();
            animationStarted = true; // Set flag
            observer.unobserve(entry.target); // Stop observing once animated
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of the element is visible
      }
    );
    observer.observe(statsSection);
  }

  // Highlight active page in navigation
  const currentLocation = window.location.pathname;
  const navLinks = document.querySelectorAll("header nav ul li a");

  navLinks.forEach((link) => {
    // Extract just the filename from both the current location and link
    const currentPage = currentLocation.split("/").pop();
    const linkPage = link.getAttribute("href");

    // Handle the special case for home page
    if (
      (currentPage === "" || currentPage === "index.html") &&
      (linkPage === "index.html" || linkPage === "/")
    ) {
      link.classList.add("active");
    }
    // For other pages, direct comparison should work
    else if (currentPage === linkPage) {
      link.classList.add("active");
    }
    // Also check if it's a match without .html extension
    else if (
      currentPage &&
      linkPage &&
      currentPage.replace(".html", "") === linkPage.replace(".html", "")
    ) {
      link.classList.add("active");
    }
  });
});
