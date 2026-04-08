const root = document.documentElement;
const year = document.getElementById("year");
const timeNode = document.querySelector(".local-time");
const revealItems = document.querySelectorAll(".reveal");

if (year) {
  year.textContent = new Date().getFullYear().toString();
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach((item) => revealObserver.observe(item));

if (window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
  window.addEventListener("pointermove", (event) => {
    root.style.setProperty("--pointer-x", `${event.clientX}px`);
    root.style.setProperty("--pointer-y", `${event.clientY}px`);
  });
}

if (timeNode) {
  const timezone = timeNode.dataset.timezone || "Asia/Shanghai";

  const updateTime = () => {
    const formatter = new Intl.DateTimeFormat("zh-CN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: timezone,
    });

    timeNode.textContent = formatter.format(new Date());
  };

  updateTime();
  window.setInterval(updateTime, 1000 * 30);
}
