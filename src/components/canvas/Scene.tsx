import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, Grid, ContactShadows, GizmoHelper, GizmoViewport } from '@react-three/drei';
import { useSnapshot } from 'valtio';
import { designerStore, selectComponent } from '../../store/designerStore';
import { ComponentMesh } from './ComponentMesh';
import { ViewportControls } from './ViewportControls';
import { DimensionsOverlay } from './DimensionsOverlay';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

export default function Scene() {
  const state = useSnapshot(designerStore);
  const controlsRef = useRef<OrbitControlsImpl>(null);

  const handleResetView = () => {
    if (controlsRef.current) {
      controlsRef.current.target.set(0, 35, 0);
      controlsRef.current.object.position.set(60, 60, 60);
      controlsRef.current.update();
      designerStore.camera.preset = 'three-quarter';
    }
  };

  const handleFocusSelected = () => {
    if (state.selectedComponentIds.length > 0 && controlsRef.current) {
      const selectedId = state.selectedComponentIds[0];
      const selectedComp = state.components.find(c => c.instanceId === selectedId);
      if (selectedComp) {
        const { x, y, z } = selectedComp.position;
        controlsRef.current.target.set(x, y, z);
        controlsRef.current.object.position.set(x + 50, y + 40, z + 50);
        controlsRef.current.update();
      }
    }
  };

  const handleZoomIn = () => {
    if (controlsRef.current) {
      controlsRef.current.dollyIn(1.25);
      controlsRef.current.update();
    }
  };

  const handleZoomOut = () => {
    if (controlsRef.current) {
      controlsRef.current.dollyOut(1.25);
      controlsRef.current.update();
    }
  };

  const handleSetCameraPreset = (preset: string) => {
    if (!controlsRef.current) return;
    designerStore.camera.preset = preset as any;
    
    // Find current target center or fallback to center of scene
    const target = controlsRef.current.target;
    const center = { x: target.x, y: target.y || 35, z: target.z };

    switch (preset) {
      case 'front':
        controlsRef.current.object.position.set(center.x, center.y, center.z + 120);
        break;
      case 'back':
        controlsRef.current.object.position.set(center.x, center.y, center.z - 120);
        break;
      case 'left':
        controlsRef.current.object.position.set(center.x - 120, center.y, center.z);
        break;
      case 'right':
        controlsRef.current.object.position.set(center.x + 120, center.y, center.z);
        break;
      case 'top':
        controlsRef.current.object.position.set(center.x, center.y + 150, center.z + 0.01);
        break;
      case 'perspective':
      default:
        controlsRef.current.object.position.set(center.x + 60, center.y + 30, center.z + 60);
        break;
    }
    controlsRef.current.update();
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <ViewportControls 
        onResetView={handleResetView}
        onFocusSelected={handleFocusSelected}
        onSetCameraPreset={handleSetCameraPreset}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
      />

      <Canvas
        shadows
        camera={{ position: [60, 60, 60], fov: 45 }}
        style={{ background: 'radial-gradient(circle at 50% 40%, #1a1d28 0%, #0d0f17 100%)' }}
        onPointerMissed={(e) => {
          if (e.type === 'click') selectComponent(null);
        }}
      >
        <ambientLight intensity={0.75} />
        <directionalLight 
          position={[25, 50, 25]} 
          intensity={1.3} 
          castShadow 
          shadow-mapSize-width={2048} 
          shadow-mapSize-height={2048} 
          shadow-bias={-0.0001}
        />
        <directionalLight 
          position={[-25, 25, -25]} 
          intensity={0.4} 
        />
        
        <Environment preset="studio" />

        {/* Blender-Style Grid Floor */}
        <Grid 
          position={[0, -0.01, 0]} 
          infiniteGrid 
          fadeDistance={350} 
          fadeStrength={3.5} 
          cellSize={state.snapEnabled ? state.snapGridSize : 5} 
          sectionSize={25} 
          cellThickness={0.8}
          cellColor="#282d3c" 
          sectionThickness={1.4}
          sectionColor="#454c63" 
        />

        {/* Ground Floor Soft Contact Shadows */}
        <ContactShadows 
          position={[0, -0.02, 0]} 
          opacity={0.65} 
          scale={160} 
          blur={2.2} 
          far={20} 
          color="#000000" 
        />

        {/* Render Furniture Components */}
        {state.components.map((comp, i) => (
          <ComponentMesh 
            key={comp.instanceId} 
            component={comp as any} 
            isExploded={state.explodedView}
            index={i}
            onDoubleClick={handleFocusSelected}
          />
        ))}

        {/* Live 3D Measurements Bounding Overlay */}
        <DimensionsOverlay />

        {/* Blender Orientation Axis Gizmo */}
        <GizmoHelper alignment="top-right" margin={[75, 140]}>
          <GizmoViewport axisColors={['#ef4444', '#22c55e', '#3b82f6']} labelColor="#ffffff" />
        </GizmoHelper>

        <OrbitControls 
          ref={controlsRef}
          makeDefault 
          enableDamping
          dampingFactor={0.05}
          minPolarAngle={0} 
          maxPolarAngle={Math.PI / 2 - 0.02}
        />
      </Canvas>
    </div>
  );
}
