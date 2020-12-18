import React from 'react';

import { graphql } from 'gatsby';
import { Link } from 'gatsby';

import Layout from '../containers/layout';
import Container from '../components/container';
import GraphQLErrorList from '../components/graphql-error-list';
// import SEO from '../components/seo';
import BlockContent from '../components/block-content';

import { buildImageObj } from '../lib/helpers';
import { imageUrlFor } from '../lib/image-url';

import styles from './service.module.css';

export const query = graphql`
  query ServiceTemplateQuery($id: String!) {
    service: sanityService(id: { eq: $id }) {
      id
      title
      slug {
        current
      }
      _rawBody
      mainImage {
        asset {
          _id
          url
          _rev
        }
        alt
        hotspot {
          _key
          _type
          x
          y
          height
          width
        }
        crop {
          _key
          _type
          top
          bottom
          left
          right
        }
      }
      serviceSubtypes {
        id
        name
      }
    }
  }
`;
const buildSubTypeList = (subtypes) =>
  subtypes.map((type) => {
    return (
      <li key={type} className={styles.li}>
        {type.name}
      </li>
    );
  });

const ServiceTemplate = (props) => {
  const { data, errors } = props;
  const subtypes = buildSubTypeList(data.service.serviceSubtypes);
  console.log(props);
  return (
    <Layout headline={data.service.title}>
      {errors && <SEO title="GraphQL Error" />}
      {/* {project && <SEO title={project.title || 'Untitled'} />} */}
      <div className={styles.parent_container}>
        <div className={styles.content_wrapper}>
          {data.service.mainImage && data.service.mainImage.asset && (
            <div className={styles.image_wrapper}>
              <img
                src={imageUrlFor(buildImageObj(data.service.mainImage))
                  .width(1500)
                  .height(Math.floor((9 / 16) * 800))
                  .saturation(-100)
                  .url()}
                alt={data.service.mainImage.alt}
              />
            </div>
          )}
          <div className={styles.text_wrapper}>
            {data.service._rawBody && <BlockContent blocks={data.service._rawBody || []} />}
            <ul className={styles.ul}>{subtypes}</ul>
          </div>
        </div>
        <Link to={`/`}>
          <button className={styles.responsiveButton}>Contact Us</button>
        </Link>
      </div>
      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}
    </Layout>
  );
};

export default ServiceTemplate;
