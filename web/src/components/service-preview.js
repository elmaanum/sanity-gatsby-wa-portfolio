import { Link } from 'gatsby';
import React from 'react';
import { buildImageObj } from '../lib/helpers';
import { imageUrlFor } from '../lib/image-url';
import styles from './service-preview.module.css';

function ServicePreview(props) {
  return (
    <div className={styles.leadMediaThumb}>
      <h3 className={styles.responsiveTitle}>{props.title}</h3>
      {props.mainImage && props.mainImage.asset && (
        <img
          src={imageUrlFor(buildImageObj(props.mainImage))
            .width(600)
            .height(Math.floor((9 / 16) * 1000))
            .url()}
          alt={props.mainImage.alt}
        />
      )}
      <Link to={`/service/${props.slug.current}`}>
        <button className={styles.responsiveButton}>Learn More</button>
      </Link>
    </div>
  );
}

export default ServicePreview;
