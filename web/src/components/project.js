import React from 'react';

import Container from './container';
import CarouselComponent from './carousel';

import styles from './project.module.css';

function Project(props) {
  const { projects } = props;
  return (
    <Container>
      <h1 className={`${styles.projectHeader} textH2`}>Projects</h1>
      {projects.nodes.map((projectNode) => (
        <div className={styles.projectDiv}>
          <CarouselComponent images={projectNode.images} />
        </div>
      ))}
    </Container>
  );
}

export default Project;
