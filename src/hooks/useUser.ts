import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";

export default function useUser({
  redirectTo = false,
  redirectIfFound = false,
}: {
  redirectTo: false | string;
  redirectIfFound: boolean;
}) {
  const { data: user, mutate: mutateUser } = useSWR(
    `/api/user?pass=${process.env.SECRET_COOKIE_PASSWORD}`
  );

  useEffect(() => {
    console.log("sdfji", user);
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !user) return;
    console.log("sdf");

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user?.isLoggedIn)
    ) {
      Router.push(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo]);

  return { user, mutateUser, isLoading: true };
}
