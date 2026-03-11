const particlesContainer = document.querySelector(".particles");
const navLinks = document.querySelectorAll(".side-nav a");
const cursorGlow = document.querySelector(".cursor-glow");
const contactToggle = document.querySelector(".contact-toggle");
const contactList = document.querySelector(".contact-list");

// Subtle floating particles for atmosphere
if (particlesContainer) {
  const particleCount = 48;
  for (let i = 0; i < particleCount; i += 1) {
    const particle = document.createElement("span");
    particle.className = "particle";
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 8}s`;
    particle.style.animationDuration = `${10 + Math.random() * 10}s`;
    particlesContainer.appendChild(particle);
  }
}

// Reveal-on-scroll animation
const revealTargets = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealTargets.forEach((target) => revealObserver.observe(target));

// Toggle contact list in sidebar
if (contactToggle && contactList) {
  contactToggle.addEventListener("click", () => {
    const isOpen = contactList.classList.toggle("open");
    contactToggle.textContent = isOpen ? "Hide Contacts" : "Show Contacts";
  });
}

// Hero image: show placeholder until the image is available
const profileImg = document.querySelector(".profile-placeholder img");
if (profileImg) {
  const placeholder = profileImg.closest(".profile-placeholder");
  const applyLoadedState = () => {
    if (profileImg.complete && profileImg.naturalWidth > 0) {
      placeholder.classList.add("has-image");
    }
  };
  profileImg.addEventListener("load", applyLoadedState);
  profileImg.addEventListener("error", () =>
    placeholder.classList.remove("has-image")
  );
  applyLoadedState();
}

// Cursor glow for a subtle, modern hover feel
if (cursorGlow) {
  let glowVisible = false;
  window.addEventListener("mousemove", (event) => {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
    if (!glowVisible) {
      glowVisible = true;
      cursorGlow.style.opacity = "1";
    }
  });

  window.addEventListener("mouseleave", () => {
    glowVisible = false;
    cursorGlow.style.opacity = "0";
  });
}

// Active nav link based on scroll position
const sections = document.querySelectorAll("section[id]");
window.addEventListener("scroll", () => {
  let currentId = "";
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 140 && rect.bottom >= 140) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    link.classList.toggle("active", href === `#${currentId}`);
  });
});
