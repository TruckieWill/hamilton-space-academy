const lyricsDatabase = [
    {
        title: "One Last Time (Washington's Farewell)",
        missions: [
            { question: "What tree does Washington want to sit under?", answer: "fig", clue: "A sweet purple fruit." },
            { question: "Which word means 'being thankful'?", answer: "gratitude", clue: "Starts with 'G', rhymes with attitude." }
        ]
    }
];

function loadMission() {
    const missionContainer = document.getElementById('mission-control');
    const currentMission = lyricsDatabase[0];

    let missionHTML = `<h2>Current Mission: ${currentMission.title}</h2>`;
    
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
        alert("🚀 Great job, Rainy! Mission accomplished!");
    } else {
        alert("🛰️ Signal Lost. Try again! Hint: " + lyricsDatabase[0].missions[index].clue);
    }
}

window.onload = loadMission;
