
import { getTopLeagues } from "./league.mjs";
import { getTeamsByLeague } from "./teams.mjs";


window.addEventListener('DOMContentLoaded', (event) => {
    const currentYear = new Date().getFullYear();
    document.getElementById("currentyear").textContent = currentYear;

    const lastModified = new Date(document.lastModified);
    document.getElementById("LastModified").textContent = `Last Modified: ${lastModified}`;
    const openMenu = document.getElementById("open-menu");
    const menuOptions = document.getElementById("menu-options");
    openMenu.addEventListener("click", () => {
        menuOptions.classList.toggle("open");
        openMenu.classList.toggle("open");


    });
    getTopLeagues();
   

   

    const teamInfo = document.querySelector(".team-info");
    const leagueSelect = document.getElementById("league-select");

    leagueSelect.addEventListener("change", async () => {
      const selectedLeagueId = parseInt(leagueSelect.value);
      teamInfo.innerHTML = "";
      await getTeamsByLeague(selectedLeagueId);
    });
    //automatically display one league
    leagueSelect.value = "39";
    getTeamsByLeague(39);



})