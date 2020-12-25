import React from 'react';
import Img from 'gatsby-image';
import { Carousel } from 'react-bootstrap';

import styles from './carousel.module.css';

function CarouselComponent(props) {
  const { images } = props;
  return (
    <Carousel
      interval={10000}
      nextIcon={
        <span
          aria-hidden="true"
          className={`${styles.nextIconOverride} carousel-control-next-icon`}
        />
      }
      prevIcon={
        <span
          aria-hidden="true"
          className={`${styles.prevIconOverride} carousel-control-prev-icon`}
        />
      }
    >
      {images &&
        images.map((image) => {
          return (
            <Carousel.Item>
              <Img fluid={image.asset.fluid} />
            </Carousel.Item>
          );
        })}
    </Carousel>
  );
}

CarouselComponent.defaultProps = {
  images: [],
};

export default CarouselComponent;
