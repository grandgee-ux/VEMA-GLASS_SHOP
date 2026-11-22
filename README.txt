GLASS MART - CORRECTED SUPABASE AUTHENTICATION PACKAGE
=====================================================

WHAT IS FIXED
- Corrected Supabase project URL (removed /rest/v1/).
- Supabase client is loaded before application scripts on workspace pages.
- Login uses Supabase email/password authentication (not demo usernames).
- Workspace pages verify the signed-in Supabase user and database profile role.
- Logout clears the Supabase session.
- Rebuilt the broken workspace JavaScript so all supplied pages render without undefined helper functions.
- Customer carts are kept separately per signed-in account in this browser.
- Included supabase/schema.sql to create the required database tables, profile trigger and initial RLS policies.

IMPORTANT DATA LIMITATION
This package now uses Supabase for real authentication and role lookup. The product/order/sales/settings workspace interactions are still a browser-local demonstration using localStorage. They are NOT yet writing business transactions to Supabase. Do not use this version as a live multi-device inventory or sales system. The next integration step is to move these operations to secure database functions (RPC transactions) and Supabase table queries.

SETUP
1. Extract the ZIP and upload the contents of Glass_Mart_Login_Role_Gate to your GitHub repository root.
2. In Supabase Dashboard > SQL Editor, run supabase/schema.sql.
3. In Supabase Dashboard > Authentication > Users, create the admin user with email and password.
4. Run the admin promotion UPDATE at the bottom of schema.sql, replacing YOUR_ADMIN_EMAIL with the admin email.
5. Create staff and customer users in Authentication > Users. New users receive customer by default; change staff profiles to role='staff' manually in Table Editor or SQL.
6. Open index.html through GitHub Pages (not by double-clicking the file) and sign in with the email/password.
7. In Supabase Authentication > URL Configuration, add your GitHub Pages URL to Site URL and Redirect URLs, e.g. https://grandgee-ux.github.io/VEMA-GLASS-MART/**

SECURITY
- The browser contains only the Supabase publishable key. Never add a secret or service_role key.
- RLS is enabled by the included schema, but review policies before production.
- Role changes must be made by an administrator in Supabase, never by a public signup form.
- This package does not process real M-Pesa/card payments or send SMS.

PROJECT FILES
- Existing HTML pages, CSS design and navigation are retained.
- js/supabase.js: Supabase client configuration.
- js/auth.js: login, session, profile role and logout.
- js/workspace.js: current local demo workspace interactions.
- supabase/schema.sql: initial database setup.
