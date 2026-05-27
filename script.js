const yearEl = document.getElementById("year");
const themeToggle = document.getElementById("themeToggle");
const printBtn = document.getElementById("printBtn");
const themeIcon = document.getElementById("themeIcon");
const printIcon = document.getElementById("printIcon");
const quickNavLinks = [...document.querySelectorAll(".hero__quick-nav a")];
let forcePrintLight = false;

const setText = (id, value) => {
  const el = document.getElementById(id);
  if (el && typeof value === "string") el.textContent = value;
};

const getContactIcon = (label, url = "") => {
  const key = `${label} ${url}`.toLowerCase();

  if (key.includes("mail") || key.includes("email")) {
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6.75A1.75 1.75 0 0 1 4.75 5h14.5A1.75 1.75 0 0 1 21 6.75v10.5A1.75 1.75 0 0 1 19.25 19H4.75A1.75 1.75 0 0 1 3 17.25V6.75zm1.8.15L12 12.2l7.2-5.3a.25.25 0 0 0 .05-.05.25.25 0 0 0-.2-.1H4.95a.25.25 0 0 0-.2.1zM19.25 17.5a.25.25 0 0 0 .25-.25V8.77l-7.06 5.2a.75.75 0 0 1-.88 0L4.5 8.77v8.48c0 .14.11.25.25.25h14.5z"></path></svg>';
  }
  if (key.includes("github")) {
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .75A11.25 11.25 0 0 0 .75 12c0 4.98 3.23 9.2 7.71 10.7.56.11.77-.24.77-.54 0-.27-.01-1.16-.02-2.1-3.14.68-3.8-1.34-3.8-1.34-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.68.08-.68 1.13.08 1.72 1.16 1.72 1.16 1 .17 2.63.72 3.27.53.1-.73.39-1.23.71-1.51-2.5-.29-5.13-1.25-5.13-5.55 0-1.23.44-2.23 1.16-3.01-.12-.29-.5-1.47.11-3.07 0 0 .95-.3 3.11 1.15A10.83 10.83 0 0 1 12 6.47c.96 0 1.93.13 2.83.39 2.15-1.45 3.1-1.15 3.1-1.15.62 1.6.24 2.78.12 3.07.72.78 1.15 1.78 1.15 3.01 0 4.31-2.63 5.25-5.14 5.54.4.35.77 1.03.77 2.08 0 1.5-.02 2.71-.02 3.08 0 .3.2.66.78.54A11.25 11.25 0 0 0 23.25 12 11.25 11.25 0 0 0 12 .75z"></path></svg>';
  }
  if (key.includes("linkedin")) {
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.5 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM4 9h3v11H4V9zm5 0h2.88v1.5h.04c.4-.76 1.4-1.56 2.88-1.56 3.08 0 3.65 2.02 3.65 4.65V20h-3v-5.64c0-1.35-.02-3.08-1.88-3.08-1.88 0-2.17 1.47-2.17 2.98V20H9V9z"></path></svg>';
  }
  return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.25a9.75 9.75 0 1 0 0 19.5 9.75 9.75 0 0 0 0-19.5zm7.97 9h-3.02a15.9 15.9 0 0 0-1.01-5.03 8.28 8.28 0 0 1 4.03 5.03zM12 4.1c.62.9 1.52 3.12 1.88 7.15h-3.76C10.48 7.22 11.38 5 12 4.1zm-3.94 2.12a15.9 15.9 0 0 0-1.01 5.03H4.03a8.28 8.28 0 0 1 4.03-5.03zM4.03 12.75h3.02c.12 1.84.48 3.6 1.01 5.03a8.28 8.28 0 0 1-4.03-5.03zM12 19.9c-.62-.9-1.52-3.12-1.88-7.15h3.76c-.36 4.03-1.26 6.25-1.88 7.15zm3.94-2.12c.53-1.43.89-3.19 1.01-5.03h3.02a8.28 8.28 0 0 1-4.03 5.03z"></path></svg>';
};

const setSectionVisible = (sectionId, visible) => {
  const section = document.getElementById(sectionId);
  if (!section) return;
  section.style.display = visible ? "" : "none";

  const link = document.querySelector(`.hero__quick-nav a[href="#${sectionId}"]`);
  if (link) link.style.display = visible ? "" : "none";
};

const isNonEmptyText = (value) => typeof value === "string" && value.trim().length > 0;

const countMeaningfulItems = (items) => {
  if (!Array.isArray(items)) return 0;
  return items.filter((item) => {
    if (isNonEmptyText(item)) return true;
    if (item && typeof item === "object") {
      return isNonEmptyText(item.text) || isNonEmptyText(item.title);
    }
    return false;
  }).length;
};

