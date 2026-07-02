function getFilteredEntries() {
    const typeValue = document.getElementById("typeFilter").value;
    const universeValue = document.getElementById("universeFilter").value;
    const sagaValue = document.getElementById("sagaFilter").value;
    const phaseValue = document.getElementById("phaseFilter").value;
    const franchiseValue = document.getElementById("franchiseFilter").value;
    const yearValue = document.getElementById("yearFilter").value;
    const mediumValue = document.getElementById("mediumFilter").value;
    const ratingValue = document.getElementById("ratingFilter").value;

    return entries.filter(entry => {
        const typeMatch = typeValue === "all" || entry.type.includes(typeValue);
        const universeMatch = universeValue === "all" || entry.universe.includes(universeValue);
        const sagaMatch = sagaValue === "all" || entry.saga.includes(sagaValue);
        const phaseMatch = phaseValue === "all" || entry.phase.includes(phaseValue);
        const franchiseMatch = franchiseValue === "all" || entry.franchise.includes(franchiseValue);
        const yearMatch = yearValue === "all" || entry.year.includes(yearValue);
        const mediumMatch = mediumValue === "all" || entry.medium.includes(mediumValue);
        const ratingMatch = ratingValue === "all" || entry.tier.includes(ratingValue);

        return typeMatch && universeMatch && sagaMatch && phaseMatch && franchiseMatch && yearMatch && mediumMatch && ratingMatch;
    });
}

function sortByRating(data) {
    if (document.getElementById("orderingDropdown").value === "ranking") {
        return data.sort((a, b) => a.ranking - b.ranking);
    } else if (document.getElementById("orderingDropdown").value === "timeline") {
        return data.sort((a, b) => a.timeline - b.timeline);
    } else {
        return data;
    }
    
}

function updateAverage(filteredEntries) {
    var totalScore = 0;
    filteredEntries.forEach((entry, index) => {
        if (entry.tier === 'brilliant') {
            totalScore += 7
        } else if (entry.tier === 'great') {
            totalScore += 5
        } else if (entry.tier === 'best') {
            totalScore += 3
        } else if (entry.tier === 'excellent') {
            totalScore += 2
        } else if (entry.tier === 'good') {
            totalScore += 1
        } else if (entry.tier === 'book') {
            totalScore += 0
        } else if (entry.tier === 'innacuracy') {
            totalScore += -1
        } else if (entry.tier === 'mistake') {
            totalScore += -3
        } else if (entry.tier === 'blunder') {
            totalScore += -5
        }
    });
    if (!(filteredEntries.length === 0)) {
        var newAverage = totalScore/(filteredEntries.length);
        var newTier = ''
        if (newAverage >= 6) {
            newTier = 'brilliant'
        } else if (newAverage >= 4) {
            newTier = 'great'
        } else if (newAverage >= 2.5) {
            newTier = 'best'
        } else if (newAverage >= 1.5) {
            newTier = 'excellent'
        } else if (newAverage >= 0.5) {
            newTier = 'good'
        } else if (newAverage >= -0.5) {
            newTier = 'book'
        } else if (newAverage >= -2) {
            newTier = 'innacuracy'
        } else if (newAverage >= -4) {
            newTier = 'mistake'
        } else {
            newTier = 'blunder'
        };
    } else {
        newTier = 'book'
    };
    document.getElementById('avgRatingImg').src = `imgs/icons/${newTier}.png`;
}

function renderRankings() {
    const container = document.getElementById("rankingContainer");
    container.innerHTML = ""; // clear old results

    let filtered = getFilteredEntries();
    let sorted = sortByRating(filtered);

    updateAverage(filtered);

    sorted.forEach((entry, index) => {
        const card = document.createElement("div");
        card.classList.add("ranking-card", `tier-${entry.tier}`);

        card.innerHTML = `
        <div class="card-inner">
            <h2>#${index + 1}</h2>

            <div class="poster-container">
            <img class="poster" src="${entry.poster}" alt="${entry.title}">
            <img class="tier-icon" src="imgs/icons/${entry.tier}.png">
            </div>

            <h3>${entry.title}</h3>
        </div>
        `;

        container.appendChild(card);

        if (!(entry.episodes === null)) {
            card.style.cursor = "pointer";

            card.addEventListener("click", () => {
                openEpisodeModal(entry);
            });
        };

        setTimeout(() => {
            card.style.animation = "fadeInUp 0.4s ease forwards";
        }, index * 100); // 100ms delay between each
    });
}

function openEpisodeModal(entry) {
    const modal = document.getElementById("episodeModal");
    const table = document.getElementById("episodeTable");
    const title = document.getElementById("modalTitle");

    title.textContent = `${entry.title} – Episode Rankings`;
    table.innerHTML = "";

    // Table header
    table.innerHTML = `
        <tr>
        <th>#</th>
        <th>Title</th>
        <th>Tier</th>
        </tr>
    `;

    entry.episodes.forEach(ep => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${ep.number}</td>
            <td>${ep.title}</td>
            <td>
            <img class="episode-tier-icon" 
                src="imgs/icons/${ep.tier}.png" 
                alt="${ep.tier}">
            </td>
        `;
        row.classList.add(`tier-${ep.tier}`);
        table.appendChild(row);
    });
    modal.classList.add("show");
}

document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("episodeModal").classList.remove("show");
});

document.getElementById("episodeModal").addEventListener("click", (e) => {
    if (e.target.id === "episodeModal") {
        e.currentTarget.classList.remove("show");
    }
});


document.getElementById("typeFilter").addEventListener("change", renderRankings);
document.getElementById("universeFilter").addEventListener("change", renderRankings);
document.getElementById("sagaFilter").addEventListener("change", renderRankings);
document.getElementById("phaseFilter").addEventListener("change", renderRankings);
document.getElementById("franchiseFilter").addEventListener("change", renderRankings);
document.getElementById("yearFilter").addEventListener("change", renderRankings);
document.getElementById("mediumFilter").addEventListener("change", renderRankings);
document.getElementById("ratingFilter").addEventListener("change", renderRankings);
document.getElementById("orderingDropdown").addEventListener("change", renderRankings);

// Initial render
renderRankings();
