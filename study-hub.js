/* ---- Study Planner ---- */

const openModalBtn = document.getElementById("open-modal-btn");
const modal = document.getElementById("session-modal");
const closeModalBtn = document.getElementById("close-modal-btn");
const cancelBtn = document.getElementById("cancel-btn");
const sessions = document.getElementById("sessions-container");
const sessionForm = document.querySelector(".session-form");
const text = document.getElementById("text");

let plannerSessions = JSON.parse(localStorage.getItem("plannerSessions")) || [];

function getDayShortName(dateStr) {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[new Date(dateStr + "T00:00:00").getDay()];
}

function savePlanner() {
    localStorage.setItem("plannerSessions", JSON.stringify(plannerSessions));
}

function renderSessions() {

    sessions.innerHTML = "";

    if (plannerSessions.length === 0) {
        sessions.appendChild(text);
        text.style.display = "block";
        return;
    }

    plannerSessions.forEach((session) => {
        const card = document.createElement("div");
        card.className = "session-card";
        card.dataset.day = session.day;
        card.innerHTML = `
            <h4>${session.subject}</h4>
            <p>${session.date}</p>
            <p>${session.start} - ${session.end}</p>
            <span>${session.topic}</span>
        `;
        sessions.appendChild(card);

    });

    const active = document.querySelector(".day.active");

    if (active) {
        filterSessionsByDay(active.dataset.day);
    }
}

function filterSessionsByDay(day) {
    const cards = document.querySelectorAll(".session-card");
    let count = 0;
    cards.forEach(card => {
        if (card.dataset.day === day) {
            card.style.display = "block";
            count++;
        }
        else {
            card.style.display = "none";
        }
    });

    if (count === 0) {
        if (!sessions.contains(text)) {
            sessions.appendChild(text);
        }
        text.style.display = "block";
    }
    else {
        text.style.display = "none";
    }

}

sessionForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const subject = sessionForm.querySelector("select").value;
    const date = sessionForm.querySelector('input[type="date"]').value;
    const times = sessionForm.querySelectorAll('input[type="time"]');
    const start = times[0].value;
    const end = times[1].value;
    const topic = sessionForm.querySelector('input[type="text"]').value;

    if (
        subject === "Select Subject" ||
        date === "" ||
        start === "" ||
        end === "" ||
        topic.trim() === ""
    ) {
        alert("Please fill in all fields.");
        return;
    }

    plannerSessions.push({
        subject, date, start, end, topic, day: getDayShortName(date)
    });

    savePlanner();
    renderSessions();
    modal.style.display = "none";
    sessionForm.reset();

});

openModalBtn.addEventListener("click", () => {
    modal.style.display = "flex";
});

closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

cancelBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (e) => {

    if (e.target === modal) {
        modal.style.display = "none";
    }

});

document.querySelectorAll(".day").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".day").forEach(day => {
            day.classList.remove("active");
        });
        btn.classList.add("active");
        filterSessionsByDay(btn.dataset.day);
    });
});

renderSessions();

/* ---- To-Do-List ---- */

const todoModal = document.getElementById("todo-modal");
const openTodoModal = document.getElementById("open-todo-modal");
const closeTodoModal = document.getElementById("close-todo-modal-btn");
const cancelTodoBtn = document.getElementById("cancel-todo-btn");
const todoForm = document.querySelector(".todo-task-form");
const todoTitle = document.getElementById("todo-title");
const todoDate = document.getElementById("todo-date");
const todoPriority = document.getElementById("todo-priority");
const todoDescription = document.getElementById("todo-description");
const highTasks = document.getElementById("highTasks");
const mediumTasks = document.getElementById("mediumTasks");
const lowTasks = document.getElementById("lowTasks");
let tasks = JSON.parse(localStorage.getItem("todoTasks")) || [];

openTodoModal.addEventListener("click", () => {
    todoModal.classList.add("active");
});

closeTodoModal.addEventListener("click", closeTodoModalWindow);
cancelTodoBtn.addEventListener("click", closeTodoModalWindow);

window.addEventListener("click", (e) => {
    if (e.target === todoModal) {
        closeTodoModalWindow();
    }
});

function closeTodoModalWindow() {
    todoModal.classList.remove("active");
}

function saveTasks() {
    localStorage.setItem("todoTasks", JSON.stringify(tasks));
}

function priorityLabel(priority) {
    if (priority === "high") return "High Priority";
    if (priority === "medium") return "Medium Priority";
    return "Low Priority";
}

