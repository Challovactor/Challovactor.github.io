const year = document.getElementById("year");
const timeNode = document.querySelector(".local-time");
const revealItems = document.querySelectorAll(".reveal");
const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");
const searchStatus = document.getElementById("search-status");
const searchForm = document.querySelector("[data-search-form]");

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
  { threshold: 0.16 }
);

revealItems.forEach((item) => revealObserver.observe(item));

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

if (searchInput && searchResults && searchStatus) {
  const params = new URLSearchParams(window.location.search);
  const initialQuery = (params.get("q") || "").trim();
  let searchIndex = [];

  const normalize = (value) =>
    (value || "")
      .toString()
      .toLowerCase()
      .replace(/\s+/g, " ")
      .trim();

  const slugify = (value) =>
    normalize(value)
      .replace(/[^\w\u4e00-\u9fa5 -]/g, "")
      .replace(/\s+/g, "-");

  const renderResults = (query) => {
    const normalizedQuery = normalize(query);

    if (!normalizedQuery) {
      searchStatus.textContent = "输入关键词开始搜索。";
      searchResults.innerHTML = "";
      return;
    }

    const terms = normalizedQuery.split(" ").filter(Boolean);

    const matches = searchIndex
      .map((item) => {
        const haystack = normalize(
          [
            item.title,
            item.excerpt,
            item.content,
            ...(item.tags || []),
            ...(item.categories || []),
          ].join(" ")
        );

        const score = terms.reduce((total, term) => {
          let points = 0;

          if (normalize(item.title).includes(term)) points += 5;
          if (normalize(item.excerpt).includes(term)) points += 3;
          if ((item.tags || []).some((tag) => normalize(tag).includes(term))) points += 4;
          if ((item.categories || []).some((category) => normalize(category).includes(term))) points += 4;
          if (haystack.includes(term)) points += 1;

          return total + points;
        }, 0);

        return { item, haystack, score };
      })
      .filter((entry) => terms.every((term) => entry.haystack.includes(term)))
      .sort((a, b) => b.score - a.score || b.item.date.localeCompare(a.item.date));

    if (matches.length === 0) {
      searchStatus.textContent = `没有找到和“${query}”相关的文章。`;
      searchResults.innerHTML = "";
      return;
    }

    searchStatus.textContent = `找到 ${matches.length} 篇和“${query}”相关的文章。`;
    searchResults.innerHTML = matches
      .map(({ item }) => {
        const categories = (item.categories || [])
          .map(
            (category) =>
              `<a href="/categories/#${slugify(category)}" class="search-chip">${category}</a>`
          )
          .join("");

        const tags = (item.tags || [])
          .map((tag) => `<a href="/tags/#${slugify(tag)}" class="search-chip">${tag}</a>`)
          .join("");

        return `
          <article class="post-preview stream-item">
            <div class="stream-stamp">
              <span class="writing-type">${item.post_type || "Post"}</span>
              <time datetime="${item.date}">${item.date}</time>
            </div>
            <div class="stream-body">
              <h2><a href="${item.url}">${item.title}</a></h2>
              <p>${item.excerpt}</p>
              <div class="tag-row">${categories}${tags}</div>
              <a class="text-link" href="${item.url}">阅读全文</a>
            </div>
          </article>
        `;
      })
      .join("");
  };

  fetch("/search.json")
    .then((response) => response.json())
    .then((data) => {
      searchIndex = data;

      if (initialQuery) {
        searchInput.value = initialQuery;
        renderResults(initialQuery);
      }
    })
    .catch(() => {
      searchStatus.textContent = "搜索索引加载失败，请稍后刷新重试。";
    });

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const query = searchInput.value.trim();
    const url = new URL(window.location.href);

    if (query) {
      url.searchParams.set("q", query);
    } else {
      url.searchParams.delete("q");
    }

    window.history.replaceState({}, "", url.toString());
    renderResults(query);
  });
}
