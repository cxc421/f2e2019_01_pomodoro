import React, { useRef, useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import FontFaceObserver from 'fontfaceobserver';
import { resizeCanvasWrapper } from '../helpers/hoc';
import { strPad2 } from '../helpers/time';

interface Point {
  text: string;
  value: number;
  hightlight: boolean;
}

interface LineChartProps {
  pointList: Point[];
}

const Canvas = styled.canvas`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  display: block;
`;

const LineChart: React.FC<LineChartProps> = ({ pointList }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  function drawHoriLabel(
    ctx: CanvasRenderingContext2D,
    viewWidth: number,
    viewHeight: number,
    distance: number
  ) {
    ctx.strokeStyle = 'gray';
    ctx.lineWidth = 2;
    const yPos = viewHeight - distance;

    ctx.beginPath();
    ctx.moveTo(0, yPos);
    ctx.lineTo(viewWidth, yPos);
    ctx.stroke();

    const sectionLen = viewWidth / (pointList.length + 1);
    const textYPos = viewHeight - 5;
    ctx.textAlign = 'center';
    pointList.forEach((point, i) => {
      const xPos = sectionLen * (i + 1);
      ctx.beginPath();
      ctx.moveTo(xPos, yPos - 5);
      ctx.lineTo(xPos, yPos + 5);
      ctx.stroke();

      if (point.hightlight) {
        ctx.font = 'bold 15px "Taipei Sans TC Beta"';
        ctx.fillStyle = 'blue';
      } else {
        ctx.font = '15px "Taipei Sans TC Beta"';
        ctx.fillStyle = 'black';
      }

      ctx.fillText(point.text, xPos, textYPos);
    });
  }

  function drawLineAndPoints(
    ctx: CanvasRenderingContext2D,
    viewWidth: number,
    viewHeight: number,
    distance: number
  ) {
    const yPadding = 30;
    const yPosMax = viewHeight - distance - yPadding;
    const yPosMin = yPadding;
    const maxValue = Math.max.apply(null, pointList.map(point => point.value));
    const yValueMin = 1;
    const yValueMax = maxValue > yValueMin ? maxValue : yValueMin + 1;
    const ySection = (yPosMax - yPosMin) / (yValueMax - yValueMin);
    const xSection = viewWidth / (pointList.length + 1);

    const drawPoints: { xPos: number; yPos: number; value: number }[] = [];
    ctx.beginPath();
    pointList.forEach((point, index) => {
      if (point.value >= yValueMin) {
        const xPos = xSection * (index + 1);
        const yPos = yPosMax - (point.value - yValueMin) * ySection;
        if (index === 0) {
          ctx.moveTo(xPos, yPos);
        } else {
          ctx.lineTo(xPos, yPos);
        }
        drawPoints.push({ xPos, yPos, value: point.value });
      }
    });
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#f44336';
    ctx.stroke();

    const radius = 13;
    ctx.font = '15px "Taipei Sans TC Beta"';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    drawPoints.forEach(({ xPos, yPos, value }) => {
      ctx.beginPath();
      ctx.arc(xPos, yPos, radius, 0, 2 * Math.PI);
      ctx.fillStyle = '#f44336';
      ctx.fill();
      ctx.beginPath();
      ctx.fillStyle = 'white';
      ctx.font = 'normal 15px "Taipei Sans TC Beta"';
      ctx.fillText(strPad2(value), xPos, yPos);
      // console.log(yPos);
    });
  }

  function useFontLoad(
    fontName: string,
    fontOption: FontFaceObserver.FontVariant,
    draw: () => void
  ) {
    const [done, setDone] = useState(false);

    const checkFont = useCallback(() => {
      if (done) return;

      var font = new FontFaceObserver(fontName, fontOption);

      font.load(null, 6000).then(
        function() {
          console.log('Font Family has loaded');
          draw();
          setDone(true);
        },
        function() {
          console.log('Font Family has loaded FAILED?');
        }
      );
    }, [fontName, fontOption, draw, done]);

    useEffect(checkFont, [done]);
  }

  function draw() {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = (canvas.width = canvas.clientWidth);
    // const height = (canvas.height = canvas.clientHeight);
    const height = (canvas.height = Math.round((360 * width) / 700));

    // ctx.fillStyle = 'yellow';
    // ctx.fillRect(0, 0, width, height);
    ctx.clearRect(0, 0, width, height);

    const padding = 10;
    const horiLineToBottomDistance = 30;
    const viewWidth = width - padding * 2;
    const viewHeight = height - padding * 2;

    ctx.save();

    ctx.translate(padding, padding);
    // ctx.fillStyle = 'whitesmoke';
    // ctx.fillRect(0, 0, viewWidth, viewHeight);
    drawHoriLabel(ctx, viewWidth, viewHeight, horiLineToBottomDistance);
    drawLineAndPoints(ctx, viewWidth, viewHeight, horiLineToBottomDistance);

    ctx.restore();
  }

  useEffect(draw);
  useFontLoad('Taipei Sans TC Beta', { weight: 400 }, draw);
  useFontLoad('Taipei Sans TC Beta', { weight: 700 }, draw);

  return <Canvas ref={canvasRef} />;
};

export default resizeCanvasWrapper<LineChartProps>(LineChart);