function renderTasks() {

    const columns = {
        high: highTasks,
        medium: mediumTasks,
        low: lowTasks
    };

    // clear all columns first
    Object.values(columns).forEach(col => col.innerHTML = "");

    const grouped = { high: [], medium: [], low: [] };
    tasks.forEach(task => grouped[task.priority].push(task));

    Object.keys(grouped).forEach(priority => {
        const column = columns[priority];
        const list = grouped[priority];

        if (list.length === 0) {
            column.innerHTML = `<div class="empty-task">No tasks yet</div>`;
            return;
        }

        list.forEach(task => {
            const card = document.createElement("div");
            card.className = `task-card ${priority}-card${task.completed ? " completed" : ""}`;
            card.innerHTML = `
                <div class="task-title">${task.title}</div>
                <div class="task-date">${task.date}</div>
                <div class="task-description">${task.description}</div>
                <div class="task-actions">
                    <button type="button" class="complete-btn" data-id="${task.id}">
                        ${task.completed ? "Undo" : "Complete"}
                    </button>
                    <button type="button" class="delete-btn" data-id="${task.id}">
                        Delete
                    </button>
                </div>
            `;
            column.appendChild(card);
        });
    });
}

document.addEventListener("click", (e) => {

    if (e.target.classList.contains("complete-btn")) {
        const id = Number(e.target.dataset.id);
        const task = tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        }
    }

    if (e.target.classList.contains("delete-btn")) {
        const id = Number(e.target.dataset.id);
        tasks = tasks.filter(t => t.id !== id);
        saveTasks();
        renderTasks();
    }

});

todoForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const title = todoTitle.value.trim();
    const date = todoDate.value;
    const priority = todoPriority.value;
    const description = todoDescription.value.trim();

    if (
        title === "" ||
        date === "" ||
        description === "" ||
        !priority
    ) {
        alert("Please fill in all fields.");
        return;
    }

    const task = {
        id: Date.now(), title, date, priority, description, completed: false
    };

    tasks.push(task);

    saveTasks();

    renderTasks();

    todoForm.reset();

    closeTodoModalWindow();

});

renderTasks();

/* ---- Notes ---- */
const notesModal = document.getElementById("notes-modal");
const openNoteModal = document.getElementById("open-note-modal");
const closeNoteModal = document.getElementById("close-note-modal");
const cancelNoteBtn = document.getElementById("cancel-note-btn");

const notesForm = document.getElementById("notes-form");
const notesContainer = document.getElementById("notes-container");

const noteTitle = document.getElementById("note-title");
const noteSubject = document.getElementById("note-subject");
const noteContent = document.getElementById("note-content");
const searchNote = document.getElementById("search-note");

openNoteModal.addEventListener("click", () => {
    notesModal.classList.add("active");
});

closeNoteModal.addEventListener("click", closeNotesModal);

cancelNoteBtn.addEventListener("click", closeNotesModal);

window.addEventListener("click", (e) => {
    if (e.target === notesModal) {
        closeNotesModal();
    }
});

function closeNotesModal() {
    notesModal.classList.remove("active");
}

notesForm.addEventListener("submit", function(e){
    e.preventDefault();

    const title = noteTitle.value.trim();
    const subject = noteSubject.value;
    const content = noteContent.value.trim();

    if(
        title === "" ||
        subject === "Select Subject" ||
        content === ""
    ){
        alert("Please fill in all fields.");
        return;
    }

    const note = {
        id: Date.now(),
        title,
        subject,
        content,
        date: new Date().toLocaleDateString()
    };

    addNoteCard(note);
    saveNote(note);
    notesForm.reset();
    closeNotesModal();
    toggleEmptyNotes();
});

function addNoteCard(note){

    const card = document.createElement("div");
    card.className = "note-card";
    card.dataset.id = note.id;

    card.innerHTML = `
        <div class="note-subject">
            ${note.subject}
        </div>
        <h3 class="note-title">
            ${note.title}
        </h3>
        <p class="note-content">
            ${note.content}
        </p>
        <div class="note-footer">
            <span class="note-date">
                <i class="bi bi-calendar3"></i>
                ${note.date}
            </span>
            <button class="note-delete-btn">
                <i class="bi bi-trash3"></i>
            </button>
        </div>
    `;

    notesContainer.appendChild(card);
}

function saveNote(note){
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));
}

function loadNotes(){
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.forEach((note) => {
        addNoteCard(note);
    });
    toggleEmptyNotes();
}

loadNotes();

function toggleEmptyNotes(){
    const empty = document.querySelector(".empty-notes");
    if(!empty) return;
    const cards = document.querySelectorAll(".note-card");
    if(cards.length > 0){
        empty.style.display = "none";
    }
    else{
        empty.style.display = "flex";
    }
}

