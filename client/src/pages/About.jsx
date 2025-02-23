import React from 'react'

export default function About() {
  return (
    <div className="px-4 py-12 max-w-2xl mx-auto">
    <h1 className="text-3xl font-bold text-slate-800 mb-5">About</h1>
    <p className="mb-5 text-slate-700">
      A MERN authentication app consists of MongoDB, Express.js, React, and
      Node.js, where users can register, log in, and access protected
      resources. The backend (Node.js + Express) handles authentication using
      JWT (JSON Web Tokens) for security. MongoDB stores user credentials,
      typically hashed with bcrypt for encryption. Upon login, the server
      generates a JWT, which is sent to the client and stored in localStorage
      or cookies. This token is then used for authenticated requests.
    </p>
    <p className="mb-5 text-slate-700">
      A MERN authentication app consists of MongoDB, Express.js, React, and
      Node.js, where users can register, log in, and access protected
      resources. The backend (Node.js + Express) handles authentication using
      JWT (JSON Web Tokens) for security.
    </p>
    <p className="mb-5 text-slate-700">
      A MERN authentication app consists of MongoDB, Express.js, React, and
      Node.js, where users can register, log in, and access protected
      resources. The backend (Node.js + Express) handles authentication using
      JWT (JSON Web Tokens) for security.
    </p>
  </div>
  )
}
