const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const categorySelect = document.querySelector("#todo-category");
const todoList = document.querySelector("#todo-list");
const emptyState = document.querySelector("#empty-state");
const completedCount = document.querySelector("#completed-count");
const totalCount = document.querySelector("#total-count");
const progressBar = document.querySelector("#progress-bar");
const currentDate = document.querySelector("#current-date");

// Display dynamic date formatted nicely
currentDate.textContent = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
});

// Update live progress and task statistics
const updateStats = () => {
    const allItems = todoList.querySelectorAll(".todo-item");
    const doneItems = todoList.querySelectorAll(".todo-item.completed");

    const total = allItems.length;
    const completed = doneItems.length;

    totalCount.textContent = total;
    completedCount.textContent = completed;

    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
    progressBar.style.width = `${percentage}%`;

    emptyState.style.display = total === 0 ? "block" : "none";
};

// Add a new task element to DOM
const addTask = (text, category) => {
    const li = document.createElement("li");
    li.className = "todo-item";

    li.innerHTML = `
    <div class="todo-content">
      <div class="custom-checkbox">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <div class="todo-meta">
        <span class="todo-text">${text}</span>
        <span class="tag">${category}</span>
      </div>
    </div>
    <button class="delete-btn" aria-label="Delete task">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
  `;

    todoList.prepend(li);
    updateStats();
};

// Form submission handler
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    const category = categorySelect.value;

    if (text !== "") {
        addTask(text, category);
        input.value = "";
        input.focus();
    }
});

// Event Delegation for both Toggling Complete and Removing
todoList.addEventListener("click", (e) => {
    const item = e.target.closest(".todo-item");
    if (!item) return;

    const deleteBtn = e.target.closest(".delete-btn");

    if (deleteBtn) {
        // Smooth exit animation
        item.style.transform = "scale(0.9) translateY(8px)";
        item.style.opacity = "0";
        setTimeout(() => {
            item.remove();
            updateStats();
        }, 200);
    } else {
        // Toggle completed status class
        item.classList.toggle("completed");
        updateStats();
    }
});

// Initial stats sync
updateStats();
