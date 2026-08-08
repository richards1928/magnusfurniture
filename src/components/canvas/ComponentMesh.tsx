import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { TransformControls } from '@react-three/drei';
import * as THREE from 'three';
import { useSnapshot } from 'valtio';
import { selectComponent, updateComponentPosition, finalizeComponentPosition, designerStore } from '../../store/designerStore';
import { getMaterial } from '../../data/materials';
import { applyMagneticSnap } from '../../engine/snapEngine';
import { validateScene } from '../../engine/validationEngine';
import { getFurnitureType } from '../../data/furniture-types';

interface ComponentMeshProps {
  component: any;
  isExploded: boolean;
  index: number;
  onDoubleClick?: () => void;
}

export function ComponentMesh({ component, isExploded, index, onDoubleClick }: ComponentMeshProps) {
  const state = useSnapshot(designerStore);
  const meshRef = useRef<THREE.Mesh>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const dim = component.dimensions;
  const pos = component.position;
  const rot = component.rotation || { x: 0, y: 0, z: 0 };
  
  // Calculate exploded offset
  const targetPos = new THREE.Vector3(
    isExploded ? pos.x + (index % 2 === 0 ? 25 : -25) : pos.x,
    isExploded ? pos.y + index * 12 : pos.y,
    isExploded ? pos.z + (index % 3 === 0 ? 25 : -25) : pos.z
  );

  useFrame((_state, delta) => {
    if (meshRef.current && isExploded) {
      meshRef.current.position.lerp(targetPos, delta * 5);
    } else if (meshRef.current && !isExploded && !isDragging) {
      meshRef.current.position.set(pos.x, pos.y, pos.z);
    }
  });

  const materialDef = getMaterial(component.material);
  const color = materialDef?.colorVariants?.find(v => v.id === component.color)?.hex || materialDef?.color || '#cccccc';
  const isGlass = materialDef?.category === 'glass' || component.material === 'tempered-glass';

  const renderGeometry = () => {
    const isSteelLoop = component.definitionId?.includes('steel-loop');
    const isHairpin = component.definitionId?.includes('hairpin');
    const isLeg = component.definitionId?.includes('leg');

    if (isSteelLoop) {
      // Render O-Loop metal leg frame (hollow rectangle frame)
      return <boxGeometry args={[dim.width, dim.height, dim.depth]} />;
    } else if (isHairpin) {
      return <cylinderGeometry args={[dim.width / 3, dim.width / 2, dim.height, 16]} />;
    } else if (isLeg && !component.definitionId?.includes('panel')) {
      return <cylinderGeometry args={[dim.width / 2, dim.depth / 2, dim.height, 32]} />;
    } else {
      return <boxGeometry args={[dim.width, dim.height, dim.depth]} />;
    }
  };

  const isSelected = component.isSelected;
  const isValid = component.isValid !== false;

  return (
    <>
      <mesh
        ref={meshRef}
        castShadow={!isGlass}
        receiveShadow
        position={[pos.x, pos.y, pos.z]}
        rotation={[
          (rot.x * Math.PI) / 180,
          (rot.y * Math.PI) / 180,
          (rot.z * Math.PI) / 180,
        ]}
        onClick={(e) => {
          e.stopPropagation();
          selectComponent(component.instanceId);
        }}
        onDoubleClick={(e) => {
          e.stopPropagation();
          selectComponent(component.instanceId);
          if (onDoubleClick) onDoubleClick();
        }}
      >
        {renderGeometry()}

        {isGlass ? (
          <meshPhysicalMaterial
            color={isValid ? color : '#ef4444'}
            transmission={0.92}
            opacity={0.8}
            transparent
            roughness={0.05}
            metalness={0.1}
            ior={1.5}
            thickness={dim.height || 2}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        ) : (
          <meshStandardMaterial 
            color={isValid ? color : '#ef4444'} 
            roughness={materialDef?.textureType === 'glossy' ? 0.1 : 0.65} 
            metalness={materialDef?.category === 'metal' ? 0.85 : 0.08}
            emissive={isValid ? '#000000' : '#440000'}
          />
        )}
        
        {isSelected && (
          <mesh scale={1.015}>
            {renderGeometry()}
            <meshBasicMaterial 
              color={isValid ? "#38bdf8" : "#ef4444"} 
              wireframe 
              transparent 
              opacity={0.75}
            />
          </mesh>
        )}
      </mesh>

      {isSelected && !isExploded && (
        <TransformControls
          object={meshRef as any}
          mode="translate"
          size={0.7}
          translationSnap={state.snapEnabled ? state.snapGridSize : undefined}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => {
            setIsDragging(false);
            if (meshRef.current) {
              const newPos = meshRef.current.position;
              
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
                { x: newPos.x, y: newPos.y, z: newPos.z },
                designerStore.components as any,
                snapPositions
              );

              updateComponentPosition(
                component.instanceId, 
                snapResult.snappedPos, 
                snapResult.parentId ? { parentInstanceId: snapResult.parentId, childSnapPosition: snapResult.snapType, parentSnapPosition: snapResult.snapType } : null
              );
              finalizeComponentPosition();
              validateScene(designerStore.components as any);
            }
          }}
        />
      )}
    </>
  );
}
