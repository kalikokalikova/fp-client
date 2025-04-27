import React, { useState, useEffect, useRef } from 'react';

export function ResizedTextLine({ text, containerWidth }) {
  const textRef = useRef(null);
  const [fontSize, setFontSize] = useState(16);

  const measureTextWidth = (text, font) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = font;
    const metrics = context.measureText(text);
    return metrics.width;
  };

  useEffect(() => {
    if (!textRef.current || !containerWidth || !text) {
      return;
    }

    let currentFontSize = 16;
    const fontFamily = getComputedStyle(textRef.current).fontFamily;
    let textWidth = measureTextWidth(text, `${currentFontSize}px ${fontFamily}`);
    const tolerance = 1; // Reduced tolerance for a tighter fit
    const maxIterations = 500; // Increased max iterations
    let iterations = 0;
    const fontSizeIncrement = 0.3; // Increased font size increment

    console.log(`Initial width: ${textWidth}, target: ${containerWidth}`);

    while (Math.abs(textWidth - containerWidth) > tolerance && iterations < maxIterations && currentFontSize < containerWidth * 2) { // Added a max font size condition
      console.log(`Iteration ${iterations}, currentFontSize: ${currentFontSize}, textWidth: ${textWidth}`);
      if (textWidth < containerWidth) {
        currentFontSize += fontSizeIncrement;
      } else {
        currentFontSize -= fontSizeIncrement;
      }
      textWidth = measureTextWidth(text, `${currentFontSize}px ${fontFamily}`);
      iterations++;
    }

    setFontSize(currentFontSize);
    console.log(`Final fontSize: ${currentFontSize}, final width: ${textWidth}`);

  }, [text, containerWidth]);

  return (
    <div ref={textRef} style={{ whiteSpace: 'nowrap', fontSize: `${fontSize}px` }}>
      {text}
    </div>
  );
}