import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks/storeHook";

export const Heading = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="flex items-center justify-between mt-9 mx-9 lg:mx-56 md:mx-20 sm:mx-16 gap-4 ">
      <div className="shrink-0 ">
        {user ? (
          <Link to="/profile">
            {user?.photoUrl ? (
              <img
                className="rounded-full h-10 w-10 sm:h-12 sm:w-12 hover:shadow-xl shadow"
                src={user.photoUrl}
                alt=""
              />
            ) : (
              <div className=" h-10 w-10 sm:h-12 sm:w-12 font-bold text-3xl  grid place-content-center bg-[#c084fc]  rounded-full shadow hover:shadow-xl">
                {user?.email[0].toUpperCase()}
              </div>
            )}
          </Link>
        ) : (
          <></>
        )}
      </div>
      <div className="w-full text-center ">
        <Link to="/">
          <img className=" inline-block mx-auto" src="/MyToDo.svg" />
        </Link>
      </div>
      <div className="">
        {/* This is an empty div for keeping the svg in center */}
      </div>
    </div>
  );
};
