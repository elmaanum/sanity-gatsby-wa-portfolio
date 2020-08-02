import React from 'react';
import { graphql } from 'gatsby';
import GraphQLErrorList from '../components/graphql-error-list';
import Layout from '../containers/layout';

export const query = graphql`
  query PortfolioPageQuery {
    services: allSanityService {
      nodes {
        title
        slug {
          current
        }
      }
    }
  }
`;

const PortfolioPage = (props) => {
  const { data, errors } = props;
  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const services = (data || {}).services.nodes;
  
  return (
    <Layout services={services} headline="Portfolio">
      <div>Here's a Portfolio:</div>
      <div>[pictures of buildings]</div>
    </Layout>
  );
};

export default PortfolioPage;
