import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Check, X } from 'lucide-react';

export const SwipeableCard = ({ user, onSwipe }) => {
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [swipeDirection, setSwipeDirection] = useState(null);
  const controls = useAnimation();

  const handleDragStart = (_, info) => {
    setDragStart({ x: info.point.x, y: info.point.y });
  };

  const handleDrag = (_, info) => {
    const deltaX = info.point.x - dragStart.x;
    setSwipeDirection(deltaX > 0 ? 'right' : 'left');
  };

  const handleDragEnd = async (_, info) => {
    const swipeThreshold = 100;
    const deltaX = info.point.x - dragStart.x;
    
    if (Math.abs(deltaX) > swipeThreshold) {
      const direction = deltaX > 0 ? 'right' : 'left';
      await controls.start({
        x: direction === 'right' ? 500 : -500,
        opacity: 0,
        transition: { duration: 0.2 }
      });
      onSwipe(direction);
    } else {
      controls.start({ x: 0, opacity: 1 });
    }
    setSwipeDirection(null);
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      animate={controls}
      className="absolute w-full max-w-sm"
      style={{ height: '500px' }}
    >
      <div className="relative w-full h-full bg-white rounded-2xl  overflow-hidden">
        {/* Profile Image */}
        <div className="w-full h-3/4 bg-gray-200">
          <img
            src={user.photoUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop'}
            alt={user.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* User Info */}
        <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6">
          <h2 className="text-2xl font-bold text-white">{user.firstName}</h2>
          <p className="text-gray-200">{user.about}</p>
        </div>

        {/* Swipe Indicators */}
        <motion.div 
          className="absolute top-8 right-8 bg-green-500 rounded-full p-2"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: swipeDirection === 'right' ? 1 : 0,
            scale: swipeDirection === 'right' ? 1.2 : 1
          }}
          transition={{ duration: 0.2 }}
        >
          <Check className="w-8 h-8 text-white" />
        </motion.div>
        
        <motion.div 
          className="absolute top-8 left-8 bg-red-500 rounded-full p-2"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: swipeDirection === 'left' ? 1 : 0,
            scale: swipeDirection === 'left' ? 1.2 : 1
          }}
          transition={{ duration: 0.2 }}
        >
          <X className="w-8 h-8 text-white" />
        </motion.div>
      </div>
    </motion.div>
  );
};