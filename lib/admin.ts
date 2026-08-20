import { notFound } from "next/navigation";

export function requireAdminScaffoldEnabled() {
  // This is NOT authentication. It deliberately hides the unfinished admin
  // scaffold until real Cognito authorization is implemented.
  if (process.env.ENABLE_ADMIN_UI !== "true") {
    notFound();
  }
}
