//importing the slider to use for the leagues to show the top leagues
import { initSlider } from "./slider.mjs";
const url = "https://v3.football.api-sports.io/leagues";

const options = {
    method: "GET",
    headers: {
        "x-apisports-key": "745fa293efb28f91fd9d9fd7efcfc442"
    }
};

//Getting the top Leagues to display them

const topLeagues = [2, 3, 39, 61, 78, 135, 140, 253]



export function displayLeagues(leaguesArray) {
    const leagues = document.getElementById("leagueDisplay");

    leagues.innerHTML = "";

    leaguesArray.forEach(item => {
        const div = document.createElement("div")
        div.classList.add("slider-item");

        const logo = document.createElement("img");
        logo.src = item.league.logo;
        logo.alt = `${item.league.name} logo`;
        logo.classList.add("league-img");

        logo.width = 400;
        logo.height = 200;
        logo.loading = "lazy";

        const leagueName = document.createElement("span");
        leagueName.textContent = `${item.league.name} - (${item.country.name})`;

        div.appendChild(logo);
        div.appendChild(leagueName);
        leagues.appendChild(div);
    });

}
export async function getTopLeagues() {
    const loader = document.querySelector(".loader");
    loader.style.display = "block";
    try {
        const response = await fetch(url, options);
        if (response.ok) {
            const data = await response.json();
            const filtered = data.response.filter(item =>
                topLeagues.includes(item.league.id)
            );
            displayLeagues(filtered);
            initSlider();// this calls the slider to render 

        } else {
            throw new Error(await response.text());

        }
    } catch (error) {
        console.error("Error fetching league data", error);
        

    } finally {
        loader.style.display = "none";

    }
}
getTopLeagues();



