import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useImageSize } from "react-image-size";
import mergeImages from "merge-images";
import Resizer from "react-image-file-resizer";

const Fabric = () => {
  const [mergedImage, setMergedImage] = useState(null);
  const [mergedImage1, setMergedImage1] = useState(null);
  const [mergedImage2, setMergedImage2] = useState(null);
  const [mergedImage3, setMergedImage3] = useState(null);
  const [mergedImage4, setMergedImage4] = useState(null);
  const [imageFile, setImagefile] = useState(null);
  const [resizeImage, setResizeImage] = useState("");

  const location = useLocation();
  const { state } = location;
  let imageValue = state?.imageValue;
  const [scale, setScale] = useState(100);
  const [backsize, setbacksize] = useState(100);
  const [Design, setDesign] = useState(
    imageValue ||
      "" 
  );
  const [rotates, setRotate] = useState(0);
  const [noRepeat, setRepeat] = useState(false);
  let [dimensions, { loading, error }] = useImageSize(Design);



  // console.log(dimensions);

  // const scaledBacksize = backsize * (scale / 100);
  // const inches = scaledBacksize / 96; // Convert background size in pixels to inches
  // const dpiCalculation = dimensions
  //   ? (dimensions.width / inches).toFixed(0)
  //   : 0;

  // const handleScaleChange = (event) => {
  //   const newScale = Number(event.target.value);
  //   setScale(newScale);
  //   const newBacksize = 128 * (newScale / 100); // Adjust the backsize based on scale
  //   setbacksize(newBacksize);
  // };

  useEffect(() => {
    if (dimensions && backsize !== 0) {
      const pixels = Number(dimensions.width) * (Number(backsize) / 100);
      const inches = pixels / 96;
      const formattedInches = inches.toFixed(1);
      const dpiCalculation = Math.floor(dimensions.width / formattedInches); // Round down to whole integer for DPI

      // Update the state with the calculated DPI
      setDpiCalculation(dpiCalculation);
    } else {
      setDpiCalculation(0); // Set DPI to 0 if calculations cannot be performed
    }
  }, [backsize]);

  const [dpiCalculation, setDpiCalculation] = useState(0); // State for calculated DPI

  const handleScaleChange = (event) => {
    setScale(event.target.value);
    setbacksize(Number(event.target.value));
  };
  const resizeFile = (file) =>
    new Promise((resolve, reject) => {
      if (!file) {
        reject(new Error("No file provided"));
        return;
      }

      Resizer.imageFileResizer(
        file,
        400,
        400,

        "PNG",
        100, // quality
        0, // rotation
        (uri) => {
          resolve(uri);
        },
        "base64",
        400,
        400
      );
    });





    // converter


// const admin = require('firebase-admin');
// const fs = require('fs');

// // Initialize Firebase Admin SDK
// const serviceAccount = require('./path-to-your-service-account-key.json'); // Replace with your service account key path

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   storageBucket: 'your-firebase-storage-bucket-url', // Replace with your Firebase Storage bucket URL
// });

// const bucket = admin.storage().bucket();
// const filePath = 'images/my-image.jpg'; // Replace with your image file path in Firebase Storage
// const tempFilePath = '/path/to/local/temp/file.jpg'; // Replace with your local temporary file path

// (async () => {
//   try {
//     // Get the file from Firebase Storage
//     const file = bucket.file(filePath);

//     // Download the file to a local temporary file
//     await file.download({ destination: tempFilePath });

//     // Read the file as a buffer
//     const buffer = fs.readFileSync(tempFilePath);

//     // Convert buffer to Base64 string
//     const base64String = buffer.toString('base64');

//     // Optionally, you can prepend the appropriate data URL prefix for image types
//     const dataUrl = `data:image/jpeg;base64,${base64String}`;

//     console.log('Base64 encoded image:', dataUrl);
//   } catch (error) {
//     console.error('Error converting image to Base64:', error);
//   } finally {
//     // Cleanup: Delete the temporary local file
//     if (fs.existsSync(tempFilePath)) {
//       fs.unlinkSync(tempFilePath);
//     }
//   }
// })();







  const handleDesignChange = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) {
        console.error("No file selected");
        return;
      }

      const image = await resizeFile(file);
      console.log(image);
      setImagefile(image);
      setDesign(image); // It seems you're setting the image twice, is this intentional?
    } catch (error) {
      console.error("Error resizing the file:", error);
    }

    // const file = e.target.files[0];
    // Resizer.imageFileResizer(
    //   file,
    //   400, // Desired width
    //   400, // Desired height
    //   "PNG", // Output format (JPEG, PNG, WEBP)
    //   100, // Quality (0 to 100)
    //   0, // Rotation
    //   (uri) => {
    //     console.log(uri, "bfjhjk");
    //     setImagefile(uri);

    //     setDesign(uri); // Set the resized image URI as the design
    //   },
    //   "base64",
    //   400,400
    // );

    //   const resizeFile = () => new Promise(resolve => {
    //     Resizer.imageFileResizer(e.target.files[0], 400, 400, 'JPEG', 100, 0,
    //     uri => {
    //       resolve(uri);
    //     }, 'base64',400,400 );
    // });

    //   const file = e.target.files[0];
    //   const image = await resizeFile(file);
    //   console.log(image);
    //   setImagefile(image)
    //   setImagefile(image)

    // const image = await resizeFile();
    // console.log(image,'hhhhhhhhhhhhhh');

    //   if (!file) return;

    //   const reader = new FileReader();
    //   reader.onload = (event) => {
    //     setDesign(event.target.result);
    //   };
    //   reader.readAsDataURL(file);
  };
  let handleRotateImage = (e) => {
    setRotate((prevRotate) => prevRotate + 90);
  };

  const handlePattern = async () => {
    // console.log(Design, "Design");
    // console.log(imageValue, "imageValue");

    mergeImages(
      [
        { src: Design, x: 0, y: 0 },
        { src: Design, x: dimensions.width, y: 0 },
        { src: Design, x: 0, y: dimensions.width },
        { src: Design, x: dimensions.width, y: dimensions.width },
      ],
      {
        width: dimensions.width * 2,
        height: dimensions.width * 2,
      }
    )
      .then((b64) => {
        setMergedImage(b64);
        setMergedImage1("");
        setMergedImage2("");
        setMergedImage3("");
        setMergedImage4("");
        setRepeat("");
      })
      .catch((error) => {
        console.error("Error merging images:", error);
      });
  };

  const handlePattern4 = async () => {
    setMergedImage4(Design);

    setMergedImage("");
    setMergedImage1("");
    setMergedImage2("");
    setMergedImage3("");
    setRepeat(true);
  };

  // Function to create a mirrored image URL
  const mirrorImage = async (imageSrc) => {
    const image = new Image();
    image.src = imageSrc;
    await new Promise((resolve) => {
      image.onload = resolve;
    });

    const maxWidth = 800; // Set maximum width as needed
    const maxHeight = 600; // Set maximum height as needed

    let width = image.width;
    let height = image.height;

    // Resize image if it exceeds maxWidth or maxHeight
    if (width > maxWidth || height > maxHeight) {
      const ratio = Math.min(maxWidth / width, maxHeight / height);
      width *= ratio;
      height *= ratio;
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = width;
    canvas.height = height;

    ctx.translate(width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(image, 0, 0, width, height);

    const url = canvas.toDataURL();

    return url;
  };

  // Function to rotate an image by 180 degrees and return the URL
  const rotateImage = async (imageSrc) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const image = new Image();
    image.src = imageSrc;
    await new Promise((resolve) => {
      image.onload = resolve;
    });

    canvas.width = image.width;
    canvas.height = image.height;

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(Math.PI); // Rotate 180 degrees
    ctx.drawImage(image, -canvas.width / 2, -canvas.height / 2);
    ctx.rotate(-Math.PI); // Reset rotation
    ctx.translate(-canvas.width / 2, -canvas.height / 2);

    return canvas.toDataURL();
  };

  const handlePattern1 = async () => {
    try {
      if (dimensions.width < 400 && dimensions.height < 400) {
        dimensions.width = 400;
        dimensions.height = 400;
      }
      const mirroredImageURL = await mirrorImage(Design);
      const rotatedMirroredImageURL = await rotateImage(mirroredImageURL);
      const rotatedMirroredImageURLMirror = await mirrorImage(
        rotatedMirroredImageURL
      );

      mergeImages(
        [
          { src: Design, x: 0, y: 0 },
          { src: rotatedMirroredImageURL, x: 0, y: dimensions.width },
          {
            src: rotatedMirroredImageURLMirror,
            x: dimensions.width,
            y: dimensions.width,
          },
          { src: mirroredImageURL, x: dimensions.width, y: 0 },
        ],

        {
          width: dimensions.width * 2,
          height: dimensions.height * 2,
        }
      )
        .then((b64) => {
          setMergedImage1(b64);
          setMergedImage("");
          setMergedImage2("");
          setMergedImage3("");
          setMergedImage4("");
          setRepeat("");
        })
        .catch((error) => {
          console.error("Error merging images:", error);
        });
    } catch (error) {
      console.error("Error processing images:", error);
    }
  };

  const handlePattern2 = async () => {
    mergeImages(
      [
        { src: Design, x: 0, y: 0 },
        { src: Design, x: dimensions.width, y: 0 },
        { src: Design, x: -dimensions.width / 2, y: dimensions.width },
        { src: Design, x: dimensions.width / 2, y: dimensions.width },
        { src: Design, x: dimensions.width * 1.5, y: dimensions.width },
      ],
      {
        width: dimensions.width * 2,
        height: dimensions.width * 2,
      }
    )
      .then((b64) => {
        setMergedImage2(b64);
        setMergedImage1("");
        setMergedImage("");
        setMergedImage3("");
        setMergedImage4("");
        setRepeat("");
      })
      .catch((error) => {
        console.error("Error merging images:", error);
      });
  };
  const handlePattern3 = async () => {
    mergeImages(
      [
        { src: Design||imageValue, x: 0, y: 0 },
        { src: Design||imageValue, x: dimensions.width, y: -dimensions.width / 2 },
        { src: Design||imageValue, x: 0, y: dimensions.width },
        { src: Design||imageValue, x: dimensions.width, y: dimensions.width / 2 },
        { src: Design||imageValue, x: dimensions.width, y: dimensions.width * 1.5 },
        // { src: Design, x: 0, y: 0 },
        // { src: Design, x: dimensions.width, y: 0 },
        // { src: Design, x: dimensions.width , y: dimensions.width },
        // { src: Design, x: dimensions.width / 2, y: dimensions.width },
        // { src: Design, x: dimensions.width * 1.5, y: dimensions.width },
      ],
      {
        width: dimensions.width * 2,
        height: dimensions.width * 2,
      }
    )
      .then((b64) => {
        setMergedImage3(b64);
        setMergedImage1("");
        setMergedImage2("");
        setMergedImage("");
        setMergedImage4("");
        setRepeat("");
      })
      .catch((error) => {
        console.error("Error merging images:", error);
      });
  };

  // document.addEventListener("DOMContentLoaded", (event) => {
  //   const sliderThumb = document.getElementById("sliderThumb");
  //   const sliderProgress = document.getElementById("sliderProgress");
  //   const sliderContainer = document.querySelector(".slider-container");

  //   sliderThumb.addEventListener("mousedown", (e) => {
  //     const onMouseMove = (e) => {
  //       const rect = sliderContainer.getBoundingClientRect();
  //       let newLeft = e.clientX - rect.left;
  //       if (newLeft < 0) newLeft = 0;
  //       if (newLeft > rect.width) newLeft = rect.width;
  //       sliderThumb.style.left = newLeft + "px";
  //       sliderProgress.style.width = newLeft + "px";
  //     };

  //     document.addEventListener("mousemove", onMouseMove);

  //     document.addEventListener(
  //       "mouseup",
  //       () => {
  //         document.removeEventListener("mousemove", onMouseMove);
  //       },
  //       { once: true }
  //     );
  //   });
  // });

  return (
    <div className="container">
      <div className="row w-100 justify-content-between">
        <div
          className="col-6 mt-3
        "
        >
          <div className="ruler-wrapper">
            <div className="rule">
              <div className="ruler ruler-x">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="ruler-mark">
                    {i * 10}
                  </div>
                ))}
              </div>
              <div className="ruler ruler-y">
                {[...Array(11)].map((_, i) => (
                  <div key={i} className="ruler-mark">
                    {i * 10}
                  </div>
                ))}
              </div>
            </div>

            <div className="image-pattern">
              <div className="image-wrapper">
                <div
                  className="pattern-image"
                  style={{
                    // transform: `scale(${scale / 100})`,
                    backgroundImage: `url(${
                      mergedImage ||
                      mergedImage1 ||
                      mergedImage2 ||
                      mergedImage3 ||
                      mergedImage4 ||
                      
                      Design
                    })`,

                    backgroundSize: `${backsize}px ${backsize}px`,
                    transform: `rotate(${rotates}deg)`,
                    backgroundRepeat: noRepeat ? "no-repeat" : "repeat",
                    backgroundPositionX: noRepeat ? "center" : "0",
                  }}
                />
                {/* <div className="chat-bubble">Let's talk to TIM!</div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="col-5 details mt-5">
          <div className="design-info">
            <div>
              <h1 className="fs-3 design-heading">FABRIC BY METER</h1>
            </div>
            <p className="mb-1">
              <b>By:</b> <span className="twinkle ">Twinkle Surana</span>
            </p>
            <p>
              <b>Design:</b>{" "}
              <span className="text-secondary">Water colour Animal Print</span>
            </p>
          </div>
          <div className="buttons d-flex">
            <div className="upload-button">
              <i class="fa-solid fa-upload text-white pe-2"></i>

              <label htmlFor="upload_file" className="fw-bold">
                Upload design
              </label>
              <input
                type="file"
                id="upload_file"
                hidden
                onChange={handleDesignChange}
              />
            </div>
            <div className="select-buttons">
              <Link className="select-button-cover">
                <i className="fa-solid fa-hand text-white pe-2"></i>
                <NavLink to="/design" className="text-white">
                  Select Design
                </NavLink>
              </Link>
            </div>
          </div>
          <div className="resolution d-flex">
            <div
              className="pattern-show"
              style={{
                backgroundImage: `url(${Design})`,
                backgroundSize: `${backsize}px ${backsize}px`,
              }}
            ></div>
            <div className="dpi-cal">
              <p className="dpi-para mb-0">
                <strong>
                  {dpiCalculation}
                  DPI
                </strong>
              </p>
              <p className="print-file mb-0">Print File Resolution</p>
            </div>
          </div>

          <div className="print-size pt-3">
            <p className="fs-5">
              <strong>PRINT SIZE</strong>
            </p>
            <p className="image-scale">Image Scale</p>
            <div className="scale-wrapper">
              <input
                type="range"
                min="0"
                max="100"
                value={scale}
                className="scale-slider custom-range"
                id="customRange1"
                onChange={handleScaleChange}
              />
              {/* <input type="range" class="custom-range" ></input> */}

              {/* <div class="slider-container">
                <div class="slider-track"></div>
                <div class="slider-progress" id="sliderProgress"></div>
                <div class="slider-thumb" id="sliderThumb"></div>
              </div> */}
              <div className="scale-labels">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
          </div>

          <div className="pattrens pt-3">
            <div>
              <h5 className="fs-5 fw-bold">ARRANGEMENT</h5>
            </div>
            <div className="d-flex">
              <div className="design-patters">
                <a onClick={handlePattern}>
                  <img src="./images/pattren-5.png" alt="" />
                </a>
              </div>
              <div className="design-patters">
                <a onClick={handlePattern1}>
                  <img src="./images/pattren-2.png" alt="" />
                </a>
              </div>
              <div className="design-patters">
                <a onClick={handlePattern2}>
                  <img src="./images/pattren-4.png" alt="" />
                </a>
              </div>
              <div className="design-patters">
                <a onClick={handlePattern3}>
                  <img src="./images/pattren-3.png" alt="" />
                </a>
              </div>
              <div className="design-patters">
                <a onClick={handlePattern4}>
                  <img src="./images/pattren-1.png" alt="" />
                </a>
              </div>
              <div className="rotate-image d-flex align-items-center justify-content-center flex-column p-2 bg-secondary text-white">
                <i class="fa-solid fa-rotate-right"></i>
                <span onClick={handleRotateImage}>Rotate</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fabric;
