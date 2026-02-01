const lyricsDatabase = [
    {
        title: "One Last Time (Washington's Farewell)",
        missions: [
            { question: "What tree does Washington want to sit under?", answer: "fig", clue: "A sweet purple fruit." },
            { question: "Which word means 'being thankful'?", answer: "gratitude", clue: "Starts with 'G', rhymes with attitude." }
        ]
    },
    {
        title: "Non-Stop (The Constitution)",
        missions: [
            { question: "How many essays did Hamilton write?", answer: "51", clue: "The answer is a number (John Jay wrote 5, Madison wrote 29)." },
            { question: "Finish the lyric: 'Why do you write like you're running out of ___?'", answer: "time", clue: "Tick-tock, tick-tock..." }
        ]
    },
    {
        title: "Alexander Hamilton (Opening Number)",
        missions: [
            { question: "Where did Alexander grow up? (The Caribbean...)", answer: "island", clue: "A piece of land surrounded by water." },
            { question: "What is his middle name? (Wait, he doesn't have one! What is his last name?)", answer: "hamilton", clue: "It's the name of the show!" }
        ]
    }
];

let currentMissionIndex = 0;

function loadMission() {
    const missionContainer = document.getElementById('mission-control');
    const currentMission = lyricsDatabase[currentMissionIndex];

    let missionHTML = `
        <div class="navigation">
            <button onclick="prevMission()" ${currentMissionIndex === 0 ? 'disabled' : ''}>Previous Song</button>
            <span>Song ${currentMissionIndex + 1} of ${lyricsDatabase.length}</span>
            <button onclick="nextMission()" ${currentMissionIndex === lyricsDatabase.length - 1 ? 'disabled' : ''}>Next Song</button>
        </div>
        <h2 style="margin-top:20px;">Current Mission: ${currentMission.title}</h2>
    `;
    
    currentMission.missions.forEach((m, index) => {
        missionHTML += `
            <div class="quiz-box">
                <p>Task ${index + 1}: ${m.question}</p>
                <input type="text" id="ans-${index}" placeholder="Type answer here...">
                <button onclick="checkAnswer(${index}, '${m.answer}')">Submit</button>
            </div>
        `;
    });
    
    missionContainer.innerHTML = missionHTML;
}

function checkAnswer(index, correctAns) {
    const userAns = document.getElementById(`ans-${index}`).value.toLowerCase().trim();
    if (userAns === correctAns) {
        alert("🚀 Mission Accomplished!");
    } else {
        alert("🛰️ Signal Lost. Try again! Hint: " + lyricsDatabase[currentMissionIndex].missions[index].clue);
    }
}

function nextMission() {
    if (currentMissionIndex < lyricsDatabase.length - 1) {
        currentMissionIndex++;
        loadMission();
    }
}

function prevMission() {
    if (currentMissionIndex > 0) {
        currentMissionIndex--;
        loadMission();
    }
}

window.onload = loadMission;
