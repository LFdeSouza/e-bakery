import { useState } from "react";
import { MenuIcon, ShoppingCartIcon, XIcon } from "@heroicons/react/outline";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  authenticatedStatus,
  selectUser,
  logoutUser,
} from "../../store/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { IUser } from "../../types/User";

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

interface UserProps {
  user: IUser;
}

const Header = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(authenticatedStatus);
  const user = useAppSelector(selectUser);
  const [isSidebarOpen, toggleSidebar] = useState(false);
  const itemsInCart = useAppSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  return (
    <header className="fixed top-0 z-10 w-screen bg-white">
      <div className="flex items-center justify-between p-4 mx-auto border-gray-200 max-w-7xl sm:border-b">
        <div className="flex gap-6">
          <MenuIcon
            onClick={() => toggleSidebar(!isSidebarOpen)}
            className="w-8 h-8 text-gray-700 cursor-pointer md:hidden"
          />
          <Link to="/" className="text-3xl font-semibold text-gray-800">
            Bakery
          </Link>
          <Links location="navbar" />
        </div>
        <div className="flex items-center gap-4 text-gray-800">
          <div onClick={() => navigate("/cart")} className="relative">
            <ShoppingCartIcon className="text-gray-700 cursor-pointer h-7 w-7" />
            {itemsInCart > 0 && (
              <span className="absolute flex items-center justify-center w-5 h-5 text-sm text-white rounded-full -top-3 left-3 bg-mainOrange">
                {itemsInCart && itemsInCart}
              </span>
            )}
          </div>
          {!isAuthenticated && <LoginBar />}
          {user && <DisplayUser user={user} />}
        </div>
      </div>
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </header>
  );
};

const Links = ({ location }: { location: string }) => (
  <ul
    className={`gap-4 text-gray-500 ${
      location === "sidebar"
        ? "mt-10 flex flex-col text-lg font-semibold"
        : " hidden justify-center sm:flex sm:items-end"
    }`}
  >
    <li className="cursor-pointer hover:underline">
      <Link to="/products">Our products</Link>
    </li>
    <li className="cursor-pointer hover:underline">
      <Link to="/about">About</Link>
    </li>
    <li className="cursor-pointer hover:underline">
      <Link to="/">Contact us</Link>
    </li>
  </ul>
);

const DisplayUser: React.FC<UserProps> = ({ user }) => {
  const [openLogout, setOpenLogout] = useState(false);
  const dispatch = useAppDispatch();

  return (
    <div
      onClick={() => setOpenLogout(!openLogout)}
      className="relative flex items-center gap-3 cursor-pointer"
    >
      <p>{user.username}</p>
      <img
        className="w-10 h-10 rounded-full"
        src="https://www.gravatar.com/avatar/00000000000000000000000000000000"
        alt="Profile"
      />
      {openLogout && (
        <div className="absolute left-0 p-4 px-8 bg-white rounded shadow-lg top-12">
          <p
            onClick={() => dispatch(logoutUser())}
            className="hover:underline "
          >
            Logout
          </p>
        </div>
      )}
    </div>
  );
};

const LoginBar = () => {
  return (
    <div className="flex items-center gap-4">
      <Link className="text-gray-700" to="/login">
        Login
      </Link>
      <Link className="text-gray-700" to="/signup">
        Signup
      </Link>
    </div>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, toggleSidebar }) => (
  <>
    <div
      className={`absolute inset-0 z-50 h-screen bg-black/80 ${
        !isSidebarOpen && "-translate-x-full"
      }`}
    ></div>
    <nav
      className={`absolute top-0 left-0 z-50 h-screen w-10/12 ${
        !isSidebarOpen && "-translate-x-full"
      } bg-white p-8 shadow-lg transition-all duration-300 ease-in-out`}
    >
      <XIcon
        onClick={() => toggleSidebar(!isSidebarOpen)}
        className="w-8 h-8 text-gray-500 cursor-pointer"
      />
      <Links location="sidebar" />
    </nav>
  </>
);

export default Header;
