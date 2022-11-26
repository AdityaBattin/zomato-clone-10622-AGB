import React, { useState, useEffect } from "react";
import { TiStarOutline } from "react-icons/ti";
import { RiDirectionLine, RiShareForwardLine } from "react-icons/ri";
import { BiBookmarkPlus } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getspecificrestaurant } from '../redux/reducers/restaurant/restaurant.action'
import { getImage } from '../redux/reducers/image/image.action'

// components
import Navbar from "../components/Navbar";
import ImageGrid from "../components/Restaurant/ImageGrid";
import InfoButton from "../components/Restaurant/InfoButton";
import RestaurantInfo from "../components/Restaurant/RestaurantInfo";
import Tabs from "../components/Restaurant/Tabs";
import CartContainer from "../components/Cart/CartContainer";

const RestaurantLayout = ({ children: Component, ...props }) => {
  const [restaurant, setRestaurant] = useState({
    images: [],
    name: "",
    cuisine: "",
    address: "",
    restaurantRating: 4.1,
    deliveryRating: 3.1,
  });

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getspecificrestaurant(id)).then((data) => {
      setRestaurant((prev) => ({
        ...prev, ...data.payload.restaurants,
      }));

      dispatch(getImage(data.payload.restaurants.photos)).then((data)=>{
        // console.log(data);
        setRestaurant((prev)=>({
          ...prev,
          images:data.payload.images,
        }))
      })
    })
    
    
    // dispatch(getImage(data.payload.photos)).then((data) => {
    //   console.log(data);
    //   // setRestaurant((prev) => ({
    //   //   ...prev,
    //   //   images: data.payload.images,
    //   // }))
    // })
  }, []);
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 mt-8 lg:px-20 pb-20">
        <ImageGrid images={restaurant.images} />
        <RestaurantInfo {...restaurant} />
        <div className="my-4 flex flex-wrap gap-3 mx-auto">
          <InfoButton isActive="true">
            <TiStarOutline /> Add Review
          </InfoButton>
          <InfoButton>
            <RiDirectionLine /> Direction
          </InfoButton>
          <InfoButton>
            <BiBookmarkPlus /> Bookmark
          </InfoButton>
          <InfoButton>
            <RiShareForwardLine /> Share
          </InfoButton>
        </div>
        <div className="my-10 sticky bg-white top-0 pt-2 z-10">
          <Tabs />
        </div>
        {Component}
      </div>
      <CartContainer />
    </>
  );
};

export default RestaurantLayout;
