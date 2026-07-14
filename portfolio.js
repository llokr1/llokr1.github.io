const yearEl = document.getElementById("year");
const printBtn = document.getElementById("printBtn");
const quickNavLinks = [...document.querySelectorAll(".hero__quick-nav a")];

const setText = (id, value) => {
  const el = document.getElementById(id);
  if (el && typeof value === "string") el.textContent = value;
};

const isNonEmptyText = (value) => typeof value === "string" && value.trim().length > 0;

const setSectionVisible = (sectionId, visible) => {
  const section = document.getElementById(sectionId);
  if (!section) return;
  section.style.display = visible ? "" : "none";

  const link = document.querySelector(`.hero__quick-nav a[href="#${sectionId}"]`);
  if (link) link.style.display = visible ? "" : "none";
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

const contactListHtml = (contacts) =>
  (contacts || [])
    .filter((c) => c && isNonEmptyText(c.value) && isNonEmptyText(c.url))
    .map(
      (c) => `
        <li>
          <span class="contact-icon">${getContactIcon(c.label, c.url)}</span>
          <a href="${c.url}" target="_blank" rel="noreferrer">${c.value}</a>
        </li>
      `
    )
    .join("");

const highlightKeywords = (text, keywords) => {
  if (!isNonEmptyText(text) || !Array.isArray(keywords)) return text;
  return keywords.filter(isNonEmptyText).reduce(
    (result, word) => result.split(word).join(`<span class="hero__keyword">${word}</span>`),
    text
  );
};

const renderHero = (hero) => {
  const heroGreeting = document.getElementById("heroGreeting");
  if (heroGreeting) {
    const leadText = isNonEmptyText(hero.greetingLead)
      ? highlightKeywords(hero.greetingLead, hero.greetingKeywords)
      : "";
    const lead = leadText ? `${leadText} ` : "";
    const name = isNonEmptyText(hero.name)
      ? `<span class="hero__name">${hero.name}</span>입니다.`
      : "";
    heroGreeting.innerHTML = name ? `안녕하세요, ${lead}${name}` : "안녕하세요.";
  }

  const philosophyList = document.getElementById("heroPhilosophy");
  if (philosophyList) {
    const items = (hero.philosophy || []).filter(
      (p) => p && isNonEmptyText(p.label) && isNonEmptyText(p.text)
    );
    philosophyList.innerHTML = items
      .map((p) => `<dt>${p.label}</dt><dd>${p.text}</dd>`)
      .join("");
  }

  const contactList = document.getElementById("contactList");
  if (contactList) contactList.innerHTML = contactListHtml(hero.contacts);
};

const renderSkills = (skills) => {
  const skillGroups = document.getElementById("skillGroups");
  if (!skillGroups) return;
  const entries = (skills || []).filter((s) => s && isNonEmptyText(s.name));
  skillGroups.innerHTML = entries
    .map((s) => {
      const points = Array.isArray(s.context) ? s.context.filter(isNonEmptyText) : [];
      return `
        <article>
          <h3>${s.name}</h3>
          ${points.length ? `<ul class="skill-context">${points.map((p) => `<li>${p}</li>`).join("")}</ul>` : ""}
        </article>
      `;
    })
    .join("");
  setSectionVisible("skills", entries.length > 0);
};

const VIDEO_EXTENSIONS = [".mp4", ".webm", ".mov", ".ogg", ".ogv"];

const isVideoSrc = (src) => {
  const clean = src.split("?")[0].split("#")[0].toLowerCase();
  return VIDEO_EXTENSIONS.some((ext) => clean.endsWith(ext));
};

const renderMediaItem = (item, fallbackAlt) => {
  const src = typeof item === "string" ? item : item?.src;
  if (!isNonEmptyText(src)) return "";
  const explicitAlt = typeof item === "object" && isNonEmptyText(item?.alt) ? item.alt : "";
  const alt = explicitAlt || fallbackAlt || "";
  const caption = explicitAlt ? `<p class="project-media-item__caption">${explicitAlt}</p>` : "";

  if (isVideoSrc(src)) {
    const poster = typeof item === "object" && isNonEmptyText(item?.poster) ? ` poster="${item.poster}"` : "";
    return `
      <div class="project-media-item project-media-item--video">
        <video src="${src}" controls muted playsinline${poster}></video>
        <p class="project-media-item__print-fallback">🎬 동영상(웹 버전에서 재생 가능): <a href="${src}" target="_blank" rel="noreferrer">${src}</a></p>
        ${caption}
      </div>
    `;
  }

  return `
    <div class="project-media-item project-media-item--image">
      <img src="${src}" alt="${alt}" />
      ${caption}
    </div>
  `;
};

const renderMediaBlock = (project) => {
  const items = Array.isArray(project.media)
    ? project.media.filter((m) => isNonEmptyText(typeof m === "string" ? m : m?.src))
    : [];

  if (!items.length) {
    return `<div class="project-image-placeholder">사진/동영상을 1~2개 추가해주세요</div>`;
  }

  const itemsHtml = items.slice(0, 2).map((item) => renderMediaItem(item, project.title)).join("");
  return `<div class="project-media">${itemsHtml}</div>`;
};

const renderProjects = (projects) => {
  const projectList = document.getElementById("projectList");
  if (!projectList) return;

  const isPlaceholder = (text) => typeof text === "string" && text.trim().startsWith("[");
  const entries = (projects || []).filter((p) => p && isNonEmptyText(p.title));

  projectList.innerHTML = entries
    .map((project) => {
      const stack = Array.isArray(project.stack) ? project.stack.filter(isNonEmptyText) : [];
      const hasResult = (r) => (Array.isArray(r) ? r.some(isNonEmptyText) : isNonEmptyText(r));
      const contributions = Array.isArray(project.contribution)
        ? project.contribution.filter((c) => c && (isNonEmptyText(c.summary) || isNonEmptyText(c.detail) || hasResult(c.result)))
        : [];
      const relatedLinks = Array.isArray(project.links)
        ? project.links.filter((l) => l && isNonEmptyText(l.url))
        : [];
      const links = [];
      if (isNonEmptyText(project.github)) links.push(`<a href="${project.github}" target="_blank" rel="noreferrer">GitHub ↗</a>`);
      if (isNonEmptyText(project.url)) links.push(`<a href="${project.url}" target="_blank" rel="noreferrer">Live ↗</a>`);

      const mediaBlock = renderMediaBlock(project);

      return `
        <article class="project-block print-page">
          <div class="project-block__text">
            <div class="project-block__header">
              <div class="project-block__header-left">
                <h3 class="project-block__title">${project.title || ""}</h3>
                ${project.role ? `<span class="role">${project.role}</span>` : ""}
                <span class="project-block__period">${project.period || ""}</span>
              </div>
              ${links.length ? `<div class="project-block__links">${links.join("")}</div>` : ""}
            </div>
            ${project.description ? `<p class="project-block__oneliner">${project.description}</p>` : ""}
            ${stack.length ? `<div class="project-block__stack">${stack.map((s) => `<span>${s}</span>`).join("")}</div>` : ""}

            ${
              contributions.length
                ? `<div class="story-block">
                    <span class="story-block__label">My Contribution</span>
                    <div class="contribution-list">
                      ${contributions
                        .map((c) => {
                          const details = Array.isArray(c.detail)
                            ? c.detail.filter(isNonEmptyText)
                            : isNonEmptyText(c.detail)
                              ? [c.detail]
                              : [];
                          const results = Array.isArray(c.result)
                            ? c.result.filter(isNonEmptyText)
                            : isNonEmptyText(c.result)
                              ? [c.result]
                              : [];
                          return `
                            <div class="contribution-item">
                              ${c.summary ? `<p class="contribution-item__summary${isPlaceholder(c.summary) ? " is-placeholder" : ""}">${c.summary}</p>` : ""}
                              ${details.length ? `<ul class="contribution-item__detail">${details.map((d) => `<li${isPlaceholder(d) ? ' class="is-placeholder"' : ""}>${d}</li>`).join("")}</ul>` : ""}
                              ${results.length ? `<ul class="contribution-item__result">${results.map((r) => `<li${isPlaceholder(r) ? ' class="is-placeholder"' : ""}>★ ${r}</li>`).join("")}</ul>` : ""}
                            </div>
                          `;
                        })
                        .join("")}
                    </div>
                  </div>`
                : ""
            }
            ${
              relatedLinks.length
                ? `<div class="story-block">
                    <span class="story-block__label">관련 링크</span>
                    <ul>${relatedLinks.map((l) => `<li><a href="${l.url}" target="_blank" rel="noreferrer">${l.label || l.url} ↗</a></li>`).join("")}</ul>
                  </div>`
                : ""
            }
          </div>
          <div class="project-block__media">${mediaBlock}</div>
        </article>
      `;
    })
    .join("");

  setSectionVisible("project", entries.length > 0);
};

const renderExperience = (experience) => {
  const experienceList = document.getElementById("experienceList");
  if (!experienceList) return;
  const entries = (experience || []).filter((exp) => exp && isNonEmptyText(exp.title));
  experienceList.innerHTML = entries
    .map((exp) => {
      const items = Array.isArray(exp.items)
        ? exp.items.filter((i) => i && isNonEmptyText(i.summary))
        : [];
      return `
        <article class="exp-block print-page">
          <div class="project-block__header">
            <div class="project-block__header-left">
              <h3 class="project-block__title">${exp.title || ""}</h3>
              ${exp.role ? `<span class="role">${exp.role}</span>` : ""}
              <span class="project-block__period">${exp.period || ""}</span>
            </div>
          </div>
          ${exp.description ? `<p class="project-block__oneliner">${exp.description}</p>` : ""}
          ${items.length ? `
            <div class="story-block">
              <span class="story-block__label">상세 내용</span>
              <div class="contribution-list">
                ${items
                  .map((it) => {
                    const details = Array.isArray(it.detail)
                      ? it.detail.filter(isNonEmptyText)
                      : isNonEmptyText(it.detail)
                        ? [it.detail]
                        : [];
                    return `
                      <div class="contribution-item">
                        <p class="contribution-item__summary">${it.summary}</p>
                        ${details.length ? `<ul class="contribution-item__detail">${details.map((d) => `<li>${d}</li>`).join("")}</ul>` : ""}
                      </div>
                    `;
                  })
                  .join("")}
              </div>
            </div>` : ""}
        </article>
      `;
    })
    .join("");
  setSectionVisible("experience", entries.length > 0);
};

const renderDeepDive = (items) => {
  const list = document.getElementById("deepDiveList");
  if (!list) return;

  const entries = (items || []).filter((d) => d && isNonEmptyText(d.title));
  setSectionVisible("deepdive", entries.length > 0);
  if (!entries.length) return;

  list.innerHTML = entries
    .map((d) => {
      const links = Array.isArray(d.links) ? d.links.filter((l) => l && isNonEmptyText(l.url)) : [];
      const linksHtml = links
        .map((l) => `<a href="${l.url}" target="_blank" rel="noreferrer">${l.label || "링크"} ↗</a>`)
        .join('<span class="project-item__sep"> · </span>');

      return `
        <article class="deepdive-item">
          <h3 class="deepdive-item__title">${d.title}</h3>
          ${d.summary ? `<p class="deepdive-item__summary">${d.summary}</p>` : ""}
          ${linksHtml ? `<div class="deepdive-item__links">${linksHtml}</div>` : ""}
        </article>
      `;
    })
    .join("");
};

const datedItemsHtml = (items) =>
  items
    .map(
      (item) => `
        <li class="dated-item">
          <div class="dated-item__date">${item.date || ""}</div>
          <div class="dated-item__body"><span class="dated-item__text">${item.text || ""}</span></div>
        </li>
      `
    )
    .join("");

const renderActivity = (data) => {
  const openSourceList = document.getElementById("openSourceList");
  const openSourceEntries = (data.openSource || []).filter(
    (o) => o && (isNonEmptyText(o.project) || isNonEmptyText(o.name))
  );
  if (openSourceList) {
    openSourceList.innerHTML = datedItemsHtml(
      openSourceEntries.map((o) => ({
        date: o.project || o.name,
        text: isNonEmptyText(o.url)
          ? `<a href="${o.url}" target="_blank" rel="noreferrer">${o.title} ↗</a>${o.status ? ` <span class="project-item__role">${o.status}</span>` : ""}`
          : o.title,
      }))
    );
  }
  const openSourceGroup = document.getElementById("openSourceGroup");
  if (openSourceGroup) openSourceGroup.style.display = openSourceEntries.length ? "" : "none";

  const etcActivityList = document.getElementById("etcActivityList");
  const etcEntries = (data.etc || []).filter((a) => {
    if (typeof a === "string") return isNonEmptyText(a);
    return a && (isNonEmptyText(a.text) || isNonEmptyText(a.title));
  });
  if (etcActivityList) {
    etcActivityList.innerHTML = datedItemsHtml(
      etcEntries.map((a) => {
        if (typeof a === "string") return { date: "", text: a };
        return { date: a.date, text: a.text || a.title || "" };
      })
    );
  }
  const etcActivityGroup = document.getElementById("etcActivityGroup");
  if (etcActivityGroup) etcActivityGroup.style.display = etcEntries.length ? "" : "none";

  setSectionVisible("activity", openSourceEntries.length > 0 || etcEntries.length > 0);
};

const renderPortfolio = (data) => {
  renderHero(data.hero || {});
  renderExperience(data.experience || []);
  renderProjects(data.project || []);
  renderSkills(data.skills || []);
  renderDeepDive(data.deepDive || []);
  renderActivity(data);
  setText("footerName", data.footerName);
};

const setupUiInteractions = () => {
  printBtn.addEventListener("click", () => {
    window.print();
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

const setupRevealAnimations = () => {
  const targets = [...document.querySelectorAll(".reveal")];
  if (!targets.length) return;

  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15 }
  );

  targets.forEach((el) => observer.observe(el));
};

const init = async () => {
  try {
    const response = await fetch("./data/profile.json");
    const data = await response.json();
    renderPortfolio(data);
  } catch (error) {
    console.error("Failed to load profile data:", error);
  } finally {
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    setupUiInteractions();
    setupRevealAnimations();
  }
};

init();
