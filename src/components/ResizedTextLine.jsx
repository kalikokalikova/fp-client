import React, { useState, useEffect, useRef } from "react";

export function ResizedTextLine({
  text,
  containerWidth,
  initialFontSize = 16,
}) {
  const textRef = useRef(null);
  const [letterSpacingPx, setLetterSpacingPx] = useState(0);

  const measureTextWidth = (text, font) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
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
    const baseTextWidth = measureTextWidth(text, initialFont);
    let currentLetterSpacingPx = 0;
    const tolerance = 0.1;
    const maxIterations = 500;
    let iterations = 0;
    const letterSpacingIncrementPx = 0.5;
    const characterCount = text.length;

    console.log(
      `Initial width (no spacing): ${baseTextWidth}, target: ${containerWidth}, initialFontSize: ${initialFontSize}, characterCount: ${characterCount}`
    );

    while (
      Math.abs(
        baseTextWidth +
          currentLetterSpacingPx * (characterCount - 1) -
          containerWidth
      ) > tolerance &&
      iterations < maxIterations &&
      currentLetterSpacingPx < containerWidth * 2
    ) {
      console.log(
        `Iteration ${iterations}, currentLetterSpacingPx: ${currentLetterSpacingPx}, estimated width: ${
          baseTextWidth + currentLetterSpacingPx * (characterCount - 1)
        }`
      );
      if (
        baseTextWidth + currentLetterSpacingPx * (characterCount - 1) <
        containerWidth
      ) {
        currentLetterSpacingPx += letterSpacingIncrementPx;
      } else {
        currentLetterSpacingPx -= letterSpacingIncrementPx;
      }
      iterations++;
    }

    setLetterSpacingPx(currentLetterSpacingPx);
    console.log(
      `Final letterSpacingPx: ${currentLetterSpacingPx}, estimated final width: ${
        baseTextWidth + currentLetterSpacingPx * (characterCount - 1)
      }`
    );
  }, [text, containerWidth, initialFontSize]);

  return (
    <div
      ref={textRef}
      style={{
        whiteSpace: "nowrap",
        fontSize: `${initialFontSize}px`,
        letterSpacing: `${letterSpacingPx}px`,
      }}
    >
      {text}
    </div>
  );
}
