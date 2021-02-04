import React, { useState } from 'react';
import styles from './project-viewer.module.css';
import iconClose from '../assets/close-button.svg';
import iconArrow from '../assets/arrow.svg';
import iconCircle from '../assets/circle.svg';
import iconCircleFilled from '../assets/circle-filled.svg';
import BlockContent from '../components/block-content';
import Img from 'gatsby-image';

const ProjectViewer = ({ project, closeViewer }) => {
  const [imageIndex, setImageIndex] = useState(0);
  return (
    <div className={styles.projectContentRoot}>
      <Img fluid={project.images[imageIndex].asset.fluid} />
      <div className={styles.projectInfoBox}>
        <div className={`textH2`}>{project.title}</div>
        <BlockContent blocks={project._rawDescription} />
      </div>
      {closeViewer && (
        <button>
          <img className={styles.iconClose} onClick={closeViewer} src={iconClose} alt={'close'} />
        </button>
      )}
      <button>
        <img
          className={styles.iconArrowRight}
          onClick={() =>
            setImageIndex(imageIndex + 1 > project.images.length - 1 ? 0 : imageIndex + 1)
          }
          src={iconArrow}
          alt={'right'}
        />
      </button>
      <button>
        <img
          className={styles.iconArrowLeft}
          onClick={() =>
            setImageIndex(imageIndex - 1 === -1 ? project.images.length - 1 : imageIndex - 1)
          }
          src={iconArrow}
          alt={'left'}
        />
      </button>
      <div className={styles.imagePositionIndicatorBox}>
        {project.images.map((_, currentIndex) => (
          <img
            className={styles.iconCircle}
            src={currentIndex == imageIndex ? iconCircleFilled : iconCircle}
            alt={'circle'}
            key={currentIndex}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectViewer;
