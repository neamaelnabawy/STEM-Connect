/* ---- Career Compass - Data ---- */

const CAREER_TRACKS = {
    software: {
        title: "Software & AI Engineering",
        icon: "bi-cpu",
        badge: "Software & AI",
        color: "software",
        description: "You think in logic and love turning ideas into working products. A path in software engineering, app development, or AI will let you build the tools of tomorrow.",
        tags: ["Programming", "Problem Solving", "App Development", "AI/ML"],
        roadmap: [
            { title: "Learn Programming Fundamentals", desc: "Start with Python or JavaScript. Master variables, loops, functions, and basic data structures." },
            { title: "Build Small Projects", desc: "Create a to-do app, a calculator, or a simple website to apply what you learn hands-on." },
            { title: "Study Data Structures & Algorithms", desc: "Understand arrays, trees, sorting, and complexity to write efficient code." },
            { title: "Specialize", desc: "Pick a direction: web development, mobile apps, or AI/Machine Learning." },
            { title: "Contribute & Apply", desc: "Join open-source projects, build a portfolio, and apply for internships or hackathons." }
        ]
    },
    data: {
        title: "Data Science & Analytics",
        icon: "bi-bar-chart-line",
        badge: "Data Science",
        color: "data",
        description: "You love finding patterns and making sense of numbers. A career in data science or analytics will let you turn raw data into insights that drive real decisions.",
        tags: ["Statistics", "Machine Learning", "Data Visualization", "Research"],
        roadmap: [
            { title: "Master Math & Statistics", desc: "Build a strong base in probability, statistics, and linear algebra." },
            { title: "Learn Python & SQL", desc: "Get comfortable with Pandas, NumPy, and querying databases." },
            { title: "Practice Data Visualization", desc: "Learn tools like Matplotlib, Power BI, or Tableau to tell stories with data." },
            { title: "Explore Machine Learning", desc: "Study core ML algorithms and try Kaggle competitions to test your skills." },
            { title: "Build a Data Portfolio", desc: "Complete real projects using public datasets and share them on GitHub." }
        ]
    },
    engineering: {
        title: "Engineering & Robotics",
        icon: "bi-gear-wide-connected",
        badge: "Engineering",
        color: "engineering",
        description: "You enjoy building, fixing, and understanding how things work. Engineering and robotics will let you design real-world systems and machines that solve problems.",
        tags: ["CAD Design", "Robotics", "Hands-on Building", "Physics"],
        roadmap: [
            { title: "Strengthen Physics & Math", desc: "Focus on mechanics, forces, and calculus - the foundation of all engineering." },
            { title: "Learn CAD & Design Tools", desc: "Get familiar with tools like AutoCAD, SolidWorks, or Fusion 360." },
            { title: "Get Hands-On", desc: "Join a robotics club or build small electronics/Arduino projects." },
            { title: "Choose a Specialization", desc: "Explore mechanical, electrical, or robotics engineering to find your fit." },
            { title: "Work on Real Projects", desc: "Enter engineering competitions and pursue internships in your field." }
        ]
    },
    medicine: {
        title: "Medicine & Biotech",
        icon: "bi-heart-pulse",
        badge: "Medicine & Biotech",
        color: "medicine",
        description: "You're driven by empathy and curiosity about the human body. A path in medicine, biology, or biotechnology will let you improve and save lives.",
        tags: ["Biology", "Research", "Patient Care", "Lab Work"],
        roadmap: [
            { title: "Build a Strong Science Base", desc: "Focus on biology, chemistry, and human anatomy fundamentals." },
            { title: "Get Lab Experience", desc: "Join school labs, science fairs, or volunteer in health-related settings." },
            { title: "Explore Specializations", desc: "Look into clinical medicine, biotechnology, pharmacy, or public health." },
            { title: "Prepare for Entrance Exams", desc: "Study early for the exams required for medical or life-science programs." },
            { title: "Gain Clinical/Research Exposure", desc: "Shadow professionals or intern in hospitals and research centers." }
        ]
    },
    business: {
        title: "STEM Business & Finance",
        icon: "bi-graph-up-arrow",
        badge: "Business & Finance",
        color: "business",
        description: "You combine analytical thinking with leadership and communication. A path in STEM-driven business, finance, or entrepreneurship suits you well.",
        tags: ["Financial Analysis", "Leadership", "Strategy", "Entrepreneurship"],
        roadmap: [
            { title: "Learn Business Fundamentals", desc: "Study economics, finance basics, and how markets work." },
            { title: "Sharpen Analytical Tools", desc: "Get comfortable with Excel, financial modeling, and basic data analysis." },
            { title: "Build Communication Skills", desc: "Practice public speaking, pitching, and writing clear reports." },
            { title: "Get Real Experience", desc: "Join a business club, run a small project, or intern at a startup." },
            { title: "Specialize", desc: "Choose a direction: finance, tech entrepreneurship, or management consulting." }
        ]
    }
};

