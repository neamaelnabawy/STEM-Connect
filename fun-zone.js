/* ---- Fun Zone - Data ---- */

const MEMORY_ICONS = ["bi-cpu", "bi-atom", "bi-lightning-charge", "bi-rocket-takeoff", "bi-gear", "bi-magnet", "bi-flask", "bi-calculator"];

const BRAIN_TEASERS = [
    { category: "Logic", icon: "bi-lightbulb", question: "I have branches, but no fruit, trunk, or leaves. What am I?", answer: "A bank. Its branches are locations, not tree parts." },
    { category: "Math", icon: "bi-calculator", question: "The more you take, the more you leave behind. What am I?", answer: "Footsteps." },
    { category: "Physics", icon: "bi-lightning-charge", question: "What can travel around the world while staying in a corner?", answer: "A stamp on an envelope." },
    { category: "Logic", icon: "bi-puzzle", question: "A man builds a rectangular house with four walls, each facing south. A bear walks by. What color is the bear?", answer: "White - the house is at the North Pole, so it's a polar bear." },
    { category: "Chemistry", icon: "bi-flask", question: "I'm a gas that makes up about 78% of Earth's atmosphere. What am I?", answer: "Nitrogen." },
    { category: "Riddle", icon: "bi-question-circle", question: "What has keys but can't open locks?", answer: "A piano (or a keyboard)." }
];

const FUN_FACTS = [
    { icon: "bi-stars", label: "Space", fact: "A day on Venus is longer than its year - it takes 243 Earth days to rotate once, but only 225 to orbit the Sun." },
    { icon: "bi-droplet", label: "Biology", fact: "Octopuses have three hearts and blue blood, because their blood uses copper instead of iron to carry oxygen." },
    { icon: "bi-lightning", label: "Physics", fact: "Lightning is roughly five times hotter than the surface of the sun, reaching about 30,000 Kelvin." },
    { icon: "bi-cpu", label: "Tech", fact: "The first computer 'bug' was an actual moth found stuck in a Harvard Mark II relay in 1947." },
    { icon: "bi-tree", label: "Nature", fact: "Bananas are naturally slightly radioactive due to their potassium content - though harmlessly so." },
    { icon: "bi-globe", label: "Earth", fact: "Almost all of Earth's fresh liquid water is groundwater - less than 1% of all fresh water is in rivers and lakes." }
];

