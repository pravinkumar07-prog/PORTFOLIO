/**
 * Personal portfolio behavior for Pravinkumar N.
 *
 * EDIT THESE VALUES when you have real links:
 * - PROFILE.githubUrl
 * - PROFILE.email
 * - PROJECTS[].github / PROJECTS[].liveDemo
 * Place your resume PDF at: assets/resume.pdf
 */

const PROFILE = {
  name: "Pravinkumar N.",
  githubUrl: "", // PLACEHOLDER: paste your GitHub profile URL here, e.g. "https://github.com/your-username"
  linkedinUrl: "https://www.linkedin.com/in/pravinkumar-nithiyanandan-ab074b381/",
  email: "", // PLACEHOLDER: paste your email here, e.g. "you@example.com"
  resumePath: "assets/resume.pdf",
};

const TYPING_ROLES = ["Java Developer", "Problem Solver", "Web Developer"];

const SKILLS = [
  { name: "Java", note: "Core language for coursework and socket projects", icon: "cpu" },
  { name: "Python", note: "Scripting and problem-solving practice", icon: "code" },
  { name: "C++", note: "Programming fundamentals and DSA practice", icon: "terminal" },
  { name: "HTML", note: "Semantic structure for web pages", icon: "file-code" },
  { name: "CSS", note: "Layout, responsive design, and visual polish", icon: "palette" },
  { name: "JavaScript", note: "Interactive UI behavior in the browser", icon: "sparkles" },
  { name: "Data Structures and Algorithms", note: "Problem solving and coding practice", icon: "network" },
  { name: "Git and GitHub", note: "Version control and project sharing", icon: "git-branch" },
];

/**
 * Easy-to-edit project list.
 * Use github: "" or liveDemo: "" until a real URL exists.
 * Do not invent repository or demo URLs.
 */
const PROJECTS = [
  {
    title: "Personal Portfolio Website",
    description:
      "This site: a responsive personal portfolio with semantic HTML, custom CSS, and vanilla JavaScript.",
    tags: ["HTML", "CSS", "JavaScript"],
    github: "", // PLACEHOLDER: add the GitHub repo URL when this project is published
    liveDemo: "", // Optional. Leave empty if there is no hosted demo yet.
    isThisSite: true,
  },
  {
    title: "CodeReviewerX",
    description:
      "Concept for an AI-assisted code review tool that would highlight issues and suggest improvements. This is a project idea, not a finished product.",
    tags: ["Concept", "JavaScript", "AI-assisted review"],
    github: "", // PLACEHOLDER: add the repository URL when available
    liveDemo: "",
  },
  {
    title: "Snake Game",
    description:
      "Browser-based Snake game concept with scoring and high-score tracking in local storage.",
    tags: ["JavaScript", "HTML", "CSS"],
    github: "", // PLACEHOLDER: add the repository URL when available
    liveDemo: "",
  },
  {
    title: "Chat Application",
    description:
      "Java socket-programming project concept for a simple client–server chat. Not presented here as a completed production app.",
    tags: ["Java", "Sockets"],
    github: "", // PLACEHOLDER: add the repository URL when available
    liveDemo: "",
  },
];

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function initIcons() {
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }
}

function applyExternalLinks() {
  const githubTargets = ["hero-github", "contact-github", "footer-github"];
  githubTargets.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (PROFILE.githubUrl) {
      el.href = PROFILE.githubUrl;
      el.target = "_blank";
      el.rel = "noopener noreferrer";
      if (id === "contact-github") {
        el.textContent = PROFILE.githubUrl.replace(/^https?:\/\//, "");
      }
    } else {
      el.href = "#github-placeholder";
      el.addEventListener("click", (event) => {
        event.preventDefault();
        alert("GitHub URL placeholder: set PROFILE.githubUrl in script.js.");
      });
    }
  });

  const emailLink = document.getElementById("contact-email");
  if (emailLink) {
    if (PROFILE.email) {
      emailLink.href = "mailto:" + PROFILE.email;
      emailLink.textContent = PROFILE.email;
    } else {
      emailLink.href = "#email-placeholder";
      emailLink.addEventListener("click", (event) => {
        event.preventDefault();
        alert("Email placeholder: set PROFILE.email in script.js.");
      });
    }
  }
}

function renderSkills() {
  const grid = document.getElementById("skills-grid");
  if (!grid) return;
  grid.innerHTML = SKILLS.map(
    (skill) => `
      <li class="skill-card glass reveal">
        <i data-lucide="${skill.icon}" aria-hidden="true"></i>
        <h3>${skill.name}</h3>
        <p>${skill.note}</p>
      </li>
    `
  ).join("");
}

function projectLinkButton(label, url, extraClass) {
  if (url) {
    return `<a class="btn ${extraClass}" href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>`;
  }
  return `<button class="btn ${extraClass}" type="button" data-placeholder="${label}" aria-disabled="true">${label} (placeholder)</button>`;
}

function renderProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;
  grid.innerHTML = PROJECTS.map((project) => {
    const demoButton = project.liveDemo
      ? projectLinkButton("Live Demo", project.liveDemo, "btn-primary")
      : project.isThisSite
        ? `<a class="btn btn-primary" href="#home">This site</a>`
        : projectLinkButton("Live Demo", "", "btn-primary");

    return `
      <article class="project-card glass reveal">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="tags">${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>
        <div class="card-actions">
          ${projectLinkButton("GitHub", project.github, "btn-secondary")}
          ${demoButton}
        </div>
        ${
          !project.github
            ? `<p class="placeholder-note">GitHub link not supplied yet — edit PROJECTS in script.js.</p>`
            : ""
        }
      </article>
    `;
  }).join("");

  grid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-placeholder]");
    if (!button) return;
    alert(
      button.dataset.placeholder +
        " is a placeholder. Add a real URL in the PROJECTS array in script.js when you have one."
    );
  });
}

