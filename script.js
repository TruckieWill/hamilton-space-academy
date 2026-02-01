const lyricsDatabase = [
    {
        title: "One Last Time (Washington's Farewell)",
        // 尝试这个 ID，如果还是不行，可能是因为这个特定视频限制了嵌入
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

    // 使用更加标准的嵌入代码
    videoContainer.innerHTML = `
        <div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin-bottom:20px;background:#000;">
            <iframe 
                style="position:absolute;top:0;left:0;width:100%;height:100%;" 
                src="https://www.youtube.com/embed/${currentMission.youtubeId}?rel=0&modestbranding=1" 
                title="YouTube video player" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerpolicy="strict-origin-when-cross-origin" 
                allowfullscreen>
            </iframe>
        </div>`;

    let missionHTML = `<h2>${currentMission.title}</h2>`;
    currentMission.missions.forEach((m, index) => {
        missionHTML += `
            <div class="quiz-box" style="background:rgba(255,255,255,0.1);padding:20px;margin:10px auto;border-radius:10px;max-width:500px;">
                <p>Task ${index + 1}: ${m.question}</p>
                <input type="text" id="ans-${index}" style="padding:8px;border-radius:4px;border:none;" placeholder="Answer...">
                <button onclick="checkAnswer(${index}, '${m.answer}')" style="padding:8px 15px;background:#1a73e8;color:white;border:none;border-radius:4px;cursor:pointer;">Submit</button>
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

// 确保 DOM 完全加载后再运行
document.addEventListener('DOMContentLoaded', loadMission);
