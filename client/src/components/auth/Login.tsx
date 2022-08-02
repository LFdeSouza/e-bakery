import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { loginUser, selectUser, userError } from "../../store/authSlice";
import Alert from "./Alert";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const hasError = useAppSelector(userError);

  //navigate to home page on user load
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });

  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUser(userData));
    clearFields();
  };

  const clearFields = () => setUserData({ username: "", password: "" });
  return (
    <div className="mx-auto mt-36 flex min-h-[70vh] max-w-7xl flex-col px-28">
      {hasError && <Alert msg={hasError} />}
      <form onSubmit={onSubmit} className="w-1/2 mx-auto">
        <h2 className="mb-10 text-3xl font-semibold text-mainOrange">
          Sign up
        </h2>
        <div className="flex flex-col w-full mb-4 ">
          <label htmlFor="username" className="text-lg text-gray-800">
            Username
          </label>
          <input
            id="username"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUserData({ ...userData, username: e.target.value })
            }
            value={userData.username}
            type="text"
            className="w-full p-2 px-4 border border-gray-400 rounded-lg"
            placeholder="Username"
          />
        </div>
        <div className="flex flex-col w-full mb-4">
          <label htmlFor="password" className="text-lg text-gray-800">
            Password
          </label>
          <input
            id="password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUserData({ ...userData, password: e.target.value })
            }
            type="password"
            value={userData.password}
            className="w-full p-2 px-4 border border-gray-400 rounded-lg"
            placeholder="Password"
          />
        </div>

        <button
          type="submit"
          className="w-full p-2 px-4 mt-5 text-white rounded-lg bg-mainOrange hover:bg-orange-600"
        >
          Sign up
        </button>
      </form>
    </div>
  );
};

export default Login;
