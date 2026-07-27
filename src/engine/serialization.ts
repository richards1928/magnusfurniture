import type { ComponentInstance } from '../types';
import { designerStore } from '../store/designerStore';

export function saveScene(): void {
  const data = JSON.stringify(designerStore.components, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `magnus-design-${Date.now()}.json`;
  document.body.appendChild(a);
  a.click();
  
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function loadScene(jsonString: string): void {
  try {
    const parsed = JSON.parse(jsonString) as ComponentInstance[];
    // Perform basic validation
    if (Array.isArray(parsed) && parsed.every(c => c.instanceId && c.definitionId)) {
      designerStore.components = parsed;
      designerStore.selectedComponentIds = [];
      // Reset history when loading
      designerStore.history = { past: [], future: [] };
    } else {
      console.error("Invalid scene format.");
      alert("Failed to load scene: Invalid format.");
    }
  } catch (err) {
    console.error("Failed to parse scene JSON", err);
    alert("Failed to load scene: Parse error.");
  }
}
