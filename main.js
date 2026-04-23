// ─── CARRUSEL ───
const IMAGES_ITTEC = [
  "imgs/ittec/cap1.png","imgs/ittec/cap2.png","imgs/ittec/cap3.png",
  "imgs/ittec/cap4.png","imgs/ittec/cap5.png","imgs/ittec/cap6.png",
  "imgs/ittec/cap7.png","imgs/ittec/cap8.png","imgs/ittec/cap9.png",
  "imgs/ittec/cap10.png","imgs/ittec/cap11.png","imgs/ittec/cap12.png",
  "imgs/ittec/cap13.png","imgs/ittec/cap14.png","imgs/ittec/cap15.png",
  "imgs/ittec/cap16.png","imgs/ittec/cap17.png","imgs/ittec/cap18.png",
];

const IMAGES_COLEGIO = [
  "imgs/colegio/cap19.png","imgs/colegio/cap20.png","imgs/colegio/cap21.png",
  "imgs/colegio/cap22.png","imgs/colegio/cap23.png","imgs/colegio/cap24.png",
  "imgs/colegio/cap25.png","imgs/colegio/cap26.png","imgs/colegio/cap27.png",
  "imgs/colegio/cap28.png","imgs/colegio/cap29.png","imgs/colegio/cap30.png",
  "imgs/colegio/cap31.png","imgs/colegio/cap32.png","imgs/colegio/cap33.png",
  "imgs/colegio/cap34.png","imgs/colegio/cap35.png","imgs/colegio/cap36.png",
  "imgs/colegio/cap37.png",
];

function shuffle(arr) {
  return arr.slice().sort(() => Math.random() - 0.5);
}

function initCarousel(id, images, delay) {
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
    timer = setInterval(() => goTo(current + 1), delay);
  }

  root
    .querySelector(".carousel-prev")
    .addEventListener("click", () => goTo(current - 1));
  root
    .querySelector(".carousel-next")
    .addEventListener("click", () => goTo(current + 1));

  goTo(0);
}

initCarousel("carousel-ittec", shuffle(IMAGES_COLEGIO), 3000);
initCarousel("carousel-colegio", shuffle(IMAGES_ITTEC), 5500);

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
