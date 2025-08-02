//const dummyPlayersData = {
//  response: [
//    {
//      player: {
//        id: 1,
//        name: "Marcus Rashford",
//        age: 26,
//        nationality: "England",
//        photo: "https://media.api-sports.io/football/players/276.png"
//      },
//      statistics: [
//        {
//          games: { appearances: 30, lineups: 28 },
//          goals: { total: 11, assists: 5 },
//          cards: { yellow: 3, red: 0 }
//        }
//      ]
//    },
//    // more players...
//  ]
//};

import { getTeams } from './teams.mjs';
const season = 2023;
const playersInfo = document.querySelector(".players-info");

function teamPlayers(players, teamName) {
  const container = document.createElement("section");
  

  const heading = document.createElement("h2");
  heading.textContent = `${teamName} Squad`;
  container.appendChild(heading);
  //creating a table for the palyer details
  const table = document.createElement("table");
  table.innerHTML = `
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Nationality</th>
          <th>Photo</th>
        </tr>
      </thead>
      <tbody></tbody>


  `;
  const tbody = table.querySelector("tbody");
  players.forEach(player => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${player.player.name}</td>
      <td>${player.player.age}</td>
      <td>${player.player.nationality}</td>
      <td><img src="${player.player.photo}" alt="${player.player.name} Photo" width="50"></td>
      
  `;
   tbody.appendChild(row);


  });
  container.appendChild(table);
  return container;
  //playersInfo.appendChild(container);

}

export async function getPlayersPerTeamInLeague(leagueId) {
  const teams = await getTeams(leagueId); // This also renders team logos via teamsInfoDetails()

  for (const team of teams) {
    const teamId = team.team.id;
    const teamName = team.team.name;

    try {
      const response = await fetch(`https://v3.football.api-sports.io/players?team=${teamId}&season=${season}`, {
        method: "GET",
        headers: {
          "x-apisports-key": "745fa293efb28f91fd9d9fd7efcfc442"
        }
      });

      const data = await response.json();
      console.log(`✅ ${teamName} squad:`, data.response);
      ///teamPlayers(dummyPlayersData.response, teamName); // Render players for the team

      // You could now render the squad beneath that team's logo or in a separate view
    } catch (error) {
      console.error(`❌ Error fetching players for ${teamName}:`, error);
    }
  }
  document.body.appendChild(playele); // Append the players section to the body or a specific container
}
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("squad")) {
    const teamContainer= e.target.closest(".team-details");
    const teamName = teamContainer.querySelector("h3").textContent;
    const teamId = e.target.dataset.teamId;

    const existingSquad = teamContainer.querySelector(".squad-container");
    if (existingSquad) {
      existingSquad.remove(); // Remove existing squad if it exists
      return;
    }

    try {
      teamPlayers(data, teamName); // Render players for the clicked team
    } catch (error) {
      console.error(`❌ Error displaying players for ${teamName}:`, error);
    }
  }
});
