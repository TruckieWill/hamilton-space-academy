const lyricsDatabase = [
    {
        title: "One Last Time (Washington's Farewell)",
        youtubeId: "vW29-I_YV70",
        missions: [
            { question: "What tree does Washington want to sit under?", answer: "fig", clue: "A sweet purple fruit." },
            { question: "Which word means 'being thankful'?", answer: "gratitude", clue: "Starts with 'G'." }
        ]
    }
];

let currentMissionIndex = 0;

function loadMission() {
    const quizContent = document.getElementById('quiz-content');
    const videoContainer = document.getElementById('video-container');
    
    if (!quizContent || !videoContainer) return;

    const currentMission = lyricsDatabase[currentMissionIndex];

    videoContainer.innerHTML = `
        <div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;">
            <iframe style="position:absolute;top:0;left:0;width:100%;height:100%;" 
                src="https://www.youtube.com/embed/${currentMission.youtubeId}" 
                frameborder="0" allowfullscreen>
            </iframe>
        </div>`;

    let missionHTML = `<h2>${currentMission.title}</h2>`;
    currentMission.missions.forEach((m, index) => {
        missionHTML += `
            <div class="quiz-box" style="background:rgba(255,255,255,0.1);padding:20px;margin:10px;border-radius:10px;">
                <p>Task ${index + 1}: ${m.question}</p>
                <input type="text" id="ans-${index}" placeholder="Answer...">
                <button onclick="checkAnswer(${index}, '${m.answer}')">Submit</button>
            </div>`;
    });
    
    quizContent.innerHTML = missionHTML;
}

function checkAnswer(index, correctAns) {
    const userAns = document.getElementById(`ans-${index}`).value.toLowerCase().trim();
    if (userAns === correctAns) {
        alert("🚀 Mission Accomplished!");
    } else {
        alert("🛰️ Try again! Hint: " + lyricsDatabase[currentMissionIndex].missions[index].clue);
    }
}

document.addEventListener('DOMContentLoaded', loadMission);
