import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

import BlockContent from '../components/block-content';
import styles from './hero.module.css';

const buildListItems = (listItems) =>
  listItems.map((item) => {
    return <li key={item}>{item.name}</li>;
  });

const HeroImage = (props) => {
  return (
    <div className={styles.content_wrapper}>
      {props.imageFluid && props.imageFluid.asset && (
        <Img className={styles.image_wrapper} fluid={props.imageFluid.asset.fluid} />
      )}
      {props.imageText && (
        <div className={styles.text_wrapper}>
          <BlockContent blocks={props.imageText || []} />
          {props.imageTextList && <ul>{buildListItems(props.imageTextList)}</ul>}
        </div>
      )}
      <Link to={props.buttonLinkTo}>
        <button
          className={[props.buttonStyle, styles.buttonAccent, styles.responsiveButtonZ].join(' ')}
        >
          {props.buttonText}
        </button>
      </Link>
    </div>
  );
};

HeroImage.defaultProps = {
  imageFluid: {},
  imageText: '',
  imageTextList: [],
  buttonLinkTo: '',
  buttonText: '',
  buttonStyle: '',
};

export default HeroImage;