const FUN_QUIZ_QUESTIONS = [
    { question: "What is the chemical symbol for Gold?", options: ["Go", "Gd", "Au", "Ag"], correct: 2 },
    { question: "Which planet has the most moons in our solar system?", options: ["Jupiter", "Saturn", "Neptune", "Uranus"], correct: 1 },
    { question: "What does 'CPU' stand for?", options: ["Central Process Unit", "Central Processing Unit", "Computer Personal Unit", "Central Processor Utility"], correct: 1 },
    { question: "What is the powerhouse of the cell?", options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi Body"], correct: 2 },
    { question: "Who is known as the father of modern physics?", options: ["Isaac Newton", "Albert Einstein", "Nikola Tesla", "Galileo Galilei"], correct: 1 },
    { question: "What is the value of Pi rounded to two decimal places?", options: ["3.16", "3.12", "3.14", "3.18"], correct: 2 },
    { question: "Which programming language is known as the 'language of the web'?", options: ["Python", "Java", "JavaScript", "C++"], correct: 2 },
    { question: "What gas do plants absorb from the atmosphere?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], correct: 2 }
];

const CHALLENGES = [
    { icon: "bi-code-slash", tag: "Coding", title: "Build a mini calculator", desc: "Code a simple calculator using HTML, CSS, and JavaScript in under an hour." },
    { icon: "bi-tools", tag: "Engineering", title: "Build a paper bridge", desc: "Design a bridge from paper that can hold a small book. Test and improve it." },
    { icon: "bi-lightbulb", tag: "Creativity", title: "Invent a solution", desc: "Pick a daily problem and sketch out an invention that could solve it." },
    { icon: "bi-bar-chart", tag: "Data", title: "Analyze a dataset", desc: "Find a small public dataset online and summarize 3 interesting insights from it." },
    { icon: "bi-globe", tag: "Research", title: "Learn one new fact", desc: "Research a STEM topic you know nothing about and write 3 sentences on it." },
    { icon: "bi-people", tag: "Teamwork", title: "Teach someone", desc: "Explain a STEM concept you recently learned to a friend or family member." }
];

/* ---- Games Tabs ---- */

function initGameTabs(){
    const tabs = document.querySelectorAll(".game-tab-btn");
    const panels = document.querySelectorAll(".game-panel");

    tabs.forEach(tab => {
        tab.addEventListener("click", function(){
            tabs.forEach(t => t.classList.remove("active"));
            panels.forEach(p => p.classList.remove("active"));
            this.classList.add("active");
            document.getElementById(this.dataset.game).classList.add("active");
        });
    });
}

/* ---- Memory Match Game ---- */

let memoryState = { first: null, second: null, moves: 0, matches: 0, locked: false };

function initMemoryGame(){
    const grid = document.getElementById("memory-grid");
    const restartBtn = document.getElementById("memory-restart-btn");
    const movesEl = document.getElementById("memory-moves");
    const matchesEl = document.getElementById("memory-matches");
    const messageEl = document.getElementById("memory-message");
    if (!grid) return;

    function buildBoard(){
        memoryState = { first: null, second: null, moves: 0, matches: 0, locked: false };
        movesEl.textContent = "0";
        matchesEl.textContent = "0 / 8";
        messageEl.textContent = "";

        const pairs = [...MEMORY_ICONS, ...MEMORY_ICONS]
            .map(icon => ({ icon, id: Math.random() }))
            .sort(() => Math.random() - 0.5);

        grid.innerHTML = "";
        pairs.forEach((item, index) => {
            const tile = document.createElement("div");
            tile.className = "memory-tile";
            tile.dataset.icon = item.icon;
            tile.dataset.index = index;
            tile.innerHTML = `<i class="bi ${item.icon}"></i>`;
            tile.addEventListener("click", () => handleTileClick(tile));
            grid.appendChild(tile);
        });
    }

    function handleTileClick(tile){
        if (memoryState.locked) return;
        if (tile.classList.contains("flipped") || tile.classList.contains("matched")) return;

        tile.classList.add("flipped");

        if (memoryState.first === null){
            memoryState.first = tile;
            return;
        }

        memoryState.second = tile;
        memoryState.locked = true;
        memoryState.moves++;
        movesEl.textContent = memoryState.moves;

        const isMatch = memoryState.first.dataset.icon === memoryState.second.dataset.icon;

        if (isMatch){
            memoryState.first.classList.add("matched");
            memoryState.second.classList.add("matched");
            memoryState.matches++;
            matchesEl.textContent = `${memoryState.matches} / 8`;
            resetTurn();

            if (memoryState.matches === 8){
                messageEl.textContent = `You matched all pairs in ${memoryState.moves} moves! 🎉`;
            }
        } else {
            setTimeout(() => {
                memoryState.first.classList.remove("flipped");
                memoryState.second.classList.remove("flipped");
                resetTurn();
            }, 800);
        }
    }

    function resetTurn(){
        memoryState.first = null;
        memoryState.second = null;
        memoryState.locked = false;
    }

    restartBtn.addEventListener("click", buildBoard);
    buildBoard();
}

/* ---- Math Sprint Game ---- */

let mathState = { score: 0, timeLeft: 60, timerId: null, current: null };

function initMathGame(){
    const startScreen = document.getElementById("math-start-screen");
    const playScreen = document.getElementById("math-play-screen");
    const endScreen = document.getElementById("math-end-screen");
    const startBtn = document.getElementById("math-start-btn");
    const retryBtn = document.getElementById("math-retry-btn");
    const submitBtn = document.getElementById("math-submit-btn");
    const input = document.getElementById("math-answer-input");
    const questionEl = document.getElementById("math-question");
    const scoreEl = document.getElementById("math-score");
    const timeEl = document.getElementById("math-time");
    const finalScoreEl = document.getElementById("math-final-score");

    if (!startScreen) return;

    function generateQuestion(){
        const ops = ["+", "-", "\u00d7"];
        const op = ops[Math.floor(Math.random() * ops.length)];
        let a, b, answer;

        if (op === "+"){
            a = Math.floor(Math.random() * 50) + 1;
            b = Math.floor(Math.random() * 50) + 1;
            answer = a + b;
        } else if (op === "-"){
            a = Math.floor(Math.random() * 50) + 25;
            b = Math.floor(Math.random() * 25) + 1;
            answer = a - b;
        } else {
            a = Math.floor(Math.random() * 12) + 1;
            b = Math.floor(Math.random() * 12) + 1;
            answer = a * b;
        }

        mathState.current = answer;
        questionEl.textContent = `${a} ${op} ${b} = ?`;
    }

    function startGame(){
        mathState.score = 0;
        mathState.timeLeft = 60;
        scoreEl.textContent = "0";
        timeEl.textContent = "60s";
        startScreen.style.display = "none";
        endScreen.style.display = "none";
        playScreen.style.display = "block";
        input.value = "";
        generateQuestion();
        input.focus();

        mathState.timerId = setInterval(() => {
            mathState.timeLeft--;
            timeEl.textContent = mathState.timeLeft + "s";
            if (mathState.timeLeft <= 0) endGame();
        }, 1000);
    }

    function endGame(){
        clearInterval(mathState.timerId);
        playScreen.style.display = "none";
        endScreen.style.display = "block";
        finalScoreEl.textContent = mathState.score;
    }

    function submitAnswer(){
        const value = Number(input.value);
        if (input.value.trim() !== "" && value === mathState.current){
            mathState.score++;
            scoreEl.textContent = mathState.score;
        }
        input.value = "";
        generateQuestion();
    }

    startBtn.addEventListener("click", startGame);
    retryBtn.addEventListener("click", startGame);
    submitBtn.addEventListener("click", submitAnswer);
    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") submitAnswer();
    });
}

