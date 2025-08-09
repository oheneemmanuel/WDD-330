
const sec = "123"; // TheSportsDB public key
const BASE_URL = `https://www.thesportsdb.com/api/v1/json/${sec}`;

// Display team cards
function displayTeams(teams = [], leagueName = "") {
  const container = document.querySelector(".team-info");
  if (!container) {
    console.error("Error: .team-info element not found in the DOM.");
    return;
  }

  container.innerHTML = "";

  if (!teams || teams.length === 0) {
    container.innerHTML = `<p>No teams found for ${leagueName}.</p>`;
    return;
  }

  const heading = document.createElement("h2");
  heading.textContent = `Teams in ${leagueName} - ${teams.length}`;
  container.appendChild(heading);

  teams.forEach((team) => {
    const div = document.createElement("div");
    div.classList.add("team-card");

    const teamName = document.createElement("h2");
    teamName.textContent = team.strTeam;

    const logo = document.createElement("img");
    logo.src = team.strBadge || team.strTeamLogo || "images/default-team.png";
    logo.alt = `${team.strTeam} logo`;
    logo.width = 70;
    logo.height = 60;
    logo.loading = "lazy";


    logo.addEventListener("click", () => {
      const existingDetails = div.querySelector(".team-details");
      if (existingDetails) {
        existingDetails.remove();
        return;
      }

      const teamDetails = document.createElement("div");
      teamDetails.classList.add("team-details");

      teamDetails.innerHTML = `
        <h3>${team.strTeam}</h3>
        <p><strong>Founded</strong>: ${team.intFormedYear || "N/A"}</p>
        <p><strong>Country</strong>: ${team.strCountry || "N/A"}</p>
        <p><strong>Venue</strong>: ${team.strStadium || "N/A"}</p>
        <p><strong>Capacity</strong>: ${team.intStadiumCapacity || "N/A"}</p>
        <p><strong>Address</strong>: ${team.strStadiumLocation || "N/A"}</p>
        <p><strong>City</strong>: ${team.strCity || "N/A"}</p>
        <img src="${team.strStadiumThumb || "images/default-stadium.jpg"}" alt="Stadium image" width="100" height="100" loading="lazy">
        <button class="close-details">Close</button>
      `;

      div.append(teamDetails);

      div.querySelector(".close-details").addEventListener("click", () => {
        div.remove();
      });
    });

    const name = document.createElement("p");
    name.textContent = team.strTeam;

    div.appendChild(logo);
    div.appendChild(name);
    //div.appendChild(viewBtn);
    container.appendChild(div);
  });
}

// Fetch teams by league
export async function getTeamsByLeague(leagueId, leagueName = "") {
  if (!leagueId) {
    console.error(`No league ID found for ${leagueName}`);
    return;
  }

  const loader = document.querySelector(".loader");
  if (loader) loader.style.display = "block";

  try {
    const url = `${BASE_URL}/lookup_all_teams.php?id=${leagueId}`;
    const response = await fetch(url);

    if (!response.ok) throw new Error("API error");

    const data = await response.json();
    console.log("Fetching teams for league ID:", leagueId);

    console.log(data);
    const teams = data.teams || [];

    displayTeams(teams, leagueName);
    console.log(`Fetched ${teams.length} teams for ${leagueName}`);
  } catch (error) {
    console.error("Error fetching teams:", error.message);
    const container = document.querySelector(".team-info");
    if (container) {
      container.innerHTML = `<p>Unable to load teams at the moment. Please try again later.</p>`;
    }
  } finally {
    if (loader) loader.style.display = "none";
  }
}
