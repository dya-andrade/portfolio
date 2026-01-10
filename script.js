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

// =========================
// CAROUSEL MODAL (PROJETOS)
// =========================
const modal = document.getElementById("carousel-modal");
const track = modal.querySelector(".carousel-track");
const btnPrev = modal.querySelector(".carousel-nav.left");
const btnNext = modal.querySelector(".carousel-nav.right");
const btnClose = modal.querySelector(".carousel-close");

let currentIndex = 0;
let images = [];

// abre o carrossel
function openCarousel(imgElement) {
  const project = imgElement.closest(".project-media");
  images = Array.from(project.querySelectorAll("img"));

  currentIndex = images.indexOf(imgElement);

  renderCarousel();
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

// renderiza imagem atual
function renderCarousel() {
  track.innerHTML = "";

  const img = document.createElement("img");
  img.src = images[currentIndex].src;

  track.appendChild(img);
}

// navegação
btnPrev.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  renderCarousel();
});

btnNext.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  renderCarousel();
});

// fechar
btnClose.addEventListener("click", closeCarousel);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeCarousel();
});

function closeCarousel() {
  modal.classList.remove("active");
  track.innerHTML = "";
  document.body.style.overflow = "";
}

// bind nas imagens
document.querySelectorAll(".project-media img").forEach(img => {
  img.style.cursor = "zoom-in";
  img.addEventListener("click", () => openCarousel(img));
});

// Scroll horizontal com mouse — BLOGS
const blogs = document.querySelector('.blogs-horizontal');

if (blogs) {
  blogs.addEventListener('wheel', (e) => {
    if (e.deltaY === 0) return;
    e.preventDefault();
    blogs.scrollBy({
      left: e.deltaY,
      behavior: 'smooth'
    });
  }, { passive: false });
}

