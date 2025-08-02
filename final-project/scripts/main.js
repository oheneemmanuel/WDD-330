//import { getTeams, getAllTeams, teamsInfoDetails } from "./teams.mjs";
//getTeams(39);
//getAllTeams().then(allTeams => {
//    console.log("All Teams:", allTeams);
//});
// TEMPORARY fallback data to test the slider
//const dummyData = {
//  response: [
//    {
//      league: {
//        id: 39,
//        name: "Premier League",
//        logo: "https://media.api-sports.io/football/leagues/39.png"
//      },
//      country: { name: "England" }
//    },
//    {
//      league: {
//        id: 140,
//        name: "La Liga",
//        logo: "https://media.api-sports.io/football/leagues/140.png"
//      },
//      country: { name: "Spain" }
//    },
//    {
//      league: {
//        id: 78,
//        name: "Bundesliga",
//        logo: "https://media.api-sports.io/football/leagues/78.png"
//      },
//      country: { name: "Germany" }
//    }
//  ]
//};

// Skip API and use dummy data directly


import { initSlider } from "./slider.mjs";
import { getTeams } from "./teams.mjs";
import { getPlayersPerTeamInLeague } from "./players.mjs";

//import { getPlayersPerTeamInLeague } from "./players.mjs";

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
    //getTeams(39);
    getPlayersPerTeamInLeague(39)
    initSlider();

   

    const teamInfo = document.querySelector(".team-info");
    const leagueSelect = document.getElementById("league-select");

    leagueSelect.addEventListener("change", () => {
        const selectedLeagueId = parseInt(leagueSelect.value);
        teamInfo.innerHTML = ""; // Clear previous content
        getTeams(selectedLeagueId).then((teams) => {
          getPlayersPerTeamInLeague(selectedLeagueId, teams);
        });
    });


    const url = "https://v3.football.api-sports.io/leagues";
    const options = {
       method: "GET",
       headers: {
           "x-apisports-key": "745fa293efb28f91fd9d9fd7efcfc442"
       }
    };
    const details = document.getElementById("details");


    function displayTeams(data) {

        const topLeagueIds = [2, 3, 39, 61, 78, 135, 140, 253];

        const topLeagues = data.response.filter(item =>
            topLeagueIds.includes(item.league.id)
        );
        details.innerHTML = ""; // Clear previous content

        // dispay the top leagues
        topLeagues.forEach(item => {
            const div = document.createElement("div"); 
            div.classList.add("slider-item");
            const logo = document.createElement("img");
            logo.src = item.league.logo;
            logo.alt = `${item.league.name} Logo`;
            logo.width = "400"; // Set a fixed width for the logo
            logo.height = "200"; // Set a fixed height for the logo
            logo.loading = "lazy"; // Lazy load the image for performance

            logo.classList.add("league-img");
            const text = document.createElement("span");
            text.textContent = `${item.league.name} (${item.country.name})`;
            div.appendChild(logo);    
            div.appendChild(text);    
            details.appendChild(div);
            
           
        });
        requestAnimationFrame(() => {
            initSlider(); // Initialize the slider after the DOM is updated

        });
       
       
        
       
    

    }

    async function getSoccerData() {
        const loader = document.querySelector(".loader");
        loader.style.display = "block";
        try {
            const response = await fetch(url, options);
            if (response.ok) {
                const data = await response.json();
                displayTeams(data);
                console.log(data);
            } else {
                throw Error(await response.text());
            }
        } catch (error) {
            console.error("Error fetching soccer data:", error);
        } finally {
            loader.style.display = "none";
        }
    }
    getSoccerData();
    

    


})