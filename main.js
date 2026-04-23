// ─── CARRUSEL ───
const ALL_IMAGES = [
  "imgs/carrusel_plataforma/cap1.png",
  "imgs/carrusel_plataforma/cap2.png",
  "imgs/carrusel_plataforma/cap3.png",
  "imgs/carrusel_plataforma/cap4.png",
  "imgs/carrusel_plataforma/cap5.png",
  "imgs/carrusel_plataforma/cap6.png",
  "imgs/carrusel_plataforma/cap7.png",
  "imgs/carrusel_plataforma/cap8.png",
  "imgs/carrusel_plataforma/cap9.png",
  "imgs/carrusel_plataforma/cap10.png",
  "imgs/carrusel_plataforma/cap11.png",
  "imgs/carrusel_plataforma/cap12.png",
  "imgs/carrusel_plataforma/cap13.png",
  "imgs/carrusel_plataforma/cap14.png",
  "imgs/carrusel_plataforma/cap15.png",
  "imgs/carrusel_plataforma/cap16.png",
  "imgs/carrusel_plataforma/cap17.png",
  "imgs/carrusel_plataforma/cap18.png",
  "imgs/carrusel_plataforma/cap19.png",
  "imgs/carrusel_plataforma/cap20.png",
];

function shuffle(arr) {
  return arr.slice().sort(() => Math.random() - 0.5);
}

function initCarousel(id, images) {
  const root = document.getElementById(id);
  if (!root) return;

  const emptyMsg = root.querySelector(".carousel-empty");

  if (!images.length) return;

  emptyMsg.classList.add("hidden");

  const track = root.querySelector(".carousel-track");
  const dotsWrap = root.querySelector(".carousel-dots");
  let current = 0;
  let timer;

  images.forEach((src, i) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "";
    img.style.cursor = "zoom-in";
    img.addEventListener("click", () => openLightbox(images, i));
    track.appendChild(img);

    const dot = document.createElement("div");
    dot.className = "carousel-dot";
    dotsWrap.appendChild(dot);
  });

  const dots = dotsWrap.querySelectorAll(".carousel-dot");

  function goTo(index) {
    current = (index + images.length) % images.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle("active", i === current));
    resetTimer();
  }

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), 4000);
  }

  root
    .querySelector(".carousel-prev")
    .addEventListener("click", () => goTo(current - 1));
  root
    .querySelector(".carousel-next")
    .addEventListener("click", () => goTo(current + 1));

  goTo(0);
}

// Barajar todas y repartir: cada card recibe imágenes distintas en cada carga
const split = shuffle(ALL_IMAGES);
const half = Math.ceil(split.length / 2);
initCarousel("carousel-ittec", split.slice(0, half));
initCarousel("carousel-colegio", split.slice(half));

// ─── LIGHTBOX ───
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxVideo = document.getElementById("lightbox-video");
const lightboxVideoSrc = document.getElementById("lightbox-video-src");
const lightboxPrev = document.getElementById("lightbox-prev");
const lightboxNext = document.getElementById("lightbox-next");

let lbImages = [];
let lbIndex = 0;

function showLightboxImage(index) {
  lbIndex = (index + lbImages.length) % lbImages.length;
  lightboxImg.src = lbImages[lbIndex];
}

function openLightbox(images, index) {
  lbImages = images;
  lightboxImg.style.display = "block";
  lightboxVideo.style.display = "none";
  lightboxPrev.style.display = "flex";
  lightboxNext.style.display = "flex";
  showLightboxImage(index);
  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
}

function openLightboxVideo(src) {
  lbImages = [];
  lightboxVideoSrc.src = src;
  lightboxVideo.load();
  lightboxVideo.style.display = "block";
  lightboxImg.style.display = "none";
  lightboxPrev.style.display = "none";
  lightboxNext.style.display = "none";
  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("active");
  lightboxVideo.pause();
  lightboxVideo.currentTime = 0;
  document.body.style.overflow = "";
}

lightboxPrev.addEventListener("click", (e) => { e.stopPropagation(); showLightboxImage(lbIndex - 1); });
lightboxNext.addEventListener("click", (e) => { e.stopPropagation(); showLightboxImage(lbIndex + 1); });
document.getElementById("lightbox-close").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft" && lbImages.length) showLightboxImage(lbIndex - 1);
  if (e.key === "ArrowRight" && lbImages.length) showLightboxImage(lbIndex + 1);
});

document
  .getElementById("video-edublock")
  .addEventListener("click", () =>
    openLightboxVideo("imgs/video_edublock/video_edublock.mp4"),
  );

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
