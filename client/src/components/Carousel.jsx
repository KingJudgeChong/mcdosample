import React, { useState, useEffect } from 'react';

const images = [
  'https://d1r3vc4fck3z1b.cloudfront.net/images/1685722696_carousel_JschDj5b.png',
  'https://d1r3vc4fck3z1b.cloudfront.net/images/1685722415_carousel_N2sHV2hj.jpeg',
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="carousel">
      <div className="carousel-container">
        {images.map((image, index) => (
          <div
            className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
            key={index}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            <img src={image} alt={`Slide ${index}`} />
          </div>
        ))}
      </div>
      <button className="carousel-arrow left" onClick={goToPrevSlide}>
        &lt;
      </button>
      <button className="carousel-arrow right" onClick={goToNextSlide}>
        &gt;
      </button>
    </div>
  );
};

export default Carousel;
