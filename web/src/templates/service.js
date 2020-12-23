import React from 'react';

import { graphql } from 'gatsby';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

import Layout from '../containers/layout';
import Container from '../components/container';
import GraphQLErrorList from '../components/graphql-error-list';
import BlockContent from '../components/block-content';
// import SEO from '../components/seo';

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
          fluid(maxHeight: 325) {
            ...GatsbySanityImageFluid
          }
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
    projects: allSanityProject(filter: { serviceTypes: { elemMatch: { id: { eq: $id } } } }) {
      nodes {
        id
        images {
          _key
          _type
          caption
          alt
          priority
          asset {
            _id
            url
            fluid(maxWidth: 1300) {
              ...GatsbySanityImageFluid
            }
          }
        }
        title
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
  const { service } = data;
  const subtypes = buildSubTypeList(service.serviceSubtypes);

  return (
    <Layout headline={service.title}>
      {errors && <SEO title="GraphQL Error" />}

      <div className={styles.content_wrapper}>
        {service.mainImage && service.mainImage.asset && (
          <Img className={styles.image_wrapper} fluid={service.mainImage.asset.fluid}></Img>
        )}
        <div className={styles.text_wrapper}>
          {service._rawBody && <BlockContent blocks={service._rawBody || []} />}
          <ul className={styles.ul}>{subtypes}</ul>
        </div>
        <Link to={`/about-us`}>
          <button className={[styles.responsiveButton, styles.buttonAccent].join(' ')}>
            Contact Us
          </button>
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
