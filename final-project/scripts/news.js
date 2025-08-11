// Main initialization
window.addEventListener("DOMContentLoaded", () => {
  // ✅ Footer year & last modified date
  document.getElementById("currentyear").textContent = new Date().getFullYear();
  document.getElementById("LastModified").textContent =
    `Last Modified: ${new Date(document.lastModified)}`;

  // ✅ Navigation menu toggle
  const openMenu = document.getElementById("open-menu");
  const menuOptions = document.getElementById("animate-me");
  openMenu.addEventListener("click", () => {
    menuOptions.classList.toggle("open");
    openMenu.classList.toggle("open");
  });

  // ✅ NewsAPI configuration
  const API_KEY = "8138d7be82ac4eb78b649230dd17dfe0"; // replace with your key
  const FOOTBALL_URL = `https://newsapi.org/v2/everything?q=football&language=en&sortBy=publishedAt&apiKey=${API_KEY}`;
  const WORLD_URL = `https://newsapi.org/v2/top-headlines?language=en&apiKey=${API_KEY}`;

  // Main news loader
  async function getCombinedNews() {
    const loader = document.querySelector(".loader");
    loader.style.display = "block";

    try {
      const [footballRes, worldRes] = await Promise.all([
        fetch(FOOTBALL_URL),
        fetch(WORLD_URL)
      ]);

      if (!footballRes.ok || !worldRes.ok) throw new Error("HTTP error!");

      const footballData = await footballRes.json();
      const worldData = await worldRes.json();

      // Merge and deduplicate by URL
      const combined = [...footballData.articles, ...worldData.articles]
        .filter((article, index, self) =>
          index === self.findIndex(a => a.url === article.url)
        )
        .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

      displayNews(combined.slice(0, 12)); // Top 12 articles
    } catch (err) {
      console.warn("NewsAPI failed, using fallback:", err);
      await loadFallbackNews();
    } finally {
      loader.style.display = "none";
    }
  }

  // Fallback loader
  async function loadFallbackNews() {
    try {
      const fallbackRes = await fetch("data/news.json");
      const fallbackData = await fallbackRes.json();
      displayNews(fallbackData);
    } catch (err) {
      console.error("Fallback news failed:", err);
      document.querySelector(".news-container").innerHTML =
        `<p class="error">Unable to load any news right now.</p>`;
    }
  }

  // Render news cards
  function displayNews(articles) {
    const container = document.querySelector(".news-container");

    if (!articles.length) {
      container.innerHTML = `<p>No news available right now.</p>`;
      return;
    }

    container.innerHTML = articles.map(article => `
      <article class="news-card">
        <img src="${article.urlToImage || 'images/placeholder.jpg'}" alt="News image">
        <div class="news-content">
          <h2>${article.title}</h2>
          <p>${article.description || ''}</p>
          <a href="${article.url}" target="_blank" rel="noopener">Read More</a>
        </div>
      </article>
    `).join('');
  }

  // Initial load
  getCombinedNews();
});
