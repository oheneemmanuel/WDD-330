import { getTopLeagues, displayLeagues } from "./league.mjs";
import { getTeamsByLeague } from "./teams.mjs";
import { handleSearch } from "./search.mjs";
import { handlePlayerSearch } from "./players.mjs";
// Main initialization
window.addEventListener("DOMContentLoaded", async () => {
  // ✅ Set footer year and last modified date
  document.getElementById("currentyear").textContent = new Date().getFullYear();
  document.getElementById("LastModified").textContent = `Last Modified: ${new Date(document.lastModified)}`;

  // ✅ Toggle navigation menu
  const openMenu = document.getElementById("open-menu");
  const menuOptions = document.getElementById("animate-me");
  openMenu.addEventListener("click", () => {
    menuOptions.classList.toggle("open");
    openMenu.classList.toggle("open");
  });

  const teamInfo = document.querySelector(".team-info");
  const leagueSelect = document.getElementById("league-select");

  // ✅ Get and display top leagues (fills dropdown too)
  const cachedLeagues = await getTopLeagues();

  // ✅ Set default league (EPL = 4328)
  const defaultLeagueId = "4328";
  const defaultLeagueOption = Array.from(leagueSelect.options).find(
    opt => opt.value === defaultLeagueId
  );

  if (defaultLeagueOption) {
    leagueSelect.value = defaultLeagueId;
    const defaultLeagueName = defaultLeagueOption.textContent;
    await getTeamsByLeague(defaultLeagueId, defaultLeagueName);
  } else {
    console.warn("⚠️ Default league option not found in dropdown.");
  }

  // ✅ Handle league change from dropdown
  leagueSelect.addEventListener("change", async () => {
    const selectedLeagueId = leagueSelect.value;
    const selectedLeagueName = leagueSelect.options[leagueSelect.selectedIndex].text;

    teamInfo.innerHTML = ""; // Clear old team cards
    await getTeamsByLeague(selectedLeagueId, selectedLeagueName);
  });

  // ✅ Search button click
  const searchBtn = document.getElementById("search-btn");
  if (searchBtn) {
    searchBtn.addEventListener("click", handleSearch);
  }

  // ✅ League search function (called from search bar input or button)
  window.handleLeagueSearch = function () {
    const searchInput = document.getElementById("league-search").value.trim().toLowerCase();
    const results = cachedLeagues.filter(league =>
      league.strLeague.toLowerCase().includes(searchInput)
    );

    if (results.length) {
      displayLeagues(results);
    } else {
      document.getElementById("leagueDisplay").innerHTML =
        `<p>No leagues found for "${searchInput}"</p>`;
    }
  };

  // handle player search 


  const playerSearchBtn = document.getElementById("player-search-btn");
  if (playerSearchBtn) {
    playerSearchBtn.addEventListener("click", handlePlayerSearch);

  }

});
