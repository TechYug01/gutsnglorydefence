import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

/**
 * Checks that the current user is authenticated AND has the username "admin".
 * Redirects to sign-in if not logged in, or to "/" if logged in but not admin.
 * Returns the userId if authorized.
 */
export async function requireAdmin(): Promise<string> {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await currentUser();
  if (!user || user.username !== "admin") {
    redirect("/unauthorized");
  }

  return userId;
}
