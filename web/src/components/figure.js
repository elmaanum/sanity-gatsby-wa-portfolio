import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { getGatsbyImageData } from 'gatsby-source-sanity';
import clientConfig from '../../client-config';

import * as styles from './figure.module.css';

export default ({ node }) => {
  if (!node.asset) {
    return null;
  }

  const gatsbyImageData = getGatsbyImageData(
    node.asset._ref,
    { maxWidth: 675 },
    clientConfig.sanity,
  );

  return (
    <figure className={styles.root}>
      <GatsbyImage image={gatsbyImageData} alt={node.alt} />
      {node.caption && <figcaption>{node.caption}</figcaption>}
    </figure>
  );
};
