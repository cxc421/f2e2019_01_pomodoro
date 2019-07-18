import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { resizeCanvasWrapper } from '../helpers/hoc';

interface LineChartProps {}

const Canvas = styled.canvas`
  width: 100%;
  height: 400px;
`;

const LineChart: React.FC<LineChartProps> = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = (canvas.width = canvas.clientWidth);
    const height = (canvas.height = canvas.clientHeight);

    ctx.fillStyle = 'yellow';
    ctx.fillRect(0, 0, width, height);
  };

  useEffect(draw);

  return <Canvas ref={canvasRef} />;
};

export default resizeCanvasWrapper<LineChartProps>(LineChart);
