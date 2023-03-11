import React from "react";
import Loader from "../Loader/Loader";
// import { LazyLoadImage } from "react-lazy-load-image-component";
// import "react-lazy-load-image-component/src/effects/blur.css";
//
// const MyImage = ({ image }) => (
//   <>
//     <LazyLoadImage
//       // alt={image.alt}
//       effect="blur"
//       src={image.src} // use normal <img> attributes as props
//       // width={image.width}
//     />
//     {/*<span>{image.caption}</span>*/}
//   </>
// );

const Image = ({ img }) => {
  const [isLoading, setLoading] = React.useState(false);

  return (
    <>
      {!isLoading && <Loader />}
      <img
        className={"image"}
        style={{ display: !isLoading ? "none" : "" }}
        src={img}
        onLoad={() => setLoading(true)}
      />
    </>
  );
};

export default Image;
