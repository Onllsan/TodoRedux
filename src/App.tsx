import { Routes, Route } from "react-router-dom";
import ToDo from "./page/ToDo";
import { Login } from "./page/Login";
import { Register } from "./page/Register";
import { Profile } from "./page/Profile";
import { useEffect } from "react";
import { auth } from "./firebase";
import { useAppDispatch } from "./hooks/storeHook";
import { login, setInitializing } from "./auth/authSlice";
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
      dispatch(setInitializing(false));
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Routes>
      <Route element={<AuthRoutes />}>
        <Route path="/Home" element={<ToDo />} />;
        <Route path="/profile" element={<Profile />} />;
      </Route>
      <Route path="/" element={<Login />} />;
      <Route path="/register" element={<Register />} />;
    </Routes>
  );
}

export default App;
