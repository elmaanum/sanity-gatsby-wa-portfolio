import React from 'react';
import { Link } from 'gatsby';
import GraphQLErrorList from '../components/graphql-error-list';
// import SEO from '../components/seo';
import Layout from '../containers/layout';
import Container from '../components/container';
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

const IndexPage = (props) => {
  const { errors } = props;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  return (
    <Layout>
      {/* <SEO title="Whitten Associates" /> */}
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
          {services.map((service) => createServiceCard(service))}
        </div>
        <div className={styles.logoList}>
          {logoImages.map((logo) => createLogoCard(logo, 'client logo'))}
        </div>
      </Container>
    </Layout>
  );
};

export default IndexPage;
