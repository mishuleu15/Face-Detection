import React from "react";
import "./FaceDetect.css"
//Pass imageUrl to FaceDetect component

const FaceDetect = ({ imageUrl, box }) => {
    return (
        // This div is the container that is holding our fetch image and the face detect box
    <div className="center ma">
      <div className="absolute mt2">
         {/*insert an id to be able to manipulate the image in the DOM*/} 
        <img id="inputimage" alt="" src={imageUrl} width="500px" height="auto" />
        {/* this is the div displaying the box visible base on the return value */}
        <div 
            className="bounding-box"
            style={{
                top: box.topRow,
                right: box.rightCol,
                bottom: box.bottomRow,
                left: box.leftCol,
            }}
        ></div>
      </div>
    </div>
  );
};

export default FaceDetect;