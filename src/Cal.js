
import React from 'react';

const calculateDPI = (pixelWidth, pixelHeight, physicalWidth, physicalHeight) => {
  const dpiWidth = pixelWidth / physicalWidth;
  const dpiHeight = pixelHeight / physicalHeight;
  return { dpiWidth, dpiHeight };
};

const Cal = ({ pixelWidth, pixelHeight, physicalWidth, physicalHeight }) => {
  const { dpiWidth, dpiHeight } = calculateDPI(pixelWidth, pixelHeight, physicalWidth, physicalHeight);

  return (
    <div>
      <p>Image dimensions: {pixelWidth}px x {pixelHeight}px</p>
      <p>Physical dimensions: {physicalWidth} inches x {physicalHeight} inches</p>
      <p>DPI (width): {dpiWidth}</p>
      <p>DPI (height): {dpiHeight}</p>
      <p>DPI (height*width): {dpiHeight*dpiWidth}</p>

    </div>
  );
};
export default Cal;


