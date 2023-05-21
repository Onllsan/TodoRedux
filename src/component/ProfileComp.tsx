import { User } from "../utils/User";

interface ProfileProps {
  handleLogout: () => Promise<void>;
  user: User;
  setResetPassword: () => void;
}

export function ProfileComp(props: ProfileProps) {
  const {
    handleLogout,
    user: { photoUrl, email },
    setResetPassword,
  } = props;

  return (
    <div className="flex items-center justify-center mx-9 mt-20">
      <div className=" p-4 max-w-sm bg-white border border-gray-200 rounded-lg shadow">
        <div className="flex flex-col items-center pb-10">
          {photoUrl ? (
            <img
              className="w-24 h-24 mb-3 object-cover rounded-full shadow-lg"
              src={photoUrl}
              alt="Avatar"
            />
          ) : (
            <div className="w-24 h-24 mb-3 text-4xl font-bold grid place-content-center bg-lightpink rounded-full shadow-lg">
              {email[0].toUpperCase()}
            </div>
          )}
          <span className="text-sm text-gray-500 ">{email}</span>
          <div className="flex mt-4 space-x-3 md:mt-9">
            <button
              type="button"
              onClick={setResetPassword}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white  rounded-lg focus:ring-4 focus:outline-none  bg-[#812BFF] hover:bg-[#6027B3]"
            >
              Change Password
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center  border border-gray-300 rounded-lg  bg-orange hover:bg-lightorange text-white"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
