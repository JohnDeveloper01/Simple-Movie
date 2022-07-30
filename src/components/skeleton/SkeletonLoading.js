import React from "react";
import Skeleton from "react-loading-skeleton";
const SkeletonLoading = ({ width = "300px" }) => {
  return (
    <>
      <div>
        <Skeleton width={width} height={`290px`}></Skeleton>
        <div className="mt-5">
          <Skeleton width={width} height={"20px"}></Skeleton>
        </div>
        <div className="mt-2">
          <Skeleton width={width} height={"20px"}></Skeleton>
        </div>
        <div className="mt-2">
          <Skeleton width={width} height={"50px"}></Skeleton>
        </div>
      </div>
    </>
  );
};

export default SkeletonLoading;
