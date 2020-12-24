import React from 'react';
import Img from 'gatsby-image';
import { Carousel } from 'react-bootstrap';
import Container from './container';

import styles from './project.module.css';

function Project(props) {
  const { project } = props;
  return (
    <Container>
      <h1>{project.title}</h1>
      <Carousel>
        {project.images &&
          project.images.map((image) => {
            return (
              <Carousel.Item>
                <Img fluid={image.asset.fluid} />
              </Carousel.Item>
            );
          })}
      </Carousel>
    </Container>
  );
}

export default Project;
