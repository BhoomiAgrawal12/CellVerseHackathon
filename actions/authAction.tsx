// src/app/actions/authActions.ts
"use server";

import { signOut } from "../auth"; // Adjust path based on your structure

export async function handleSignOut() {
  await signOut();
  window.location.reload();
}
