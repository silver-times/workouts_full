import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error } = useSignup();

  const handleSubmit = async () => {
    await signup(email, name, password);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-opacity-25 bg-blur-sm bg-black backdrop-filter backdrop-blur-sm border border-white text-white shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl w-full p-8 lg:w-1/2">
        <h2 className="text-4xl md:text-8xl font-semibold text-gray-700 text-center">
          TRACKWISE
        </h2>
        <p className="text-2xl text-gray-600 text-center">Welcome!</p>

        <div className="mt-4 flex items-center justify-between">
          <span className="border-b w-1/5 lg:w-1/4"></span>
          <p className="text-md text-center text-gray-500 uppercase">
            Signup with email
          </p>
          <span className="border-b w-1/5 lg:w-1/4"></span>
        </div>
        <div className="mt-4">
          <label className="block text-white text-md text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
            className="bg-gray-200 text-black text-xl focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
          />
        </div>
        <div className="mt-4">
          <label className="block text-white text-md text-sm font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            value={name}
            placeholder="Name"
            onChange={(event) => setName(event.target.value)}
            className="bg-gray-200 text-black text-xl focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
          />
        </div>
        <div className="mt-4">
          <div className="flex justify-between">
            <label className="block text-white text-md text-sm font-bold mb-2">
              Password
            </label>
          </div>
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
            className="bg-gray-200 text-black text-xl focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
          />
        </div>
        <div className="mt-8">
          <button
            onClick={handleSubmit}
            className="my-4 block w-full px-4 py-4 bg-green hover:bg-black border-2 hover:text-white font-bold rounded-lg text-2xl text-black "
          >
            Signup
          </button>
          {error && <p className="text-warning">{error}</p>}
        </div>
        <div className="mt-8 flex items-center justify-between">
          <span className="border-b w-1/5 md:w-1/4"></span>
          <a href="/signin" className="text-xs text-gray-500 uppercase">
            or sign in
          </a>
          <span className="border-b w-1/5 md:w-1/4"></span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
