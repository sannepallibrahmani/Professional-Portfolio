const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");

const header = document.getElementById("header");
const scrollTopButton = document.getElementById("scroll-top");
const scrollProgressBar = document.getElementById(
  "scroll-progress-bar"
);

const cursorGlow = document.getElementById("cursor-glow");
const contactForm = document.getElementById("contact-form");

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav__link");

/* ================= MOBILE NAVIGATION ================= */

function openNavigation() {
  if (!navMenu) {
    return;
  }

  navMenu.classList.add("show-menu");
  document.body.classList.add("menu-open");
}

function closeNavigation() {
  if (!navMenu) {
    return;
  }

  navMenu.classList.remove("show-menu");
  document.body.classList.remove("menu-open");
}

navToggle?.addEventListener(
  "click",
  openNavigation
);

navClose?.addEventListener(
  "click",
  closeNavigation
);

navLinks.forEach((link) => {
  link.addEventListener(
    "click",
    closeNavigation
  );
});

/* Close menu after clicking contact button */

const navContactButton = document.querySelector(
  ".nav__contact-button"
);

navContactButton?.addEventListener(
  "click",
  closeNavigation
);

/* Close mobile menu by clicking outside */

document.addEventListener("click", (event) => {

  const target = event.target;

  const clickedInsideMenu =
    navMenu?.contains(target);

  const clickedToggle =
    navToggle?.contains(target);

  if (
    navMenu?.classList.contains("show-menu") &&
    !clickedInsideMenu &&
    !clickedToggle
  ) {
    closeNavigation();
  }

});

/* ================= SCROLL FUNCTIONS ================= */

function handleScroll() {

  const scrollPosition = window.scrollY;
  const documentHeight =
    document.documentElement.scrollHeight -
    window.innerHeight;

  /* Header glass background */

  header?.classList.toggle(
    "scrolled",
    scrollPosition > 40
  );

  /* Scroll-to-top button */

  scrollTopButton?.classList.toggle(
    "show",
    scrollPosition > 550
  );

  /* Scroll progress indicator */

  if (
    scrollProgressBar &&
    documentHeight > 0
  ) {
    const progress =
      (scrollPosition / documentHeight) * 100;

    scrollProgressBar.style.width =
      `${Math.min(progress, 100)}%`;
  }

  /* Active navigation section */

  const activePosition =
    scrollPosition + 180;

  sections.forEach((section) => {

    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    const currentNavLink =
      document.querySelector(
        `.nav__link[href="#${sectionId}"]`
      );

    if (!currentNavLink) {
      return;
    }

    const isActive =
      activePosition >= sectionTop &&
      activePosition <
        sectionTop + sectionHeight;

    currentNavLink.classList.toggle(
      "active-link",
      isActive
    );

  });

}

window.addEventListener(
  "scroll",
  handleScroll,
  { passive: true }
);

handleScroll();

/* ================= SCROLL TO TOP ================= */

scrollTopButton?.addEventListener(
  "click",
  () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }
);

/* ================= CURSOR GLOW ================= */

const supportsFinePointer =
  window.matchMedia(
    "(pointer: fine)"
  ).matches;

if (cursorGlow && supportsFinePointer) {

  let mouseX = 0;
  let mouseY = 0;

  let glowX = 0;
  let glowY = 0;

  document.addEventListener(
    "mousemove",
    (event) => {

      mouseX = event.clientX;
      mouseY = event.clientY;

    }
  );

  function animateCursorGlow() {

    glowX += (mouseX - glowX) * 0.12;
    glowY += (mouseY - glowY) * 0.12;

    cursorGlow.style.transform =
      `translate(
        ${glowX - 225}px,
        ${glowY - 225}px
      )`;

    requestAnimationFrame(
      animateCursorGlow
    );

  }

  animateCursorGlow();

} else if (cursorGlow) {

  cursorGlow.style.display = "none";

}

/* ================= CONTACT FORM ================= */

contactForm?.addEventListener(
  "submit",
  (event) => {

    event.preventDefault();

    const name =
      document
        .getElementById("name")
        ?.value
        .trim() || "";

    const email =
      document
        .getElementById("email")
        ?.value
        .trim() || "";

    const subject =
      document
        .getElementById("subject")
        ?.value
        .trim() || "Portfolio enquiry";

    const message =
      document
        .getElementById("message")
        ?.value
        .trim() || "";

    if (
      !name ||
      !email ||
      !subject ||
      !message
    ) {
      return;
    }

    const emailSubject =
      encodeURIComponent(
        `${subject} - From ${name}`
      );

    const emailBody =
      encodeURIComponent(
`Hello Brahmani,

Name: ${name}
Email: ${email}

Message:
${message}

Regards,
${name}`
      );

    window.location.href =
      `mailto:sbrahmani567@gmail.com?subject=${emailSubject}&body=${emailBody}`;

  }
);

/* ================= CURRENT YEAR ================= */

const currentYear =
  document.getElementById("current-year");

if (currentYear) {

  currentYear.textContent =
    new Date().getFullYear();

}

/* ================= SCROLL REVEAL ================= */

if (typeof ScrollReveal !== "undefined") {

  const revealConfig = {
    distance: "55px",
    duration: 950,
    delay: 100,
    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    reset: false,
    mobile: true,
    viewFactor: 0.12
  };

  const scrollReveal =
    ScrollReveal(revealConfig);

  scrollReveal.reveal(
    ".reveal-up",
    {
      origin: "bottom",
      interval: 100
    }
  );

  scrollReveal.reveal(
    ".reveal-left",
    {
      origin: "left"
    }
  );

  scrollReveal.reveal(
    ".reveal-right",
    {
      origin: "right"
    }
  );

}

/* ================= CARD TILT EFFECT ================= */

const tiltCards =
  document.querySelectorAll(
    ".skill-card, .project-card, .certification-card"
  );

if (supportsFinePointer) {

  tiltCards.forEach((card) => {

    card.addEventListener(
      "mousemove",
      (event) => {

        const cardRect =
          card.getBoundingClientRect();

        const cardCenterX =
          cardRect.left +
          cardRect.width / 2;

        const cardCenterY =
          cardRect.top +
          cardRect.height / 2;

        const rotateX =
          -(
            event.clientY -
            cardCenterY
          ) / 35;

        const rotateY =
          (
            event.clientX -
            cardCenterX
          ) / 35;

        card.style.transform =
          `perspective(900px)
           rotateX(${rotateX}deg)
           rotateY(${rotateY}deg)
           translateY(-7px)`;

      }
    );

    card.addEventListener(
      "mouseleave",
      () => {

        card.style.transform = "";

      }
    );

  });

}

/* ================= KEYBOARD ACCESSIBILITY ================= */

document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Escape" &&
      navMenu?.classList.contains("show-menu")
    ) {
      closeNavigation();
    }

  }
);