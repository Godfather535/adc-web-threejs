import { Grid } from '@react-three/drei'

export function GridFloor() {
  return (
    <Grid
      position={[0, -2.1, 0]}
      args={[20, 20]}
      cellSize={0.45}
      cellThickness={0.6}
      cellColor="#3b82f6"
      sectionSize={3.3}
      sectionThickness={1.1}
      sectionColor="#8b5cf6"
      fadeDistance={22}
      fadeStrength={1}
      infiniteGrid
      followCamera={false}
    />
  )
}
