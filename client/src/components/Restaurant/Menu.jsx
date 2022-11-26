import React, { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {getImage} from '../../redux/reducers/image/image.action'
import { useParams } from "react-router-dom";

// components
import MenuCollection from "./MenuCollection";

const Menu = () => {
  const [menus, setMenus] = useState([]);
  const reduxState = useSelector((globalState) => globalState.restaurant.selectedRestaurant.restaurants);
  const dispatch = useDispatch();
  useEffect(() => {
    if (reduxState) {
      dispatch(getImage(reduxState?.menuImages)).then((data) => {
        const images = [];
        data.payload.images.map(({ location }) => images.push(location));
        setMenus(images);
        // console.log(images);
      });
    }

  }, [reduxState]);

  return (
    <div className="flex flex-wrap gap-3">
      <MenuCollection menuTitle="Menu" pages={menus.length} images={menus} />
    </div>
  );
};
export default Menu;