const renderPortfolio = (data) => {
  setText("heroRole", data.hero?.role);
  setText("heroName", data.hero?.name);
  setText("heroTagline", data.hero?.tagline);
  setText("introText", data.intro?.text);

  const contactList = document.getElementById("contactList");
  if (contactList) {
    const contacts = (data.hero?.contacts || []).filter(
      (c) => c && isNonEmptyText(c.value) && isNonEmptyText(c.url)
    );
    contactList.innerHTML = contacts
      .map(
        (contact) => `
          <li>
            <span class="contact-icon">${getContactIcon(contact.label, contact.url)}</span>
            <a href="${contact.url}" target="_blank" rel="noreferrer">${contact.value}</a>
          </li>
        `
      )
      .join("");
    contactList.style.display = contacts.length > 0 ? "" : "none";
  }

  const statsList = document.getElementById("statsList");
  if (statsList) {
    const stats = (data.intro?.stats || []).filter(
      (s) => s && isNonEmptyText(s.value) && isNonEmptyText(s.label)
    );
    statsList.innerHTML = stats
      .map(
        (stat) => `
          <article>
            <h3>${stat.value}</h3>
            <p>${stat.label}</p>
          </article>
        `
      )
      .join("");
    statsList.style.display = stats.length > 0 ? "" : "none";
  }

  const experienceList = document.getElementById("experienceList");
  if (experienceList) {
    const exp = (data.experience || []).filter(
      (e) => e && (isNonEmptyText(e.period) || isNonEmptyText(e.title) || countMeaningfulItems(e.items) > 0)
    );
    experienceList.innerHTML = exp
      .map(
        (exp) => `
          <article class="dated-item">
            <div class="dated-item__date">${exp.period || ""}</div>
            <div class="dated-item__body">
              <h3 class="dated-item__title">${exp.title || ""}</h3>
              <ul class="dated-item__list">${(exp.items || []).map((item) => `<li>${item}</li>`).join("")}</ul>
            </div>
          </article>
        `
      )
      .join("");
    setSectionVisible("experience", exp.length > 0);
  }

  const projectList = document.getElementById("projectList");
  if (projectList) {
    const projects = (data.project || []).filter(
      (p) => p && (isNonEmptyText(p.title) || isNonEmptyText(p.description) || countMeaningfulItems(p.highlights) > 0)
    );
    projectList.innerHTML = projects
      .map((project) => {
        const title = typeof project.title === "string" ? project.title : "";
        const period = typeof project.period === "string" ? project.period : "";
        const role = typeof project.role === "string" ? project.role : "";
        const desc = typeof project.description === "string" ? project.description : "";
        const github = typeof project.github === "string" ? project.github : "";
        const url = typeof project.url === "string" ? project.url : "";
        const bullets = Array.isArray(project.highlights)
          ? project.highlights.filter(isNonEmptyText)
          : [];

        const linkParts = [];
        if (github) linkParts.push(`<a class="project-item__link" href="${github}" target="_blank" rel="noreferrer">GitHub ↗</a>`);
        if (url) linkParts.push(`<a class="project-item__link" href="${url}" target="_blank" rel="noreferrer">Live ↗</a>`);

        return `
          <article class="dated-item">
            <div class="dated-item__date">${period}</div>
            <div class="dated-item__body">
              <div class="project-item__header">
                <div class="project-item__header-left">
                  <h3 class="dated-item__title">${title}</h3>
                  ${role ? `<span class="project-item__role">${role}</span>` : ""}
                </div>
                ${linkParts.length ? `<div class="project-item__links">${linkParts.join('<span class="project-item__sep">·</span>')}</div>` : ""}
              </div>
              ${desc ? `<p class="dated-item__subtitle">${desc}</p>` : ""}
              ${bullets.length ? `
                <div>
                  <span class="project-item__problems-label">주요 성과</span>
                  <ul class="dated-item__list">${bullets.map((b) => `<li>${b}</li>`).join("")}</ul>
                </div>` : ""}
            </div>
          </article>
        `;
      })
      .join("");
    setSectionVisible("projects", projects.length > 0);
  }

  const skillGroups = document.getElementById("skillGroups");
  if (skillGroups) {
    const skills = (data.skills || []).filter(
      (s) => s && (isNonEmptyText(s.group) || isNonEmptyText(s.items))
    );
    skillGroups.innerHTML = skills
      .map(
        (skill) => `
          <article>
            <h3>${skill.group}</h3>
            <p>${skill.items}</p>
          </article>
        `
      )
      .join("");
    setSectionVisible("skills", skills.length > 0);
  }

  const presentationList = document.getElementById("presentationList");
  if (presentationList) {
    const presentation = (data.presentation || []).filter(
      (p) => p && isNonEmptyText(p.year) && isNonEmptyText(p.title)
    );
    presentationList.innerHTML = presentation
      .map((item) => {
        const bullets = Array.isArray(item.items) ? item.items.filter(isNonEmptyText) : [];
        return `
          <li class="dated-item">
            <div class="dated-item__date">${item.year}</div>
            <div class="dated-item__body">
              <div class="dated-item__text">${item.title}</div>
              ${bullets.length ? `<ul class="dated-item__list">${bullets.map((b) => `<li>${b}</li>`).join("")}</ul>` : ""}
            </div>
          </li>
        `;
      })
      .join("");
    setSectionVisible("presentation", presentation.length > 0);
  }

  const articleList = document.getElementById("articleList");
  if (articleList) {
    const articles = (data.article || []).filter(isNonEmptyText);
    articleList.innerHTML = articles.map((item) => `<li>${item}</li>`).join("");
    setSectionVisible("article", articles.length > 0);
  }

  const openSourceList = document.getElementById("openSourceList");
  if (openSourceList) {
    const oss = (data.openSource || []).filter(isNonEmptyText);
    openSourceList.innerHTML = oss.map((item) => `<li>${item}</li>`).join("");
    setSectionVisible("open-source", oss.length > 0);
  }

  const educationList = document.getElementById("educationList");
  if (educationList) {
    const education = (data.education || []).filter((item) => {
      if (typeof item === "string") return isNonEmptyText(item);
      if (item && typeof item === "object") return isNonEmptyText(item.title);
      return false;
    });
    educationList.innerHTML = education.map((item) => {
      if (typeof item === "string") return `<li>${item}</li>`;
      const date = typeof item.date === "string" ? item.date : "";
      const title = typeof item.title === "string" ? item.title : "";
      const subtitle = typeof item.subtitle === "string" ? item.subtitle : "";
      return `
        <li class="dated-item">
          ${date ? `<div class="dated-item__date">${date}</div>` : ""}
          <div class="dated-item__body">
            <span class="dated-item__text">${title}</span>
            ${subtitle ? `<p class="dated-item__subtitle">${subtitle}</p>` : ""}
          </div>
        </li>`;
    }).join("");
    setSectionVisible("education", education.length > 0);
  }

  const etcList = document.getElementById("etcList");
  if (etcList) {
    const etc = (data.etc || []).filter((item) => {
      if (typeof item === "string") return isNonEmptyText(item);
      if (item && typeof item === "object") return isNonEmptyText(item.text) || isNonEmptyText(item.title);
      return false;
    });
    etcList.innerHTML = etc
      .map((item) => {
        if (typeof item === "string") return `<li class="dated-item"><div class="dated-item__body"><span class="dated-item__text">${item}</span></div></li>`;
        if (!item || typeof item !== "object") return "";

        const date = typeof item.date === "string" ? item.date : "";
        const text =
          typeof item.text === "string"
            ? item.text
            : typeof item.title === "string"
              ? item.title
              : "";

        if (!date) return `<li class="dated-item"><div class="dated-item__body"><span class="dated-item__text">${text}</span></div></li>`;
        return `<li class="dated-item"><div class="dated-item__date">${date}</div><div class="dated-item__body"><span class="dated-item__text">${text}</span></div></li>`;
      })
      .join("");
    setSectionVisible("etc", etc.length > 0);
  }

  const hasIntro = isNonEmptyText(data.intro?.text) || countMeaningfulItems(data.intro?.stats) > 0;
  setSectionVisible("intro", hasIntro);

  setText("footerName", data.footerName);
};

