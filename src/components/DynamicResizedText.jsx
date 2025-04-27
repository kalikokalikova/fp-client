import React, { useState, useEffect, useRef } from 'react';
import { ResizedTextLine } from './ResizedTextLine';

export function DynamicResizedText({ lines, containerWidth }) {
  return (
    <div style={{ width: containerWidth, border: '1px solid black' }}>
      {lines.map((line, index) => (
        <ResizedTextLine key={index} text={line} containerWidth={containerWidth} />
      ))}
    </div>
  );
}