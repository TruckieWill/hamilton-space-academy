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
            --success-green: #00ff00;
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
            width: 300px;
            background: var(--cmd-navy);
            border-right: 2px solid var(--gold);
            display: flex;
            flex-direction: column;
            padding: 20px;
            box-shadow: 5px 0 15px rgba(0,0,0,0.5);
        }

        .sidebar h2 { 
            color: var(--gold); 
            letter-spacing: 2px; 
            border-bottom: 1px solid var(--gold); 
            padding-bottom: 10px; 
            text-align: center;
        }

        .mission-list {
            overflow-y: auto;
            flex-grow: 1;
        }

        .mission-btn {
            width: 100%;
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
            display: flex;
            justify-content: space-between;
        }

        .mission-btn:hover { background: var(--electric-blue); border-color: white; }
        .mission-btn.active { border-left: 6px solid var(--gold); background: #1c1f35; }
        .status-dot { height: 10px; width: 10px; border-radius: 50%; background: #444; align-self: center; }
        .status-dot.done { background: var(--success-green); box-shadow: 0 0 5px var(--success-green); }

        /* Main Dashboard */
        .main-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            padding: 30px;
            overflow-y: auto;
        }

        .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
        .mission-title { font-size: 2.2rem; color: var(--gold); margin: 0; text-transform: uppercase; text-shadow: 2px 2px 4px black; }

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

        video { width: 100%; aspect-ratio: 16/9; display: block; background: #000; }

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
            box-sizing: border-box;
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

        #feedback { margin-top: 15px; font-weight: bold; text-align: center; height: 24px; }
    </style>
</head>
<body>

    <div class="sidebar">
        <h2>🚀 MISSIONS</h2>
        <div class="mission-list" id="missionList"></div>
        <div style="margin-top: 20px; font-size: 0.8rem; color: #666; text-align: center;">
            Hamilton Space Academy © 2026
        </div>
    </div>

    <div class="main-content">
        <div class="header">
            <h1 class="mission-title" id="currentTitle">Initiating System...</h1>
            <div style="background: #222; padding: 10px; border-radius: 8px;">
                CADET YEZI | <span id="completedCount" style="color: var(--gold); font-weight: bold;">0</span> / 9 MISSIONS CLEAR
            </div>
        </div>

        <div class="display-grid">
            <div class="video-container">
                <video id="mainPlayer" controls preload="auto">
                    <source src="" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>

            <div class="info-panel">
                <div class="meaning-box">
                    <h3>📖 Decryption Manual</h3>
                    <p id="meaningText">Welcome to the Academy. Please select a mission from the sidebar to begin your training.</p>
                </div>

                <div class="game-box">
                    <h3>🎯 Mission Challenge</h3>
                    <p id="gameQuestion">Awaiting mission selection...</p>
                    <input type="text" id="userInput" placeholder="Type secret word here..." autocomplete="off">
                    <button class="btn-submit" onclick="checkAnswer()">Verify Command</button>
                    <div id="feedback"></div>
                </div>
            </div>
        </div>
    </div>

    <script>
        // FULL 9 MISSIONS - ENGLISH ONLY
        const missions = [
            { title: "Alexander Hamilton", file: "alexander_hamilton.mp4", meaning: "Discover how an orphan changed his destiny through the power of reading and writing. He proved that where you come from doesn't limit where you can go.", question: "How did Hamilton get out of his hometown? (Clue: Writing his way ____)", answer: "out" },
            { title: "My Shot", file: "my_shot.mp4", meaning: "A song about ambition and seizing every opportunity. He is 'young, scrappy, and hungry' and won't let his chance slip away.", question: "Complete the iconic line: I am not throwing away my ____!", answer: "shot" },
            { title: "The Schuyler Sisters", file: "the_schuyler_sisters.mp4", meaning: "Explore the energy of NYC in 1776. The sisters are looking for a revolution in how people think, not just a party.", question: "Look around at how lucky we are to be ____ right now!", answer: "alive" },
            { title: "You'll Be Back", file: "youll_be_back.mp4", meaning: "King George III treats the American Revolution like a bad breakup. It's a funny lesson in irony and overconfidence.", question: "What does the King think the colonists will do? (You'll be ____)", answer: "back" },
            { title: "Satisfied", file: "satisfied.mp4", meaning: "A story of sacrifice. Angelica puts her sister Eliza's happiness above her own feelings. A very brave choice.", question: "What is the famous toast Angelica makes? To the bride! To the ____!", answer: "groom" },
            { title: "Wait For It", file: "wait_for_it.mp4", meaning: "Burr explains his philosophy: while Hamilton rushes in, Burr waits for the right moment. What are you willing to wait for?", question: "Burr says: I am the one thing in life I can ____.", answer: "control" },
            { title: "Non-Stop", file: "non_stop.mp4", meaning: "Witness Hamilton's legendary work ethic. He wrote 51 of the 85 Federalist Papers in six months—never stopping!", question: "How many essays did Hamilton write in this song?", answer: "51" },
            { title: "One Last Time", file: "one_last_time.mp4", meaning: "Washington shows true leadership by stepping down from power. He wants to teach the nation how to say goodbye.", question: "Washington wants to sit under his own vine and ____ tree.", answer: "fig" },
            { title: "Who Lives, Who Dies", file: "who_lives_who_dies.mp4", meaning: "The finale. It reminds us that your legacy is told by those you leave behind. Who tells your story?", question: "The final question of the show: Who tells your ____?", answer: "story" }
        ];

        let currentMissionIndex = -1;
        let completedMissions = new Set();

        // Build Sidebar
        const listEl = document.getElementById('missionList');
        missions.forEach((m, index) => {
            const btn = document.createElement('button');
            btn.className = 'mission-btn';
            btn.id = `btn-${index}`;
            btn.innerHTML = `<span>Mission 0${index + 1}: ${m.title}</span><div class="status-dot" id="dot-${index}"></div>`;
            btn.onclick = () => loadMission(index);
            listEl.appendChild(btn);
        });

        function loadMission(index) {
            currentMissionIndex = index;
            const data = missions[index];
            
            // Update Title & Video
            document.getElementById('currentTitle').innerText = data.title;
            const player = document.getElementById('mainPlayer');
            
            // Critical Path Update
            player.src = `videos/${data.file}`; 
            player.load();
            player.play().catch(e => console.log("Auto-play blocked or file missing."));

            // Update Text content
            document.getElementById('meaningText').innerText = data.meaning;
            document.getElementById('gameQuestion').innerText = data.question;
            document.getElementById('feedback').innerText = "";
            document.getElementById('userInput').value = "";

            // UI Styling
            document.querySelectorAll('.mission-btn').forEach((b, i) => {
                b.classList.toggle('active', i === index);
            });
            document.getElementById('userInput').focus();
        }

        function checkAnswer() {
            if (currentMissionIndex === -1) return;

            const input = document.getElementById('userInput').value.toLowerCase().trim();
            const correct = missions[currentMissionIndex].answer.toLowerCase();
            const fb = document.getElementById('feedback');

            if (input.includes(correct)) {
                fb.innerHTML = "✅ ACCESS GRANTED. MISSION CLEAR!";
                fb.style.color = "var(--success-green)";
                
                // Track Progress
                completedMissions.add(currentMissionIndex);
                document.getElementById(`dot-${currentMissionIndex}`).classList.add('done');
                document.getElementById('completedCount').innerText = completedMissions.size;
                
                if (completedMissions.size === 9) {
                    alert("CONGRATULATIONS CADET YEZI! YOU ARE A GRADUATE OF THE HAMILTON SPACE ACADEMY!");
                }
            } else {
                fb.innerHTML = "❌ ERROR: INCORRECT DATA. LISTEN AGAIN.";
                fb.style.color = "#ff4444";
            }
        }

        // Allow Enter key to submit
        document.getElementById("userInput").addEventListener("keyup", function(event) {
            if (event.key === "Enter") {
                checkAnswer();
            }
        });
    </script>
</body>
</html>
