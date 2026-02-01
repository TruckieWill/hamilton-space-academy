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
    // 抓取 HTML 里的“仪表盘”组件
    const quizContent = document.getElementById('quiz-content');
    const videoContainer = document.getElementById('video-container');
    const currentMission = lyricsDatabase[currentMissionIndex];

    if (!quizContent || !videoContainer) return;

    // 1. 加载 YouTube 视频
    videoContainer.innerHTML = `
        <div style="margin-bottom: 20px;">
            <iframe width="100%" height="315" 
                src="https://www.youtube.com/embed/${currentMission.youtubeId}" 
                frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
            </iframe>
        </div>`;

    // 2. 加载闯关题目
    let missionHTML = `<h2>Current Mission: ${currentMission.title}</h2>`;
    currentMission.missions.forEach((m, index) => {
        missionHTML += `
            <div class="quiz-box">
                <p>Task ${index + 1}: ${m.question}</p>
                <input type="text" id="ans-${index}" placeholder="Type answer...">
                <button onclick="checkAnswer(${index}, '${m.answer}')">Submit</button>
            </div>
        `;
    });
    
    quizContent.innerHTML = missionHTML;
}

function checkAnswer(index, correctAns) {
    const userAns = document.getElementById(`ans-${index}`).value.toLowerCase().trim();
    if (userAns === correctAns) {
        alert("🚀 Mission Accomplished!");
    } else {
        alert("🛰️ Signal Lost. Try again! Hint: " + lyricsDatabase[currentMissionIndex].missions[index].clue);
    }
}

// 确保页面加载完成后再执行
document.addEventListener('DOMContentLoaded', loadMission);
