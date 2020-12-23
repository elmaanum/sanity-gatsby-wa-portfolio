import React from 'react';
import GraphQLErrorList from '../components/graphql-error-list';
import Layout from '../containers/layout';
import Container from '../components/container';
import PersonInfo from '../components/personInfo';
import styles from './about-us.module.css';

const AboutUsPage = (props) => {
  const { errors, data } = props;
  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  return (
    <Layout headline="About Us">
      <Container>
        <div>
          [replace this div with component being created for Services Pages template] Our goal is to
          create exciting, innovative and successful communities and developments for our clients.
          Combining market research and analysis gives us the unique perspective to provide market
          responsive solutions. Our background includes extensive developer experience that provides
          our clients with a practical and realistic balance to all of their projects. This
          combination of strengths and experience gives us the ability to evaluate land for
          development as well as continue consulting services through the development process and
          successful conclusion.
        </div>
        <div className={styles.personListContainer}>
          {data.allSanityPerson.nodes.map((personData) => (
            <PersonInfo personData={personData} key={personData.slug.current} />
          ))}
        </div>
      </Container>
    </Layout>
  );
};

export default AboutUsPage;

export const query = graphql`
  {
    allSanityPerson {
      nodes {
        name
        credentials
        image {
          alt
          asset {
            url
          }
        }
        _rawBio
        slug {
          current
        }
      }
    }
  }
`;
