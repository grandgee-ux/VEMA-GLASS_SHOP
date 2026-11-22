// Supabase authentication and role-based navigation for Glass Mart.
(() => {
  let cachedUser = null;
  const inWorkspace = () => /\/(admin|staff|customer)\//.test(location.pathname);
  const home = () => inWorkspace() ? "../index.html" : "index.html";
  async function getCurrentUser() {
    if (cachedUser) return cachedUser;
    if (!window.db) throw new Error("Supabase is not configured or did not load.");
    const { data: sessionData, error: sessionError } = await db.auth.getSession();
    if (sessionError) throw sessionError;
    const authUser = sessionData.session?.user;
    if (!authUser) return null;
    const { data: profile, error } = await db.from("profiles")
      .select("id, full_name, role").eq("id", authUser.id).single();
    if (error) throw new Error("Your account profile was not found. Ask the administrator to check the profiles table.");
    cachedUser = { id: authUser.id, email: authUser.email, name: profile.full_name || authUser.email, role: profile.role };
    return cachedUser;
  }
  async function signOut() {
    if (window.db) await db.auth.signOut();
    cachedUser = null;
    location.replace(home());
  }
  async function requireRole(allowedRole) {
    let user;
    try { user = await getCurrentUser(); }
    catch (err) { console.error(err); alert(err.message); location.replace(home()); return null; }
    if (!user) { location.replace(home()); return null; }
    if (user.role !== allowedRole) {
      const destination = {admin:"admin/dashboard.html", staff:"staff/dashboard.html", customer:"customer/dashboard.html"}[user.role];
      location.replace(destination || home()); return null;
    }
    document.querySelectorAll("[data-user-name]").forEach(el => el.textContent = user.name);
    return user;
  }
  window.GlassMartAuth = { getCurrentUser, currentUser: () => cachedUser, signOut, requireRole };

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-logout]").forEach(btn => btn.addEventListener("click", signOut));
    const form = document.getElementById("loginForm");
    if (!form) return;
    form.addEventListener("submit", async event => {
      event.preventDefault();
      const email = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value;
      const errorBox = document.getElementById("loginError");
      const submit = form.querySelector('[type="submit"]');
      errorBox.textContent = "";
      submit.disabled = true; submit.textContent = "Signing in…";
      try {
        if (!window.db) throw new Error("Supabase connection is unavailable. Check js/supabase.js and your internet connection.");
        const { data, error } = await db.auth.signInWithPassword({ email, password });
        if (error) throw error;
        cachedUser = null;
        const user = await getCurrentUser();
        const destinations = {admin:"admin/dashboard.html", staff:"staff/dashboard.html", customer:"customer/dashboard.html"};
        if (!destinations[user.role]) throw new Error("This account has an invalid role. Contact the administrator.");
        location.href = destinations[user.role];
      } catch (err) {
        errorBox.textContent = err.message || "Unable to sign in. Check your email and password.";
        if (window.db) await db.auth.signOut();
      } finally { submit.disabled = false; submit.innerHTML = 'Sign in <span>→</span>'; }
    });
  });
})();