const QUIZ_QUESTIONS = [
    {
        question: "What subject excites you the most?",
        options: [
            { text: "Coding & building apps", icon: "bi-code-slash", track: "software" },
            { text: "Numbers, data & patterns", icon: "bi-graph-up", track: "data" },
            { text: "Machines & how things work", icon: "bi-nut", track: "engineering" },
            { text: "The human body & helping people", icon: "bi-heart", track: "medicine" },
            { text: "Markets, money & strategy", icon: "bi-briefcase", track: "business" }
        ]
    },
    {
        question: "Pick your ideal weekend project.",
        options: [
            { text: "Building a small app or website", icon: "bi-laptop", track: "software" },
            { text: "Analyzing a dataset or trend", icon: "bi-clipboard-data", track: "data" },
            { text: "Fixing gadgets or building something", icon: "bi-tools", track: "engineering" },
            { text: "Volunteering at a clinic or lab", icon: "bi-hospital", track: "medicine" },
            { text: "Planning a project budget or pitch", icon: "bi-easel", track: "business" }
        ]
    },
    {
        question: "Which skill would you love to master?",
        options: [
            { text: "Programming languages", icon: "bi-terminal", track: "software" },
            { text: "Statistics & machine learning", icon: "bi-diagram-3", track: "data" },
            { text: "CAD design or robotics", icon: "bi-cpu", track: "engineering" },
            { text: "Biology & chemistry", icon: "bi-clipboard-pulse", track: "medicine" },
            { text: "Financial analysis", icon: "bi-cash-coin", track: "business" }
        ]
    },
    {
        question: "Where do you picture your future workplace?",
        options: [
            { text: "A tech startup", icon: "bi-rocket-takeoff", track: "software" },
            { text: "A research lab", icon: "bi-search", track: "data" },
            { text: "A factory or field site", icon: "bi-building-gear", track: "engineering" },
            { text: "A hospital or clinic", icon: "bi-bandaid", track: "medicine" },
            { text: "A corporate office", icon: "bi-building", track: "business" }
        ]
    },
    {
        question: "What's your biggest strength?",
        options: [
            { text: "Logical problem solving", icon: "bi-puzzle", track: "software" },
            { text: "Spotting patterns & trends", icon: "bi-eye", track: "data" },
            { text: "Hands-on building", icon: "bi-wrench-adjustable", track: "engineering" },
            { text: "Empathy & care for others", icon: "bi-emoji-smile", track: "medicine" },
            { text: "Leadership & communication", icon: "bi-megaphone", track: "business" }
        ]
    }
];

/* ---- Quiz Logic ---- */

let currentQuestion = 0;
let answers = new Array(QUIZ_QUESTIONS.length).fill(null);

