import React from 'react';

export function resizeCanvasWrapper<T>(
  Canvas: React.FC<T>
): React.ComponentClass<T> {
  return class CanvasWrapper extends React.PureComponent<T> {
    resize = () => this.forceUpdate();

    componentWillUnmount() {
      window.removeEventListener('resize', this.resize);
    }

    componentDidMount() {
      window.addEventListener('resize', this.resize);
    }

    render() {
      return <Canvas {...this.props} />;
    }
  };
}
