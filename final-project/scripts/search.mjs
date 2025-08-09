const key = "123"; // Free API key for TheSportsDB

// Search function
export async function searchTeamByName(teamName) {
  const url = `https://www.thesportsdb.com/api/v1/json/${key}/searchteams.php?t=${encodeURIComponent(teamName)}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.teams || [];
  } catch (err) {
    console.error("Search failed:", err);
    return [];
  }
}

// Handles search button click or Enter key
export async function handleSearch() {
  const input = document.getElementById("team-search").value.trim();
  const resultsContainer = document.getElementById("search-results");

  resultsContainer.innerHTML = ""; // Clear previous results

  if (!input) {
    resultsContainer.innerHTML = "<p>Please enter a team name.</p>";
    return;
  }

  const teams = await searchTeamByName(input);

  if (teams.length === 0) {
    resultsContainer.innerHTML = "<p>No teams found.</p>";
    return;
  }

  teams.forEach(team => {
    const div = document.createElement("div");
    div.classList.add("team-result");

    // Team name & logo
    const name = document.createElement("h3");
    name.textContent = team.strTeam;

    const logo = document.createElement("img");
    logo.classList.add("team-logo");
    logo.src = team.strBadge || "images/default-team.png";
    logo.alt = `${team.strTeam} Logo`;
    logo.width = 100;

    // Details container (hidden by default)
    const details = document.createElement("div");
    details.classList.add("team-details");
    details.style.display = "none";
    details.innerHTML = `
      <p><strong>Founded:</strong> ${team.intFormedYear || "N/A"}</p>
      <p><strong>Country:</strong> ${team.strCountry || "N/A"}</p>
      <p><strong>Venue:</strong> ${team.strStadium || "N/A"}</p>
      <p><strong>Capacity:</strong> ${team.intStadiumCapacity || "N/A"}</p>
      <p><strong>Address:</strong> ${team.strStadiumLocation || "N/A"}</p>
      <p><strong>City:</strong> ${team.strCity || "N/A"}</p>
      <p>${team.strDescriptionEN ? team.strDescriptionEN.substring(0, 200) + "..." : ""}</p>
    `;

    const closeBtn = document.createElement("button");
    closeBtn.textContent = "Close";
    closeBtn.classList.add("close-details");
    closeBtn.addEventListener("click", () => {
      details.style.display = "none";
    });

    details.appendChild(closeBtn);

    // Show details when logo is clicked
    logo.addEventListener("click", () => {
      details.style.display = details.style.display === "none" ? "block" : "none";
    });

    // Assemble the team card
    div.appendChild(name);
    div.appendChild(logo);
    div.appendChild(details);
    resultsContainer.appendChild(div);
  });
}
