// Wait for DOM to fully load before initializing
document.addEventListener("DOMContentLoaded", function () {
  const jobsGrid = document.querySelector(".jobs-grid");
  const jobCountEl = document.getElementById("jobCount");

  // Initialize job count on page load
  updateJobCount();

  // Global function for adding jobs (called from onclick)
  window.addJob = function () {
    const titleInput = document.getElementById("jobTitle");
    const companyInput = document.getElementById("companyName");
    const title = titleInput.value.trim();
    const company = companyInput.value.trim();

    // INPUT VALIDATION
    if (title === "" || company === "") {
      alert("⚠️ Please fill in all fields");
      if (title === "") titleInput.focus();
      return;
    }

    // Check for duplicate job postings
    const existingJobs = Array.from(document.querySelectorAll(".job-card"));
    const isDuplicate = existingJobs.some(
      (job) =>
        job.querySelector("h3").textContent === title &&
        job.querySelector(".company-name").textContent === company
    );

    if (isDuplicate) {
      alert("⚠️ This job posting already exists!");
      return;
    }

    // Create new job card with proper structure
    const jobCard = document.createElement("div");
    jobCard.className = "job-card";

    const colors = ["#4A90E2", "#FF5722", "#1877F2", "#E34C26", "#FBBC04", "#34A853"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    jobCard.innerHTML = `
      <div class="job-header">
        <div class="company-info">
          <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='${encodeURIComponent(randomColor)}' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='40' fill='white' text-anchor='middle' dy='.3em'%3E${company.charAt(0).toUpperCase()}%3C/text%3E%3C/svg%3E" alt="${company}" class="company-logo" />
          <div>
            <h3>${escapeHtml(title)}</h3>
            <p class="company-name">${escapeHtml(company)}</p>
          </div>
        </div>
        <span class="job-type full-time">New</span>
      </div>

      <div class="job-details">
        <span class="location">📍 Remote</span>
        <span class="salary">💰 Contact for details</span>
      </div>

      <p class="job-description">
        Newly posted job opportunity. Connect with the company to learn more.
      </p>

      <div class="job-tags">
        <span class="tag">Newly Posted</span>
      </div>

      <div class="job-footer">
        <span class="posted-date">Just now</span>
        <div class="job-actions">
          <button class="apply-btn">Apply Now</button>
          <button class="delete-btn" title="Remove this job posting">🗑️</button>
        </div>
      </div>
    `;

    jobsGrid.prepend(jobCard);
    updateJobCount();

    // Clear inputs and show success feedback
    titleInput.value = "";
    companyInput.value = "";
    titleInput.focus();

    // Show success animation
    jobCard.style.animation = "slideIn 0.4s ease-out";
  };

  // Event delegation for apply button clicks
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("apply-btn")) {
      const btn = e.target;
      if (btn.dataset.applied !== "true") {
        btn.innerText = "✓ Applied";
        btn.disabled = true;
        btn.dataset.applied = "true";
        btn.classList.add("applied");
      }
    }
  });

  // Event delegation for delete button clicks
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-btn")) {
      const jobCard = e.target.closest(".job-card");
      if (jobCard && confirm("Are you sure you want to delete this job posting?")) {
        jobCard.style.animation = "slideOut 0.3s ease-out";
        setTimeout(() => {
          jobCard.remove();
          updateJobCount();
        }, 300);
      }
    }
  });

  // Update job count display
  function updateJobCount() {
    const count = document.querySelectorAll(".job-card").length;
    jobCountEl.textContent = count;
  }
});

// Utility function to escape HTML special characters
function escapeHtml(text) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