notesContainer.addEventListener("click", function(e){
    const deleteBtn = e.target.closest(".note-delete-btn");
    if(!deleteBtn) return;
    const card = deleteBtn.closest(".note-card");
    const id = Number(card.dataset.id);

    card.remove();
    deleteNote(id);
    toggleEmptyNotes();
});

function deleteNote(id){
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes = notes.filter((note) => note.id !== id);
    localStorage.setItem("notes", JSON.stringify(notes));
}

searchNote.addEventListener("input", function(){
    const value = this.value.toLowerCase();
    const cards = document.querySelectorAll(".note-card");

    cards.forEach((card)=>{
        const title = card.querySelector(".note-title").textContent.toLowerCase();
        const subject = card.querySelector(".note-subject").textContent.toLowerCase();
        const content = card.querySelector(".note-content").textContent.toLowerCase();

        if(
            title.includes(value) ||
            subject.includes(value) ||
            content.includes(value)
        ){
            card.style.display = "block";
        }
        else{
            card.style.display = "none";
        }
    });
});

/* ---- Flashcards ---- */

const flashcardsModal = document.getElementById("flashcards-modal");
const openFlashcardModal = document.getElementById("open-flashcard-modal");
const closeFlashcardModal = document.getElementById("close-flashcard-modal");
const cancelFlashcardBtn = document.getElementById("cancel-flashcard-btn");

const flashcardsForm = document.getElementById("flashcards-form");

const flashcardSubject = document.getElementById("flashcard-subject");
const flashcardQuestion = document.getElementById("flashcard-question");
const flashcardAnswer = document.getElementById("flashcard-answer");

const flashcardsContainer = document.getElementById("flashcards-container");
const searchFlashcard = document.getElementById("search-flashcard");

openFlashcardModal.addEventListener("click", () => {
    flashcardsModal.classList.add("active");
});

closeFlashcardModal.addEventListener("click", closeFlashcardsModal);
cancelFlashcardBtn.addEventListener("click", closeFlashcardsModal);

window.addEventListener("click", (e) => {
    if (e.target === flashcardsModal) {
        closeFlashcardsModal();
    }
});

function closeFlashcardsModal(){
    flashcardsModal.classList.remove("active");
}

flashcardsForm.addEventListener("submit", function(e){
    e.preventDefault();
    const subject = flashcardSubject.value;
    const question = flashcardQuestion.value.trim();
    const answer = flashcardAnswer.value.trim();

    if(
        subject === "Select Subject" ||
        question === "" ||
        answer === ""
    ){
        alert("Please fill in all fields.");
        return;
    }

    const card = {
        id: Date.now(), subject, question, answer
    };

    addFlashcard(card);
    saveFlashcard(card);
    flashcardsForm.reset();
    closeFlashcardsModal();
    toggleEmptyFlashcards();
});

function addFlashcard(card){
    const flashcard = document.createElement("div");
    flashcard.className = "flashcard";
    flashcard.dataset.id = card.id;

    flashcard.innerHTML = `
        <div class="flashcard-inner">
            <div class="flashcard-front">
                <div class="flashcard-subject">
                    ${card.subject}
                </div>
                <div class="flashcard-question">
                    ${card.question}
                </div>
                <div class="flashcard-footer">
                    <span class="flip-text">
                        <i class="bi bi-arrow-repeat"></i>
                        Click to Flip
                    </span>
                    <button class="flashcard-delete">
                        <i class="bi bi-trash3"></i>
                    </button>
                </div>
            </div>
            <div class="flashcard-back">
                <div class="flashcard-subject">
                    ${card.subject}
                </div>
                <div class="flashcard-answer">
                    ${card.answer}
                </div>
                <div class="flashcard-footer">
                    <span class="flip-text">
                        <i class="bi bi-arrow-repeat"></i>
                        Click to Flip
                    </span>
                    <button class="flashcard-delete">
                        <i class="bi bi-trash3"></i>
                    </button>
                </div>
            </div>
        </div>
    `;

    flashcardsContainer.appendChild(flashcard);
}

flashcardsContainer.addEventListener("click", function(e){

    const deleteBtn = e.target.closest(".flashcard-delete");

    if(deleteBtn){
        e.stopPropagation();
        const card = deleteBtn.closest(".flashcard");
        deleteFlashcard(card.dataset.id);
        card.remove();
        toggleEmptyFlashcards();
        return;
    }

    const card = e.target.closest(".flashcard");

    if(card){
        card.classList.toggle("flipped");
    }

});

