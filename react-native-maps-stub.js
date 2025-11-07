// Stub for react-native-maps on web
// This prevents codegenNativeComponent errors on web

import React from 'react';

// MapView component stub
const MapView = ({ children, style, ...props }) => {
  return React.createElement('div', {
    style: {
      ...style,
      backgroundColor: '#e0e0e0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    }
  }, [
    React.createElement('div', {
      key: 'placeholder',
      style: {
        color: '#666',
        fontSize: 14,
        textAlign: 'center',
        padding: 20
      }
    }, 'Map view is not available on web'),
    children
  ]);
};

// Marker component stub
const Marker = ({ children, ...props }) => {
  return null;
};

// Polyline component stub
const Polyline = (props) => {
  return null;
};

// Circle component stub
const Circle = (props) => {
  return null;
};

// Polygon component stub
const Polygon = (props) => {
  return null;
};

// Callout component stub
const Callout = ({ children }) => {
  return null;
};

// Provider constants
export const PROVIDER_GOOGLE = 'google';
export const PROVIDER_DEFAULT = null;

// Animated components
MapView.Animated = MapView;
Marker.Animated = Marker;
Polyline.Animated = Polyline;
Circle.Animated = Circle;
Polygon.Animated = Polygon;

// Export components
export { Marker, Polyline, Circle, Polygon, Callout };

// Default export
export default MapView;
