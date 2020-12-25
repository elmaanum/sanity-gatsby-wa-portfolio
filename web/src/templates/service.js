import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../containers/layout';
import Container from '../components/container';
import GraphQLErrorList from '../components/graphql-error-list';
import HeroImage from '../components/hero';
import Project from '../components/project';
import SEO from '../components/seo';
import styles from './service.module.css';

const ServiceTemplate = (props) => {
  const { data, errors } = props;
  const { projects, service } = data;

  return (
    <Layout headline={service.title}>
      {errors && <SEO title="GraphQL Error" />}
      {service && (
        <HeroImage
          imageFluid={service.mainImage}
          imageText={service._rawBody}
          imageTextList={service.serviceSubtypes}
          buttonText={'Contact Us'}
          buttonLinkTo={'/about-us'}
          buttonStyle={styles.responsiveButton}
        />
      )}
      {projects.nodes && <Project projects={projects} />}
      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}
    </Layout>
  );
};

export default ServiceTemplate;

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
        title
        _rawDescription
        images {
          _key
          _type
          caption
          alt
          priority
          asset {
            _id
            url
            fluid(maxWidth: 1300, maxHeight: 650) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
