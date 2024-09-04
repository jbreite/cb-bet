import { View, StyleSheet } from "react-native";

export default function GridBackground() {
  return (
    <View style={styles.gridContainer}>
      {[...Array(50)].map((_, i) => (
        <View
          key={`v${i}`}
          style={[styles.gridLine, styles.vertical, { left: i * 20 }]}
        />
      ))}
      {[...Array(50)].map((_, i) => (
        <View
          key={`h${i}`}
          style={[styles.gridLine, styles.horizontal, { top: i * 20 }]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
  },
  gridLine: {
    position: "absolute",
    backgroundColor: "#D3D3D3",
  },
  vertical: {
    width: 1,
    height: "100%",
  },
  horizontal: {
    height: 1,
    width: "100%",
  },
});
