import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, Grid, ContactShadows } from '@react-three/drei';
import { useSnapshot } from 'valtio';
import { designerStore } from '../../store/designerStore';
import { ComponentMesh } from './ComponentMesh';

export default function Scene() {
  const state = useSnapshot(designerStore);

  return (
    <Canvas
      shadows
      camera={{ position: [50, 50, 50], fov: 45 }}
      style={{ background: '#f4f3ec' }} // match `--code-bg` or a nice soft color
    >
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[10, 20, 10]} 
        intensity={1} 
        castShadow 
        shadow-mapSize-width={2048} 
        shadow-mapSize-height={2048} 
      />
      
      <Environment preset="city" />

      {/* Grid Floor */}
      <Grid 
        position={[0, 0, 0]} 
        infiniteGrid 
        fadeDistance={200} 
        fadeStrength={5} 
        cellSize={10} 
        sectionSize={50} 
        cellColor="#e5e4e7" 
        sectionColor="#a0a0a0" 
      />

      {/* Contact Shadows */}
      <ContactShadows position={[0, -0.01, 0]} opacity={0.4} scale={100} blur={2} far={10} />

      {/* Render Components */}
      {state.components.map((comp, i) => (
        <ComponentMesh 
          key={comp.instanceId} 
          component={comp as any} 
          isExploded={state.explodedView}
          index={i}
        />
      ))}

      <OrbitControls 
        makeDefault 
        minPolarAngle={0} 
        maxPolarAngle={Math.PI / 2 - 0.05} // don't go below ground
      />
    </Canvas>
  );
}
