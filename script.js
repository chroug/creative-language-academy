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
  ".section-head, .card, .language, .format, .price, .testimonial, .hero-text, .hero-visual"
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

// Contact form — soumission AJAX vers Formspree
const form = document.querySelector(".contact-form");
if (form) {
  const note = form.querySelector(".form-note");
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalLabel = submitBtn ? submitBtn.textContent : "";

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    if (!name || !email) {
      note.style.color = "#c8553d";
      note.textContent = "Merci de renseigner votre nom et votre email.";
      return;
    }

    // Si l'endpoint Formspree n'a pas encore été configuré, on simule l'envoi
    const action = form.getAttribute("action") || "";
    if (!action || action.includes("YOUR_FORM_ID")) {
      note.style.color = "";
      note.textContent =
        "Merci ! (Démo — connectez Formspree pour recevoir vraiment les messages.)";
      form.reset();
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Envoi en cours…";
    note.style.color = "";
    note.textContent = "";

    try {
      const response = await fetch(action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        note.style.color = "";
        note.textContent =
          "Merci ! Votre demande a bien été envoyée — je reviens vers vous très vite.";
        form.reset();
      } else {
        const data = await response.json().catch(() => ({}));
        note.style.color = "#c8553d";
        note.textContent =
          (data.errors && data.errors.map((er) => er.message).join(", ")) ||
          "Une erreur est survenue. Merci de réessayer ou d'écrire directement à contact@creativelanguageacademy.fr.";
      }
    } catch {
      note.style.color = "#c8553d";
      note.textContent =
        "Connexion impossible. Merci de réessayer ou d'écrire directement à contact@creativelanguageacademy.fr.";
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalLabel;
    }
  });
}