// Modal de blogs
document.addEventListener("DOMContentLoaded", () => {

  const blogs = {
    "system-design": {
      title: "Os 7 padrões que aparecem em quase toda entrevista de System Design",
      content: `
<img src="blogs/system-design.jpg" alt="System Design" class="pattern-image" 
  onclick="openImage(this.src)"/>

<section class="readme-blog">
  <p class="intro">
    Depois de estudar e praticar, percebi que a maioria das perguntas de System Design
    gira sempre em torno dos mesmos desafios — e, consequentemente, das mesmas soluções.
  </p>

  <div class="patterns">
    <div class="pattern">
      <h3>1. Escalar leituras</h3>
      <p>
        Quando o sistema recebe muitas requisições de leitura, o banco vira gargalo.
        A solução é reduzir acessos diretos usando <strong>cache</strong>, <strong>réplicas de leitura</strong>
        e <strong>CDNs</strong>.
      </p>
      <span>Cache · Réplicas · CDN</span>
    </div>

    <div class="pattern">
      <h3>2. Escalar escritas</h3>
      <p>
        Escritas são mais difíceis de escalar que leituras. Para lidar com alto volume,
        usamos <strong>sharding</strong> para distribuir dados, <strong>filas</strong> para absorver picos
        e <strong>batching</strong> para reduzir overhead.
      </p>
      <span>Sharding · Filas · Batching</span>
    </div>

    <div class="pattern">
      <h3>3. Tarefas demoradas</h3>
      <p>
        Processos longos não devem bloquear requisições do usuário.
        A saída é delegar o trabalho para <strong>workers assíncronos</strong>,
        melhorando performance e experiência.
      </p>
      <span>Workers · Background Jobs</span>
    </div>

    <div class="pattern">
      <h3>4. Atualizações em tempo real</h3>
      <p>
        Quando o sistema precisa reagir instantaneamente, polling não escala.
        Entram em cena <strong>WebSockets</strong> e arquiteturas <strong>pub/sub</strong>
        para comunicação eficiente.
      </p>
      <span>WebSockets · Pub/Sub</span>
    </div>

    <div class="pattern">
      <h3>5. Arquivos grandes</h3>
      <p>
        Uploads grandes não devem passar pela aplicação.
        Usamos <strong>presigned URLs</strong> e <strong>upload multipart</strong>
        para transferir arquivos direto para o storage.
      </p>
      <span>Presigned URLs · Multipart Upload</span>
    </div>

    <div class="pattern">
      <h3>6. Concorrência</h3>
      <p>
        Vários usuários acessando o mesmo recurso ao mesmo tempo geram inconsistência.
        A solução envolve <strong>locks</strong>, <strong>reservations</strong>
        e controle de acesso concorrente.
      </p>
      <span>Locks · Reservations</span>
    </div>

    <div class="pattern">
      <h3>7. Fluxos multi-etapa</h3>
      <p>
        Processos longos e distribuídos não podem falhar no meio.
        Padrões como <strong>sagas</strong> e <strong>workflows</strong>
        garantem consistência e recuperação.
      </p>
      <span>Sagas · Workflows</span>
    </div>
  </div>

  <h3>90% das perguntas são combinações desses padrões</h3>

  <ul class="examples">
    <li><strong>Design WhatsApp</strong> → padrões 2, 4 e 5</li>
    <li><strong>Design Uber</strong> → padrões 2, 4, 6 e 7</li>
    <li><strong>Design Instagram</strong> → padrões 1, 2, 4 e 5</li>
  </ul>

  <p class="closing">
    A pergunta muda, o domínio muda, mas os problemas fundamentais —
    e as soluções — continuam sendo os mesmos.
  </p>

  <div class="credits">
  <p>
    Conteúdo inspirado no artigo original publicado por
    <a href="https://newsletter.nagringa.dev/p/padroes-system-design-entrevistas"
       target="_blank"
       rel="noopener noreferrer">
      Nagringa Newsletter
    </a>.
    Todos os créditos ao autor.
  </p>
</div>
</section>
`
    },

    "idempotencia": {
      title: "Lock e Idempotência: como evitar saldo errado em sistemas financeiros",
      content: `
<section class="readme-blog">
  <p class="intro">
    “Como você garante que dois PIX de R$ 100,00 chegando ao mesmo tempo
    não resultem em um saldo errado, sem travar o banco de dados inteiro?”
  </p>

  <p>
    Essa pergunta aparece com frequência em entrevistas de System Design
    para Fintechs — e a resposta errada costuma eliminar candidatos experientes.
  </p>

  <div class="warning">
    <h3>A resposta comum (e perigosa)</h3>
    <pre class="code-block danger"><code class="language-java">synchronized
Serializable</code></pre>

    <p>
      À primeira vista parece correto. Na prática, isso quebra sistemas
      distribuídos e não escala.
    </p>
  </div>

  <h2>Por que isso te reprova em uma Fintech de alta escala</h2>

  <ul class="reasons">
    <li>
      <strong>synchronized</strong> só funciona dentro de uma única instância.
      Em um cluster Kubernetes com múltiplos pods, você cria uma
      <em>race condition distribuída</em>.
    </li>
    <li>
      <strong>Serializable</strong> destrói a performance. O banco vira gargalo,
      o throughput despenca e o sistema para sob carga alta.
    </li>
  </ul>

  <h2>O que um Engineering Specialist responde</h2>

  <p>
    A solução real passa por uma combinação de
    <strong>estratégias de locking</strong> e <strong>idempotência</strong>,
    aplicadas de acordo com o nível de risco e contenção.
  </p>

  <div class="patterns">

    <div class="pattern">
      <h3>Optimistic Locking</h3>
      <p>
        Ideal quando há baixa contenção. O sistema assume que conflitos são raros
        e valida se o dado foi alterado antes de persistir.
      </p>

      <pre><code class="language-java">
@Version
private Long version;
      </code></pre>

      <span>JPA · Hibernate · Baixa contenção</span>
    </div>

    <div class="pattern">
      <h3>Pessimistic Locking</h3>
      <p>
        Bloqueia apenas a linha do registro durante a transação,
        garantindo consistência total em operações críticas.
      </p>

      <pre><code class="language-sql">
SELECT * FROM accounts
WHERE id = ?
FOR UPDATE;
      </code></pre>

      <span>PostgreSQL · Oracle · Alta criticidade</span>
    </div>

    <div class="pattern">
      <h3>Distributed Lock</h3>
      <p>
        Quando a regra de negócio envolve múltiplos serviços,
        um lock distribuído garante exclusividade sobre o recurso.
      </p>

      <pre><code class="language-bash">
SETNX account:123 LOCKED
EXPIRE account:123 30
      </code></pre>

      <span>Redis · Redlock · Microsserviços</span>
    </div>

    <div class="pattern">
      <h3>Idempotency Key</h3>
      <p>
        Essencial em pagamentos digitais. Garante que reprocessamentos,
        retries ou reenvios do Kafka não gerem efeitos duplicados.
      </p>

      <pre><code class="language-http">
Idempotency-Key: 9f8a7d6c-1234
      </code></pre>

      <span>Pagamentos · Kafka · APIs REST</span>
    </div>

  </div>

  <div class="highlight">
    <p>
      Dominar a teoria é fácil. O difícil é saber
      <strong>qual técnica aplicar</strong> para manter a
      <strong>escalabilidade sem perder um centavo do cliente</strong>.
    </p>
  </div>

<div class="credits">
  <p>
    Referência:
    <a href="https://www.linkedin.com/posts/daniellimafintech_backend-java-fintech-activity-7410361667722657793-kOYf?utm_source=share&utm_medium=member_desktop&rcm=ACoAACK-RtsBfNQmrxfA79frVlRLY0SKT2L9f6M"
       target="_blank"
       rel="noopener noreferrer">
      Como garantir que dois PIX simultâneos não gerem saldo errado?
    </a>
  </p>
</div>

</section>
`
    },

    "arquitetura-java": {
      title: "Escolhendo Arquitetura Java",
      content: `
<p>
Não existe arquitetura perfeita.
Existe a arquitetura certa para o momento.
</p>

<ul>
  <li>Camadas → projetos pequenos</li>
  <li>Monólito Modular → crescimento saudável</li>
  <li>Microserviços → alta escala</li>
</ul>
`
    }
  };

  const modal = document.getElementById("blog-modal");
  const titleEl = document.getElementById("blog-title");
  const contentEl = document.getElementById("blog-content");
  const closeBtn = document.querySelector(".blog-close");

  document.querySelectorAll(".blog-card").forEach(card => {
    card.addEventListener("click", () => {
      const blog = blogs[card.dataset.blog];
      if (!blog) return;

      titleEl.innerHTML = blog.title;
      contentEl.innerHTML = blog.content;
      modal.classList.add("show");

      // 🔥 força Prism a aplicar highlight no conteúdo injeta
      if (window.Prism) {
        Prism.highlightAll();
      }
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("show");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("show");
    }
  });

  const container = document.querySelector(".blogs-horizontal");
  const btnLeft = document.querySelector(".blogs-wrapper .scroll-btn.left");
  const btnRight = document.querySelector(".blogs-wrapper .scroll-btn.right");

  if (!container || !btnLeft || !btnRight) return;

  const SCROLL_AMOUNT = 420; // largura aproximada do card

  btnLeft.addEventListener("click", () => {
    container.scrollBy({
      left: -SCROLL_AMOUNT,
      behavior: "smooth"
    });
  });

  btnRight.addEventListener("click", () => {
    container.scrollBy({
      left: SCROLL_AMOUNT,
      behavior: "smooth"
    });
  });

});

function openImage(src) {
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-img');

  modalImg.src = src;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden'; // remove scroll
}

function closeImage() {
  const modal = document.getElementById('image-modal');
  modal.classList.remove('active');
  document.body.style.overflow = ''; // volta scroll
}