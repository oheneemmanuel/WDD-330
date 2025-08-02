// Dummy data structure mimicking the API response
//const dummyTeamsData = {
//  response: [
//    {
//      team: {
//        id: 1,
//        name: "Manchester United",
//        logo: "https://media.api-sports.io/football/teams/33.png",
//        country: "England",
//        founded: 1878
//      },
//      venue: {
//        name: "Old Trafford",
//        capacity: 74879,
//        address: "Sir Matt Busby Way",
//        city: "Manchester",
//        image: "https://media.api-sports.io/football/venues/556.png"
//      }
//    },
//    {
//      team: {
//        id: 2,
//        name: "Liverpool FC",
//        logo: "https://media.api-sports.io/football/teams/40.png",
//        country: "England",
//        founded: 1892
//      },
//      venue: {
//        name: "Anfield",
//        capacity: 54074,
//        address: "Anfield Road",
//        city: "Liverpool",
//        image: "https://media.api-sports.io/football/venues/550.png"
//      }
//    }
//  ]
//};

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
  263: "Suadi Pro League",
};
const season = 2023;

const options = {

    method: "GET",
    headers: {
      "x-apisports-key": "745fa293efb28f91fd9d9fd7efcfc442", // Replace with your actual API key
      
    }
};
const teamInfo = document.querySelector(".team-info");

export function teamsInfoDetails(leagueName, teams) {
    const section = document.createElement("section");
    const heading = document.createElement("h2");
    heading.textContent = ` ${leagueName} - ${teams.length} Teams`;
    section.appendChild(heading);

    teams.forEach(team => {
        const  div = document.createElement("div");

        const logo = document.createElement("img");
        logo.src = team.team.logo;
        logo.alt = `${team.team.name} Logo`;
        logo.width = "60"; // Set a fixed width for the logo
        logo.height = "60";
        logo.loading = "lazy"; // Lazy load the image for performance

        logo.addEventListener("click", async() => {
          const existingDetails = document.querySelector(".team-details");
          if (existingDetails) {
            existingDetails.remove(); // Remove existing details if any
            return;
          }
          const teamDetails = document.createElement("div");
          teamDetails.classList.add("team-details");

          teamDetails.innerHTML = `
            <h3>${team.team.name}</h3>
            <p><strong>Founded</strong>: ${team.team.founded}</p>
            <p><strong>Country</strong>: ${team.team.country}</p>
            <p><strong>Venue</strong>: ${team.venue.name}</p>
            <p><strong>Capacity</strong>: ${team.venue.capacity}</p>
            <p><strong>Address</strong>: ${team.venue.address}</p>
            <p><strong>City</strong>: ${team.venue.city}</p> 
            <img src="${team.venue.image}" alt="${team.venue.image} image" width="100" height="100" loading="lazy">
            <button class="close-details">Close</button>
            <button class="squad">View Players</button>

          `;

          div.appendChild(teamDetails);
          div.querySelector(".close-details").addEventListener("click", () => {
            teamDetails.remove();
          });
          

        });
        
        div.appendChild(logo);
       
        section.appendChild(div);

        
         // Set a fixed height for the logo  


    });
    teamInfo.appendChild(section);
}




export async function getTeams(leagueId) {

    const url = `https://v3.football.api-sports.io/teams?league=${leagueId}&season=${season}`;
    const loader = document.querySelector(".loader");
    loader.style.display = "block"; // Show loader while fetching data
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log("Full API response:", data);
      teamsInfoDetails(`Teams In ${leagueMap[leagueId]}:`, data.response);
      console.log( data.response);
      return data.response;

    } catch (error) {
    

        console.error(`Error fetching teams for League ${leagueId}:`, error);
        return null;
    } finally {
        loader.style.display = "none"; // Hide loader after fetching data
    }
}

// Optional helper to get teams from all leagues at once
export async function getAllTeams(leagues) {

    const allResults = await Promise.all(leagues.map(getTeams));
    return allResults.flat(); // Flatten if you want a single array
}
