import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Navbar() {
  const navigate = useNavigate();
  const isPresent = localStorage.getItem("token") ? true : false;

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully !!");
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center text-right p-4 bg-red-600 text-white font-semibold text-sm">
      <div className="flex justify-between items-center">
        <a href="/">
          <img src="https://flowbite.com/docs/images/logo.svg" alt="Flowbite Logo" />
        </a>
      </div>
      {isPresent ? (
        <div>
          <a href="/" className="mr-6">Home</a>
          <a href="/create">Create</a>
          <button
            onClick={handleLogout}
            className="ml-6 bg-white text-red-600 px-3 py-1 rounded hover:bg-gray-200"
          >
            Logout
          </button>
        </div>
      ) : (
        <a href="/login" className="ml-6">Login</a>
      )}
    </div>
  );
}

export default Navbar;
