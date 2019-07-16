import React, { useEffect, useRef } from 'react';

interface RingProps {
  percent: number;
  size: number;
  style?: React.CSSProperties;
  ringWidth?: number;
  color?: string;
}

const Ring: React.FC<RingProps> = ({
  percent,
  style,
  size,
  ringWidth = 10,
  color = 'black'
}) => {
  const ref = useRef<HTMLCanvasElement>(null);

  function draw() {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const r = size / 2 - ringWidth / 2;
    if (r <= 0) return;

    canvas.width = size;
    canvas.height = size;

    ctx.beginPath();
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.lineWidth = ringWidth;
    ctx.strokeStyle = color;
    ctx.rotate((-90 * Math.PI) / 180);
    ctx.arc(0, 0, r, 0, ((2 * percent) / 100) * Math.PI);
    ctx.stroke();
    ctx.restore();
  }

  useEffect(draw);

  return <canvas ref={ref} style={style} />;
};

export default React.memo(Ring);
