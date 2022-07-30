import React, { useEffect, useRef } from "react";

const LazyLoadingImage = ({ url, className }) => {
  const imgRef = useRef();

  useEffect(() => {
    const img = imgRef.current;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((item) => {
        if (item.isIntersecting) img.src = url;
      });
    });
    if (img) observer.observe(img);
    return () => {
      //   observer.unobserve(entries[0].target);
      if (img) observer.unobserve(img);
    };
  }, [imgRef, url]);
  return <img className={className} ref={imgRef} alt={url}></img>;
};

export default LazyLoadingImage;
