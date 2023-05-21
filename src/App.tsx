import { Routes, Route } from "react-router-dom";
import ToDo from "./page/ToDo";
import { Login } from "./page/Login";
import { Register } from "./page/Register";
import { Profile } from "./page/Profile";
import { useEffect } from "react";
import { auth } from "./firebase";
import { useAppDispatch } from "./hooks/storeHook";
import { login } from "./auth/authSlice";
import { AuthRoutes } from "./auth/AuthRoutes";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user && user.email)
        dispatch(
          login({
            email: user.email,
            id: user.uid,
            photoUrl: user?.photoURL || null,
          })
        );
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Routes>
      <Route element={<AuthRoutes />}>
        <Route path="/" element={<ToDo />} />;
        <Route path="/profile" element={<Profile />} />;
      </Route>
      <Route path="/login" element={<Login />} />;
      <Route path="/register" element={<Register />} />;
      {/* <Route path="/login" element={<Auth />} />; */}
    </Routes>
  );
}

export default App;
