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
const isTouch = 'ontouchstart' in window;
const projects = document.querySelector('.projects-horizontal');

if (!isTouch && projects) {
  projects.addEventListener('wheel', (e) => {
    if (e.deltaY === 0) return;
    e.preventDefault();

    projects.scrollBy({
      left: e.deltaY,
      behavior: 'smooth'
    });
  }, { passive: false });
}

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
const viewport = modal.querySelector(".carousel-viewport");
const track = modal.querySelector(".carousel-track");
const btnPrev = modal.querySelector(".carousel-nav.left");
const btnNext = modal.querySelector(".carousel-nav.right");
const btnClose = modal.querySelector(".carousel-close");

let currentIndex = 0;
let images = [];

function openCarouselFromProject(projectEl, startIndex = 0) {
  const media = projectEl.querySelector(".project-media");
  if (!media) return;

  images = Array.from(media.querySelectorAll(".expandable"));
  if (!images.length) return;

  currentIndex = startIndex;

    // 🔴 controla setas
  modal.classList.toggle("single-image", images.length <= 1);

  renderCarousel();
  modal.classList.add("active");

  document.body.style.overflow = "hidden";
  modal.style.overflowY = "auto"; // 🔥
}

function renderCarousel() {
  track.innerHTML = "";
  const img = document.createElement("img");
  img.src = images[currentIndex].src;
  track.appendChild(img);
}

btnClose.addEventListener("click", closeCarousel);

function closeCarousel() {
  modal.classList.remove("active");
  track.innerHTML = "";

  document.body.style.overflow = "";
  modal.style.overflowY = ""; // 🔥
}

// clique fora da imagem
viewport.addEventListener("click", (e) => {
  // fecha SOMENTE se clicar no backdrop
  if (e.target === viewport) {
    closeCarousel();
  }
});

btnPrev.addEventListener("click", (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  renderCarousel();
});

btnNext.addEventListener("click", (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex + 1) % images.length;
  renderCarousel();
});

function updateCarouselArrows() {
  const show = images.length > 1;

  btnPrev.style.display = show ? "flex" : "none";
  btnNext.style.display = show ? "flex" : "none";
}

// =========================
// MODAL DE CERTIFICADOS
// =========================
const certificatesModal = document.getElementById("certificates-modal");
const certificateImg = document.getElementById("certificate-modal-img");
const certificatesClose = certificatesModal.querySelector(".carousel-close");

