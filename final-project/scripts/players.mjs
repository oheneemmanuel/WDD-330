export function getPlayersByTeam(players) {
  const container = document.querySelector(".players-info");
  container.innerHTML = "";

  const heading = document.createElement("h2");
  heading.textContent = "Team Players";
  container.appendChild(heading);

  const table = document.createElement("table");
  table.classList.add("players-table"); //CSs styling will be applied

  table.innerHTML = `
    <thead>
      <tr>
        <th>Photo</th>
        <th>Name</th>
        <th>Age</th>
        <th>Nationality</th>
        <th>Position</th>
      </tr>
    </thead>
    <tbody>
      ${players.slice(0, 12).map(p =>`
        <tr>
          <td><img src="${p.player.photo}" width="40" height="40" loading="lazy"></img></td>
          <td>${p.player.name}</td>
          <td>${p.player.age}</td>
          <td>${p.player.nationality}</td>
          <td>${p.statistics[0]?.games?.position || "N/A"}</td>

        </tr>

      `).join("")}
    </tbody>
      
  `;
  container.appendChild(table);


}


export async function fetchPlayersByTeam(teamId) {

  const season = 2023; // or make this dynamic if needed
  const url = `https://v3.football.api-sports.io/players?team=${teamId}&season=${season}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-apisports-key": "745fa293efb28f91fd9d9fd7efcfc442"
      }
    });

    if (!response.ok) {
      throw new Error("Failed to fetch players");
    }

    const data = await response.json();

    return data.response.slice(0, 12); // This contains the players
    console.log(data);
  } catch (error) {
    console.error("Error fetching players:", error);
    return []; // fallback in case of error
  }
}


//import { getTeams } from './teams.mjs';
//const season = 2023;
//const playersInfo = document.querySelector(".players-info");
//
//function teamPlayers(players, teamName) {
//  const container = document.createElement("section");
//  
//
//  const heading = document.createElement("h2");
//  heading.textContent = `${teamName} Squad`;
//  container.appendChild(heading);
//  //creating a table for the palyer details
//  const table = document.createElement("table");
//  table.innerHTML = `
//      <thead>
//        <tr>
//          <th>Name</th>
//          <th>Age</th>
//          <th>Nationality</th>
//          <th>Photo</th>
//        </tr>
//      </thead>
//      <tbody></tbody>
//
//
//  `;
//  const tbody = table.querySelector("tbody");
//  players.forEach(player => {
//    const row = document.createElement("tr");
//    row.innerHTML = `
//      <td>${player.player.name}</td>
//      <td>${player.player.age}</td>
//      <td>${player.player.nationality}</td>
//      <td><img src="${player.player.photo}" alt="${player.player.name} Photo" width="50"></td>
//      
//  `;
//   tbody.appendChild(row);
//
//
