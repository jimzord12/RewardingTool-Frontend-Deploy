import React from "react";
import "./RefetchButton.css";

const RefetchButton = ({ onClick }) => {
  return (
    <div className="refetch-btn-container" onClick={onClick}>
      <div className="refetch-btn-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="25"
          height="25"
          viewBox="0 0 40 40"
        >
          <path
            fill="#8bb7f0"
            stroke="#4e7ab5"
            strokeMiterlimit="10"
            d="M4.2,35.5l2.6-2.6l-0.3-0.4c-3.2-3.4-5-7.9-5-12.6C1.5,9.8,9.8,1.5,20,1.5c0.8,0,1.6,0.1,2.5,0.2v4	c-0.8-0.1-1.7-0.2-2.5-0.2C12,5.5,5.5,12,5.5,20c0,3.6,1.3,7,3.8,9.7l0.4,0.4l2.9-2.9v8.3H4.2z"
          ></path>
          <path
            fill="#8bb7f0"
            stroke="#4788c7"
            strokeMiterlimit="10"
            d="M20,38.5c-0.8,0-1.6-0.1-2.5-0.2v-4c0.8,0.1,1.7,0.2,2.5,0.2c8,0,14.5-6.5,14.5-14.5c0-3.6-1.3-7-3.8-9.7	l-0.4-0.4l-2.9,2.9V4.5h8.3l-2.6,2.6l0.3,0.4c3.2,3.4,5,7.9,5,12.6C38.5,30.2,30.2,38.5,20,38.5z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default RefetchButton;
