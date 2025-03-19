import React, { useEffect, useState } from 'react';

// Define types for the rain items
type ItemType = {
  type: string;
  weight: number;
  emoji?: string;
};

type TacoRainProps = {
  isActive: boolean;
  logoSize?: number;
  itemTypes?: ItemType[];
};

const DEFAULT_ITEM_TYPES = [
  { type: 'logo', weight: 1 },
  { type: 'taco', weight: 1, emoji: '🌮' },
  { type: 'burrito', weight: 1, emoji: '🌯' }
];

const TacoRain: React.FC<TacoRainProps> = ({ 
  isActive,
  logoSize = 40, // Default logo size
  itemTypes = DEFAULT_ITEM_TYPES 
}) => {
  const [rainItems, setRainItems] = useState<React.ReactNode[]>([]);
  
  useEffect(() => {
    if (!isActive) {
      setRainItems([]);
      return;
    }
    
    // Calculate total weight for random selection
    // const totalWeight = itemTypes.reduce((acc, item) => acc + item.weight, 0);
    
    // Create initial items with one of each type to ensure we see all types
    if (rainItems.length === 0) {
      const initialItems: React.ReactNode[] = [];
      
      // Create one of each type
      itemTypes.forEach((item, index) => {
        const left = (index * 15) + Math.random() * 10; // Spread them out horizontally
        const duration = 3 + Math.random() * 5;
        const delay = Math.random() * 0.5;
        const rotation = Math.random() * 360;
        const key = `initial-item-${index}-${Date.now()}`;
        
        if (item.type === 'logo') {
          initialItems.push(
            <div
              key={key}
              className="absolute"
              style={{
                left: `${left}%`,
                top: '-100px',
                animation: `fall ${duration}s linear ${delay}s forwards`,
                transform: `rotate(${rotation}deg)`,
                width: `${logoSize}px`,
                height: `${logoSize}px`,
                zIndex: 1000
              }}
            >
              <img 
                src="/chipotle.svg" 
                alt="Chipotle logo" 
                width={logoSize} 
                height={logoSize}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          );
        } else if (item.emoji) {
          initialItems.push(
            <div
              key={key}
              className="absolute"
              style={{
                left: `${left}%`,
                top: '-100px',
                animation: `fall ${duration}s linear ${delay}s forwards`,
                transform: `rotate(${rotation}deg)`,
                fontSize: `${logoSize * 0.8}px`,
                zIndex: 1000
              }}
            >
              {item.emoji}
            </div>
          );
        }
      });
      
      setRainItems(initialItems);
      
      // Cleanup initial items after animation ends
      setTimeout(() => {
        setRainItems(prev => prev.filter(item => {
          // Fix: Type-safe access to key property on ReactNode
          const itemElement = React.isValidElement(item) ? item : null;
          const key = itemElement?.key as string | undefined;
          return !key?.startsWith('initial-item');
        }));
      }, 10000); // Longer timeout for initial items
    }
    
    // Create rain items
    const interval = setInterval(() => {
      if (!isActive) return;
      
      // Random position across screen width
      const left = Math.random() * 100;
      // Random animation duration
      const duration = 3 + Math.random() * 5;
      // Random starting delay
      const delay = Math.random() * 1;
      // Random rotation
      const rotation = Math.random() * 360;
      
      // Force cycle through all item types to ensure we see everything
      // This will cycle through all items more frequently
      const timeBasedIndex = Math.floor((Date.now() / 500) % itemTypes.length);
      const selectedItem = itemTypes[timeBasedIndex];
      
      // Create element based on selected type
      let newItem: React.ReactNode;
      const key = `rain-item-${Date.now()}-${Math.random()}`;
      
      if (selectedItem.type === 'logo') {
        newItem = (
          <div
            key={key}
            className="absolute"
            style={{
              left: `${left}%`,
              top: '-100px',
              animation: `fall ${duration}s linear ${delay}s forwards`,
              transform: `rotate(${rotation}deg)`,
              width: `${logoSize}px`, // Use logoSize prop
              height: `${logoSize}px`,
              zIndex: 1000
            }}
          >
            <img 
              src="/chipotle.svg" 
              alt="Chipotle logo" 
              width={logoSize} 
              height={logoSize}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        );
      } else if (selectedItem.emoji) {
        // For emoji items
        newItem = (
          <div
            key={key}
            className="absolute"
            style={{
              left: `${left}%`,
              top: '-100px',
              animation: `fall ${duration}s linear ${delay}s forwards`,
              transform: `rotate(${rotation}deg)`,
              fontSize: `${logoSize * 0.8}px`, // Slightly smaller than logos
              zIndex: 1000
            }}
          >
            {selectedItem.emoji}
          </div>
        );
      } else {
        // Fallback
        return;
      }
      
      setRainItems(prev => [...prev, newItem]);
      
      // Cleanup items after animation ends to prevent memory issues
      setTimeout(() => {
        setRainItems(prev => prev.filter((item) => {
          // Fix: Type-safe access to key property on ReactNode
          const itemElement = React.isValidElement(item) ? item : null;
          const itemKey = itemElement?.key as string | undefined;
          return itemKey !== key;
        }));
      }, (duration + delay) * 1000);
      
    }, 200); // Add a new item every 200ms
    
    return () => clearInterval(interval);
  }, [isActive, logoSize, itemTypes]);
  
  if (!isActive) return null;
  
  return (
    <div 
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1000 }}
    >
      {rainItems}
      
      {/* CSS for the fall animation */}
      <style jsx global>{`
        @keyframes fall {
          0% {
            transform: translateY(0) rotate(${Math.random() * 360}deg);
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: translateY(calc(100vh + 100px)) rotate(${Math.random() * 720}deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default TacoRain; 