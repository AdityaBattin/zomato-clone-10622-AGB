import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom'
import { googleauth } from "../redux/reducers/auth/auth.action";


const GoogleAuth = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      dispatch(googleauth(token)).then(() => navigate("/delivery"));
    }
  }, [token])

  return <div>Loading ... please wait</div>;
};

export default GoogleAuth;
