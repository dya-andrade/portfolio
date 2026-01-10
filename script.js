// Animações
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => e.isIntersecting && e.target.classList.add("show"));
});
document.querySelectorAll(".fade").forEach(el => obs.observe(el));

// EmailJS
emailjs.init("SUA_PUBLIC_KEY");

document.getElementById("contact-form").addEventListener("submit", e => {
  e.preventDefault();

  emailjs.send("SEU_SERVICE_ID", "SEU_TEMPLATE_ID", {
    from_name: e.target.name.value,
    from_email: e.target.email.value,
    message: e.target.message.value
  }).then(() => {
    alert("Mensagem enviada 💜");
    e.target.reset();
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
