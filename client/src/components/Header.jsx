import React from "react";
import { Link } from "react-router-dom";
import {useSelector} from 'react-redux'

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="bg-slate-200">
      <div className="flex justify-between p-3 items-center max-w-6xl mx-auto">
        <Link to="/">
          <h1 className="font-bold">Auth app</h1>
        </Link>
        <ul className="flex gap-4">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>
          <Link to={currentUser ? '/profile': '/signin'}>
            {currentUser ? (
              <img
                src={currentUser.profilePicture}
                alt="profile pic"
                className="h-7 w-7 rounded-full object-cover"
              />
            ) : (
              <li>sign in</li>
            )}
          </Link>
        </ul>
      </div>
    </div>
  );
}
