import { Link } from 'gatsby';
import React from 'react';
import { buildImageObj } from '../lib/helpers';
import { imageUrlFor } from '../lib/image-url';
import * as styles from './service-preview.module.css';

// TODO: Darken background behind white text on Service Cards so the text is visible

function ServicePreview(props) {
  return (
    <div className={styles.leadMediaThumb}>
      <h3 className={`${styles.responsiveTitle} textH2`}>{props.title}</h3>
      {props.mainImage && props.mainImage.asset && (
        <img
          src={imageUrlFor(buildImageObj(props.mainImage))
            .width(600)
            .height(Math.floor((9 / 16) * 1000))
            .fit('clip')
            .url()}
          alt={props.mainImage.alt}
        />
      )}
      <Link to={`/service/${props.slug.current}`}>
        <button className={`${styles.responsiveButton} button accent textH3`}>Learn More</button>
      </Link>
    </div>
  );
}

export default ServicePreview;
