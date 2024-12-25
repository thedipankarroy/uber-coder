// Sample user data - Replace with actual user data from your backend
const userData = {
  name: "User",
  problemsSolved: 120,
  githubStreak: 15,
  projectsCompleted: 3,
  gsocProgress: 65,
};

// Sample events data
const events = [
  {
    date: "2024-12-30",
    title: "Mock GSOC Interview",
  },
  {
    date: "2025-01-05",
    title: "DSA Problem Solving Session",
  },
  {
    date: "2025-01-10",
    title: "Project Review Meeting",
  },
  {
    date: "2025-01-15",
    title: "GSOC Organization Research",
  },
];

// Initialize dashboard
document.addEventListener(
  "DOMContentLoaded",
  () => {
    // Update user info
    const userNameElem = document.getElementById("userName");
    if (userNameElem) userNameElem.textContent = userData.name;

    const problemsSolvedElem = document.getElementById("problemsSolved");
    if (problemsSolvedElem) problemsSolvedElem.textContent = userData.problemsSolved;

    const githubStreakElem = document.getElementById("githubStreak");
    if (githubStreakElem) githubStreakElem.textContent = userData.githubStreak;

    const projectsCompletedElem = document.getElementById("projectsCompleted");
    if (projectsCompletedElem) projectsCompletedElem.textContent = userData.projectsCompleted;

    const gsocProgressElem = document.getElementById("gsocProgress");
    if (gsocProgressElem) {
      gsocProgressElem.style.width = `${userData.gsocProgress}%`;
      gsocProgressElem.setAttribute("aria-valuenow", userData.gsocProgress);
    }

    const progressPercentElem = document.getElementById("progressPercent");
    if (progressPercentElem) progressPercentElem.textContent = userData.gsocProgress;

    // Populate events
    const eventsList =
      document.getElementById("eventsList");
    events.forEach((event) => {
      const eventDiv =
        document.createElement("div");
      eventDiv.className = "event-item";
      eventDiv.innerHTML = `
            <h3>${event.title}</h3>
            <p class="date">${event.date}</p>
        `;
      eventsList.appendChild(eventDiv);
    });

    // Tab functionality
    const tabButtons = document.querySelectorAll(
      ".tab-button"
    );
    const tabContents = document.querySelectorAll(
      ".tab-content"
    );

    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const tabName =
          button.getAttribute("data-tab");

        // Update active button
        tabButtons.forEach((btn) =>
          btn.classList.remove("active")
        );
        button.classList.add("active");

        // Update active content
        tabContents.forEach((content) => {
          content.classList.remove("active");
          if (content.id === tabName) {
            content.classList.add("active");
          }
        });
      });
    });

    // Task progress tracking
    const checkboxes = document.querySelectorAll(
      'input[type="checkbox"]'
    );
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener(
        "change",
        updateProgress
      );
    });

    function updateProgress() {
      const totalTasks = checkboxes.length;
      const completedTasks = Array.from(
        checkboxes
      ).filter(
        (checkbox) => checkbox.checked
      ).length;
      const newProgress = Math.round(
        (completedTasks / totalTasks) * 100
      );

      document.getElementById(
        "gsocProgress"
      ).style.width = `${newProgress}%`;
      document.getElementById(
        "progressPercent"
      ).textContent = newProgress;
    }
  }
);