function openCertificateModal(imgSrc) {
  certificateImg.src = imgSrc;
  certificatesModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeCertificateModal() {
  certificatesModal.classList.remove("active");
  certificateImg.src = "";
  document.body.style.overflow = "";
}

certificatesClose.addEventListener("click", closeCertificateModal);

certificatesModal.addEventListener("click", (e) => {
  if (e.target === certificatesModal) closeCertificateModal();
});

// =========================
// BINDS — PROJETOS
// =========================
document.querySelectorAll(".project-card").forEach(card => {
  const media = card.querySelector(".project-media");
  if (!media) return;

  const imgs = Array.from(media.querySelectorAll("img"));
  if (!imgs.length) return;

  // 🔎 imagens válidas (não default)
  const validImgs = imgs.filter(img => !img.classList.contains("is-default"));

  // cursor só se houver imagem válida
  if (validImgs.length) {
    card.style.cursor = "zoom-in";
  }

  // Clique no BODY do card
  card.addEventListener("click", () => {
    if (!validImgs.length) return; // 🚫 nada pra abrir
    openCarouselFromProject(card, 0);
  });

  // Clique dentro da área de mídia
  media.addEventListener("click", (e) => {
    const clickedImg = e.target.closest("img");
    if (!clickedImg) return;

    // 🚫 imagem default não expande
    if (clickedImg.classList.contains("is-default")) {
      return;
    }

    e.stopPropagation(); // 🔴 evita disparar o click do card

    const index = validImgs.indexOf(clickedImg);
    if (index === -1) return;

    openCarouselFromProject(card, index);
  });
});

// =========================
// BINDS — CERTIFICADOS
// =========================
document.querySelectorAll(".certificate-card").forEach(card => {
  card.style.cursor = "zoom-in";

  card.addEventListener("click", () => {
    const img = card.querySelector(".certificate-media img");
    if (img) openCertificateModal(img.src);
  });
});

document.querySelectorAll(".certificate-media img").forEach(img => {
  img.addEventListener("click", (e) => {
    e.stopPropagation(); // 🔴 impede conflito com o card
    openCertificateModal(img.src);
  });
});

// Scroll horizontal com mouse — BLOGS
const blogs = document.querySelector('.blogs-horizontal');

if (!isTouch && blogs) {
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
      title: "Como escolher a arquitetura certa para uma aplicação Java?",
      content: `
     <div class="image-wrapper">
  <img src="blogs/arquitetura-java.jpg"
       alt="Arquitetura de Software Java"
       class="pattern-image"
       onclick="openImage(this.src)" />
</div>

<section class="readme-blog">

  <p class="intro">
    Escolher a arquitetura é uma das decisões mais importantes no início de um projeto.
    Ela define como o sistema vai crescer, escalar e ser mantido ao longo do tempo.
  </p>

  <p>
    A verdade é simples: <strong>não existe arquitetura perfeita</strong>.
    Existe a arquitetura certa para o <strong>momento do sistema</strong>,
    do <strong>time</strong> e do <strong>domínio</strong>.
  </p>

<h2>Arquiteturas clássicas no ecossistema Java</h2>

<!-- CAMADAS -->
<div class="architecture-block">
  <h3>Arquitetura em Camadas (Layered Architecture)</h3>

  <p>
    Organização tradicional por responsabilidade técnica.
    Muito comum em aplicações Spring Boot.
    Funciona bem no início, mas tende a gerar alto acoplamento
    conforme o sistema cresce.
  </p>

  <div class="code-block">
<pre><code>
com.example.payments
│
├── controller
├── service
├── repository
└── model
</code></pre>
  </div>

  <p><strong>Vantagens:</strong></p>
  <ul>
    <li>Simples de entender</li>
    <li>Baixa curva de aprendizado</li>
    <li>Boa para projetos pequenos</li>
  </ul>

  <p><strong>Desvantagens:</strong></p>
  <ul>
    <li>Alto acoplamento entre camadas</li>
    <li>Dificulta evolução do domínio</li>
    <li>Testes de negócio mais complexos</li>
  </ul>
</div>

<!-- MONÓLITO MODULAR -->
<div class="architecture-block">
  <h3>Monólito Modular</h3>

  <p>
    Um único deploy, mas com módulos bem definidos.
    Cada módulo representa um subdomínio do negócio.
    É a forma mais segura de escalar sem cair cedo em microserviços.
  </p>

  <div class="code-block">
<pre><code>
com.example.payments
│
├── payment
├── recurring
├── refunds
└── shared
</code></pre>
  </div>

  <p><strong>Vantagens:</strong></p>
  <ul>
    <li>Boa separação de responsabilidades</li>
    <li>Menor complexidade operacional</li>
    <li>Base sólida para crescimento</li>
  </ul>

  <p><strong>Desvantagens:</strong></p>
  <ul>
    <li>Exige disciplina arquitetural</li>
    <li>Sem cuidado, vira um monólito acoplado</li>
  </ul>
</div>

<!-- HEXAGONAL -->
<div class="architecture-block">
  <h3>Hexagonal / Clean Architecture</h3>

  <p>
    Arquitetura centrada no domínio.
    O core da aplicação não depende de frameworks,
    banco de dados ou mensageria.
  </p>

  <div class="code-block">
<pre><code>
com.example.payments
│
├── domain
│   ├── Payment
│   └── PaymentRepository
│
├── application
│   └── ProcessPaymentUseCase
│
├── adapters
│   ├── web
│   └── persistence
│
└── infrastructure
</code></pre>
  </div>

  <p><strong>Vantagens:</strong></p>
  <ul>
    <li>Domínio protegido</li>
    <li>Alta testabilidade</li>
    <li>Ideal para longo prazo</li>
  </ul>

  <p><strong>Desvantagens:</strong></p>
  <ul>
    <li>Curva de aprendizado maior</li>
    <li>Overengineering para sistemas simples</li>
  </ul>
</div>

<!-- EVENT DRIVEN -->
<div class="architecture-block">
  <h3>Event-Driven Architecture</h3>

  <p>
    Comunicação baseada em eventos.
    Serviços reagem a mudanças de estado,
    em vez de chamadas síncronas.
    Muito usada em pagamentos e sistemas financeiros.
  </p>

  <div class="code-block">
<pre><code>
PaymentCreatedEvent
PaymentProcessedEvent
PaymentFailedEvent
</code></pre>
  </div>

  <p><strong>Vantagens:</strong></p>
  <ul>
    <li>Alta escalabilidade</li>
    <li>Baixo acoplamento entre serviços</li>
    <li>Boa resiliência</li>
  </ul>

  <p><strong>Desvantagens:</strong></p>
  <ul>
    <li>Debug mais complexo</li>
    <li>Consistência eventual</li>
    <li>Exige observabilidade madura</li>
  </ul>
</div>

<hr>

<h2>Arquiteturas emergentes</h2>

<!-- PACKAGE BY FEATURE -->
<div class="architecture-block">
  <h3>Package by Feature</h3>

  <p>
    Organização do código por funcionalidade.
    Cada feature contém controller, service e repository.
    Muito usada em monólitos bem organizados.
  </p>

  <div class="code-block">
<pre><code>
com.example.payments
│
├── payment
│   ├── controller
│   ├── service
│   └── repository
│
└── recurring
    ├── controller
    ├── service
    └── repository
</code></pre>
  </div>

  <p><strong>Vantagens:</strong></p>
  <ul>
    <li>Alta coesão por funcionalidade</li>
    <li>Facilita manutenção</li>
  </ul>

  <p><strong>Desvantagens:</strong></p>
  <ul>
    <li>Pode duplicar conceitos</li>
    <li>Requer padronização</li>
  </ul>
</div>

<!-- VERTICAL SLICE -->
<div class="architecture-block">
  <h3>Vertical Slice</h3>

  <p>
    Cada caso de uso é uma fatia vertical independente.
    Muito alinhada a DDD, CQRS e sistemas orientados a fluxo.
  </p>

  <div class="code-block">
<pre><code>
com.example.payments
│
├── create-payment
├── process-payment
└── update-status
</code></pre>
  </div>

  <p><strong>Vantagens:</strong></p>
  <ul>
    <li>Altíssima coesão</li>
    <li>Testes simples</li>
    <li>Excelente para pagamentos</li>
  </ul>

  <p><strong>Desvantagens:</strong></p>
  <ul>
    <li>Menos familiar</li>
    <li>Verbosidade inicial</li>
  </ul>
</div>

  <h2>Regra geral</h2>

  <div class="blog-highlight">
    <p>
      Comece simples.
      Organize bem.
      Só adicione complexidade quando ela resolver um problema real.
      Arquitetura boa é a que o time consegue manter.
    </p>
  </div>

  </br>
  <h2>Exemplo prático</h2>

  <p>
    Mantive um repositório com exemplos reais de organização arquitetural
    aplicados a um domínio de pagamentos:
  </p>

  <p>
    👉 <a href="https://github.com/dya-andrade/architectures-payment-initiator"
          target="_blank"
          rel="noopener noreferrer">
      architectures-payment-initiator (GitHub)
    </a>
  </p>

  <div class="credits">
    <p>
      Referências:
      <br>
      <a href="https://www.linkedin.com/posts/lucas-amorim-45183212a_como-escolher-a-arquitetura-certa-para-uma-activity-7397114642348785664-pbXO"
         target="_blank" rel="noopener noreferrer">
        Lucas Amorim — Como escolher a arquitetura certa
      </a>
      <br>
      <a href="https://www.techleads.club/c/blog/quando-usar-arquiteturas-emergentes-package-by-feature-vertical-slice-e-modularizacao"
         target="_blank" rel="noopener noreferrer">
        Tech Leads Club — Arquiteturas emergentes
      </a>
      <br>
      <a href="https://medium.com/sahibinden-technology/package-by-layer-vs-package-by-feature-7e89cde2ae3a"
         target="_blank" rel="noopener noreferrer">
        Medium — Package by Layer vs Package by Feature
      </a>
    </p>
  </div>

</section>
`
    },

    "idempotencia-kafka": {
      title: "Desafio técnico com Kafka em produção",
      content: `
     <section class="readme-blog">

  <p class="intro">
    Recentemente, enfrentei um desafio interessante ao trabalhar com Kafka em um ambiente
    de alta escalabilidade. O objetivo era garantir que os dados fossem processados de
    forma eficiente, ordenada e confiável, mesmo sob carga elevada e com múltiplos
    consumidores concorrentes.
  </p>

  <h2>Contexto</h2>
  <p>
    Utilizávamos Kafka para orquestrar eventos que representavam mudanças de estado em
    um fluxo de negócio que exigia alta performance. Alguns requisitos principais eram:
  </p>
  <ul>
    <li>Processar eventos em tempo real.</li>
    <li>Garantir <b>ordem sequencial</b> quando necessário.</li>
    <li>Minimizar duplicação de processamento.</li>
    <li>Manter <b>observabilidade e rastreabilidade</b> dos eventos.</li>
  </ul>

  <h2>O problema observado</h2>
  <p>
    Durante picos de carga, notamos um comportamento inesperado relacionado a
    <strong>duplicação de eventos</strong> e <strong>reordenação</strong> de mensagens,
    que impactavam negativamente a lógica de domínio.
  </p>
  <p>
    Alguns sintomas foram:
  </p>
  <ul>
    <li>Mensagens processadas fora da ordem esperada.</li>
    <li>Consumidores relatando eventos repetidos.</li>
    <li>Latência intermitente em partições específicas.</li>
  </ul>

  <h2>Soluções consideradas</h2>

  <h3>1. Idempotência no produtor</h3>
  <p>
    Habilitar a idempotência nativa do Kafka no produtor para garantir que uma mesma
    mensagem não fosse escrita mais de uma vez em caso de reenvio.
  </p>

  <div class="code-block">
<pre><code class="language-java">
// Exemplo de configuração de produtor idempotente
Properties props = new Properties();
props.put("enable.idempotence", "true");
</code></pre>
  </div>

  <h3>2. Chaves e particionamento</h3>
  <p>
    Definir chaves consistentes para particionamento de eventos relevantes,
    assegurando que mensagens de mesma entidade caíssem na mesma partição.
  </p>

  <div class="code-block">
<pre><code class="language-java">
// Exemplo de envio de mensagem com chave
producer.send(
  new ProducerRecord<>("topic-name", key, value)
);
</code></pre>
  </div>

  <h3>3. Ajustes de consumidores</h3>
  <p>
    Discutimos estratégias de rebalancing, grupos de consumidores e controle de offset
    para evitar reprocessamentos indesejados.
  </p>

  <h2>Resultado</h2>
  <p>
    Combinando idempotência no produtor, uso consistente de chaves para particionamento
    e monitoramento mais apurado de partições, conseguimos reduzir significativamente
    os sintomas observados. A latência se estabilizou e a ordem esperada de eventos foi
    mantida na maioria dos fluxos críticos.
  </p>

  <h2>Aprendizados</h2>
  <ul>
    <li>A idempotência é essencial para produção confiável em Kafka.</li>
    <li>Particionamento e chave bem definidos fazem toda diferença em ordering.</li>
    <li>Observabilidade (métricas + logs) é crucial para diagnosticar problemas em tempo real.</li>
  </ul>

  <div class="credits">
    <p>
      Este relato foi redigido de forma genérica para resguardar
      informações sensíveis do projeto, mas compila desafios comuns
      enfrentados em sistemas que utilizam Kafka em produção.
    </p>
  </div>

</section>
`
    }
  };

