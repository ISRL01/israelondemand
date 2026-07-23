/* =========================================================================
   YOUR CONTENT — edit this object and the whole site rebuilds.
   -------------------------------------------------------------------------
   Headshot: keep headshot.jpg in this folder (or change `photo`).
   Add a project: copy one block in `projects` and change the fields.
     - diagram: path to an image/SVG in your repo (e.g. "diagrams/foo.svg"),
                or "" to show a placeholder.
     - video:   a YouTube video ID (the part after v=), or "" for none.
     - github / demo: links, or "" to hide that button.
   ========================================================================= */

const site = {
  name: "Israel Shobowale",
  title: "AWS Cloud Engineer",
  location: "Adelaide, Australia",
  tagline: "Methodical troubleshooter focused on least-privilege access, cloud-hosted apps, and clear documentation.",
  photo: "headshot.jpg",

  links: [
    { label: "GitHub",   href: "https://github.com/ISRL01" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/your-handle" },  // <- update
    { label: "Email",    href: "mailto:dammyshobo@gmail.com" }
  ],

  summary:
    "AWS cloud support engineer with 2+ years supporting business-critical documentation, " +
    "data and process workflows, plus hands-on, self-directed experience deploying and " +
    "troubleshooting cloud-hosted applications on AWS. I diagnose issues methodically, work " +
    "directly with stakeholders, and keep clear documentation. Currently studying for the " +
    "AWS Solutions Architect Associate certification.",

  skills: [
    "EC2", "Amazon S3", "CloudFormation", "CloudWatch", "Systems Manager",
    "IAM & least-privilege", "Infrastructure as Code", "Troubleshooting",
    "Log analysis", "Documentation", "AWS SAA (in progress)"
  ],

  experience: [
    {
      role: "Cloud Support Engineer",
      company: "Inclusive Lifestyle",
      dates: "Oct 2024 — Present",
      summary: "Day-to-day cloud support for a system storing sensitive client documentation and support records.",
      highlights: [
        "Monitor IAM access across the organisation's cloud environment, reviewing and restricting permissions to enforce least-privilege for staff and systems.",
        "Review CloudWatch logs daily for the application hosting client documentation and support records, checking for anomalies and access issues.",
        "Support operational continuity of a system storing sensitive client data, applying consistent monitoring discipline."
      ],
      tags: ["IAM", "CloudWatch", "Least-privilege"]
    },
    {
      role: "Cloud & Technology Intern",
      company: "SWEAT Pty",
      dates: "Feb 2024 — Jun 2024",
      summary: "Hands-on AWS project work — deployment, infrastructure-as-code, and live-fault troubleshooting.",
      highlights: [
        "Deployed and configured applications on AWS EC2 using CloudFormation, integrating S3 for media storage.",
        "Diagnosed a live application fault (broken image loading) via CloudWatch logs, traced it to a misconfigured CloudFormation resource, corrected it and redeployed.",
        "Administered infrastructure through AWS Systems Manager Session Manager, using least-privilege access in place of direct SSH.",
        "Applied EC2, S3, CloudWatch, IaC (CloudFormation) and IAM hands-on through project work rather than theory alone."
      ],
      tags: ["EC2", "CloudFormation", "S3", "Systems Manager"]
    }
  ],

  education: [
    { qualification: "Master of Business System Analytics (Adv)", institution: "Torrens University, Adelaide, Australia", dates: "2023 — 2024" },
    { qualification: "BSc, Management Information Systems", institution: "Eastern Mediterranean University, Turkey", dates: "2013 — 2018" }
  ],

  projects: [
    {
      id: "aws-portfolio",
      title: "This site, deployed on AWS",
      blurb: "A hand-coded static portfolio with a fully automated AWS deploy pipeline.",
      diagram: "",            // add e.g. "diagrams/aws-portfolio.svg"
      video: "",
      tech: ["S3", "CloudFront", "Route 53", "ACM", "GitHub Actions", "IAM / OIDC"],
      github: "https://github.com/ISRL01/israelondemand",
      demo: "https://israelondemand.com",
      writeup: [
        { type: "p", text: "The site you're reading is itself the project: a static portfolio built from plain HTML, CSS and JavaScript, hosted on AWS and deployed automatically on every git push." },
        { type: "h", text: "How it's built" },
        { type: "p", text: "Files live in S3, with CloudFront in front for HTTPS and global caching, and Route 53 pointing my domain at the distribution. There's no server and no database — the sidebar navigation is client-side JavaScript, so the whole thing stays static and cheap to run." },
        { type: "h", text: "The pipeline" },
        { type: "p", text: "GitHub Actions deploys on push using an IAM role assumed via OIDC — no long-lived access keys stored anywhere — scoped with least-privilege permissions to just this bucket. Editing the site is now: commit, push, done." }
      ]
    },
    {
      id: "tic-tac-toe",
      title: "Tic-tac-toe, playable here",
      blurb: "A browser game with two-player mode and an unbeatable computer opponent.",
      component: "tictactoe",   // renders the live game in place of a diagram
      diagram: "",
      video: "",
      tech: ["JavaScript", "Minimax", "DOM", "Accessibility"],
      github: "https://github.com/ISRL01/israelondemand",
      demo: "",
      writeup: [
        { type: "p", text: "A small game built in plain JavaScript \u2014 no framework, no build step. Play it above: switch between two-player and the computer opponent, which cannot be beaten." },
        { type: "h", text: "How the computer plays" },
        { type: "p", text: "The opponent uses minimax, a recursive algorithm that plays out every remaining sequence of moves and scores each one, assuming both sides play optimally. It then picks the move with the best guaranteed outcome. Wins are scored higher when they arrive sooner and losses lower when they arrive later, so it takes the quickest win available and stalls as long as possible when losing. The best any player can manage against it is a draw." },
        { type: "h", text: "Building it" },
        { type: "p", text: "Board state is a nine-item array, and a single check against the eight winning lines decides each turn's outcome. The interface re-renders from that state after every move, with one delegated click handler for the whole board. Squares are real buttons with labels, so the game is keyboard and screen-reader accessible." },
        { type: "h", text: "How it's deployed" },
        { type: "p", text: "It ships as part of this site \u2014 static files in GitHub, deployed automatically to AWS Amplify on every push, with no server or database behind it." }
      ]
    },
    {
      id: "ppl-tracker",
      title: "PPL strength-training tracker",
      blurb: "A push/pull/legs gym tracker built around a double-progression engine.",
      diagram: "",
      video: "",
      tech: ["React", "Vite", "Supabase", "PWA"],
      github: "",
      demo: "",
      writeup: [
        { type: "p", text: "A personal strength-training web app that plans and logs push/pull/legs sessions and drives progression automatically." },
        { type: "h", text: "What it does" },
        { type: "p", text: "The core is a double-progression engine: it tracks weight-and-reps against a configurable rep range and tells you when to add load. Every session closes with two ab exercises regardless of day type." },
        { type: "h", text: "Stack" },
        { type: "p", text: "Built with React + Vite on a Supabase backend (Postgres, row-level security), shipped PWA-first with a clean, auth-ready schema so features can be layered on without costly refactors." }
      ]
    }
  ]
};

/* =========================================================================
   Rendering + routing — you shouldn't need to edit below here.
   ========================================================================= */

const $ = (s) => document.querySelector(s);
const view = () => $("#view-main");
function esc(s) { return String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }
function initials(name) { return name.split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase(); }

/* ---- Sidebar (rendered once) ---- */
function renderSidebar() {
  $("#side-name").textContent = site.name;
  $("#side-title").textContent = site.title;
  document.title = site.name + " — Portfolio";

  const mount = $("#side-photo");
  const img = new Image();
  img.alt = site.name; img.src = site.photo;
  img.onload = () => { mount.innerHTML = ""; mount.appendChild(img); };
  img.onerror = () => { mount.innerHTML = '<span class="initials">' + initials(site.name) + "</span>"; };

  $("#side-links").innerHTML = site.links
    .map((l) => `<a href="${esc(l.href)}"${l.href.startsWith("http") ? ' target="_blank" rel="noopener"' : ""}>${esc(l.label)} \u2197</a>`)
    .join("");
}

/* ---- Resume view ---- */
function photoBlock(cls) {
  return `<span class="${cls}"><span class="initials">${initials(site.name)}</span></span>`;
}
function renderResume() {
  const exp = site.experience.map((job, i) => `
    <div class="entry reveal" data-entry="${i}">
      <button class="entry__header" type="button" aria-expanded="false">
        <span>
          <span class="entry__role">${esc(job.role)}</span>
          <span class="entry__company"><strong>${esc(job.company)}</strong></span>
        </span>
        <span class="entry__dates">${esc(job.dates)}</span>
        <span class="entry__chev">\u25be</span>
      </button>
      <div class="entry__panel"><div class="entry__inner"><div class="entry__body">
        ${job.summary ? `<p class="entry__summary">${esc(job.summary)}</p>` : ""}
        ${job.highlights && job.highlights.length ? `<ul class="entry__highlights">${job.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>` : ""}
        ${job.tags && job.tags.length ? `<ul class="tags">${job.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>` : ""}
      </div></div></div>
    </div>`).join("");

  view().innerHTML = `
    <section class="hero reveal">
      ${photoBlock("hero__photo")}
      <div>
        <h1 class="hero__name">${esc(site.name)}</h1>
        <p class="hero__title">${esc(site.title)}</p>
        <p class="hero__loc">${esc(site.location)}</p>
        <p class="hero__tagline">${esc(site.tagline)}</p>
      </div>
    </section>

    <section class="panel reveal">
      <h2 class="section-title">Profile</h2>
      <p class="summary">${esc(site.summary)}</p>
    </section>

    <section class="panel reveal">
      <div class="section-head">
        <h2 class="section-title">Experience</h2>
        <button id="toggle-all" class="ghost-btn" type="button">Expand all</button>
      </div>
      <div class="timeline">${exp}</div>
    </section>

    <section class="panel reveal">
      <h2 class="section-title">Skills</h2>
      <ul class="skills">${site.skills.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
    </section>

    <section class="panel reveal">
      <h2 class="section-title">Education</h2>
      <div class="education">${site.education.map((e) => `
        <div class="edu">
          <div class="edu__qual">${esc(e.qualification)}</div>
          <div class="edu__dates">${esc(e.dates)}</div>
          <div class="edu__inst">${esc(e.institution)}</div>
        </div>`).join("")}</div>
    </section>`;
  // swap in the real headshot if present
  swapPhoto(".hero__photo");
}

function swapPhoto(sel) {
  const mount = $(sel); if (!mount) return;
  const img = new Image();
  img.alt = site.name; img.src = site.photo;
  img.onload = () => { mount.innerHTML = ""; mount.appendChild(img); };
}

/* ---- Projects list ---- */
function renderProjects() {
  view().innerHTML = `
    <p class="eyebrow">Selected work</p>
    <h2 class="section-title">Projects</h2>
    <div class="proj-grid">
      ${site.projects.map((p) => `
        <a class="card reveal" href="#project/${esc(p.id)}">
          <span class="card__title">${esc(p.title)}</span>
          <span class="card__blurb">${esc(p.blurb)}</span>
          <span class="card__more">Read more \u2192</span>
        </a>`).join("")}
    </div>`;
}

/* ---- Single project ---- */
function renderProjectDetail(id) {
  const p = site.projects.find((x) => x.id === id);
  if (!p) { location.hash = "#projects"; return; }

  // A project can show a live interactive component instead of a diagram.
  const showcase = p.component
    ? `<div id="component-mount"></div>`
    : (p.diagram
        ? `<img class="diagram" src="${esc(p.diagram)}" alt="Architecture diagram for ${esc(p.title)}">`
        : `<div class="diagram-empty">architecture diagram \u2014 add an image path in the project's <code>diagram</code> field</div>`);

  const video = p.video
    ? `<div class="video"><iframe src="https://www.youtube.com/embed/${esc(p.video)}" title="${esc(p.title)} walkthrough" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`
    : (p.component ? "" : `<div class="video-empty">video walkthrough \u2014 add a YouTube video ID in the project's <code>video</code> field</div>`);

  const writeup = (p.writeup || []).map((b) =>
    b.type === "h" ? `<h3>${esc(b.text)}</h3>` : `<p>${esc(b.text)}</p>`).join("");

  const actions = [
    p.github ? `<a class="btn" href="${esc(p.github)}" target="_blank" rel="noopener">View code on GitHub \u2197</a>` : "",
    p.demo ? `<a class="btn btn--primary" href="${esc(p.demo)}" target="_blank" rel="noopener">Live demo \u2197</a>` : ""
  ].join("");

  view().innerHTML = `
    <a class="back" href="#projects">\u2190 All projects</a>
    <div class="proj-head reveal">
      <h1 class="proj-title">${esc(p.title)}</h1>
      <p class="proj-blurb">${esc(p.blurb)}</p>
      ${p.tech && p.tech.length ? `<ul class="tags">${p.tech.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>` : ""}
    </div>
    <div class="reveal">${showcase}</div>
    <div class="reveal">${video}</div>
    <div class="writeup reveal">${writeup}</div>
    ${actions ? `<div class="proj-actions reveal">${actions}</div>` : ""}`;

  if (p.component === "tictactoe" && window.mountTicTacToe) {
    window.mountTicTacToe(document.getElementById("component-mount"));
  }
}

/* ---- Router ---- */
function route() {
  const raw = location.hash.replace(/^#/, "") || "resume";
  const [section, id] = raw.split("/");

  if (section === "projects") renderProjects();
  else if (section === "project" && id) renderProjectDetail(id);
  else renderResume();

  const navSection = section === "project" ? "projects" : section;
  document.querySelectorAll(".side-nav a").forEach((a) =>
    a.classList.toggle("is-active", a.dataset.section === navSection));

  window.scrollTo(0, 0);
  setupReveal();
}

/* ---- Interactions (event delegation, survives re-renders) ---- */
function setupInteractions() {
  view().addEventListener("click", (e) => {
    const header = e.target.closest(".entry__header");
    if (header) {
      const entry = header.closest(".entry");
      const open = entry.classList.toggle("is-open");
      header.setAttribute("aria-expanded", String(open));
      syncToggleAll();
      return;
    }
    if (e.target.id === "toggle-all") {
      const entries = [...view().querySelectorAll(".entry")];
      const anyClosed = entries.some((x) => !x.classList.contains("is-open"));
      entries.forEach((x) => {
        x.classList.toggle("is-open", anyClosed);
        x.querySelector(".entry__header").setAttribute("aria-expanded", String(anyClosed));
      });
      syncToggleAll();
    }
  });
}
function syncToggleAll() {
  const btn = $("#toggle-all"); if (!btn) return;
  const entries = [...view().querySelectorAll(".entry")];
  const allOpen = entries.length && entries.every((x) => x.classList.contains("is-open"));
  btn.textContent = allOpen ? "Collapse all" : "Expand all";
}

/* ---- Theme ---- */
function setupTheme() {
  const root = document.documentElement, btn = $("#theme-toggle"), label = $("#theme-toggle-label");
  let saved = null; try { saved = localStorage.getItem("site-theme"); } catch (e) {}
  if (saved) root.setAttribute("data-theme", saved);
  const sync = () => {
    const dark = root.getAttribute("data-theme") === "dark";
    label.textContent = dark ? "Light" : "Dark";
    btn.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
  };
  sync();
  btn.addEventListener("click", () => {
    const dark = root.getAttribute("data-theme") === "dark";
    const next = dark ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("site-theme", next); } catch (e) {}
    sync();
  });
}

/* ---- Reveal on scroll ---- */
function setupReveal() {
  const items = [...view().querySelectorAll(".reveal:not(.is-visible)")];
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) { items.forEach((i) => i.classList.add("is-visible")); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); } });
  }, { threshold: 0.12 });
  items.forEach((i) => io.observe(i));
}

/* ---- Boot ---- */
document.addEventListener("DOMContentLoaded", () => {
  renderSidebar();
  setupInteractions();
  setupTheme();
  window.addEventListener("hashchange", route);
  route();
});
