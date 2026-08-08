import { Html, Line } from '@react-three/drei';
import { useSnapshot } from 'valtio';
import { designerStore } from '../../store/designerStore';

export function DimensionsOverlay() {
  const state = useSnapshot(designerStore);

  if (!state.showMeasurements || state.components.length === 0) return null;

  // Calculate overall bounding box of all components in scene
  let minX = Infinity, maxX = -Infinity;
  let minY = Infinity, maxY = -Infinity;
  let minZ = Infinity, maxZ = -Infinity;

  state.components.forEach(comp => {
    const { x, y, z } = comp.position;
    const { width, height, depth } = comp.dimensions;

    const hw = width / 2;
    const hh = height / 2;
    const hd = depth / 2;

    minX = Math.min(minX, x - hw);
    maxX = Math.max(maxX, x + hw);
    minY = Math.min(minY, y - hh);
    maxY = Math.max(maxY, y + hh);
    minZ = Math.min(minZ, z - hd);
    maxZ = Math.max(maxZ, z + hd);
  });

  if (!isFinite(minX)) return null;

  const totalWidth = Math.round(maxX - minX);
  const totalHeight = Math.round(maxY - Math.max(0, minY));
  const totalDepth = Math.round(maxZ - minZ);

  // Offset bounding box lines slightly outward
  const offset = 4;
  const lineMinX = minX - offset;
  const lineMaxX = maxX + offset;
  const lineMinY = Math.max(0, minY);
  const lineMaxY = maxY + offset;
  const lineMinZ = minZ - offset;
  const lineMaxZ = maxZ + offset;

  const widthMidX = (lineMinX + lineMaxX) / 2;
  const heightMidY = (lineMinY + lineMaxY) / 2;
  const depthMidZ = (lineMinZ + lineMaxZ) / 2;

  const labelStyle: React.CSSProperties = {
    background: 'rgba(15, 23, 42, 0.92)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(56, 189, 248, 0.5)',
    color: '#38bdf8',
    padding: '3px 8px',
    borderRadius: 6,
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: '0.04em',
    whiteSpace: 'nowrap',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
    userSelect: 'none',
    pointerEvents: 'none',
  };

  return (
    <group>
      {/* --- WIDTH LINE (Front Bottom) --- */}
      <Line
        points={[[lineMinX, 0.5, lineMaxZ], [lineMaxX, 0.5, lineMaxZ]]}
        color="#38bdf8"
        lineWidth={1.5}
        dashed
        dashSize={3}
        gapSize={2}
      />
      <Html position={[widthMidX, 2, lineMaxZ + 4]} center>
        <div style={labelStyle}>
          W: {totalWidth} cm
        </div>
      </Html>

      {/* --- DEPTH LINE (Right Bottom) --- */}
      <Line
        points={[[lineMaxX, 0.5, lineMinZ], [lineMaxX, 0.5, lineMaxZ]]}
        color="#38bdf8"
        lineWidth={1.5}
        dashed
        dashSize={3}
        gapSize={2}
      />
      <Html position={[lineMaxX + 6, 2, depthMidZ]} center>
        <div style={labelStyle}>
          D: {totalDepth} cm
        </div>
      </Html>

      {/* --- HEIGHT LINE (Left Vertical) --- */}
      <Line
        points={[[lineMinX, lineMinY, lineMaxZ], [lineMinX, lineMaxY, lineMaxZ]]}
        color="#38bdf8"
        lineWidth={1.5}
        dashed
        dashSize={3}
        gapSize={2}
      />
      <Html position={[lineMinX - 6, heightMidY, lineMaxZ]} center>
        <div style={labelStyle}>
          H: {totalHeight} cm
        </div>
      </Html>
    </group>
  );
}
