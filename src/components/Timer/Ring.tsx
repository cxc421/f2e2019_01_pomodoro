import React from 'react';

export interface RingProps {
  size?: number;
  percent: number;
  borderWidth?: number;
  color?: string;
  zIndex?: number;
  style?: React.CSSProperties | undefined;
}

const Ring: React.FC<RingProps> = ({
  size = 0,
  percent,
  borderWidth = 0,
  color = 'black',
  zIndex = 0,
  style
}) => {
  const radius = size / 2;

  const containerStyle: React.CSSProperties = Object.assign(
    {
      position: 'relative',
      width: size,
      height: size,
      borderRadius: '100%',
      // background: 'lightgreen',
      // opacity: 0.5,
      zIndex
    },
    style
  );

  const circleStyle: React.CSSProperties = Object.assign(
    {
      height: size,
      overflow: 'hidden',
      position: 'relative'
    },
    percent < 50
      ? {
          left: radius,
          width: radius,
          borderRadius: `0 ${radius}px ${radius}px 0`
        }
      : {
          left: 0,
          width: size,
          borderRadius: 0
        }
  );
  const halfCircleStyle = {
    position: 'absolute',
    top: 0,
    right: 0,
    width: size,
    height: radius,
    border: `solid ${borderWidth}px ${color}`,
    borderRadius: `${radius}px ${radius}px 0 0`,
    transformOrigin: `${radius}px ${radius}px`
  };

  const rotateHalfCircleStyle: React.CSSProperties = Object.assign(
    {
      zIndex: zIndex + 1,
      transform: `rotate(${-90 + (360 * percent) / 100}deg)`
    },
    halfCircleStyle
  );

  const auxHalfCircleStyle: React.CSSProperties = Object.assign(
    {
      zIndex: zIndex + 2,
      opacity: percent < 50 ? 0 : 1,
      transform: 'rotate(90deg)'
    },
    halfCircleStyle
  );

  const ringCenterStyle: React.CSSProperties = {
    position: 'absolute',
    zIndex: zIndex + 3,
    width: size - borderWidth * 2,
    height: size - borderWidth * 2,
    top: borderWidth,
    left: borderWidth,
    // top: '50%',
    // left: '50%',
    // transform: 'translate(-50%, -50%)',
    borderRadius: '100%',
    background: 'black'
  };

  return (
    <div style={containerStyle}>
      <div style={circleStyle}>
        <div style={rotateHalfCircleStyle} />
        <div style={auxHalfCircleStyle} />
      </div>
      <div style={ringCenterStyle} />
    </div>
  );
};

export default React.memo(Ring);
