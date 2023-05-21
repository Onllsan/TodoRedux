import { useForm } from "react-hook-form";
import { LoginValues, loginSchema } from "../utils/Form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/storeHook";
import { login } from "../auth/authSlice";
import { ForgotPassword } from "../component/ForgotPassword";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/Home");
    }
  }, [user, navigate]);

  const [resetPassword, setResetPassword] = useState(false);
  const [resetPasswordEmail, setResetPasswordEmail] = useState("");
  const [resetPasswordSuccess, setResetPasswordSuccess] = useState<
    string | null
  >(null);
  const [resetPasswordError, setResetPasswordError] = useState<string | null>(
    null
  );
  const handlePasswordReset = async () => {
    if (!resetPasswordEmail.length) return;
    try {
      await sendPasswordResetEmail(auth, resetPasswordEmail);
      setResetPasswordSuccess(
        "Password reset email sent. Please check your inbox."
      );
      setResetPasswordError(null);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setResetPasswordError(error.message);
      setResetPasswordSuccess(null);
    }
  };

  const signInwithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
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
      setLoading(false);
      console.log("Error loging in: ", error);
    }
  };
  const handleFormSubmit = async (data: LoginValues) => {
    setError(null);
    setLoading(true);
    const { email, password } = data;
    console.log(data);
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
      setLoading(false);
      if (user && user.email) {
        dispatch(
          login({
            email: user.email,
            id: user.uid,
            photoUrl: user.photoURL || null,
          })
        );
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setLoading(false);
      const errorCode = error.code;
      setError(errorCode);
      console.log(error);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: yupResolver(loginSchema),
  });

  return (
    <>
      <ForgotPassword
        resetPasswordEmail={resetPasswordEmail}
        resetPasswordSuccess={resetPasswordSuccess}
        resetPasswordError={resetPasswordError}
        setResetPasswordEmail={setResetPasswordEmail}
        isOpen={resetPassword}
        onClose={() => setResetPassword(false)}
        handlePasswordReset={handlePasswordReset}
      />
      <div className="flex items-center justify-center h-screen mx-9">
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
          {error && (
            <p className="bg-red-400 px-3 py-2 text-center rounded-md ">
              {error}
            </p>
          )}
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="space-y-6"
            action="#"
          >
            <span>
              <img src="MyToDo.svg" />
            </span>

            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium "
              >
                Your email
              </label>
              <input
                type="email"
                className="bg-gray-50 border border-gray-400 text-sm rounded-lg outline-none  block w-full p-2.5 "
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
                className="bg-gray-50 border outline-none border-gray-400  text-sm rounded-lg block w-full p-2.5 "
                {...register("password")}
              />
              {errors.password ? (
                <span className="text-red-700">{errors.password.message}</span>
              ) : (
                <></>
              )}
            </div>
            <div className="flex items-start">
              <button
                type="button"
                onClick={() => setResetPassword(true)}
                className="ml-auto text-sm text-[#812BFF] hover:underline dark:text-[#6027B3]"
              >
                Forgot Password?
              </button>
            </div>
            <button
              disabled={loading}
              className="w-full text-white bg-orange hover:bg-lightorange  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Login to your account
            </button>
            <button
              type="button"
              onClick={signInwithGoogle}
              className="w-full text-white bg-[#812BFF] hover:bg-[#6027B3]  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              Login with Google
            </button>
            <div className="text-sm font-medium ">
              Not registered?{" "}
              <Link
                to="/register"
                className="text-[#812BFF] hover:underline dark:text-[#6027B3]"
              >
                Create account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
