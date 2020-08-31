import React from 'react';
import ServicePreview from './service-preview';

import styles from './service-preview-grid.module.css';

const prioritizer = (prioritizedNodes, node) => {
  prioritizedNodes.splice(node.mainImage.priority - 1, 0, node);
  return prioritizedNodes;
};
const prioritizeServices = (nodes) => nodes.reduce(prioritizer, []);

function ServicePreviewGrid(props) {
  return (
    <div className={styles.root}>
      <ul className={styles.grid}>
        {props.nodes &&
          prioritizeServices(props.nodes).map((node) => (
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
