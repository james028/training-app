import React from "react";
import { useAppContext } from "../../../appContext/appContext";
import { Navigate } from "react-router-dom";
import { useDeviceFingerprint } from "../../../hooks/useDeviceFingerprint/useDeviceFingerprint";
import { useRegisterDevice } from "../../../hooks/useRegisterDevice/useRegisterDevice";

const PrivateRoute = ({ children }: any) => {
  const { auth } = useAppContext();
  const isAuth = auth?.data?.id;

  const { fingerprint } = useDeviceFingerprint();
  const fingerprintData = fingerprint ?? "";

  useRegisterDevice(fingerprintData);

  console.log(fingerprintData, "fingerprintData");

  return isAuth ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
