import React from 'react';

import Container from './container';
import ProjectViewer from '../components/project-viewer';

import styles from './project.module.css';

function Project(props) {
  const { projects } = props;
  return (
    <Container>
      <h1 className={`${styles.projectHeader} textH1`}>Projects</h1>
      {projects.nodes.map((projectNode) => (
        <div className={styles.projectDiv}>
          <ProjectViewer project={projectNode} />
        </div>
      ))}
    </Container>
  );
}

export default Project;
