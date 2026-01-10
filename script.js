// Animações
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => e.isIntersecting && e.target.classList.add("show"));
});
document.querySelectorAll(".fade").forEach(el => obs.observe(el));

// EmailJS
document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     EMAILJS INIT
  ========================== */
  emailjs.init("Lvz-J0sTK9qki7vf8");


  /* =========================
     FORM + ELEMENTOS
  ========================== */
  const form = document.getElementById("contact-form");
  const feedback = form.querySelector(".form-feedback");
  const textarea = form.message;
  const counter = form.querySelector(".char-counter");
  const submitBtn = form.querySelector("button");

  const MIN_NAME = 3;
  const MIN_MESSAGE = 10;


  /* =========================
     TEXTAREA COUNTER
  ========================== */
  const updateCounter = () => {
    const length = textarea.value.length;
    counter.textContent = `${length} / ${MIN_MESSAGE}`;

    if (length < MIN_MESSAGE) {
      counter.style.color = "#ff6b6b";
    } else {
      counter.style.color = "#25d366";
    }
  };

  textarea.addEventListener("input", updateCounter);
  updateCounter();

  /* =========================
     FORM SUBMIT
  ========================== */
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    feedback.textContent = "";
    feedback.style.color = "";

    const name = form.from_name.value.trim();
    const email = form.from_email.value.trim();
    const message = textarea.value.trim();

    if (name.length < MIN_NAME) {
      feedback.textContent = "O nome precisa ter pelo menos 3 caracteres.";
      form.from_name.focus();
      return;
    }

    if (!email || !email.includes("@")) {
      feedback.textContent = "Informe um e-mail válido.";
      form.from_email.focus();
      return;
    }

    if (message.length < MIN_MESSAGE) {
      feedback.textContent = "A mensagem precisa ter pelo menos 10 caracteres.";
      textarea.focus();
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Enviando…";

    emailjs.send(
      "service_a4halu5",
      "template_g9r13vf",
      {
        from_name: name,
        from_email: email,
        message: message
      }
    )
    .then(() => {
      feedback.style.color = "#25d366";
      feedback.textContent = "Mensagem enviada com sucesso 💜";
      form.reset();
      updateCounter();
    })
    .catch((error) => {
      console.error("EmailJS error:", error);
      feedback.textContent = "Erro ao enviar mensagem. Tente novamente.";
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = "Enviar mensagem";
      validateForm();
    });
  });

});

// Scroll horizontal com mouse
const projects = document.querySelector('.projects-horizontal');

projects.addEventListener('wheel', (e) => {
  if (e.deltaY === 0) return;
  e.preventDefault();
  projects.scrollBy({
    left: e.deltaY,
    behavior: 'smooth'
  });
}, { passive: false });

const scrollContainer = document.querySelector('.projects-horizontal');
const btnLeft = document.querySelector('.scroll-btn.left');
const btnRight = document.querySelector('.scroll-btn.right');

btnLeft.addEventListener('click', () => {
  scrollContainer.scrollBy({
    left: -460,
    behavior: 'smooth'
  });
});

btnRight.addEventListener('click', () => {
  scrollContainer.scrollBy({
    left: 460,
    behavior: 'smooth'
  });
});

// Lightbox de imagens
document.addEventListener('DOMContentLoaded', () => {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');

  if (!lightbox || !lightboxImg) return;

  document.querySelectorAll('.expandable').forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightbox.classList.add('show');
    });
  });

  lightbox.addEventListener('click', () => {
    lightbox.classList.remove('show');
    lightboxImg.src = '';
  });
});
