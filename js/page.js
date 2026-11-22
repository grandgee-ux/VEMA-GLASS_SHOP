document.addEventListener("DOMContentLoaded", function () {
  const role = document.body.getAttribute("data-required-role");
  if (!role || !window.GlassMartAuth) return;
  const user = window.GlassMartAuth.requireRole(role);
  if (user) {
    document.querySelectorAll("[data-user-name]").forEach(el => el.textContent = user.name);
  }
});
