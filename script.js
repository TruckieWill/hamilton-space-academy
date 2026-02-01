<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hamilton Space Academy | Mission Control</title>
    <style>
        :root {
            --space-black: #05070a;
            --cmd-navy: #121420;
            --gold: #d4af37;
            --electric-blue: #4d4dff;
            --star-white: #f0f0f0;
        }

        body {
            background-color: var(--space-black);
            color: var(--star-white);
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            display: flex;
            height: 100vh;
            overflow: hidden;
        }

        /* Sidebar - Mission Selection */
        .sidebar {
            width: 280px;
            background: var(--cmd-navy);
            border-right: 2px solid var(--gold);
            display: flex;
            flex-direction: column;
            padding: 20px;
            box-shadow: 5px 0 15px rgba(0,0,0,0.5);
        }

        .sidebar h2 { color: var(--gold); letter-spacing: 2px; border-bottom: 1px solid var(--gold); padding-bottom: 10px; }

        .mission-btn {
            background: rgba(255,255,255,0.05);
            border: 1px solid #333;
            color: var(--star-white);
            padding: 15px;
            margin: 8px 0;
            text-align: left;
            cursor: pointer;
            transition: all 0.3s;
            border-radius: 4px;
            font-size: 0.9rem;
        }

        .mission-btn:hover { background: var(--electric-blue); border-color: white; }
        .mission-btn.active { border-left: 6px solid var(--gold); background: #1c1f35; }

        /* Main Dashboard */
        .main-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            padding: 30px;
            overflow-y: auto;
        }

        .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
        .mission-title { font-size: 2.2rem; color: var(--gold); margin: 0; text-transform: uppercase; }

        .display-grid {
            display: grid;
            grid-template-columns: 1.8fr 1fr;
            gap: 25px;
        }

        /* Video Feed */
        .video-container {
            background: #000;
            border-radius: 12px;
            overflow: hidden;
            border: 2px solid var(--electric-blue);
            box-shadow: 0 0 30px rgba(77, 77, 255, 0.3);
        }

        video { width: 100%; aspect-ratio: 16/9; display: block; }

        /* Decryption & Game */
        .info-panel {
            background: var(--cmd-navy);
            padding: 25px;
            border-radius: 12px;
            border: 1px solid #333;
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .meaning-box h3 { color: var(--gold); margin-top: 0; border-left: 4px solid var(--gold); padding-left: 10px; }
        .meaning-box p { line-height: 1.6; font-size: 1.1rem; color: #ccc; }

        .game-box {
            background: #1c1f35;
            padding: 20px;
            border-radius: 10px;
            border-top: 4px solid var(--electric-blue);
        }

        .game-box h3 { margin-top: 0; color: var(--star-white); }

        input[type="text"] {
            width: 100%;
            padding: 12px;
            background: #05070a;
            border: 1px solid var(--electric-blue);
            color: white;
            margin-top: 15px;
            border-radius: 4px;
            font-size: 1rem;
        }

        .btn-submit {
            background: var(--gold);
            color: black;
            border: none;
            padding: 12px;
            margin-top: 15px;
            cursor: pointer;
            font-weight: bold;
            width: 100%;
            border-radius: 4px;
            text-transform: uppercase;
        }

        .btn-submit:hover { background: #b8962d; }

        #feedback { margin-top: 15px; font-weight: bold; text-align: center; height: 20px; }
    </style>
</head>
<body>

    <div class="sidebar">
        <h2>🚀 MISSIONS</h2>
        <div id="missionList"></div>
    </div>

    <div class="main-content">
        <div class="header">
            <h1 class="mission-title" id="currentTitle">Waiting for Command...</h1>
            <div>Yezi | Cadet Rank | <span id="completedCount">0</span>/9 Done</div>
        </div>

        <div class="display-grid">
            <div class="video-container">
                <video id="mainPlayer" controls poster="https://www.nasa.gov/wp-content/uploads/2023/03/main_scene_v2.jpg">
                    <source src="" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>

            <div class="info-panel">
                <div class="meaning-box">
                    <h3>📖 Decryption Manual</h3>
                    <p id="meaningText">Select a mission to begin your training, Cadet.</p>
                </div>

                <div class="game-box">
                    <h3>🎯 Mission Challenge</h3>
                    <p id="gameQuestion">Mission data not loaded.</p>
                    <input type="text" id="userInput" placeholder="Type your answer here...">
                    <button class="btn-submit" onclick="checkAnswer()">Verify Command</button>
                    <div id="feedback"></div>
                </div>
            </div>
        </div>
    </div>

    <script>
        const missions = [
            { title: "Alexander Hamilton", file: "alexander_hamilton.mp4", meaning: "Discover how an orphan changed his destiny through the power of reading and writing.", question: "How did Hamilton get out of his hometown? (Clue: Writing his way ____)", answer: "out" },
            { title: "My Shot", file: "my_shot.mp4", meaning: "A song about ambition and seizing every opportunity. He is 'young, scrappy, and hungry'.", question: "Complete the iconic line: I am not throwing away my ____!", answer: "shot" },
            { title: "The Schuyler Sisters", file: "the_schuyler_sisters.mp4", meaning: "Explore the energy of NYC and the sisters' search for a new way of thinking.", question: "Look around at how lucky we are to be ____ right now!", answer: "alive" },
            { title: "You'll Be Back", file: "youll_be_back.mp4", meaning: "King George III treats the revolution like a breakup. A lesson in irony and arrogance.", question: "What does the King think the colonists will do? (You'll be ____)", answer: "back" },
            { title: "Satisfied", file: "satisfied.mp4", meaning: "A story of sacrifice. Angelica chooses her sister's happiness over her own heart.", question: "To the bride! To the ____!", answer: "groom" },
            { title: "Wait For It", file: "wait_for_it.mp4", meaning: "Contrast Hamilton's impulse with Burr's patience. What are you willing to wait for?", question: "Burr says: I am the one thing in life I can ____.", answer: "control" },
            { title: "Non-Stop", file: "non_stop.mp4", meaning: "Witness pure focus. Hamilton wrote 51 of the 85 Federalist Papers in just six months.", question: "How many essays did Hamilton write in this song?", answer: "51" },
            { title: "One Last Time", file: "one_last_time.mp4", meaning: "Washington teaches that leadership is about knowing when to step down gracefully.", question: "Washington wants to sit under his own vine and ____ tree.", answer: "fig" },
            { title: "Who Lives, Who Dies", file: "who_lives_who_dies.mp4", meaning: "The finale. Your legacy is determined by who tells your story after you are gone.", question: "The central question: Who tells your ____?", answer: "story" }
        ];

        let currentMissionIndex = 0;
        let completedMissions = new Set();

        const listEl = document.getElementById('missionList');
        missions.forEach((m, index) => {
            const btn = document.createElement('button');
            btn.className = 'mission-btn';
            btn.innerText = `Mission 0${index + 1}: ${m.title}`;
            btn.onclick = () => loadMission(index);
            listEl.appendChild(btn);
        });

        function loadMission(index) {
            currentMissionIndex = index;
            const data = missions[index];
            
            document.getElementById('currentTitle').innerText = data.title;
            const player = document.getElementById('mainPlayer');
            
            // Path correctly points to the 'videos' folder
            player.src = `videos/${data.file}`; 
            player.load();
            player.play();

            document.getElementById('meaningText').innerText = data.meaning;
            document.getElementById('gameQuestion').innerText = data.question;
            document.getElementById('feedback').innerText = "";
            document.getElementById('userInput').value = "";

            const btns = document.querySelectorAll('.mission-btn');
            btns.forEach((b, i) => b.classList.toggle('active', i === index));
        }

        function checkAnswer() {
            const input = document.getElementById('userInput').value.toLowerCase().trim();
            const correct = missions[currentMissionIndex].answer.toLowerCase();
            const fb = document.getElementById('feedback');

            if (input.includes(correct)) {
                fb.innerHTML = "✅ COMMAND ACCEPTED. MISSION ACCOMPLISHED!";
                fb.style.color = "#00ff00";
                completedMissions.add(currentMissionIndex);
                document.getElementById('completedCount').innerText = completedMissions.size;
            } else {
                fb.innerHTML = "❌ ERROR: DATA MISMATCH. CHECK LYRICS AGAIN.";
                fb.style.color = "#ff4444";
            }
        }
    </script>
</body>
</html>