function saveFlashcard(card){
    const flashcards = JSON.parse(localStorage.getItem("flashcards")) || [];
    flashcards.push(card);

    localStorage.setItem(
        "flashcards",
        JSON.stringify(flashcards)
    );

}

function loadFlashcards(){
    const flashcards = JSON.parse(localStorage.getItem("flashcards")) || [];
    flashcards.forEach(card => {
        addFlashcard(card);
    });
    toggleEmptyFlashcards();
}

function deleteFlashcard(id){
    let flashcards = JSON.parse(localStorage.getItem("flashcards")) || [];
    flashcards = flashcards.filter(card => card.id != id);

    localStorage.setItem(
        "flashcards",
        JSON.stringify(flashcards)
    );

}

function toggleEmptyFlashcards(){
    const empty = flashcardsContainer.querySelector(".empty-flashcards");
    const cards = flashcardsContainer.querySelectorAll(".flashcard");
    if(empty){
        empty.style.display = cards.length === 0 ? "flex" : "none";
    }
}

searchFlashcard.addEventListener("input", function(){
    const value = this.value.toLowerCase();
    const cards = flashcardsContainer.querySelectorAll(".flashcard");
    cards.forEach(card => {
        const cardText = card.textContent.toLowerCase();
        card.style.display = cardText.includes(value) ? "block" : "none";
    });
});

loadFlashcards();

/* ---- Focus Sessions ---- */

const roomModal = document.getElementById("room-modal");
const openRoomModal = document.getElementById("open-room-modal");
const closeRoomModal = document.getElementById("close-room-modal");
const cancelRoomBtn = document.getElementById("cancel-room-btn");
const roomForm = document.getElementById("room-form");
const roomsContainer = document.getElementById("rooms-container");
const searchRoom = document.getElementById("search-room");
const roomName = document.getElementById("room-name");
const roomSubject = document.getElementById("room-subject");
const roomDuration = document.getElementById("room-duration");
const roomDescription = document.getElementById("room-description");

// keep a running interval per session id, so timers survive re-renders
const activeTimers = {};

openRoomModal.addEventListener("click", () => {
    roomModal.classList.add("active");
});

function closeRoom(){
    roomModal.classList.remove("active");
    roomForm.reset();
}

closeRoomModal.addEventListener("click", closeRoom);
cancelRoomBtn.addEventListener("click", closeRoom);

window.addEventListener("click",(e)=>{
    if(e.target === roomModal){
        closeRoom();
    }
});

roomForm.addEventListener("submit", function(e){
    e.preventDefault();

    const durationMinutes = Number(roomDuration.value);

    const session = {
        id: Date.now(),
        name: roomName.value.trim(),
        subject: roomSubject.value,
        durationMinutes: durationMinutes,
        secondsLeft: durationMinutes * 60,
        status: "idle", // idle | running | paused | completed
        description: roomDescription.value.trim()
    };

    if(
        session.name === "" ||
        session.subject === "Select Subject" ||
        !durationMinutes ||
        session.description === ""
    ){
        alert("Please fill in all fields.");
        return;
    }

    saveRoom(session);
    const card = addRoom(session);
    startTimer(session.id, card);
    toggleEmptyRooms();
    closeRoom();
});

