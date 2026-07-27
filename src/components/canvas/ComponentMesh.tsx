import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { PivotControls } from '@react-three/drei';
import * as THREE from 'three';
import { selectComponent, updateComponentPosition, finalizeComponentPosition, designerStore } from '../../store/designerStore';
import { getMaterial } from '../../data/materials';
import { applyMagneticSnap } from '../../engine/snapEngine';
import { validateScene } from '../../engine/validationEngine';
import { getFurnitureType } from '../../data/furniture-types';

export function ComponentMesh({ component, isExploded, index }: { component: any, isExploded: boolean, index: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const dim = component.dimensions;
  const pos = component.position;
  
  // Calculate exploded offset
  const targetPos = new THREE.Vector3(
    isExploded ? pos.x + (index % 2 === 0 ? 20 : -20) : pos.x,
    isExploded ? pos.y + index * 10 : pos.y,
    isExploded ? pos.z + (index % 3 === 0 ? 20 : -20) : pos.z
  );

  useFrame((_state, delta) => {
    if (meshRef.current && isExploded) {
      meshRef.current.position.lerp(targetPos, delta * 5);
    } else if (meshRef.current && !isExploded && !isDragging) {
      meshRef.current.position.lerp(new THREE.Vector3(pos.x, pos.y, pos.z), delta * 15);
    }
  });

  const materialDef = getMaterial(component.material);
  const color = materialDef?.colorVariants?.find(v => v.id === component.color)?.hex || materialDef?.color || '#cccccc';

  const renderGeometry = () => {
    if (component.definitionId.includes('leg')) {
      return <cylinderGeometry args={[dim.width/2, dim.depth/2, dim.height, 32]} />;
    } else if (component.geometryType === 'drawer-unit' || component.definitionId.includes('drawer')) {
      return <boxGeometry args={[dim.width, dim.height, dim.depth]} />;
    } else if (component.geometryType === 'shelf') {
      return <boxGeometry args={[dim.width, dim.height, dim.depth]} />;
    } else {
      return <boxGeometry args={[dim.width, dim.height, dim.depth]} />;
    }
  };

  const isSelected = component.isSelected;
  const isValid = component.isValid !== false;

  const content = (
    <mesh
      ref={meshRef}
      castShadow
      receiveShadow
      position={[pos.x, pos.y, pos.z]}
      onClick={(e) => {
        e.stopPropagation();
        selectComponent(component.instanceId);
      }}
      onPointerMissed={(e) => {
        if (e.type === 'click') selectComponent(null);
      }}
    >
      {renderGeometry()}
      <meshStandardMaterial 
        color={isValid ? color : '#ffcccc'} 
        roughness={materialDef?.textureType === 'glossy' ? 0.1 : 0.8} 
        metalness={materialDef?.category === 'metal' ? 0.8 : 0.1}
        emissive={isValid ? '#000000' : '#440000'}
      />
      
      {isSelected && (
        <mesh scale={1.02}>
          {renderGeometry()}
          <meshBasicMaterial color={isValid ? "#aa3bff" : "#ff0000"} wireframe />
        </mesh>
      )}
    </mesh>
  );

  if (isSelected && !isExploded) {
    return (
      <PivotControls
        anchor={[0, 0, 0]}
        depthTest={false}
        lineWidth={2}
        axisColors={['#ef4444', '#22c55e', '#3b82f6']}
        onDragStart={() => setIsDragging(true)}
        onDrag={(_l, _dl, w, _dw) => {
          const position = new THREE.Vector3();
          w.decompose(position, new THREE.Quaternion(), new THREE.Vector3());
          
          // Get definition to know snap targets
          const furnitureDef = getFurnitureType(component.furnitureType);
          let snapPositions: string[] = [];
          if (furnitureDef) {
            for (const cat of furnitureDef.componentCategories) {
              const compDef = cat.components.find(c => c.id === component.definitionId);
              if (compDef) snapPositions = compDef.snapPositions;
            }
          }

          // Apply magnetic snap
          const snapResult = applyMagneticSnap(
            component,
            { x: position.x, y: position.y, z: position.z },
            designerStore.components as any,
            snapPositions
          );

          updateComponentPosition(
            component.instanceId, 
            snapResult.snappedPos, 
            snapResult.parentId ? { parentInstanceId: snapResult.parentId, childSnapPosition: snapResult.snapType, parentSnapPosition: snapResult.snapType } : null
          );
        }}
        onDragEnd={() => {
          setIsDragging(false);
          finalizeComponentPosition();
          validateScene(designerStore.components as any);
        }}
      >
        {content}
      </PivotControls>
    );
  }

  return content;
}