async function setupResume() {
  const status = document.getElementById("resume-status");
  const buttons = [document.getElementById("resume-download"), document.getElementById("hero-resume-btn")];
  let available = false;

  try {
    const response = await fetch(PROFILE.resumePath, { method: "HEAD" });
    available = response.ok;
  } catch (error) {
    available = false;
  }

  if (available) {
    if (status) {
      status.textContent = "Resume file found. Use the button to download assets/resume.pdf.";
    }
    buttons.forEach((btn) => {
      if (!btn) return;
      btn.href = PROFILE.resumePath;
      btn.setAttribute("download", "Pravinkumar-N-Resume.pdf");
    });
    return;
  }

  if (status) {
    status.innerHTML =
      "No resume file was found at <code>assets/resume.pdf</code>. Add your own PDF there. This site does not generate a resume or invent achievements.";
  }

  buttons.forEach((btn) => {
    if (!btn) return;
    btn.setAttribute("aria-disabled", "true");
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      alert("Place your resume PDF at portfolio/assets/resume.pdf, then refresh this page.");
    });
  });
}

function setupMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("primary-menu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    });
  });
}

function setupTyping() {
  const target = document.getElementById("typed-role");
  if (!target) return;

  if (prefersReducedMotion) {
    target.textContent = TYPING_ROLES.join(" · ");
    const cursor = document.querySelector(".cursor");
    if (cursor) cursor.style.display = "none";
    return;
  }

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const current = TYPING_ROLES[roleIndex];
    target.textContent = current.slice(0, charIndex);

    if (!deleting && charIndex < current.length) {
      charIndex += 1;
      window.setTimeout(tick, 90);
      return;
    }
    if (!deleting && charIndex === current.length) {
      deleting = true;
      window.setTimeout(tick, 1200);
      return;
    }
    if (deleting && charIndex > 0) {
      charIndex -= 1;
      window.setTimeout(tick, 45);
      return;
    }
    deleting = false;
    roleIndex = (roleIndex + 1) % TYPING_ROLES.length;
    window.setTimeout(tick, 280);
  }

  tick();
}

function setupReveal() {
  const items = document.querySelectorAll(".reveal");
  if (prefersReducedMotion) {
    items.forEach((item) => item.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -40px 0px" }
  );

  items.forEach((item) => observer.observe(item));
}

function setupActiveNav() {
  const sections = document.querySelectorAll("main section[id]");
  const links = document.querySelectorAll(".nav-link");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        links.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === "#" + id);
        });
      });
    },
    { rootMargin: "-40% 0px -50% 0px", threshold: 0.1 }
  );

  sections.forEach((section) => observer.observe(section));
}

function setupBackToTop() {
  const button = document.getElementById("back-to-top");
  if (!button) return;

  window.addEventListener("scroll", () => {
    button.classList.toggle("visible", window.scrollY > 480);
  });

  button.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  });
}

function setupThemeToggle() {
  const button = document.querySelector(".theme-toggle");
  const label = document.querySelector(".theme-toggle-label");
  if (!button) return;

  const saved = localStorage.getItem("portfolio-theme");
  if (saved === "light") {
    document.documentElement.setAttribute("data-theme", "light");
  }

  function sync() {
    const light = document.documentElement.getAttribute("data-theme") === "light";
    button.setAttribute("aria-label", light ? "Switch to dark theme" : "Switch to light theme");
    if (label) label.textContent = light ? "Dark" : "Light";
  }

  sync();

  button.addEventListener("click", () => {
    const light = document.documentElement.getAttribute("data-theme") === "light";
    if (light) {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("portfolio-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("portfolio-theme", "light");
    }
    sync();
  });
}

function setupContactForm() {
  const form = document.getElementById("contact-form");
  const feedback = document.getElementById("form-feedback");
  if (!form || !feedback) return;

  const fields = ["name", "email", "subject", "message"];

  function setError(id, message) {
    const error = document.getElementById(id + "-error");
    const input = document.getElementById(id);
    if (error) error.textContent = message;
    if (input) input.setAttribute("aria-invalid", message ? "true" : "false");
  }

  function validate() {
    let valid = true;
    const values = {};

    fields.forEach((id) => {
      const input = document.getElementById(id);
      const value = (input.value || "").trim();
      values[id] = value;
      setError(id, "");

      if (!value) {
        setError(id, "This field is required.");
        valid = false;
      }
    });

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (values.email && !emailPattern.test(values.email)) {
      setError("email", "Enter a valid email address.");
      valid = false;
    }

    if (values.message && values.message.length < 12) {
      setError("message", "Please write a slightly longer message (at least 12 characters).");
      valid = false;
    }

    return { valid, values };
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const result = validate();
    feedback.classList.remove("success", "error");

    if (!result.valid) {
      feedback.classList.add("error");
      feedback.textContent = "Please fix the highlighted fields. Nothing was sent.";
      return;
    }

    feedback.classList.add("success");
    feedback.textContent =
      "The form is valid, but no email backend is configured. Copy your message and send it through LinkedIn or your real email once you add PROFILE.email in script.js.";
    form.reset();
    fields.forEach((id) => setError(id, ""));
  });
}

function setupFooterYear() {
  const year = document.getElementById("copyright-year");
  if (year) {
    year.textContent = "© " + new Date().getFullYear();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderSkills();
  renderProjects();
  applyExternalLinks();
  setupMobileNav();
  setupTyping();
  setupThemeToggle();
  setupContactForm();
  setupFooterYear();
  setupBackToTop();
  setupResume();
  initIcons();
  setupReveal();
  setupActiveNav();
});
