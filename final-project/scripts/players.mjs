// player.mjs
const sec = "123"; // Your TheSportsDB API key
const BASE_URL = `https://www.thesportsdb.com/api/v1/json/${sec}`;

export async function searchPlayer(playerName) {
  try {
    const res = await fetch(`${BASE_URL}/searchplayers.php?p=${encodeURIComponent(playerName)}`);
    const data = await res.json();
    return data.player || [];
  } catch (error) {
    console.error("Error searching for player:", error);
    return [];
  }
}

export async function handlePlayerSearch() {
  const input = document.getElementById("player-search").value.trim();
  const resultsContainer = document.getElementById("player-results");
  const loader = document.querySelector(".loader");

  resultsContainer.innerHTML = ""; // Clear old results

  if (!input) {
    resultsContainer.innerHTML = "<p>Please enter a player name.</p>";
    return;
  }

  if (loader) loader.style.display = "block"; // Show loader

  try {
    const players = await searchPlayer(input);

    if (players.length === 0) {
      resultsContainer.innerHTML = "<p>No players found.</p>";
      return;
    }

    players.forEach(player => {
      const card = document.createElement("div");
      card.classList.add("player-card");

      card.innerHTML = `
        <button class="close-player-btn">✖</button>
        <h3>${player.strPlayer}</h3>
        <img src="${player.strThumb || 'placeholder.jpg'}" alt="${player.strPlayer}" width="150" />
        <p><strong>Team:</strong> ${player.strTeam || "N/A"}</p>
        <p><strong>Nationality:</strong> ${player.strNationality || "N/A"}</p>
        <p><strong>Born:</strong> ${player.dateBorn || "N/A"}</p>
      `;

      // Close card on click
      card.querySelector(".close-player-btn").addEventListener("click", () => {
        card.remove();
      });

      resultsContainer.appendChild(card);
    });
  } catch (error) {
    console.error(error);
    resultsContainer.innerHTML = "<p>Error fetching player data. Please try again later.</p>";
  } finally {
    if (loader) loader.style.display = "none"; // Hide loader
  }
}