function initQuiz(){
    const quizForm = document.getElementById("quiz-form");
    const quizResult = document.getElementById("quiz-result");
    const progressFill = document.getElementById("quiz-progress-fill");
    const progressLabel = document.getElementById("quiz-progress-label");
    const backBtn = document.getElementById("quiz-back-btn");
    const nextBtn = document.getElementById("quiz-next-btn");
    const retakeBtn = document.getElementById("retake-quiz-btn");

    if (!quizForm) return;

    renderQuestions();
    showQuestion(0);

    function renderQuestions(){
        quizForm.innerHTML = "";
        QUIZ_QUESTIONS.forEach((q, qIndex) => {
            const qDiv = document.createElement("div");
            qDiv.className = "quiz-question";
            qDiv.dataset.index = qIndex;

            const optionsHtml = q.options.map((opt, oIndex) => `
                <div class="quiz-option" data-track="${opt.track}" data-option="${oIndex}">
                    <i class="bi ${opt.icon}"></i>
                    <span>${opt.text}</span>
                </div>
            `).join("");

            qDiv.innerHTML = `<h3>${q.question}</h3><div class="quiz-options">${optionsHtml}</div>`;
            quizForm.appendChild(qDiv);
        });

        quizForm.querySelectorAll(".quiz-option").forEach(opt => {
            opt.addEventListener("click", function(){
                const qDiv = this.closest(".quiz-question");
                qDiv.querySelectorAll(".quiz-option").forEach(o => o.classList.remove("selected"));
                this.classList.add("selected");
                answers[Number(qDiv.dataset.index)] = this.dataset.track;
                nextBtn.disabled = false;
            });
        });
    }

    function showQuestion(index){
        quizForm.querySelectorAll(".quiz-question").forEach(q => q.classList.remove("active"));
        const target = quizForm.querySelector(`.quiz-question[data-index="${index}"]`);
        if (target) target.classList.add("active");

        const percent = Math.round(((index + 1) / QUIZ_QUESTIONS.length) * 100);
        progressFill.style.width = percent + "%";
        progressLabel.textContent = `Question ${index + 1} of ${QUIZ_QUESTIONS.length}`;

        backBtn.disabled = index === 0;
        nextBtn.disabled = answers[index] === null;
        nextBtn.textContent = index === QUIZ_QUESTIONS.length - 1 ? "See My Result" : "Next";
    }

    backBtn.addEventListener("click", function(){
        if (currentQuestion > 0){
            currentQuestion--;
            showQuestion(currentQuestion);
        }
    });

    nextBtn.addEventListener("click", function(){
        if (answers[currentQuestion] === null) return;

        if (currentQuestion < QUIZ_QUESTIONS.length - 1){
            currentQuestion++;
            showQuestion(currentQuestion);
        } else {
            showResult();
        }
    });

    retakeBtn.addEventListener("click", function(){
        answers = new Array(QUIZ_QUESTIONS.length).fill(null);
        currentQuestion = 0;
        renderQuestions();
        showQuestion(0);
        quizResult.classList.remove("active");
        document.getElementById("quiz-body").style.display = "block";
        clearMatchedRoadmap();
    });

    function showResult(){
        const counts = {};
        answers.forEach(track => {
            counts[track] = (counts[track] || 0) + 1;
        });

        let bestTrack = "software";
        let bestScore = -1;
        Object.keys(counts).forEach(track => {
            if (counts[track] > bestScore){
                bestScore = counts[track];
                bestTrack = track;
            }
        });

        renderResult(bestTrack);
        document.getElementById("quiz-body").style.display = "none";
        quizResult.classList.add("active");
        highlightMatchedRoadmap(bestTrack);
    }

    function renderResult(trackKey){
        const track = CAREER_TRACKS[trackKey];
        const iconWrap = document.getElementById("result-icon");
        iconWrap.className = `result-icon roadmap-icon ${track.color}`;
        iconWrap.innerHTML = `<i class="bi ${track.icon}"></i>`;

        document.getElementById("result-eyebrow").textContent = "Your best match is";
        document.getElementById("result-title").textContent = track.title;
        document.getElementById("result-desc").textContent = track.description;

        const tagsWrap = document.getElementById("result-tags");
        tagsWrap.innerHTML = track.tags.map(t => `<span>${t}</span>`).join("");

        const viewRoadmapBtn = document.getElementById("result-roadmap-btn");
        viewRoadmapBtn.dataset.track = trackKey;
    }
}

