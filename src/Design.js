import React, { useEffect, useState } from "react";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { imagedb } from "./config/Firebase.config.js";
import { useNavigate } from "react-router-dom";
// import { downloadImageFromFirebase } from "./path-to-your-firebase-script";
import axios from "axios";
const Design = () => {
  //   const [img, setImg] = useState(null);
  const [imgUrl, setimgUrl] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    listAll(ref(imagedb, "files")).then((imgs) => {
      console.log(imgs, "hjjh");
      const urlPromises = imgs.items.map((val) =>
        getDownloadURL(val).then((url) => url)
      );
      Promise.all(urlPromises).then((urls) => {
        setimgUrl(urls);
      });
    });
  }, []);

  const fetchBase64FromUrl = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          let base64data = reader.result;
          resolve(base64data);
        };
        reader.onerror = (error) => {
          console.error("FileReader error:", error);
          reject(error);
        };
      });
    } catch (error) {
      console.error("error fetchinh image", error);
      return null;
    }
  };

  const handleImageClick = async (dataVal) => {
    try {
      const base64data = await fetchBase64FromUrl(dataVal);
      if (base64data) {
        navigate("/", { state: { imageValue: base64data } });
      } else {
        console.error("Failed to fetch base64 image.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="container-fluid whole-design">
        <div className="row">
          <div className="col-12 heading-design d-flex justify-content-center align-items-center">
            <h1 className="heading-dgn">Design</h1>
          </div>
          <div className="col-12">
            {imgUrl.map((dataVal, index) => (
              <div key={index}>
                <img
                  onClick={() => handleImageClick(dataVal)}
                  src={dataVal}
                  alt={`uploaded-img-${index}`}
                  height="200px"
                  width="300px"
                  margin="20px"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Design;

// import React, { useEffect, useState } from "react";
// import { getDownloadURL, listAll, ref } from "firebase/storage";
// import { imagedb } from "./config/Firebase.config.js";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Design = () => {
//   const [imgUrl, setimgUrl] = useState([]);
//   let navigate = useNavigate();

//   useEffect(() => {
//     listAll(ref(imagedb, "files")).then((imgs) => {
//       const urlPromises = imgs.items.map((val) =>

//         getDownloadURL(val).then((url) => url)

//       );
//       Promise.all(urlPromises).then((urls) => {
//         setimgUrl(urls);
//       });
//     });
//   }, []);

//   const fetchBase64FromUrl = async (url) => {
//     try {
//       const response = await axios.get(url, {
//         responseType: "blob",
//       });
//       const blob = response.data;
//       return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(blob);
//         reader.onloadend = () => {
//           let base64data = reader.result;
//           resolve(base64data);
//         };
//         reader.onerror = reject;
//       });
//     } catch (error) {
//       console.error("Error fetching image:", error);
//       return null;
//     }
//   };

//   const handleImageClick = async (dataVal) => {
//     try {
//       const base64Image = await fetchBase64FromUrl(dataVal);
//       if (base64Image) {
//         navigate("/", { state: { imageValue: base64Image } });
//       } else {
//         console.error("Failed to fetch base64 image.");
//       }
//     } catch (error) {
//       console.error("Error converting image to base64:", error);
//     }
//   };

//   return (
//     <>
//       <div className="container-fluid whole-design">
//         <div className="row">
//           <div className="col-12 heading-design d-flex justify-content-center align-items-center">
//             <h1 className="heading-dgn">Design</h1>
//           </div>
//           <div className="col-12">
//             {imgUrl.map((dataVal, index) => (
//               <div key={index}>
//                 <img
//                   onClick={() => handleImageClick(dataVal)}
//                   src={dataVal}
//                   alt={`uploaded-img-${index}`}
//                   height="200px"
//                   width="300px"
//                   margin="20px"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Design;
