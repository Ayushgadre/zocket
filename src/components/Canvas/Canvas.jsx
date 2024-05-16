import React, { useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { drawRect, breakTextIntoLines } from '../../utils/constants.js';

function Canvas({ adInfo }) {
  // Refs for different canvas elements
  const canvasRef = useRef(null);
  const textcanvasRef = useRef(null);
  const ctacanvasRef = useRef(null);
  const { caption, urls, cta } = adInfo;

  // Function to draw the template images (background, mask, stroke)
  const drawTemplate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Function to draw an image on the canvas
    const drawImage = (src, callback) => {
      const image = new Image();
      image.onload = () => {
        callback(image);
      };
      image.src = src;
    };

    drawImage(urls.design_pattern, (image) => ctx.drawImage(image, 0, 0));
    drawImage(urls.mask, (image) => ctx.drawImage(image, 0, 0));
    drawImage(urls.stroke, (image) => ctx.drawImage(image, 0, 0));
  }, [urls]);

  // Function to draw the ad image inside the mask
  const drawAdImage = useCallback((imgUrl) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = 'source-atop';
    ctx.clearRect(56, 442, 970, 600);

    const image = new Image();
    image.onload = () => {
      ctx.drawImage(image, 56, 440, 970, 600);
    };
    image.src = imgUrl || adInfo.adImage;
    ctx.globalCompositeOperation = 'source-over';
  }, [adInfo.adImage]);

  // Function to write the caption text on the canvas
  const writeTextContent = useCallback((text) => {
    const canvas = textcanvasRef.current;
    const ctx = canvas.getContext('2d');
    const { width, height } = adInfo.image_mask;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '46px Sans-serif';

    const textToWrite = text || caption.text;
    const lines = breakTextIntoLines(textToWrite, 31, 100);

    let startY = 100;
    lines.forEach((line) => {
      ctx.fillText(line, 120, startY);
      startY += 50;
    });
  }, [adInfo.image_mask, caption.text]);

  // Function to write the CTA text on the canvas
  const writeCTA = useCallback((text) => {
    const canvas = ctacanvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const backgroundColor = '#000000';
    const textToWrite = text || "Shop Now";

    const lines = breakTextIntoLines(textToWrite, 20, 15);

    ctx.font = '30px Sans-serif';
    const textWidth = ctx.measureText(lines[0]).width;
    const textHeight = lines.length * 30;

    const boxWidth = textWidth + 48;
    const boxHeight = textHeight + 48;

    drawRect(100, 320, boxWidth, boxHeight, 20, backgroundColor, ctx);

    let startY = 320 + (boxHeight / 2 + 8);
    const startX = 100 + 24;
    ctx.fillStyle = '#ffffff';

    lines.forEach((line) => {
      ctx.fillText(line, startX, startY);
      startY += 30;
    });
  }, []);

  // Draw the template when the component mounts
  useEffect(() => {
    drawTemplate();
  }, [drawTemplate]);

  // Update the canvas elements when the adInfo changes
  useEffect(() => {
    if (caption.text !== undefined) {
      writeTextContent(adInfo.caption.text);
    }
    if (adInfo.adImage !== undefined) {
      drawAdImage(adInfo.adImage);
    }
    if (cta.text !== undefined) {
      writeCTA(adInfo.cta.text);
    }
  }, [adInfo, caption.text, cta.text, drawAdImage, writeTextContent, writeCTA]);

  return (
    <>
      <canvas
        className='w-56 sm:w-[30rem]'
        ref={canvasRef}
        width={1080}
        height={1080}
        style={{ backgroundColor: `${adInfo.cta.background_color}`, position: 'absolute' }}
      ></canvas>
      <canvas
        className='w-56 sm:w-[30rem]'
        ref={textcanvasRef}
        width={1080}
        height={1080}
        style={{ position: 'absolute' }}
      ></canvas>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <canvas
          className='w-56 sm:w-[30rem]'
          ref={ctacanvasRef}
          width={1080}
          height={1080}
          style={{ position: 'absolute' }}
        ></canvas>
      </div>
    </>
  );
}

Canvas.propTypes = {
  adInfo: PropTypes.shape({
    caption: PropTypes.shape({
      text: PropTypes.string,
    }),
    cta: PropTypes.shape({
      text: PropTypes.string,
      background_color: PropTypes.string,
    }),
    image_mask: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
      width: PropTypes.number,
      height: PropTypes.number,
    }),
    urls: PropTypes.shape({
      mask: PropTypes.string,
      stroke: PropTypes.string,
      design_pattern: PropTypes.string,
    }),
    adImage: PropTypes.string,
  }).isRequired,
};

export default Canvas;
