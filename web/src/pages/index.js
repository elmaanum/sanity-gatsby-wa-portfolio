import React from 'react';
import { Link } from 'gatsby';
import GraphQLErrorList from '../components/graphql-error-list';
import SEO from '../components/seo';
import Layout from '../containers/layout';
import Container from '../components/container';

// branch
import ServicePreviewGrid from '../components/service-preview-grid';
import { mapEdgesToNodes } from '../lib/helpers';
//

import heroImage from '../assets/indexHeroImage.jpg';
import logo1 from '../assets/logo1.png';
import logo2 from '../assets/logo2.png';
import logo3 from '../assets/logo3.png';
import styles from './index.module.css';
import '../styles/custom-properties.css';

const services = ['Architecture', 'Land Consulting', 'Development Consulting', 'Planning'];
const accoladesText = ["they're just great", '40 projects', '50 combined years of experience'];
const logoImages = [logo1, logo2, logo3];

const createAccoladeCard = (text) => (
  <div className={styles.accoladeBox}>
    <div className={`${styles.accoladeText} textH3`}>{text}</div>
  </div>
);

const createServiceCard = (serviceName) => (
  <div className={styles.serviceCard}>
    <div className={`${styles.serviceCardHeader} textH3`}>{serviceName}</div>
    <Link className={styles.serviceCtaButton} to={`/${serviceName}`}>
      <div className={`button accent ${styles.serviceCtaButton}`}>Learn More</div>
    </Link>
  </div>
);

const createLogoCard = (logoUrl, altText) => (
  <div className={styles.logoBox}>
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
          {accoladesText.map((accolade) => createAccoladeCard(accolade))}
        </div>
        <div className={styles.serviceCardList}>
          {serviceNodes && <ServicePreviewGrid nodes={serviceNodes}></ServicePreviewGrid>}
        </div>
        <div className={styles.logoList}>
          {logoImages.map((logo) => createLogoCard(logo, 'client logo'))}
        </div>
      </Container>
    </Layout>
  );
};

export default IndexPage;
