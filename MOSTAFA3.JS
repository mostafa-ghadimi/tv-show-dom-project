const apiUrl = 'https://api.tvmaze.com/shows/82/episodes';
let episodesList = [];

const searchInput = document.querySelector('#search');
const matchesCount = document.querySelector('#matches');
const episodesContainer = document.querySelector('#episodes');

searchInput.addEventListener('input', searchEpisodes);

function searchEpisodes() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  let matches = 0;
  let episodesHtml = '';

  episodesList.forEach(episode => {
    if (episode.summary.toLowerCase().includes(searchTerm) ||
        episode.name.toLowerCase().includes(searchTerm)) {
      const seasonNumber = episode.season.toString().padStart(2, '0');
      const episodeNumber = episode.number.toString().padStart(2, '0');
      const episodeCode = `S${seasonNumber}E${episodeNumber}`;

      episodesHtml += `
        <div>
          <h3>${episode.name}</h3>
          <p>Episode Code: ${episodeCode}</p>
          <p>Season: ${seasonNumber}</p>
          <p>Episode: ${episodeNumber}</p>
          <img src="${episode.image.medium}" alt="${episode.name}">
          <p>${episode.summary}</p>
        </div>
      `;

      matches++;
    }
  });

  episodesContainer.innerHTML = episodesHtml;
  matchesCount.textContent = `Matches: ${matches}`;
}


fetch(apiUrl)
  .then(response => response.json())
  .then(episodes => {
    episodesList = episodes;

    searchEpisodes();
  });
// generate options for episode selector
const episodeSelector = document.getElementById("episode-selector");
episodes.forEach((episode) => {
  const option = document.createElement("option");
  option.value = episode.code;
  option.textContent = `${episode.code} - ${episode.name}`;
  episodeSelector.appendChild(option);
});

// add event listener for episode selector
episodeSelector.addEventListener("change", (event) => {
  const selectedEpisodeCode = event.target.value;
  if (selectedEpisodeCode) {
    // hide all episodes except the selected one
    episodes.forEach((episode) => {
      const episodeContainer = document.getElementById(episode.code);
      episodeContainer.style.display = episode.code === selectedEpisodeCode ? "" : "none";
    });
  } else {
    // show all episodes
    episodes.forEach((episode) => {
      const episodeContainer = document.getElementById(episode.code);
      episodeContainer.style.display = "";
    });
  }
});
// add event listener for episode selector
episodeSelector.addEventListener("change", (event) => {
    const selectedEpisodeCode = event.target.value;
    if (selectedEpisodeCode) {
      // hide all episodes except the selected one
      episodes.forEach((episode) => {
        const episodeContainer = document.getElementById(episode.code);
        episodeContainer.style.display = episode.code === selectedEpisodeCode ? "" : "none";
      });
  

      const selectedEpisodeContainer = document.getElementById(selectedEpisodeCode);
      selectedEpisodeContainer.scrollIntoView({ behavior: "smooth" });
  
      episodeSelector.querySelectorAll("option").forEach((option) => {
        option.selected = option.value === selectedEpisodeCode;
      });
    } else {
      // show all episodes
      episodes.forEach((episode) => {
        const episodeContainer = document.getElementById(episode.code);
        episodeContainer.style.display = "";
      });
    }
  });
  