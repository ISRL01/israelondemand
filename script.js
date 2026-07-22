/* =========================================================================
   YOUR RESUME CONTENT
   -------------------------------------------------------------------------
   This is the only part you need to edit. Replace the placeholder text below
   with your own details. The page rebuilds itself from this object — you do
   not need to touch index.html or styles.css.

   Headshot: put your image in this same folder and name it "headshot.jpg"
   (or change `photo` below to your filename). If the image is missing, your
   initials show automatically.
   ========================================================================= */

const resume = {
  name: "Israel Shobo",
  title: "AWS Cloud Support Engineer",
  location: "Adelaide, Australia",
  tagline: "Methodical troubleshooter focused on least-privilege access, cloud-hosted apps, and clear documentation.",
  photo: "headshot.jpg",

  contacts: [
    { label: "Email", text: "dammyshobo@gmail.com", href: "mailto:dammyshobo@gmail.com" },
    { label: "Phone", text: "0432 704 934",         href: "tel:+61432704934" }
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

  // Newest role first. Each entry becomes an interactive timeline item.
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
    {
      qualification: "Master of Business System Analytics (Adv)",
      institution: "Torrens University, Adelaide, Australia",
      dates: "2023 — 2024",
      detail: ""
    },
    {
      qualification: "BSc, Management Information Systems",
      institution: "Eastern Mediterranean University, Turkey",
      dates: "2013 — 2018",
      detail: ""
    }
  ]
};

/* =========================================================================
   Rendering + interactivity — you shouldn't need to change anything below.
   ========================================================================= */

const $ = (sel) => document.querySelector(sel);

function el(tag, className, html) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (html != null) node.innerHTML = html;
  return node;
}

function initials(name) {
  return name.split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();
}

/* ---- Header / identity ---- */
function renderProfile() {
  $("#name").textContent = resume.name;
  $("#title").textContent = resume.title;
  $("#location").textContent = resume.location;
  $("#tagline").textContent = resume.tagline;
  document.title = resume.name + " — Resume";

  const mount = $("#photo-mount");
  const img = new Image();
  img.alt = resume.name;
  img.src = resume.photo;
  img.onload = () => { mount.innerHTML = ""; mount.appendChild(img); };
  img.onerror = () => { mount.innerHTML = ""; mount.appendChild(el("div", "initials", initials(resume.name))); };
}

/* ---- Contacts ---- */
function renderContacts() {
  const list = $("#contacts");
  resume.contacts.forEach((c) => {
    const li = el("li");
    li.appendChild(el("span", "label", c.label));
    const a = el("a", null, c.text);
    a.href = c.href;
    if (c.href.startsWith("http")) { a.target = "_blank"; a.rel = "noopener"; }
    li.appendChild(a);
    list.appendChild(li);
  });
}

/* ---- Skills ---- */
function renderSkills() {
  const list = $("#skills");
  resume.skills.forEach((s) => list.appendChild(el("li", null, s)));
}

/* ---- Summary ---- */
function renderSummary() { $("#summary").textContent = resume.summary; }

/* ---- Interactive experience timeline ---- */
function renderTimeline() {
  const wrap = $("#timeline");

  resume.experience.forEach((job, i) => {
    const entry = el("div", "entry reveal");

    const panelId = "panel-" + i;
    const header = el("button", "entry__header");
    header.type = "button";
    header.setAttribute("aria-expanded", "false");
    header.setAttribute("aria-controls", panelId);

    const roleWrap = el("div");
    roleWrap.appendChild(el("div", "entry__role", job.role));
    roleWrap.appendChild(el("div", "entry__company", "<strong>" + job.company + "</strong>"));

    header.appendChild(roleWrap);
    header.appendChild(el("div", "entry__dates", job.dates));
    header.appendChild(el("div", "entry__chev", "▾"));

    // Expandable panel
    const panel = el("div", "entry__panel");
    panel.id = panelId;
    const inner = el("div", "entry__inner");
    const body = el("div", "entry__body");

    if (job.summary) body.appendChild(el("p", "entry__summary", job.summary));

    if (job.highlights && job.highlights.length) {
      const ul = el("ul", "entry__highlights");
      job.highlights.forEach((h) => ul.appendChild(el("li", null, h)));
      body.appendChild(ul);
    }

    if (job.tags && job.tags.length) {
      const tags = el("ul", "tags");
      job.tags.forEach((t) => tags.appendChild(el("li", null, t)));
      body.appendChild(tags);
    }

    inner.appendChild(body);
    panel.appendChild(inner);

    header.addEventListener("click", () => toggleEntry(entry, header));

    entry.appendChild(header);
    entry.appendChild(panel);
    wrap.appendChild(entry);
  });
}

function toggleEntry(entry, header) {
  const open = entry.classList.toggle("is-open");
  header.setAttribute("aria-expanded", String(open));
  syncToggleAll();
}

/* ---- Expand all / collapse all ---- */
function setupToggleAll() {
  $("#toggle-all").addEventListener("click", () => {
    const entries = [...document.querySelectorAll(".entry")];
    const anyClosed = entries.some((e) => !e.classList.contains("is-open"));
    entries.forEach((e) => {
      e.classList.toggle("is-open", anyClosed);
      e.querySelector(".entry__header").setAttribute("aria-expanded", String(anyClosed));
    });
    syncToggleAll();
  });
}

function syncToggleAll() {
  const entries = [...document.querySelectorAll(".entry")];
  const allOpen = entries.length && entries.every((e) => e.classList.contains("is-open"));
  const btn = $("#toggle-all");
  btn.textContent = allOpen ? "Collapse all" : "Expand all";
  btn.setAttribute("aria-pressed", String(!!allOpen));
}

/* ---- Education ---- */
function renderEducation() {
  const wrap = $("#education");
  resume.education.forEach((e) => {
    const card = el("div", "edu reveal");
    card.appendChild(el("div", "edu__qual", e.qualification));
    card.appendChild(el("div", "edu__dates", e.dates));
    card.appendChild(el("div", "edu__inst", e.institution));
    if (e.detail) card.appendChild(el("div", "edu__detail", e.detail));
    wrap.appendChild(card);
  });
}

/* ---- Theme toggle (persists in this browser) ---- */
function setupTheme() {
  const root = document.documentElement;
  const btn = $("#theme-toggle");
  const label = $("#theme-toggle-label");

  let saved = null;
  try { saved = localStorage.getItem("resume-theme"); } catch (e) { /* ignore */ }
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
    try { localStorage.setItem("resume-theme", next); } catch (e) { /* ignore */ }
    sync();
  });
}

/* ---- Scroll-reveal (skips if reduced motion) ---- */
function setupReveal() {
  const items = [...document.querySelectorAll(".reveal")];
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) {
    items.forEach((i) => i.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); io.unobserve(entry.target); }
    });
  }, { threshold: 0.15 });
  items.forEach((i) => io.observe(i));
}

/* ---- Boot ---- */
document.addEventListener("DOMContentLoaded", () => {
  renderProfile();
  renderContacts();
  renderSkills();
  renderSummary();
  renderTimeline();
  renderEducation();
  setupToggleAll();
  syncToggleAll();
  setupTheme();
  setupReveal();
});
