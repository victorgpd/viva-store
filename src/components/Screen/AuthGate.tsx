// AuthGate.tsx
import { Spin } from "antd";
import { ContainerPage } from "./styles";
import { useEffect, useState } from "react";
import { RoutesEnum } from "../../enums/enums";
import { auth } from "../../services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { LoadingOutlined } from "@ant-design/icons";
import { Navigate, useLocation, type Location } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { clearUser, setUser } from "../../redux/globalReducer/slice";

interface LocationState {
  from?: {
    pathname: string;
  };
}

export const AuthGate = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const location = useLocation() as Location & { state: LocationState };
  const { user } = useAppSelector((s) => s.globalReducer);

  const [initializing, setInitializing] = useState(true);
  const [authState, setAuthState] = useState(user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (u) {
        dispatch(setUser({ name: u.displayName ?? "", uid: u.uid, email: u.email ?? "" }));
      } else {
        dispatch(clearUser());
      }
      setInitializing(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    setAuthState(user);
  }, [user]);

  if (initializing) {
    return (
      <ContainerPage>
        <Spin indicator={<LoadingOutlined spin />} size="large" />
      </ContainerPage>
    );
  }

  const isOnLogin = location.pathname.includes("login");

  if (!authState.email && !isOnLogin) {
    return <Navigate to={RoutesEnum.Login} state={{ from: location }} replace />;
  }

  if (authState.email && isOnLogin) {
    const from = location.state?.from?.pathname || RoutesEnum.Dashboard;
    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
};