function clearMatchedRoadmap(){
    document.querySelectorAll(".roadmap-card").forEach(card => {
        card.classList.remove("matched");
        const tag = card.querySelector(".match-tag");
        if (tag) tag.remove();
    });
}

function highlightMatchedRoadmap(trackKey){
    clearMatchedRoadmap();
    const card = document.querySelector(`.roadmap-card[data-track="${trackKey}"]`);
    if (!card) return;
    card.classList.add("matched");
    const tag = document.createElement("span");
    tag.className = "match-tag";
    tag.textContent = "Your Match";
    card.appendChild(tag);
}

/* ---- Roadmap Cards + Modal ---- */

function initRoadmapCards(){
    const grid = document.getElementById("roadmap-grid");
    if (!grid) return;

    Object.keys(CAREER_TRACKS).forEach(key => {
        const track = CAREER_TRACKS[key];
        const card = document.createElement("div");
        card.className = "roadmap-card";
        card.dataset.track = key;
        card.innerHTML = `
            <div class="roadmap-icon ${track.color}"><i class="bi ${track.icon}"></i></div>
            <h3>${track.title}</h3>
            <p>${track.description}</p>
            <div class="roadmap-steps-count">
                <span>${track.roadmap.length} steps</span>
                <span class="roadmap-view">View Roadmap <i class="bi bi-arrow-right"></i></span>
            </div>
        `;
        card.addEventListener("click", () => openRoadmapModal(key));
        grid.appendChild(card);
    });

    document.getElementById("result-roadmap-btn").addEventListener("click", function(){
        const trackKey = this.dataset.track;
        document.getElementById("roadmap-grid").scrollIntoView({ behavior: "smooth", block: "center" });
        setTimeout(() => openRoadmapModal(trackKey), 500);
    });
}

function openRoadmapModal(trackKey){
    const track = CAREER_TRACKS[trackKey];
    const modal = document.getElementById("roadmap-modal");
    const banner = document.getElementById("roadmap-modal-banner");
    const body = document.getElementById("roadmap-modal-body");

    banner.className = `roadmap-modal-banner`;
    banner.style.background = getComputedGradient(track.color);
    banner.innerHTML = `
        <i class="bi ${track.icon}"></i>
        <div>
            <h2>${track.title}</h2>
            <p>${track.roadmap.length}-step roadmap</p>
        </div>
    `;

    const timelineHtml = track.roadmap.map((step, i) => `
        <div class="timeline-step">
            <div class="timeline-marker">
                <div class="timeline-dot">${i + 1}</div>
                ${i < track.roadmap.length - 1 ? '<div class="timeline-line"></div>' : ''}
            </div>
            <div class="timeline-content">
                <h4>${step.title}</h4>
                <p>${step.desc}</p>
            </div>
        </div>
    `).join("");

    body.innerHTML = `<div class="roadmap-timeline">${timelineHtml}</div>`;

    modal.classList.add("active");
}

function getComputedGradient(color){
    const gradients = {
        software: "linear-gradient(135deg,#3B82F6,#1D4ED8)",
        data: "linear-gradient(135deg,#8B5CF6,#6D28D9)",
        engineering: "linear-gradient(135deg,#FF9142,#FF751F)",
        medicine: "linear-gradient(135deg,#34D399,#16A34A)",
        business: "linear-gradient(135deg,#F472B6,#DB2777)"
    };
    return gradients[color] || gradients.software;
}

function initRoadmapModal(){
    const modal = document.getElementById("roadmap-modal");
    const closeBtn = document.getElementById("close-roadmap-modal");
    if (!modal) return;

    closeBtn.addEventListener("click", () => modal.classList.remove("active"));
    modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.classList.remove("active");
    });
}

/* ---- Init ---- */

document.addEventListener("DOMContentLoaded", function(){
    initRoadmapCards();
    initQuiz();
    initRoadmapModal();
});