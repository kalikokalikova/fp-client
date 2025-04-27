import React, { useState, useEffect, useRef } from 'react';

export function ResizedTextLine({ text, containerWidth, initialFontSize = 16 }) {
  const textRef = useRef(null);
  const [letterSpacing, setLetterSpacing] = useState(0);

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

    const fontFamily = getComputedStyle(textRef.current).fontFamily;
    const initialFont = `${initialFontSize}px ${fontFamily}`;
    let currentLetterSpacing = 0;
    const tolerance = 0.5;
    const maxIterations = 500;
    let iterations = 0;
    const letterSpacingIncrement = 0.05; // Adjust for finer control

    console.log(`Initial width (no spacing): ${measureTextWidth(text, initialFont)}, target: ${containerWidth}, initialFontSize: ${initialFontSize}`);

    while (Math.abs(measureTextWidth(text, `${initialFontSize}px ${fontFamily}`) + currentLetterSpacing * initialFontSize * text.length - containerWidth) > tolerance && iterations < maxIterations && currentLetterSpacing < containerWidth * 2) {
      console.log(`Iteration ${iterations}, currentLetterSpacing: ${currentLetterSpacing}, estimated width: ${measureTextWidth(text, `${initialFontSize}px ${fontFamily}`) + currentLetterSpacing * initialFontSize * text.length}`);
      if (measureTextWidth(text, `${initialFontSize}px ${fontFamily}`) + currentLetterSpacing * initialFontSize * text.length < containerWidth) {
        currentLetterSpacing += letterSpacingIncrement;
      } else {
        currentLetterSpacing -= letterSpacingIncrement;
      }
      iterations++;
    }

    setLetterSpacing(currentLetterSpacing);
    console.log(`Final letterSpacing: ${currentLetterSpacing}, estimated final width: ${measureTextWidth(text, `${initialFontSize}px ${fontFamily}`) + currentLetterSpacing * initialFontSize * text.length}`);

  }, [text, containerWidth, initialFontSize]);

  return (
    <div
      ref={textRef}
      style={{
        whiteSpace: 'nowrap',
        fontSize: `${initialFontSize}px`,
        letterSpacing: `${letterSpacing}em`,
      }}
    >
      {text}
    </div>
  );
}