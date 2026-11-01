/* Auth service stubs. These only simulate a network call so the UI flow can be reviewed.
   TODO: replace each function body with the real API request once the backend exists. */
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export async function signIn(credentials) {
  await wait(900);
  return { ok: true, credentials };
}

export async function signUp(payload) {
  await wait(1100);
  return { ok: true, payload };
}

export async function requestPasswordReset(email) {
  await wait(900);
  return { ok: true, email };
}
