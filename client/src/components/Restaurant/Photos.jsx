import React, { useState, useEffect } from "react";
import ImageViewer from "react-simple-image-viewer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getImage } from '../../redux/reducers/image/image.action'

// components
import PhotoCollection from "./PhotoCollection";

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const reduxState = useSelector((globalState) => globalState.restaurant.selectedRestaurant.restaurants);
  const dispatch = useDispatch();
  useEffect(() => {
    if (reduxState) {
      dispatch(getImage(reduxState?.photos)).then((data) => {
        const images = [];
        data.payload.images.map(({ location }) => images.push(location));
        setPhotos(images);
        // console.log(images);
      });
    }

  }, [reduxState]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const closeViewer = () => setIsMenuOpen(false);
  const openViewer = () => setIsMenuOpen(true);

  return (
    <>
      {isMenuOpen && (
        <ImageViewer
          src={photos}
          currentIndex={currentImage}
          disableScroll={false}
          onClose={closeViewer}
        />
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {photos.map((photo, index) => (
          <PhotoCollection
            key={index}
            openViewer={openViewer}
            index={index}
            image={photo}
            setCurrentImage={setCurrentImage}
          />
        ))}
      </div>
    </>
  );
};
export default Photos;