const setupUiInteractions = () => {
  const applyButtonIcons = () => {
    const isDark = document.body.classList.contains("dark");
    if (themeIcon) {
      themeIcon.src = isDark
        ? "./assets/icons/DarkModeButton.svg"
        : "./assets/icons/LightModeButton.svg";
    }
    if (printIcon) {
      printIcon.src = isDark
        ? "./assets/icons/DarkModeDownloadButton.svg"
        : "./assets/icons/LightModeDownloadButton.svg";
    }
  };

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }
  applyButtonIcons();

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem(
      "theme",
      document.body.classList.contains("dark") ? "dark" : "light"
    );
    applyButtonIcons();
  });

  printBtn.addEventListener("click", () => {
    forcePrintLight = true;
    document.body.classList.add("print-light");
    window.print();
  });

  window.addEventListener("afterprint", () => {
    if (forcePrintLight) {
      document.body.classList.remove("print-light");
      forcePrintLight = false;
    }
  });

  const sections = quickNavLinks
    .map((link) => {
      const section = document.querySelector(link.getAttribute("href"));
      return section ? { link, section } : null;
    })
    .filter(Boolean);

  const onScroll = () => {
    const y = window.scrollY + window.innerHeight * 0.35;
    sections.forEach(({ link, section }) => {
      const inView = y >= section.offsetTop && y < section.offsetTop + section.offsetHeight;
      link.classList.toggle("active", inView);
    });
  };

  window.addEventListener("scroll", onScroll);
  onScroll();
};

const init = async () => {
  try {
    const response = await fetch("./data/portfolio.json");
    const portfolio = await response.json();
    renderPortfolio(portfolio);
  } catch (error) {
    console.error("Failed to load portfolio data:", error);
  } finally {
    yearEl.textContent = new Date().getFullYear();
    setupUiInteractions();
  }
};

init();
