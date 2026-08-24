import { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { API_URL, apiGet } from "../utils/api";
import fallbackPhoto from "../images/fotoskoly.jpg";

const HeroCarousel = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    apiGet("/api/carousel-photos")
      .then((data) => setPhotos(data.filter((photo) => !photo.isHidden)))
      .catch((error) => console.error(error));
  }, []);

  if (photos.length === 0) {
    return (
      <img
        className="d-block w-100 hero-carousel-img"
        src={fallbackPhoto}
        alt="škola"
      />
    );
  }

  return (
    <Carousel
      className="hero-carousel"
      indicators={photos.length > 1}
      controls={photos.length > 1}
      interval={5000}
      pause={false}
    >
      {photos.map((photo) => (
        <Carousel.Item key={photo.id}>
          <img
            className="d-block w-100 hero-carousel-img"
            src={`${API_URL}${photo.photoUrl}`}
            alt={photo.name}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default HeroCarousel;
