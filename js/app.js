/* ==========================================
   MOBILE NAVIGATION
========================================== */

const hamburger = document.querySelector(".hamburger");
const navbar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".nav-links a");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    navbar.classList.toggle("active");
    hamburger.classList.toggle("active");
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navbar.classList.remove("active");
    hamburger.classList.remove("active");
  });
});

/* ==========================================
   STICKY HEADER SHADOW
========================================== */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.style.boxShadow = "0 10px 30px rgba(0,0,0,0.08)";
  } else {
    header.style.boxShadow = "0 2px 15px rgba(0,0,0,0.05)";
  }
});

/* ==========================================
   COUNTER ANIMATION
========================================== */

const counters = document.querySelectorAll(".counter");

const startCounter = (counter) => {
  const target = parseInt(counter.getAttribute("data-target"));

  let current = 0;

  const increment = target / 100;

  const updateCounter = () => {
    current += increment;

    if (current < target) {
      counter.innerText = Math.floor(current);

      requestAnimationFrame(updateCounter);
    } else {
      counter.innerText = target;
    }
  };

  updateCounter();
};

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        startCounter(entry.target);

        counterObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.5,
  },
);

counters.forEach((counter) => {
  counterObserver.observe(counter);
});

/* ==========================================
   SCROLL REVEAL ANIMATION
========================================== */

const revealElements = document.querySelectorAll(
  ".service-card, .process-card, .testimonial-card, .stat-box",
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");

        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  {
    threshold: 0.2,
  },
);

revealElements.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(40px)";
  el.style.transition = "0.8s ease";

  revealObserver.observe(el);
});

/* ==========================================
   ACTIVE MENU HIGHLIGHT
========================================== */

const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;

    const sectionHeight = section.clientHeight;

    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

/* ==========================================
   SMOOTH SCROLL
========================================== */

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));

    if (!target) return;

    e.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

/* ==========================================
   CONTACT FORM VALIDATION
========================================== */

const form = document.getElementById("contactForm");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputs = form.querySelectorAll("input, textarea");

    let valid = true;

    inputs.forEach((input) => {
      if (input.value.trim() === "") {
        valid = false;

        input.style.borderColor = "red";
      } else {
        input.style.borderColor = "#e2e8f0";
      }
    });

    const emailField = form.querySelector('input[type="email"]');

    if (emailField && !validateEmail(emailField.value)) {
      valid = false;

      emailField.style.borderColor = "red";
    }

    if (valid) {
      alert("Thank you! Your message has been sent successfully.");

      form.reset();
    } else {
      alert("Please fill all fields correctly.");
    }
  });
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ==========================================
   SCROLL TO TOP BUTTON
========================================== */

const scrollBtn = document.createElement("div");

scrollBtn.classList.add("scroll-top");

scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';

document.body.appendChild(scrollBtn);

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    scrollBtn.classList.add("active");
  } else {
    scrollBtn.classList.remove("active");
  }
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

/* ==========================================
   ACTIVE LINK STYLE
========================================== */

const style = document.createElement("style");

style.innerHTML = `
.nav-links a.active{
    color: var(--primary);
    font-weight:600;
}
`;

document.head.appendChild(style);

/* ==========================================
   IMAGE LAZY LOADING
========================================== */

const images = document.querySelectorAll("img");

const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;

      img.classList.add("loaded");

      observer.unobserve(img);
    }
  });
});

images.forEach((img) => {
  imageObserver.observe(img);
});

/* ==========================================
   PRELOADER (OPTIONAL)
========================================== */

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

/* ==========================================
   CONSOLE MESSAGE
========================================== */

console.log(`
==================================
 TechNova Website Loaded
 Production Mode Active
==================================
`);
