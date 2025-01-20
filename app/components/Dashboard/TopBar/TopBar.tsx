"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function TopBar() {
  return (
    <div className="w-full p-4 bg-white shadow-sm flex items-center justify-between">
      {/* Left Side - Logo */}
      <div className="flex items-center gap-2">
        <FontAwesomeIcon
          className="bg-black p-1 text-sm h-[30px] text-white rounded-md"
          icon={faClipboard}
        />
        <span className="text-2xl font-light">
          <span className="font-bold text-black">TaskBuddy</span>
        </span>
      </div>

      {/* Right Side - Account Section */}
      <div className="flex items-center gap-4">
        {/* Account Icon */}
        <div className="w-20">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <button className="text-gray-500">Sign In</button>
          </SignedOut>
        </div>
      </div>
    </div>
  );
}
