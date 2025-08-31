// ui.js

// Auth
document.getElementById("signup-btn")?.addEventListener("click", () => {
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  signup(email, password);
});

document.getElementById("login-btn")?.addEventListener("click", () => {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  login(email, password);
});

document.getElementById("logout-btn")?.addEventListener("click", () => {
  logout();
});

// Events
document.getElementById("create-event-btn")?.addEventListener("click", async () => {
  const title = document.getElementById("event-title").value;
  const desc = document.getElementById("event-desc").value;

  if (!title) {
    alert("Please enter event title");
    return;
  }

  await addEvent({ title, desc, createdAt: new Date() });
  loadEvents();
});

// Load events to UI
async function loadEvents() {
  const events = await getEvents();
  const list = document.getElementById("events-list");
  if (!list) return;

  list.innerHTML = "";
  events.forEach((ev) => {
    const li = document.createElement("li");
    li.textContent = `${ev.title} - ${ev.desc}`;
    list.appendChild(li);
  });
}

loadEvents();
