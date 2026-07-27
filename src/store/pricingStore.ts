import { proxy, subscribe } from 'valtio';
import { designerStore } from './designerStore';
import { pricingConfig, formatPrice, laborHoursEstimate, finishingMultiplier } from '../data/pricing-rules';
import { getMaterial } from '../data/materials';

export const pricingStore = proxy({
  total: 0,
  formattedTotal: '₹0',
  breakdown: {
    components: 0,
    materials: 0,
    labor: 0,
    assembly: pricingConfig.assemblyBaseCost,
    tax: 0,
  }
});

const calculatePricing = () => {
  let componentsCost = 0;
  let materialsCost = 0;
  let laborHours = 0;

  designerStore.components.forEach(component => {
    // 1. Base component cost
    componentsCost += component.price;

    // 2. Material cost
    const materialInfo = getMaterial(component.material);
    if (materialInfo) {
      // Calculate a rough volume or surface area based multiplier 
      // Using arbitrary logic for MVP: costPerUnit * weight
      let matCost = materialInfo.costPerUnit * materialInfo.weight * 100;
      
      // Add variant price modifier
      const variant = materialInfo.colorVariants?.find(v => v.id === component.color);
      if (variant && variant.priceModifier) {
        matCost += variant.priceModifier;
      }
      
      // Add finishing cost
      const finishMult = finishingMultiplier[materialInfo.finish] || 1.0;
      matCost *= finishMult;
      
      materialsCost += matCost;
    }

    // 3. Labor estimate
    // Simple lookup based on component definition category (mocked here, we just use a default)
    laborHours += laborHoursEstimate['default'] || 1.0;
  });

  const laborCost = laborHours * pricingConfig.laborRatePerHour;
  const subtotal = componentsCost + materialsCost + laborCost + pricingConfig.assemblyBaseCost;
  const tax = subtotal * pricingConfig.taxRate;
  
  const total = subtotal + tax;

  pricingStore.breakdown = {
    components: Math.round(componentsCost),
    materials: Math.round(materialsCost),
    labor: Math.round(laborCost),
    assembly: pricingConfig.assemblyBaseCost,
    tax: Math.round(tax)
  };
  
  pricingStore.total = Math.round(total);
  pricingStore.formattedTotal = formatPrice(Math.round(total));
};

// React to changes in designerStore
subscribe(designerStore, () => {
  calculatePricing();
});
