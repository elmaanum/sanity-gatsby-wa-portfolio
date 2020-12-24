import React from 'react';
import styles from './personInfo.module.css';
import BlockContent from './block-content';

// TODO: Add some formatting to pass with Block Content (see docs for package)

const PersonInfo = ({ personData }) => (
  <div className={styles.bioContainer}>
    <div className={styles.personText}>
      <div className={styles.intro}>
        <div className={styles.name}>{personData.name}</div>
        <div className={styles.credentials}>{personData.credentials}</div>
      </div>
      <div className={styles.bio}>
        <BlockContent blocks={personData._rawBio} />
      </div>
    </div>

    <div className={styles.personImage}>
      {personData.image?.asset?.url && (
        <img src={personData.image.asset.url} alt={personData.image.alt || ''} />
      )}
    </div>
  </div>
);

export default PersonInfo;
