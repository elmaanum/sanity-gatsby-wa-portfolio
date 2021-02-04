import React from 'react';
import GraphQLErrorList from '../components/graphql-error-list';
// import SEO from '../components/seo';
import Layout from '../containers/layout';
import Container from '../components/container';
import ServicePreviewGrid from '../components/service-preview-grid';
import { mapEdgesToNodes } from '../lib/helpers';

import heroImage from '../assets/indexHeroImage.jpg';
import logo1 from '../assets/logo1.png';
import logo2 from '../assets/logo2.png';
import logo3 from '../assets/logo3.png';
import styles from './index.module.css';
import '../styles/custom-properties.css';

const accoladesText = ["they're just great", '40 projects', '50 combined years of experience'];
const logoImages = [logo1, logo2, logo3];

const createAccoladeCard = (text, key) => (
  <div className={styles.accoladeBox} key={key}>
    <div className={`${styles.accoladeText} textH3`}>{text}</div>
  </div>
);

const createLogoCard = (logoUrl, key, altText) => (
  <div className={styles.logoBox} key={key}>
    <img className={styles.logo} src={logoUrl} alt={altText} />
  </div>
);

export const query = graphql`
  query IndexPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }
    services: allSanityService {
      edges {
        node {
          id
          mainImage {
            priority
            asset {
              _id
              url
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
          title
          slug {
            current
          }
        }
      }
    }
  }
`;

const IndexPage = (props) => {
  const { data, errors } = props;
  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const site = (data || {}).site;
  const serviceNodes = (data || {}).services ? mapEdgesToNodes(data.services) : [];
  return (
    <Layout>
      {/*<SEO title={site.title} description={site.description} keywords={site.keywords} />*/}
      <Container>
        <div className={styles.hero}>
          <img
            className={styles.heroImage}
            src={heroImage}
            alt="Architecture team working with clients"
          />
          <div className={`${styles.heroText} textH1`}>
            Planning and architecture services to create innovative and successful communities
          </div>
        </div>
        <div className={styles.accoladeList}>
          {accoladesText.map((accolade, index) => createAccoladeCard(accolade, index))}
        </div>
        <div className={styles.serviceCardList}>
          {serviceNodes && <ServicePreviewGrid nodes={serviceNodes}></ServicePreviewGrid>}
        </div>
        <div className={styles.logoList}>
          {logoImages.map((logo, index) => createLogoCard(logo, index, 'client logo'))}
        </div>
      </Container>
    </Layout>
  );
};

export default IndexPage;
