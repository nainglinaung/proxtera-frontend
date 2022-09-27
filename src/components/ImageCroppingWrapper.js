import React, { useState,useEffect } from "react";
import {useFormContext} from 'react-hook-form';
import ImageCropper from "./ImageCropper";

function ImageCroppingWrapper({setfinalImage}) {
  const [imageToCrop, setImageToCrop] = useState(undefined);
  const [croppedImage, setCroppedImage] = useState(undefined);
  const {setValue} = useFormContext();
  const onUploadFile = (event) => {

    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        const image = reader.result;
        setImageToCrop(image);
      });

      reader.readAsDataURL(event.target.files[0]);
    }
  };


  const blobToBase64 = blob => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise(resolve => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
  };

  const SetCropImage = () => {
    setfinalImage(croppedImage)
  }

  

  return (
    <div className="ImageCroppingWrapper">
      <input type="file" accept="image/*" onChange={onUploadFile} />
      <div>
        <ImageCropper
          imageToCrop={imageToCrop}
          onImageCropped={(croppedImage) => setCroppedImage(croppedImage)}
        />
      </div>
      {croppedImage && (
        <div>
          <h2>Cropped Image</h2>
          <img alt="Cropped Img" src={croppedImage} />
          <br /><button onClick={() => SetCropImage()}>Choose</button>
        </div>
      )}
      
    </div>
  );
}

export default ImageCroppingWrapper;
