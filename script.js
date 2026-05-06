// Year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Sticky header shadow
const header = document.querySelector(".site-header");
const onScroll = () => {
  header.classList.toggle("scrolled", window.scrollY > 4);
};
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// Mobile nav toggle
const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");
toggle.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});
links.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  })
);

// Reveal on scroll
const revealTargets = document.querySelectorAll(
  ".section-head, .card, .language, .format, .testimonial, .hero-text, .hero-visual"
);
revealTargets.forEach((el) => el.classList.add("reveal"));

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
revealTargets.forEach((el) => io.observe(el));

// Contact form (front-only — connect to a backend / mailto / Formspree later)
const form = document.querySelector(".contact-form");
const note = form.querySelector(".form-note");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  if (!name || !email) {
    note.style.color = "#c8553d";
    note.textContent = "Merci de renseigner votre nom et votre email.";
    return;
  }
  note.style.color = "";
  note.textContent = "Merci ! Votre demande a bien été enregistrée — je reviens vers vous très vite.";
  form.reset();
});
