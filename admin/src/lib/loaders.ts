import { redirect } from "react-router";
import { getUserSession } from "./auth";

export async function rootLayoutLoader() {
  const session = await getUserSession();
  if (!session) {
    return redirect("/login");
  }
  return session;
}

export async function authLoader() {
  const session = await getUserSession();
  if (session) {
    return redirect("/"); 
  }
  return session;
}
