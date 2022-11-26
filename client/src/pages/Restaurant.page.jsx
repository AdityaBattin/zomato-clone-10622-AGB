import React from "react";
import { useParams, useLocation, Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCart } from "../redux/reducers/cart/cart.action";

const Restaurant = () => {
  const { id } = useParams();
  const { pathname } = useLocation();

  const dispatch = useDispatch();

  if (`/restaurant/${id}` === pathname) {
    return <Navigate to={`/restaurant/${id}/overview`} />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default Restaurant;
