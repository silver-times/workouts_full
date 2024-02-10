import { Link } from "react-router-dom";
import { useSignout } from "../hooks/useSignout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { signoutHandler } = useSignout();
  const { user } = useAuthContext();

  const handleClick = () => {
    signoutHandler();
  };

  return (
    <nav className="p-8 text-white">
      <div className="container md:mx-auto flex flex-col md:flex md:flex-row justify-between items-center">
        <Link to="/">
          <h1 className="text-6xl font-extralight">TRACKWISE</h1>
        </Link>
        <div className="flex gap-10 mt-4">
          {user && (
            <>
              <p className="text-xl font-medium">Hi, {user.name} 👋🏻</p>
              <button
                onClick={handleClick}
                className="text-xl font-medium hover:font-bold"
              >
                Signout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
