import React, { useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import {useFormContext} from 'react-hook-form';

function ImageCropper(props) {
  const { imageToCrop, onImageCropped } = props;
  const {setValue} = useFormContext();
  const [cropConfig, setCropConfig] = useState(
    // default crop config
    {
      unit: "%",
      width: 30,
      aspect: 16 / 9
    }
  );

  const [imageRef, setImageRef] = useState();
 
  const onLoad = () => {
    setImageRef(imageToCrop)
  }

  async function cropImage(crop) {
    if (imageRef && crop.width && crop.height) {
      const croppedImage = await getCroppedImage(
        imageRef,
        crop,
        "croppedImage.jpeg" // destination filename
      );
      // props.setfinalImage(imageRef)
      // calling the props function to expose
      // croppedImage to the parent component
      onImageCropped(croppedImage);
    } 
  }

  function getCroppedImage(sourceImage, cropConfig, fileName) {
    // creating the cropped image from the source image

    var image = new Image();
    image.src = sourceImage;
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = cropConfig.width;
    canvas.height = cropConfig.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(
      image,
      cropConfig.x * scaleX,
      cropConfig.y * scaleY,
      cropConfig.width * scaleX,
      cropConfig.height * scaleY,
      0,
      0,
      cropConfig.width,
      cropConfig.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        // returning an error
        if (!blob) {
          reject(new Error("Canvas is empty"));
          return;
        }

        blob.name = fileName;
        // creating a Object URL representing the Blob object given
        const croppedImageUrl = window.URL.createObjectURL(blob);

        resolve(croppedImageUrl);
      }, "image/jpeg");
    });
  }

  return (
    // setImageRef(imageRef)
    <ReactCrop
      src={imageToCrop}
      crop={cropConfig}
      ruleOfThirds
      onImageLoaded={(imageRef) =>  setImageRef(imageRef)}
      onComplete={(cropConfig) =>  cropImage(cropConfig)}
      onChange={(cropConfig) => setCropConfig(cropConfig)}
      crossorigin="anonymous" // to avoid CORS-related problems
    >
        <img src={imageToCrop} onLoad={onLoad} />
    
        </ReactCrop>
  );
}

ImageCropper.defaultProps = {
  onImageCropped: () => {}
};

export default ImageCropper;
