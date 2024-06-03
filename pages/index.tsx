import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useAuthContext, useAuthContextType } from "../context/AuthContext";
import { useEffect } from "react";

export default function Home() {
  const { data: session } = useSession<any>();
  const { state, dispatch }: useAuthContextType = useAuthContext();

  function signOutHandle() {
    signOut();
  }

  useEffect(() => {
    console.log("state ", state.user?._id);
  }, [state]);

  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      {session ? (
        <div className="flex flex-col items-center justify-center w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <div className="flex flex-col items-center">
            <small className="text-gray-600">Hooray, you're logged in!!</small>

            <p className="mt-5 text-blue-500 underline">
              <Link href="/protected-route">Visit Protected Route</Link>
            </p>

            <button
              onClick={signOutHandle}
              className="px-4 py-2 mt-5 text-white transition-all bg-red-500 rounded-full shadow hover:bg-red-600"
            >
              Sign Out
            </button>
          </div>

          <div className="flex items-center mt-6">
            <img
              className="w-12 h-12 rounded-full shadow"
              src={state.user?.image}
              alt="User Avatar"
            />
            <div className="ml-4">
              <p className="font-semibold text-gray-800">
                {" "}
                {state?.user?.name}
              </p>
              <p className="text-gray-600"> {state?.user?.email}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex w-full">
          {/* Left Panel */}
          <div className="flex flex-col items-center justify-center w-1/3 p-10 shadow-md bg-black/90">
            <h2 className="mb-4 text-3xl font-bold text-white">Connexion</h2>
            <div className="flex flex-col w-full gap-5">
              <Link legacyBehavior href="/login">
                <a className="px-6 py-2.5 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition-all text-center">
                  Log In
                </a>
              </Link>
              <Link legacyBehavior href="/signup">
                <a className="px-6 py-2.5 bg-green-500 text-white rounded-md shadow hover:bg-green-600 transition-all text-center">
                  Sign Up
                </a>
              </Link>
            </div>
          </div>

          {/* Right Panel */}
          <div className="flex flex-col items-center justify-center w-full p-10 shadow-md">
            <h1 className="mb-4 text-4xl font-bold text-gray-800">
              Welcome to Our App
            </h1>
            <p className="mb-8 text-lg text-center text-gray-600">
              Our app helps you manage your subscriptions efficiently and
              easily. Track your subscriptions, get reminders for upcoming
              payments, and never miss a renewal date again. Join us and take
              control of your subscriptions today!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
