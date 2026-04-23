// ─── CARRUSEL ───
// Para agregar imágenes: pon los archivos en la carpeta y añade la ruta al array.
const CAROUSEL_IMAGES = {
  'carousel-ittec': [
    // 'imgs/ittec/screenshot-01.png',
    // 'imgs/ittec/screenshot-02.png',
  ],
  'carousel-colegio': [
    // 'imgs/colegio/screenshot-01.png',
    // 'imgs/colegio/screenshot-02.png',
  ],
};

function shuffle(arr) {
  return arr.slice().sort(() => Math.random() - 0.5);
}

function initCarousel(id, images) {
  const root = document.getElementById(id);
  if (!root) return;

  const emptyMsg = root.querySelector('.carousel-empty');

  if (!images.length) return; // muestra el placeholder hasta que haya imágenes

  emptyMsg.classList.add('hidden');

  const track = root.querySelector('.carousel-track');
  const dotsWrap = root.querySelector('.carousel-dots');
  const shuffled = shuffle(images);
  let current = 0;
  let timer;

  shuffled.forEach((src) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = '';
    track.appendChild(img);

    const dot = document.createElement('div');
    dot.className = 'carousel-dot';
    dotsWrap.appendChild(dot);
  });

  const dots = dotsWrap.querySelectorAll('.carousel-dot');

  function goTo(index) {
    current = (index + shuffled.length) % shuffled.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
    resetTimer();
  }

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), 4000);
  }

  root.querySelector('.carousel-prev').addEventListener('click', () => goTo(current - 1));
  root.querySelector('.carousel-next').addEventListener('click', () => goTo(current + 1));

  goTo(0);
}

Object.entries(CAROUSEL_IMAGES).forEach(([id, imgs]) => initCarousel(id, imgs));

// ─── SCROLL REVEAL ───
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 },
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
