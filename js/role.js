document.addEventListener("DOMContentLoaded", function () {
  const user = window.GlassMartAuth && window.GlassMartAuth.currentUser();
  if (!user) { window.location.replace("index.html"); return; }

  const welcome = document.getElementById("welcomeUser");
  if (welcome) welcome.textContent = user.name + " · " + user.role.toUpperCase();

  document.querySelectorAll("[data-role-card]").forEach(card => {
    const role = card.getAttribute("data-role-card");
    const link = card.querySelector("[data-role-link]");
    const note = card.querySelector("[data-role-note]");
    if (role !== user.role) {
      card.classList.add("locked");
      if (link) {
        link.classList.add("disabled");
        link.setAttribute("aria-disabled", "true");
        link.addEventListener("click", event => event.preventDefault());
      }
      if (note) note.textContent = "Not assigned to this account";
    } else {
      card.classList.add("available");
      if (note) note.textContent = "Available for your account";
    }
  });
});
