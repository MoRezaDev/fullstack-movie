export async function getUserSession() {
  const session = await new Promise((res) => res(true));
  return session;
}
