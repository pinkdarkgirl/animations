/*============= GSAP BUTTON ====================*/

const button = document.querySelector(".gsap-btn");
const marker = document.querySelector(".gsap-btn-marker");

button.addEventListener("mouseenter", (event) => {
  const rect = button.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  marker.style.left = `${x}px`;
  marker.style.top = `${y}px`;
  marker.classList.remove("animate");
  marker.classList.remove("animate-exit");
  void marker.offsetWidth;
  marker.style.transform = "scale(1)";
  marker.classList.add("animate");
});

button.addEventListener("mouseleave", (event) => {
  const rect = button.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  marker.style.left = `${x}px`;
  marker.style.top = `${y}px`;
  marker.classList.remove("animate");
  void marker.offsetWidth;
  marker.style.transform = "scale(10)";
  marker.classList.add("animate-exit");
  marker.style.opacity = 1;
});

/*============= FOLLOWER BUTTON ====================*/

const buttonEl = document.querySelector(".follow-btn");
const btnTextEl = document.querySelector(".follow-btn-text");
const debuggerEl = document.querySelector("#follow-btn-debugger");

const activateBtn = (event) => {
  let boundBox = buttonEl.getBoundingClientRect();
  let buttonStrength = 40;
  let buttonTextStrength = 80;

  gsap.to(buttonEl, {
    duration: 1,
    x:
      ((event.clientX - boundBox.left) / buttonEl.offsetWidth - 0.5) *
      buttonStrength,
    y:
      ((event.clientY - boundBox.top) / buttonEl.offsetHeight - 0.5) *
      buttonStrength,
    ease: Power4.easeOut,
  });

  gsap.to(btnTextEl, {
    duration: 1,
    x:
      ((event.clientX - boundBox.left) / buttonEl.offsetWidth - 0.5) *
      buttonTextStrength,
    y:
      ((event.clientY - boundBox.top) / buttonEl.offsetHeight - 0.5) *
      buttonTextStrength,
    ease: Power4.easeOut,
  });
};

const resetBtn = (event) => {
  gsap.to(buttonEl, {
    duration: 1,
    x: 0,
    y: 0,
    ease: Elastic.easeOut,
  });

  gsap.to(btnTextEl, {
    duration: 1,
    x: 0,
    y: 0,
    ease: Elastic.easeOut,
  });
};

buttonEl.addEventListener("mousemove", activateBtn);
buttonEl.addEventListener("mouseleave", resetBtn);

/*============= LOADING BUTTON ====================*/

const submitButton = document.querySelector(".loading-btn");
const submitButtonText = document.querySelector(".loading-btn-text");

submitButton.addEventListener("click", (e) => {
  e.preventDefault();

  submitButton.classList.add("loading");

  setTimeout(() => {
    submitButton.classList.remove("loading");
    submitButton.classList.add("success");

    submitButtonText.innerHTML = "Login Successful!";
  }, 4000);
});

/*============= LENIS CARDS ====================*/

const lenisCards = document.querySelectorAll(".lenis-card");

gsap.registerPlugin(ScrollTrigger);

for (let i = 0; i < lenisCards.length; i++) {
  lenisCards[i].style.top = `calc(66vw / 8 * ${i + 1} + ${i * 50}px)`;
  lenisCards[i].style.left = `calc(${66}vw / 8 * ${i + 1} + ${i * 50}px)`;
}

lenisCards.forEach((card) => {
  card.style.opacity = 0;
});

lenisCards.forEach((card, index) => {
  const cardHeight = card.offsetHeight;
  const cardWidth = card.offsetWidth;
  console.log(cardHeight);

  gsap.fromTo(
    card,
    {
      x: cardWidth,
      y: cardHeight,
      opacity: 0, // set the initial opacity to 0
    },
    {
      x: 0,
      y: 0,
      opacity: 1, // animate the opacity to 1
      duration: 1,
      ease: "power3.inOut",
      scrollTrigger: {
        // markers: true,
        trigger: card,
        start: "top center",
        end: "bottom 50%",
        scrub: true,
        // toggleClass: "visible",
        onUpdate: (self) => console.log("progress", self.progress),
      },
    }
  );
});

/*============= MONET SCROLL ====================*/
const lenis = new Lenis();

lenis.on("scroll", (e) => {});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

const monetItems = document.querySelectorAll(".monet-item");

monetItems.forEach((item) => {
  let textEl = item.querySelector(".monet-item-text");
  let imgEl = item.querySelector(".monet-item-img");

  let timeline = gsap.timeline({
    scrollTrigger: {
      trigger: item,
      start: "top bottom",
      end: "bottom 90%",
      scrub: true,
    },
  });

  timeline.fromTo(
    textEl,
    { xPercent: -100, opacity: 0 },
    { xPercent: 0, opacity: 1 }
  );

  timeline.fromTo(
    imgEl,
    { xPercent: 100, opacity: 0 },
    { xPercent: 0, opacity: 1 },
    "<"
  );
});
