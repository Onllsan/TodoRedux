import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks/storeHook";

export const Heading = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="grid grid-cols-3 items-center">
      <div className="justify-self-start">
        {user ? (
          <Link to="/profile">
            {user?.photoUrl ? (
              <img
                className="rounded-full h-10 w-10"
                src={user.photoUrl}
                alt=""
              />
            ) : (
              <div className="w-24 h-24 mb-3 text-4xl font-bold grid place-content-center bg-green-200 rounded-full shadow-lg">
                {user?.email[0].toUpperCase()}
              </div>
            )}
          </Link>
        ) : (
          <></>
        )}
      </div>
      <div className="justify-self-center">
        <img src="/MyToDo.svg" alt="" />
      </div>
      <div className="justify-self-end">
        {!user && (
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            <Link to="/login">Login</Link>
          </button>
        )}
      </div>
    </div>
  );
};