const blogModal = document.getElementById("blog-modal");
const titleEl = document.getElementById("blog-title");
const contentEl = document.getElementById("blog-content");
const blogCloseBtn = document.querySelector(".blog-close");
const themeToggle = document.querySelector(".theme-toggle");

/* =========================
   ABRIR MODAL
========================= */
document.querySelectorAll(".blog-card").forEach(card => {
  card.addEventListener("click", () => {
    const blog = blogs[card.dataset.blog];
    if (!blog) return;

    titleEl.innerHTML = blog.title;
    contentEl.innerHTML = blog.content;

    blogModal.classList.add("show");
    document.body.style.overflow = "hidden";

    // ✅ GARANTE QUE ABRE NO TOPO
    blogModal.scrollTop = 0;
    contentEl.scrollTop = 0;

    themeToggle?.classList.add("hidden-by-modal");

    // Prism highlight
    if (window.Prism) {
      Prism.highlightAll();
    }
  });
});

/* =========================
   FECHAR MODAL
========================= */

// 🔴 botão X
blogCloseBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  closeBlogModal();
});

// 🔴 clique fora
blogModal.addEventListener("click", (e) => {
  if (e.target === blogModal) {
    closeBlogModal();
  }
});

// 🔴 tecla ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && blogModal.classList.contains("show")) {
    closeBlogModal();
  }
});

