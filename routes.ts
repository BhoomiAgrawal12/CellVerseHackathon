/*
  Define your public routes here. These routes will not require authentication.

  For example:

  export const publicRoutes = ["/login", "/about"];
*/

export const publicRoutes = ["/", "/auth/new-verification"];

/*
  Define your private routes here. These routes will require authentication.

  For example:

  export const authRoutes = ["/dashboard", "/profile"];
*/
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
];

/*
  Define your API authentication prefix here. This is the path that your API endpoints will be mounted under.

  For example:

  export const apiAuthPrefix = "/api/auth";
*/
export const apiAuthPrefix = "/api/auth";

/*
  Define your default login redirect path here. This is the path that users will be redirected to after logging in.

  For example:

  export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
 
*/
export const DEFAULT_LOGIN_REDIRECT = "/PatientDashboard";
