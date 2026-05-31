// KaTeX auto-render
document.addEventListener("DOMContentLoaded", () => {
  if (window.renderMathInElement) {
    renderMathInElement(document.body, {
      delimiters: [
        { left: "$$",  right: "$$",  display: true  },
        { left: "\\[", right: "\\]", display: true  },
        { left: "$",   right: "$",   display: false },
        { left: "\\(", right: "\\)", display: false },
      ],
      throwOnError: false,
      strict: false,
    });
  }

  // Copy buttons on <pre>
  document.querySelectorAll("pre").forEach((pre) => {
    if (pre.querySelector(".copy-btn")) return;
    const btn = document.createElement("button");
    btn.className = "copy-btn";
    btn.type = "button";
    btn.textContent = "copy";
    btn.addEventListener("click", () => {
      const text = pre.innerText.replace(/^copy\s*\n?/, "");
      navigator.clipboard.writeText(text).then(() => {
        btn.textContent = "copied";
        btn.classList.add("copied");
        setTimeout(() => {
          btn.textContent = "copy";
          btn.classList.remove("copied");
        }, 1400);
      });
    });
    pre.appendChild(btn);
  });

  // Copy buttons on .prompt
  document.querySelectorAll(".prompt").forEach((el) => {
    if (el.querySelector(".copy-btn")) return;
    const btn = document.createElement("button");
    btn.className = "copy-btn";
    btn.type = "button";
    btn.textContent = "copy";
    btn.style.opacity = "1";
    btn.addEventListener("click", () => {
      const text = el.innerText.replace(/^Claude-Code-Prompt\s*/, "").replace(/^copy\s*\n?/, "");
      navigator.clipboard.writeText(text).then(() => {
        btn.textContent = "copied";
        btn.classList.add("copied");
        setTimeout(() => {
          btn.textContent = "copy";
          btn.classList.remove("copied");
        }, 1400);
      });
    });
    el.appendChild(btn);
  });

  // Scroll-spy for the TOC: highlight the link of the section currently in view
  const tocLinks = document.querySelectorAll(".toc a[href^='#']");
  if (tocLinks.length) {
    const linkMap = new Map();
    tocLinks.forEach((a) => {
      const id = decodeURIComponent(a.getAttribute("href").slice(1));
      const target = document.getElementById(id);
      if (target) linkMap.set(target, a);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const link = linkMap.get(entry.target);
          if (!link) return;
          if (entry.isIntersecting) {
            tocLinks.forEach((l) => l.classList.remove("active"));
            link.classList.add("active");
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    linkMap.forEach((_link, target) => observer.observe(target));
  }
});
