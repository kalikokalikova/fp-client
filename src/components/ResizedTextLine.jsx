import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Typography } from "@mui/material";

export function ResizedTextLine({
  text,
  containerWidth,
  initialFontSize = 16,
}) {
  const textRef = useRef(null);
  const [ kerningValue, setKerningValue ] = useState(0)

  useEffect(() => {
    setKerningValue(getKerningValue(text));
  }, [containerWidth])

  const measureTextWidth = (text, font) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.font = font;
    const metrics = context.measureText(text);
    return metrics.width;
  };

  const getKerningValue = (text) => {
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

    while (
      Math.abs(
        baseTextWidth +
          currentLetterSpacingPx * (characterCount - 1) -
          containerWidth
      ) > tolerance &&
      iterations < maxIterations &&
      currentLetterSpacingPx < containerWidth * 2
    ) {
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
    return currentLetterSpacingPx;
  };

  let words = text.split(" ");

  return (
    <Box
      sx={{
        textTransform: "uppercase",
        display: "flex",
        gridAutoFlow: "column",
        justifyContent: "space-between",
        width: "100%",
        letterSpacing: `${kerningValue}px`,
        fontFamily: "Anton, sans-serif",
        marginBottom: "5px",
      }}
    >
      {words.map((word, index) => (
        <span
          key={index}
          ref={index === 0 ? textRef : null} // Only ref the first word
          style={{
            whiteSpace: "nowrap",
            fontSize: `${initialFontSize}px`,
            letterSpacing: `${kerningValue}px`, // Apply here
          }}
        >
          {word}
        </span>
      ))}
    </Box>
  );

}
