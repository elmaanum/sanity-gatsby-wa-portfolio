import React from 'react';
import ServicePreview from './service-preview';

import styles from './project-preview-grid.module.css';

function ServicePreviewGrid(props) {
  return (
    <div className={styles.root}>
      <ul className={styles.grid}>
        {props.nodes &&
          props.nodes.map((node) => (
            <li key={node.id}>
              <ServicePreview {...node} />
            </li>
          ))}
      </ul>
    </div>
  );
}

ServicePreviewGrid.defaultProps = {
  nodes: [],
};

export default ServicePreviewGrid;
