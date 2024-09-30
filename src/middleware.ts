import { auth as middleware } from "@/auth";

export default middleware((req) => {
  const { nextUrl } = req;
  const isLoggedIn = req.auth;

  if (nextUrl.pathname.startsWith("/dashboard")) {
    if (!isLoggedIn) {
      return Response.redirect(new URL("/auth/sign-in", nextUrl));
    }
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