/* ---- Brain Teasers ---- */

function initBrainTeasers(){
    const grid = document.getElementById("teasers-grid");
    if (!grid) return;

    BRAIN_TEASERS.forEach((teaser, index) => {
        const card = document.createElement("div");
        card.className = "teaser-card";
        card.innerHTML = `
            <div class="teaser-card-top">
                <div class="teaser-icon"><i class="bi ${teaser.icon}"></i></div>
                <span>${teaser.category}</span>
            </div>
            <p class="teaser-question">${teaser.question}</p>
            <div class="teaser-answer" id="teaser-answer-${index}">${teaser.answer}</div>
            <button class="reveal-btn" data-index="${index}">Reveal Answer</button>
        `;
        grid.appendChild(card);
    });

    grid.querySelectorAll(".reveal-btn").forEach(btn => {
        btn.addEventListener("click", function(){
            const answer = document.getElementById(`teaser-answer-${this.dataset.index}`);
            const isShown = answer.classList.toggle("show");
            this.textContent = isShown ? "Hide Answer" : "Reveal Answer";
        });
    });
}

/* ---- Fun Quiz ---- */

let funQuizState = { current: 0, score: 0, answered: false };

function initFunQuiz(){
    const quizForm = document.getElementById("funquiz-form");
    const quizResult = document.getElementById("funquiz-result");
    const quizBody = document.getElementById("funquiz-body");
    const progressFill = document.getElementById("funquiz-progress-fill");
    const progressLabel = document.getElementById("funquiz-progress-label");
    const nextBtn = document.getElementById("funquiz-next-btn");
    const retakeBtn = document.getElementById("funquiz-retake-btn");
    if (!quizForm) return;

    function renderQuestion(){
        const q = FUN_QUIZ_QUESTIONS[funQuizState.current];
        const optionsHtml = q.options.map((opt, i) => `
            <div class="funquiz-option" data-index="${i}">${opt}</div>
        `).join("");

        quizForm.innerHTML = `<h3>${q.question}</h3><div class="funquiz-options">${optionsHtml}</div>`;

        const percent = Math.round(((funQuizState.current) / FUN_QUIZ_QUESTIONS.length) * 100);
        progressFill.style.width = percent + "%";
        progressLabel.textContent = `Question ${funQuizState.current + 1} of ${FUN_QUIZ_QUESTIONS.length}`;

        nextBtn.disabled = true;
        nextBtn.textContent = funQuizState.current === FUN_QUIZ_QUESTIONS.length - 1 ? "See Score" : "Next Question";
        funQuizState.answered = false;

        quizForm.querySelectorAll(".funquiz-option").forEach(opt => {
            opt.addEventListener("click", function(){
                if (funQuizState.answered) return;
                funQuizState.answered = true;

                const selectedIndex = Number(this.dataset.index);
                const isCorrect = selectedIndex === q.correct;

                quizForm.querySelectorAll(".funquiz-option").forEach((o, i) => {
                    if (i === q.correct) o.classList.add("correct");
                    else if (i === selectedIndex) o.classList.add("incorrect");
                });

                if (isCorrect) funQuizState.score++;
                nextBtn.disabled = false;
            });
        });
    }

    function showResult(){
        quizBody.style.display = "none";
        quizResult.classList.add("active");
        const total = FUN_QUIZ_QUESTIONS.length;
        document.getElementById("funquiz-score-value").textContent = `${funQuizState.score}/${total}`;

        let message;
        const ratio = funQuizState.score / total;
        if (ratio === 1) message = "Perfect score! You're a true STEM genius.";
        else if (ratio >= 0.7) message = "Great job! You really know your STEM facts.";
        else if (ratio >= 0.4) message = "Nice effort! A bit more practice and you'll ace it.";
        else message = "Keep exploring STEM - every expert started as a beginner!";

        document.getElementById("funquiz-result-message").textContent = message;
    }

    nextBtn.addEventListener("click", function(){
        if (funQuizState.current < FUN_QUIZ_QUESTIONS.length - 1){
            funQuizState.current++;
            renderQuestion();
        } else {
            const percent = 100;
            progressFill.style.width = percent + "%";
            showResult();
        }
    });

    retakeBtn.addEventListener("click", function(){
        funQuizState = { current: 0, score: 0, answered: false };
        quizBody.style.display = "block";
        quizResult.classList.remove("active");
        renderQuestion();
    });

    renderQuestion();
}

