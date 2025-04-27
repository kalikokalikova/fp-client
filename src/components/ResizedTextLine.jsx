import React, { useState, useEffect, useRef } from 'react';

export function ResizedTextLine({ text, containerWidth }) {
  const textRef = useRef(null);
  const [fontSize, setFontSize] = useState(16); // Initial font size

  useEffect(() => {
    if (!textRef.current || !containerWidth) {
      return;
    }

    const measureTextWidth = () => {
      const element = textRef.current;
      if (element) {
        const style = getComputedStyle(element);
        return parseFloat(style.width);
      }
      return 0;
    };

    let currentFontSize = 16;
    let textWidth = 0;
    const tolerance = 1; // Pixel tolerance for fitting

    // Initial measurement
    textRef.current.style.fontSize = `${currentFontSize}px`;
    textWidth = measureTextWidth();

    let attempts = 0;
    const maxAttempts = 100; // Prevent infinite loops

    while (Math.abs(textWidth - containerWidth) > tolerance && attempts < maxAttempts) {
      if (textWidth < containerWidth) {
        currentFontSize += 0.1; // Increment font size
      } else {
        currentFontSize -= 0.1; // Decrement font size
      }
      textRef.current.style.fontSize = `${currentFontSize}px`;
      textWidth = measureTextWidth();
      attempts++;
    }

    setFontSize(currentFontSize);

  }, [text, containerWidth]);

  return (
    <div ref={textRef} style={{ whiteSpace: 'nowrap', fontSize: `${fontSize}px` }}>
      {text}
    </div>
  );
}