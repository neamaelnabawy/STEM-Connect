/* ---- Opportunities Data Source ---- */
const FALLBACK_DATA = [
    { id: 1, category: "scholarships", title: "Global STEM Excellence Scholarship", org: "Global STEM Foundation", description: "Full tuition and monthly stipend for undergraduate STEM students who show academic excellence and financial need.", deadline: "Deadline: Sep 15, 2026", link: "https://www.google.com/search?q=Global+STEM+Excellence+Scholarship+Global+STEM+Foundation" },
    { id: 2, category: "scholarships", title: "Women in Tech Scholarship", org: "Future Innovators Trust", description: "Supports young women pursuing degrees in engineering, computer science, or applied science.", deadline: "Deadline: Oct 1, 2026", link: "https://www.google.com/search?q=Women+in+Tech+Scholarship+Future+Innovators+Trust" },
    { id: 3, category: "scholarships", title: "Regional Science Talent Scholarship", org: "Middle East STEM Alliance", description: "Awarded to top-performing high school students in science and math across the region.", deadline: "Deadline: Aug 20, 2026", link: "https://www.google.com/search?q=Regional+Science+Talent+Scholarship+Middle+East+STEM+Alliance" },
    { id: 4, category: "hackathons", title: "Global Youth Hackathon 2026", org: "Code for Tomorrow", description: "A 48-hour hackathon challenging student teams to build solutions for climate and sustainability.", deadline: "Deadline: Aug 25, 2026", link: "https://devpost.com/hackathons?search=Global+Youth+Hackathon+2026" },
    { id: 5, category: "hackathons", title: "AI for Good Hackathon", org: "OpenMinds Community", description: "Build AI-powered prototypes tackling real-world social problems, with mentorship included.", deadline: "Deadline: Sep 10, 2026", link: "https://devpost.com/hackathons?search=AI+for+Good+Hackathon" },
    { id: 6, category: "hackathons", title: "Robotics & IoT Hackathon", org: "MakerSpace Network", description: "Hands-on hackathon for teams building robotics or IoT projects. Open to high school and university students.", deadline: "Deadline: Oct 5, 2026", link: "https://devpost.com/hackathons?search=Robotics+%26+IoT+Hackathon" },
    { id: 7, category: "competitions", title: "International Science Olympiad", org: "World Science Council", description: "A prestigious competition testing knowledge across physics, chemistry, and biology.", deadline: "Deadline: Sep 30, 2026", link: "https://www.google.com/search?q=International+Science+Olympiad+World+Science+Council" },
    { id: 8, category: "competitions", title: "National Math Challenge", org: "STEM Connect Community", description: "An annual problem-solving competition for students who love mathematics.", deadline: "Deadline: Aug 18, 2026", link: "https://www.google.com/search?q=National+Math+Challenge+STEM+Connect+Community" },
    { id: 9, category: "competitions", title: "Young Engineers Design Contest", org: "Innovation Labs", description: "Design and prototype a solution to a real engineering problem, judged by industry professionals.", deadline: "Deadline: Oct 12, 2026", link: "https://www.google.com/search?q=Young+Engineers+Design+Contest+Innovation+Labs" },
    { id: 10, category: "internships", title: "Summer Research Internship", org: "National Science Institute", description: "An 8-week paid research internship for undergraduate STEM students.", deadline: "Deadline: Sep 5, 2026", link: "https://www.google.com/search?q=Summer+Research+Internship+National+Science+Institute" },
    { id: 11, category: "internships", title: "Software Engineering Internship Program", org: "TechBridge Careers", description: "A remote internship for students learning web and software development.", deadline: "Deadline: Aug 22, 2026", link: "https://www.google.com/search?q=Software+Engineering+Internship+Program+TechBridge+Careers" },
    { id: 12, category: "internships", title: "Data Science Internship", org: "Insight Analytics Hub", description: "Hands-on internship analyzing real datasets under the guidance of a mentor.", deadline: "Deadline: Oct 8, 2026", link: "https://www.google.com/search?q=Data+Science+Internship+Insight+Analytics+Hub" },
    { id: 13, category: "courses", title: "Intro to Machine Learning", org: "Open STEM Academy", description: "A free self-paced course covering machine learning fundamentals with hands-on projects.", deadline: "Enroll anytime", link: "https://www.coursera.org/search?query=Intro+to+Machine+Learning" },
    { id: 14, category: "courses", title: "Foundations of Robotics", org: "LearnTech Institute", description: "A free course introducing robotics concepts, sensors, and basic programming.", deadline: "Enroll anytime", link: "https://www.coursera.org/search?query=Foundations+of+Robotics" },
    { id: 15, category: "courses", title: "Data Structures & Algorithms", org: "CodePath Learning", description: "A free structured course to strengthen your programming fundamentals.", deadline: "Enroll anytime", link: "https://www.coursera.org/search?query=Data+Structures+%26+Algorithms" }
];

const categoryIcons = {
    scholarships: "mortarboard",
    hackathons: "rocket-takeoff",
    competitions: "trophy",
    internships: "briefcase",
    courses: "journal-bookmark"
};

function capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
}

let opportunitiesData = [];