/* ---- Challenges (with localStorage progress) ---- */

function getCompletedChallenges(){
    try {
        return JSON.parse(localStorage.getItem("funZoneChallenges")) || [];
    } catch(e){
        return [];
    }
}

function saveCompletedChallenges(list){
    localStorage.setItem("funZoneChallenges", JSON.stringify(list));
}

function initChallenges(){
    const grid = document.getElementById("challenges-grid");
    const progressFill = document.getElementById("challenges-progress-fill");
    const progressLabel = document.getElementById("challenges-progress-label");
    if (!grid) return;

    let completed = getCompletedChallenges();

    function updateProgress(){
        const percent = Math.round((completed.length / CHALLENGES.length) * 100);
        progressFill.style.width = percent + "%";
        progressLabel.textContent = `${completed.length} of ${CHALLENGES.length} completed`;
    }

    CHALLENGES.forEach((challenge, index) => {
        const isDone = completed.includes(index);
        const card = document.createElement("div");
        card.className = "challenge-card" + (isDone ? " done" : "");
        card.dataset.index = index;
        card.innerHTML = `
            <div class="challenge-card-top">
                <div class="challenge-icon"><i class="bi ${challenge.icon}"></i></div>
                <div class="challenge-check ${isDone ? "checked" : ""}" data-index="${index}">
                    <i class="bi bi-check-lg"></i>
                </div>
            </div>
            <h4>${challenge.title}</h4>
            <p>${challenge.desc}</p>
            <span class="challenge-tag">${challenge.tag}</span>
        `;
        grid.appendChild(card);
    });

    grid.querySelectorAll(".challenge-check").forEach(check => {
        check.addEventListener("click", function(){
            const index = Number(this.dataset.index);
            const card = this.closest(".challenge-card");
            completed = getCompletedChallenges();

            if (completed.includes(index)){
                completed = completed.filter(i => i !== index);
                this.classList.remove("checked");
                card.classList.remove("done");
            } else {
                completed.push(index);
                this.classList.add("checked");
                card.classList.add("done");
            }

            saveCompletedChallenges(completed);
            updateProgress();
        });
    });

    updateProgress();
}

/* ---- Fun Facts ---- */

function initFunFacts(){
    const grid = document.getElementById("facts-grid");
    if (!grid) return;

    FUN_FACTS.forEach(fact => {
        const card = document.createElement("div");
        card.className = "fact-flip";
        card.innerHTML = `
            <div class="fact-flip-inner">
                <div class="fact-face fact-front">
                    <i class="bi ${fact.icon}"></i>
                    <span>${fact.label}</span>
                    <small>Tap to reveal</small>
                </div>
                <div class="fact-face fact-back">
                    <p>${fact.fact}</p>
                </div>
            </div>
        `;
        card.addEventListener("click", () => card.classList.toggle("flipped"));
        grid.appendChild(card);
    });
}

/* ---- Init ---- */

document.addEventListener("DOMContentLoaded", function(){
    initGameTabs();
    initMemoryGame();
    initMathGame();
    initBrainTeasers();
    initFunQuiz();
    initChallenges();
    initFunFacts();
});