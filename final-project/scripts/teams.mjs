import { fetchPlayersByTeam, getPlayersByTeam } from "./players.mjs";
const leagueMap = {

  39: "Premier League",
  140: "La Liga",
  135: "Serie A",
  78: "Bundesliga",
  61: "Ligue 1",
  88: "Eredivisie",
  62: "MLS",
  2: "UEFA Champions League",
  3: "UEFA Europa League",
  4: "UEFA Europa Conference League",
  263: "Saudi Pro League",
};
const season = 2023;

const options = {


    method: "GET",
    headers: {
      "x-apisports-key": "745fa293efb28f91fd9d9fd7efcfc442", // Replace with your actual API key
      
    }
};

//function to display the teams
function displayTeams(teams, leagueName = "") {
    const container = document.querySelector(".team-info");
    if (!container) {
      console.error("Error: .team-info element not found in the DOM.");
      return;
    }
    container.innerHTML = "";

    const heading = document.createElement("h2");
    heading.textContent = `Teams in ${leagueName} - ${teams.length}`;
    container.appendChild(heading);

    teams.forEach(({team, venue}) => {
      const div = document.createElement("div");
      div.classList.add("team-card");
      const teamName = document.createElement("h2");
      teamName.textContent = team.name;

      const logo = document.createElement("img");
      logo.src = team.logo;
      logo.alt = `${team.name} logo`;
      logo.width = 70;
      logo.height = 60;
      logo.loading = "lazy";

      const viewBtn = document.createElement("button");
      viewBtn.textContent = "View Players";
      viewBtn.classList.add("view-players");// for styling 

      viewBtn.addEventListener("click", async () => {
        window.location.href = `players.html?teamId=${team.id}`;
      
      });

      logo.addEventListener("click", async () => {
        const existingDetails = div.querySelector(".team-details");
        if (existingDetails) {
          existingDetails.remove(); // remove existing information
          return;
        }
        const teamDetails = document.createElement("div");
        teamDetails.classList.add("team-details");// for styling

        teamDetails.innerHTML = `

          <h3>${team.name}</h3>
          <p><strong>Founded</strong>: ${team.founded}</p>
          <p><strong>Country</strong>: ${team.country}</p>
          <p><strong>Venue</strong>: ${venue.name}</p>
          <p><strong>Capacity</strong>: ${venue.capacity}</p>
          <p><strong>Address</strong>: ${venue.address}</p>
          <p><strong>City</strong>: ${venue.city}</p> 
          <img src="${venue.image}" alt="${venue.image} image" width="100" height="100" loading="lazy">
          <button class="close-details">Close</button>

        
        `;
        div.append(teamDetails);
        div.querySelector(".close-details").addEventListener("click", () => {
          teamDetails.remove();

        });




      });

      const name = document.createElement("p");
      name.textContent = team.name;

      div.appendChild(logo);
      div.appendChild(name);
      div.appendChild(viewBtn);
      container.appendChild(div);


    });
}


// fetching the teams data

export async function getTeamsByLeague(leagueId) {
  const url = `https://v3.football.api-sports.io/teams?league=${leagueId}&season=${season}`;
  const loader = document.querySelector(".loader");
  loader.style.display = "block"; // Show loader while fetching data
  try {

    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      const teams = data.response;

      displayTeams(teams, leagueMap[leagueId]);
      console.log(data);

    } else {
      throw new Error(await response.text());
      
    }


  } catch (error) {
      console.error("Error fetching teams data", error);

  } finally {
      loader.style.display = "none";

  }
}
























