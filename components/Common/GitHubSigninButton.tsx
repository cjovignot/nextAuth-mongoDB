import React from "react";
import { signIn } from "next-auth/react";
import { domain_url } from "../../lib/axiosInstance";

const GitHubSignInButton = () => {
  function handleGitHubSignin() {
    signIn("github", {
      callbackUrl: domain_url(),
    });
  }

  return (
    <button
      onClick={handleGitHubSignin}
      className="w-full text-gray-900 focus:ring-2 border focus:ring-primary-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      type="button"
    >
      Sign In with GitHub
      <span className="ml-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="inline w-4 h-4 mr-3 text-gray-900 fill-current"
          viewBox="0 0 24 24"
          width="24px"
          height="24px"
        >
          <path d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.11.82-.26.82-.577v-2.173c-3.338.726-4.043-1.61-4.043-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.085 1.838 1.243 1.838 1.243 1.07 1.835 2.809 1.305 3.494.998.108-.775.418-1.306.763-1.606-2.665-.3-5.467-1.332-5.467-5.93 0-1.31.47-2.383 1.235-3.223-.123-.303-.535-1.524.118-3.176 0 0 1.008-.322 3.3 1.23.96-.267 1.99-.4 3.015-.404 1.022.004 2.054.137 3.015.404 2.29-1.552 3.297-1.23 3.297-1.23.655 1.653.243 2.873.12 3.176.77.84 1.235 1.913 1.235 3.223 0 4.61-2.806 5.626-5.478 5.92.43.37.824 1.102.824 2.222v3.293c0 .32.218.694.825.577C20.565 21.795 24 17.297 24 12c0-6.627-5.373-12-12-12z" />
        </svg>
      </span>
    </button>
  );
};

export default GitHubSignInButton;