document.addEventListener("DOMContentLoaded", async function () {
    const grid = document.getElementById("opportunities-grid");
    const emptyState = document.getElementById("empty-opportunities");
    const tabsContainer = document.getElementById("category-tabs");
    const searchInput = document.getElementById("search-opportunity");
    const modal = document.getElementById("opportunity-modal");
    const modalBanner = document.getElementById("opportunity-modal-banner");
    const modalBody = document.getElementById("opportunity-modal-body");
    const closeModalBtn = document.getElementById("close-opportunity-modal");

    if (!grid || !tabsContainer || !searchInput) return;

    opportunitiesData = await loadOpportunities();

    let activeCategory = "all";

    function renderCards(){
        const query = searchInput.value.trim().toLowerCase();

        const filtered = opportunitiesData.filter(item => {
            const matchesCategory = activeCategory === "all" || item.category === activeCategory;
            const matchesQuery = query === "" ||
                item.title.toLowerCase().includes(query) ||
                item.org.toLowerCase().includes(query) ||
                item.description.toLowerCase().includes(query);
            return matchesCategory && matchesQuery;
        });

        grid.innerHTML = "";

        filtered.forEach(item => {
            const card = document.createElement("div");
            card.className = "opportunity-card";
            card.dataset.id = item.id;
            card.innerHTML = `
                <div class="opportunity-thumb ${item.category}">
                    <i class="bi bi-${categoryIcons[item.category]}"></i>
                </div>
                <div class="opportunity-card-body">
                    <span class="opportunity-badge ${item.category}">
                        ${capitalize(item.category)}
                    </span>
                    <h3>${item.title}</h3>
                    <p class="opportunity-org"><i class="bi bi-building"></i> ${item.org}</p>
                    <p class="opportunity-desc">${item.description}</p>
                    <div class="opportunity-footer">
                        <span class="opportunity-deadline">
                            <i class="bi bi-calendar-event"></i> ${item.deadline}
                        </span>
                        <span class="opportunity-link">
                            View Details <i class="bi bi-arrow-right"></i>
                        </span>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });

        const noResults = filtered.length === 0;
        emptyState.style.display = noResults ? "block" : "none";
        grid.style.display = noResults ? "none" : "grid";
    }

    tabsContainer.addEventListener("click", function (e) {
        const btn = e.target.closest(".tab-btn");
        if (!btn) return;

        tabsContainer.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        activeCategory = btn.dataset.category;
        renderCards();
    });

    searchInput.addEventListener("input", renderCards);

    grid.addEventListener("click", function (e) {
        const card = e.target.closest(".opportunity-card");
        if (!card) return;

        const item = opportunitiesData.find(o => o.id === Number(card.dataset.id));
        if (item) openOpportunityModal(item);
    });

    function openOpportunityModal(item){
        modalBanner.className = `opportunity-modal-banner ${item.category}`;
        modalBanner.innerHTML = `<i class="bi bi-${categoryIcons[item.category]}"></i>`;

        modalBody.innerHTML = `
            <span class="opportunity-badge ${item.category}">${capitalize(item.category)}</span>
            <h2>${item.title}</h2>
            <p class="opportunity-org"><i class="bi bi-building"></i> ${item.org}</p>
            <p class="opportunity-modal-desc">${item.description}</p>
            <p class="opportunity-deadline">
                <i class="bi bi-calendar-event"></i> ${item.deadline}
            </p>
            <div class="opportunity-modal-actions">
                <a href="${item.link}" class="btn-primary" target="_blank" rel="noopener">
                    Register Now <i class="bi bi-box-arrow-up-right"></i>
                </a>
                <a href="mailto:stemconnect@gmail.com?subject=${encodeURIComponent("Question about " + item.title)}" class="icon-action-btn" title="Contact us about this opportunity">
                    <i class="bi bi-envelope"></i>
                </a>
                <button class="icon-action-btn" id="copy-link-btn" title="Copy link" type="button">
                    <i class="bi bi-link-45deg"></i>
                </button>
            </div>
        `;

        modal.classList.add("active");

        const copyBtn = document.getElementById("copy-link-btn");
        copyBtn.addEventListener("click", function(){
            const url = window.location.href.split("#")[0] + "#categories";
            navigator.clipboard.writeText(url).then(() => {
                copyBtn.innerHTML = '<i class="bi bi-check2"></i>';
                setTimeout(() => {
                    copyBtn.innerHTML = '<i class="bi bi-link-45deg"></i>';
                }, 1500);
            }).catch(() => {});
        });
    }

    function closeOpportunityModal(){
        modal.classList.remove("active");
    }

    closeModalBtn.addEventListener("click", closeOpportunityModal);
    modal.addEventListener("click", function(e){
        if (e.target === modal) closeOpportunityModal();
    });

    renderCards();
});

async function loadOpportunities(){
    try {
        const response = await fetch("opportunities.json", { cache: "no-store" });
        if (!response.ok) throw new Error("Bad response");
        const data = await response.json();
        if (!Array.isArray(data) || data.length === 0) throw new Error("Empty data");
        return data;
    } catch (err) {
        console.warn("Couldn't load opportunities.json, using built-in fallback data.", err);
        return FALLBACK_DATA;
    }
}