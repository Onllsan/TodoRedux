import { useForm } from "react-hook-form";
import { RegisterValues, registerSchema } from "../utils/Form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { useAppDispatch, useAppSelector } from "../hooks/storeHook";
import { login } from "../auth/authSlice";
import { useState, useEffect } from "react";

export function Register() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const signInwithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const { user } = await signInWithPopup(auth, provider);
      if (user && user.email)
        dispatch(
          login({
            email: user.email,
            id: user.uid,
            photoUrl: user.photoURL || null,
          })
        );
    } catch (error) {
      console.log("Error loging in: ", error);
    }
  };

  const handleFormSubmit = async (data: RegisterValues) => {
    setError(null);
    setLoading(true);
    const { email, password } = data;
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(user);

      await setDoc(doc(db, "users", user.uid), { email });
      setLoading(false);

      if (user && user.email)
        dispatch(
          login({
            email: user.email,
            id: user.uid,
            photoUrl: user.photoURL || null,
          })
        );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setLoading(false);
      const errorCode = error.code;
      setError(errorCode);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: yupResolver(registerSchema),
  });
  return (
    <>
      <div className="flex items-center justify-center h-screen mx-9">
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
          {error && (
            <p className="bg-red-400 px-3 py-2 text-center rounded-md">
              {error}
            </p>
          )}
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="space-y-6 "
            action="#"
          >
            <span>
              <img src="MyToDo.svg" />
            </span>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium  "
              >
                Your email
              </label>
              <input
                type="email"
                className="bg-gray-50 border border-gray-400 outline-none text-sm rounded-lg   block w-full p-2.5 "
                placeholder="name@example.com"
                {...register("email")}
              />
              {errors.email ? (
                <span className="text-red-700">{errors.email.message}</span>
              ) : (
                <></>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium "
              >
                Your password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-400 outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                {...register("password")}
              />
              {errors.password ? (
                <span className="text-red-700">{errors.password.message}</span>
              ) : (
                <></>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium"
              >
                Confirm your password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-400 outline-none text-sm rounded-lg  block w-full p-2.5 "
                {...register("confirmPassword")}
              />
              {errors.confirmPassword ? (
                <span className="text-red-700">
                  {errors.confirmPassword.message}
                </span>
              ) : (
                <></>
              )}
            </div>

            <button
              disabled={loading}
              className="w-full text-white bg-orange hover:bg-lightorange font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Create my account
            </button>
            <button
              type="button"
              onClick={signInwithGoogle}
              className="w-full text-white bg-[#812BFF] hover:bg-[#6027B3] font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              Login with Google
            </button>
            <div className="text-sm font-medium ">
              Back to
              <Link
                to="/login"
                className="text-[#812BFF]  hover:underline dark:text-[#6027B3]"
              >
                {" "}
                Log in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
