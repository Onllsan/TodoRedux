import { useState } from "react";
import { Heading } from "../component/Heading";
import { ProfileComp } from "../component/ProfileComp";
import { useAppDispatch, useAppSelector } from "../hooks/storeHook";
import { auth } from "../firebase";
import { sendPasswordResetEmail, signOut } from "firebase/auth";
import { logout } from "../auth/authSlice";
import { ForgotPassword } from "../component/ForgotPassword";

export function Profile() {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [resetPasswordEmail, setResetPasswordEmail] = useState("");
  const [resetPasswordSuccess, setResetPasswordSuccess] = useState<
    string | null
  >(null);
  const [resetPasswordError, setResetPasswordError] = useState<string | null>(
    null
  );
  const [resetPassword, setResetPassword] = useState(false);
  const handleLogout = async () => {
    await signOut(auth);
    dispatch(logout());
  };

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

  return (
    <>
      <Heading />
      <ForgotPassword
        handlePasswordReset={handlePasswordReset}
        isOpen={resetPassword}
        onClose={() => setResetPassword(false)}
        resetPasswordEmail={resetPasswordEmail}
        resetPasswordError={resetPasswordError}
        resetPasswordSuccess={resetPasswordSuccess}
        setResetPasswordEmail={setResetPasswordEmail}
      />
      {user && (
        <ProfileComp
          setResetPassword={() => setResetPassword(true)}
          user={user}
          handleLogout={handleLogout}
        />
      )}
    </>
  );
}
