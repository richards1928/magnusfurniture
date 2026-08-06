import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, Grid, ContactShadows, GizmoHelper, GizmoViewport } from '@react-three/drei';
import { useSnapshot } from 'valtio';
import { designerStore } from '../../store/designerStore';
import { ComponentMesh } from './ComponentMesh';

export default function Scene() {
  const state = useSnapshot(designerStore);

  return (
    <Canvas
      shadows
      camera={{ position: [60, 60, 60], fov: 45 }}
      style={{ background: '#1e1e24' }} // Blender-style sleek dark viewport background
    >
      <ambientLight intensity={0.7} />
      <directionalLight 
        position={[20, 40, 20]} 
        intensity={1.2} 
        castShadow 
        shadow-mapSize-width={2048} 
        shadow-mapSize-height={2048} 
        shadow-bias={-0.0001}
      />
      <directionalLight 
        position={[-20, 20, -20]} 
        intensity={0.4} 
      />
      
      <Environment preset="studio" />

      {/* Blender-Style Grid Floor with Axis Lines */}
      <Grid 
        position={[0, -0.01, 0]} 
        infiniteGrid 
        fadeDistance={300} 
        fadeStrength={4} 
        cellSize={10} 
        sectionSize={50} 
        cellThickness={1}
        cellColor="#3a3f4d" 
        sectionThickness={1.5}
        sectionColor="#5c6370" 
      />

      {/* Origin Floor Planes / Shadow */}
      <ContactShadows position={[0, -0.02, 0]} opacity={0.6} scale={150} blur={2.5} far={15} color="#000000" />

      {/* Render Components */}
      {state.components.map((comp, i) => (
        <ComponentMesh 
          key={comp.instanceId} 
          component={comp as any} 
          isExploded={state.explodedView}
          index={i}
        />
      ))}

      {/* Blender Orientation Axis Gizmo in Top-Right Corner */}
      <GizmoHelper alignment="top-right" margin={[80, 80]}>
        <GizmoViewport axisColors={['#ff3653', '#00e676', '#29b6f6']} labelColor="#ffffff" />
      </GizmoHelper>

      <OrbitControls 
        makeDefault 
        minPolarAngle={0} 
        maxPolarAngle={Math.PI / 2 - 0.02} // stay above ground grid
      />
    </Canvas>
  );
}

