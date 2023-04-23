import React, { useState } from 'react';

 export function Carousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1553661510-67cf27f21d92?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1504610926078-a1611febc7a2?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80'
    }
  ];
  
  return (
    <div className="relative overflow-hidden">
      {slides.map((slide, index) => (
        <div 
          key={slide.id}
          className={ index === activeIndex ? 'block' : 'hidden' }
        >
          <img src={slide.image} alt={slide.id} />
        </div>    
      ))}  
      <div className="absolute bottom-5 flex justify-center w-full">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            className={`w-3 h-3 mx-2 rounded-full ${index === activeIndex ? 'bg-blue-600' : 'bg-blue-200'}`}
            onClick={() => setActiveIndex(index)}  
          />
        ))}
      </div>
    </div>
  );
}