function formatTime(totalSeconds){
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
    const s = Math.floor(totalSeconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
}

function addRoom(session){
    const card = document.createElement("div");
    card.className = "room-card";
    card.dataset.id = session.id;
    card.innerHTML = `
        <h3 class="room-title">${session.name}</h3>
        <span class="room-subject">${session.subject}</span>
        <p class="room-description">
            ${session.description}
        </p>
        <div class="room-info">
            <p><i class="bi bi-hourglass-split"></i> ${session.durationMinutes} min session</p>
        </div>
        <div class="room-footer">
            <div class="room-members timer-display" data-status="${session.status}">
                ${session.status === "completed" ? '<i class="bi bi-check-circle-fill"></i> Completed' : formatTime(session.secondsLeft)}
            </div>
            <div>
                <button class="join-room-btn timer-toggle-btn" ${session.status === "completed" ? "disabled" : ""}>
                    ${session.status === "completed" ? "Done" : (session.status === "running" ? "Pause" : "Start")}
                </button>
                <button class="delete-room-btn">
                    <i class="bi bi-trash3"></i>
                </button>
            </div>
        </div>
    `;

    roomsContainer.appendChild(card);
    return card;
}

function saveRoom(session){
    const sessions = JSON.parse(localStorage.getItem("focusSessions")) || [];
    sessions.push(session);
    localStorage.setItem("focusSessions", JSON.stringify(sessions));
}

function updateSession(id, changes){
    const sessions = JSON.parse(localStorage.getItem("focusSessions")) || [];
    const session = sessions.find(s => s.id === id);
    if(!session) return;
    Object.assign(session, changes);
    localStorage.setItem("focusSessions", JSON.stringify(sessions));
    return session;
}

function getSession(id){
    const sessions = JSON.parse(localStorage.getItem("focusSessions")) || [];
    return sessions.find(s => s.id === id);
}

function loadRooms(){
    // any session left "running" from a previous visit resumes as paused,
    // since the tab wasn't open to keep counting down
    const sessions = JSON.parse(localStorage.getItem("focusSessions")) || [];
    sessions.forEach(session => {
        if(session.status === "running"){
            session.status = "paused";
        }
    });
    localStorage.setItem("focusSessions", JSON.stringify(sessions));
    sessions.forEach(session => addRoom(session));
    toggleEmptyRooms();
}

function toggleEmptyRooms(){
    const empty = document.querySelector(".empty-rooms");
    const cards = document.querySelectorAll(".room-card");
    if(empty){
        empty.style.display = cards.length === 0 ? "flex" : "none";
    }
}

loadRooms();

roomsContainer.addEventListener("click", function(e){
    const deleteBtn = e.target.closest(".delete-room-btn");
    if(deleteBtn){
        const card = deleteBtn.closest(".room-card");
        const id = Number(card.dataset.id);
        stopTimer(id);
        deleteRoom(id);
        card.remove();
        toggleEmptyRooms();
        return;
    }

    const toggleBtn = e.target.closest(".timer-toggle-btn");

    if(toggleBtn){
        const card = toggleBtn.closest(".room-card");
        const id = Number(card.dataset.id);
        const session = getSession(id);
        if(!session || session.status === "completed") return;

        if(session.status === "running"){
            pauseTimer(id, card);
        } else {
            startTimer(id, card);
        }
    }
});

function startTimer(id, card){
    updateSession(id, { status: "running" });
    const toggleBtn = card.querySelector(".timer-toggle-btn");
    const display = card.querySelector(".timer-display");
    toggleBtn.textContent = "Pause";

    activeTimers[id] = setInterval(() => {
        const session = getSession(id);
        if(!session || session.status !== "running"){
            clearInterval(activeTimers[id]);
            return;
        }

        session.secondsLeft--;

        if(session.secondsLeft <= 0){
            clearInterval(activeTimers[id]);
            delete activeTimers[id];
            updateSession(id, { secondsLeft: 0, status: "completed" });
            display.innerHTML = '<i class="bi bi-check-circle-fill"></i> Completed';
            toggleBtn.textContent = "Done";
            toggleBtn.disabled = true;
            playCompletionSound();
            showCompletionToast(session.name);
            return;
        }

        updateSession(id, { secondsLeft: session.secondsLeft });
        display.textContent = formatTime(session.secondsLeft);
    }, 1000);
}

function pauseTimer(id, card){
    clearInterval(activeTimers[id]);
    delete activeTimers[id];
    updateSession(id, { status: "paused" });
    card.querySelector(".timer-toggle-btn").textContent = "Start";
}

function stopTimer(id){
    if(activeTimers[id]){
        clearInterval(activeTimers[id]);
        delete activeTimers[id];
    }
}

function deleteRoom(id){
    let sessions = JSON.parse(localStorage.getItem("focusSessions")) || [];
    sessions = sessions.filter(session => session.id !== id);
    localStorage.setItem("focusSessions", JSON.stringify(sessions));
}

searchRoom.addEventListener("input", function(){
    const value = this.value.toLowerCase();
    document.querySelectorAll(".room-card").forEach(card=>{
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(value) ? "flex" : "none";
    });
});

function playCompletionSound(){
    try{
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioCtx();
        const now = ctx.currentTime;

        [0, 0.28, 0.56].forEach(offset => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "sine";
            osc.frequency.value = 880;
            gain.gain.setValueAtTime(0.001, now + offset);
            gain.gain.exponentialRampToValueAtTime(0.2, now + offset + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.25);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now + offset);
            osc.stop(now + offset + 0.3);
        });
    } catch(err){
        console.warn("Sound couldn't play:", err);
    }
}

function showCompletionToast(sessionName){
    const toast = document.createElement("div");
    toast.className = "session-toast";
    toast.innerHTML = `
        <i class="bi bi-check-circle-fill"></i>
        <div>
            <strong>Session Complete!</strong>
            <p>"${sessionName}" — great work 🎉</p>
        </div>
    `;
    document.body.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add("show"));

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 400);
    }, 5000);
}