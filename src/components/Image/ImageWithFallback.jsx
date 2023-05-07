import React, { useState } from 'react';

function ImageWithFallback({src,className,alt}) {
  console.log(src);
    if (src.indexOf("http") !== src.lastIndexOf("http")) {
        // Loại bỏ phần đầu tiên
        src = src.substring(src.indexOf("http", 1));
      }
  const [fallback, setFallback] = useState(false);

  const handleImageError = () => {
    setFallback(true);
  };

  return (
    <img
      src={fallback ? 'https://thumbs.dreamstime.com/b/blog-21031296.jpg' : src}
      alt={alt}
      onError={handleImageError}
      className={className}
    />
  );
}

export default ImageWithFallback;