/* =========================
   FUNÇÃO CENTRAL
========================= */
function closeBlogModal() {
  blogModal.classList.remove("show");
  document.body.style.overflow = "";

  // 👉 remove estado visual do botão de tema
  themeToggle?.classList.remove("hidden-by-modal");
}


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

const scrollBtn = document.querySelector('.scroll-down-fixed');
const end = document.getElementById('fim');

if (scrollBtn && end) {

  // clique continua funcionando
  scrollBtn.addEventListener('click', (e) => {
    e.preventDefault();
    end.scrollIntoView({ behavior: 'smooth' });
  });

  // OBSERVADOR
  const observer = new IntersectionObserver(
    ([entry]) => {
      scrollBtn.classList.toggle('hidden', entry.isIntersecting);
    },
    {
      root: null,
      threshold: 0.2 // já some antes de chegar totalmente
    }
  );

  observer.observe(end);
}

/* =========================
   THEME TOGGLE
========================= */
const toggleBtn = document.querySelector('.theme-toggle');
const body = document.body;

// carrega preferência
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  body.classList.add('dark');
  toggleBtn.textContent = '💡';
}

// toggle
toggleBtn.addEventListener('click', () => {
  body.classList.toggle('dark');

  const isDark = body.classList.contains('dark');
  toggleBtn.textContent = isDark ? '💡' : '🌙';

  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

function setupCarouselHint(carouselSelector, cardSelector, hintSelector) {
  const carousel = document.querySelector(carouselSelector);
  const hint = document.querySelector(hintSelector);

  if (!carousel || !hint) return;

  const cards = carousel.querySelectorAll(cardSelector);
  if (!cards.length) return;

  const lastCard = cards[cards.length - 1];

  /* =========================
     OBSERVA O ÚLTIMO CARD
  ========================= */
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        hint.textContent = "";
        hint.classList.add("is-end");
      } else {
        hint.textContent = "→";
        hint.classList.remove("is-end");
      }
    },
    {
      root: carousel,
      threshold: 0.6
    }
  );

  observer.observe(lastCard);

  /* =========================
     CLICK NA SETA → VAI PRO FIM
  ========================= */
  hint.addEventListener("click", () => {
    lastCard.scrollIntoView({
      behavior: "smooth",
      inline: "end",
      block: "nearest"
    });
  });
}

/* =========================
   PROJETOS
========================= */
setupCarouselHint(
  ".projects-horizontal",
  ".project-card",
  ".project-hint"
);

/* =========================
   BLOGS
========================= */
setupCarouselHint(
  ".blogs-horizontal",
  ".blog-card",
  ".blog-hint"
);