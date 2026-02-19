// ========================= MAIN.JS NAIL-HIGH PERFORMANCE =========================
gsap.registerPlugin(ScrollTrigger);

/* ========================= HERO ANIMATION ========================= */
gsap.from(".hero h1", { 
  y: 150, 
  opacity: 0, 
  duration: 1.5, 
  ease: "power4.out" 
});

gsap.from(".subtitle", { 
  y: 80, 
  opacity: 0, 
  duration: 1.5, 
  delay: 0.3, 
  ease: "power4.out" 
});

/* ========================= CARDS SCROLL + TILT + GRADIENT TEXT ========================= */
gsap.utils.toArray(".card").forEach((card, i) => {
  // Scroll Animation
  gsap.from(card, {
    scrollTrigger: { trigger: card, start: "top 85%" },
    y: 100, 
    opacity: 0, 
    delay: i * 0.15, 
    duration: 1.2, 
    ease: "power3.out"
  });

  // Vanilla Tilt
  VanillaTilt.init(card, { max: 12, speed: 500, glare: true, "max-glare": 0.35, scale: 1.05 });

  // Gradient Animated Text on h3
  const h3 = card.querySelector(".gradient-text");
  if(h3){
    h3.style.background = "linear-gradient(90deg, #ff6a00, #ff00aa, #00e0ff, #ff6a00)";
    h3.style.backgroundSize = "300% 300%";
    h3.style.webkitBackgroundClip = "text";
    h3.style.webkitTextFillColor = "transparent";
    h3.style.animation = "logoFlow 6s linear infinite";
  }
});

/* ========================= HERO FLOAT LOOP ========================= */
gsap.to(".hero", { y: 10, repeat: -1, yoyo: true, ease: "sine.inOut", duration: 4 });

/* ========================= CUSTOM CURSOR (DESKTOP ONLY) ========================= */
if (!('ontouchstart' in window)) {
  const cursor = document.createElement("div");
  cursor.classList.add("cursor");
  document.body.appendChild(cursor);
  document.addEventListener("mousemove", e => {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1, ease: "power1.out" });
  });
}

/* ========================= DISABLE RIGHT CLICK + LONG PRESS ========================= */
document.querySelectorAll(".scroll-container img").forEach(img => {
  img.setAttribute("draggable", "false");
  img.addEventListener("contextmenu", e => e.preventDefault());
  img.addEventListener("touchstart", e => e.preventDefault(), { passive: false });
});

/* ========================= SUBTLE GIF-LIKE MOTION ========================= */
const allScrollImages = document.querySelectorAll(".scroll-container img");
allScrollImages.forEach(img => {
  img.style.animation = "subtleGif 5s ease-in-out infinite alternate";
});

/* ========================= NEON VAULT STREAM OPTIMIZED ========================= */
const vaultContainer = document.querySelector("#vaultStreamContainer");
if(vaultContainer){
  const vaultImages = vaultContainer.querySelectorAll("img");
  gsap.set(vaultImages, {x:0, y:0, rotation:0});
  
  vaultImages.forEach((img,i)=>{
    const tl = gsap.timeline({repeat:-1, yoyo:true, defaults:{ease:"sine.inOut"}});
    tl.to(img, {
      x: `random(-15,15)`,
      y: `random(-10,10)`,
      rotation: `random(-2,2)`,
      duration: 2 + Math.random()*2
    });
  });
}

/* ========================= HORIZONTAL SCROLL (DRAG) ========================= */
const scrollContainers = document.querySelectorAll(".scroll-container");
scrollContainers.forEach(container => {
  let isDown = false, startX, scrollLeft;

  container.addEventListener('mousedown', e => {
    isDown = true;
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
  });

  container.addEventListener('mouseleave', () => isDown = false);
  container.addEventListener('mouseup', () => isDown = false);
  container.addEventListener('mousemove', e => {
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 2;
    container.scrollLeft = scrollLeft - walk;
  }, {passive:false});
});
