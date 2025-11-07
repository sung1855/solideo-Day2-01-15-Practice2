// Stub for react-native-safe-area-context on web
// This prevents "require is not defined" errors

module.exports = {
  SafeAreaListener: undefined,
  SafeAreaProvider: ({ children }) => children,
  SafeAreaInsetsContext: {
    Consumer: ({ children }) => children({ top: 0, right: 0, bottom: 0, left: 0 })
  },
  useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
  useSafeAreaFrame: () => ({ x: 0, y: 0, width: window.innerWidth, height: window.innerHeight }),
  initialWindowMetrics: {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 }
  }
};
