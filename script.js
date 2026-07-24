/* =========================================================================
   Rendering + routing.
   -------------------------------------------------------------------------
   YOUR CONTENT LIVES IN content.json — you do not need to edit this file.
   Edit content.json directly, or open editor.html for a form-based editor.
   ========================================================================= */

let site = null;   // filled from content.json at startup

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

  $("#side-links").innerHTML = (site.links || [])
    .map((l) => `<a href="${esc(l.href)}"${l.href.startsWith("http") ? ' target="_blank" rel="noopener"' : ""}>${esc(l.label)} \u2197</a>`)
    .join("");

  renderVisits();
}

/* ---- Visitor counter (hides itself if not configured or unreachable) ---- */
function renderVisits() {
  const api = (site.visitsApi || "").trim();
  if (!api) return;

  const box = document.createElement("div");
  box.className = "visits";
  box.innerHTML = '<span class="visits__count">\u2014</span> visits';
  $("#side-links").appendChild(box);

  fetch(api, { method: "POST" })
    .then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then((d) => {
      const total = Number(d.visits).toLocaleString();
      const today = Number(d.today);
      box.innerHTML = `<span class="visits__count">${total}</span> visits` +
        (isFinite(today) ? ` <span class="visits__today">\u00b7 ${today.toLocaleString()} today</span>` : "");
      if (d.date) box.title = "Today = " + d.date;
    })
    .catch(() => box.remove());
}

/* shared hero block (name, title, tagline) */
function heroHTML() {
  return `
    <section class="hero reveal">
      <span class="hero__photo"><span class="initials">${initials(site.name)}</span></span>
      <div>
        <h1 class="hero__name">${esc(site.name)}</h1>
        <p class="hero__title">${esc(site.title)}</p>
        <p class="hero__loc">${esc(site.location)}</p>
        <p class="hero__tagline">${esc(site.tagline)}</p>
      </div>
    </section>`;
}

function skillsHTML() {
  return `<ul class="skills">${(site.skills || []).filter(Boolean).map((s) => `<li>${esc(s)}</li>`).join("")}</ul>`;
}

function certsHTML() {
  const certs = site.certifications || [];
  if (!certs.length) return "";
  return `<div class="education">${certs.map((c) => `
    <div class="edu">
      <div class="edu__qual">${esc(c.name)}</div>
      <div class="edu__dates">${esc(c.status || "")}</div>
      <div class="edu__inst">${esc(c.issuer || "")}</div>
    </div>`).join("")}</div>`;
}

/* ---- Home / intro view ---- */
function renderHome() {
  view().innerHTML = `
    ${heroHTML()}

    <section class="panel reveal">
      <p class="summary">${esc(site.summary)}</p>
    </section>

    <section class="panel reveal">
      <h2 class="section-title">Skills</h2>
      ${skillsHTML()}
    </section>

    ${site.certifications && site.certifications.length ? `
    <section class="panel reveal">
      <h2 class="section-title">Certifications</h2>
      ${certsHTML()}
    </section>` : ""}

    <div class="proj-actions reveal">
      <a class="btn btn--primary" href="#resume">See full r\u00e9sum\u00e9 \u2192</a>
      <a class="btn" href="#projects">View projects \u2197</a>
    </div>`;

  swapPhoto(".hero__photo");
}

/* ---- Resume view (full detail) ---- */
function renderResume() {
  const exp = (site.experience || []).map((job, i) => `
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
    <a class="back" href="#home">\u2190 Home</a>
    ${heroHTML()}

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
      ${skillsHTML()}
    </section>

    ${site.certifications && site.certifications.length ? `
    <section class="panel reveal">
      <h2 class="section-title">Certifications</h2>
      ${certsHTML()}
    </section>` : ""}

    <section class="panel reveal">
      <h2 class="section-title">Education</h2>
      <div class="education">${(site.education || []).map((e) => `
        <div class="edu">
          <div class="edu__qual">${esc(e.qualification)}</div>
          <div class="edu__dates">${esc(e.dates)}</div>
          <div class="edu__inst">${esc(e.institution)}</div>
        </div>`).join("")}</div>
    </section>`;

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
      ${(site.projects || []).map((p) => `
        <a class="card reveal" href="#project/${esc(p.id)}">
          <span class="card__title">${esc(p.title)}</span>
          <span class="card__blurb">${esc(p.blurb)}</span>
          <span class="card__more">Read more \u2192</span>
        </a>`).join("")}
    </div>`;
}

/* ---- Single project ---- */
function renderProjectDetail(id) {
  const p = (site.projects || []).find((x) => x.id === id);
  if (!p) { location.hash = "#projects"; return; }

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
  const raw = location.hash.replace(/^#/, "") || "home";
  const parts = raw.split("/");
  const section = parts[0], id = parts[1];

  if (section === "projects") renderProjects();
  else if (section === "project" && id) renderProjectDetail(id);
  else if (section === "resume") renderResume();
  else renderHome();

  const navSection = section === "project" ? "projects" : (section || "home");
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
      const entries = [].slice.call(view().querySelectorAll(".entry"));
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
  const entries = [].slice.call(view().querySelectorAll(".entry"));
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
  const items = [].slice.call(view().querySelectorAll(".reveal:not(.is-visible)"));
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) { items.forEach((i) => i.classList.add("is-visible")); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); } });
  }, { threshold: 0.12 });
  items.forEach((i) => io.observe(i));
}

/* ---- Boot: load content, then render ---- */
document.addEventListener("DOMContentLoaded", () => {
  setupTheme();

  fetch("content.json", { cache: "no-cache" })
    .then((r) => { if (!r.ok) throw new Error("content.json " + r.status); return r.json(); })
    .then((data) => {
      site = data;
      renderSidebar();
      setupInteractions();
      window.addEventListener("hashchange", route);
      route();
    })
    .catch((err) => {
      console.error(err);
      view().innerHTML =
        '<div class="load-error"><h2>Could not load content.json</h2>' +
        "<p>If you opened index.html by double-clicking it, the browser blocks reading local files. " +
        "Use VS Code&rsquo;s <strong>Live Preview</strong> instead (right-click index.html &rarr; Show Preview). " +
        "On the live site, check that <code>content.json</code> sits next to <code>index.html</code>.</p></div>";
    });
});
