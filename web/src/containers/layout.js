import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import Layout from '../components/layout';

export const query = graphql`
  query LayoutQuery {
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

const LayoutContainer = (props) => (
  <StaticQuery
    query={query}
    render={(data) => {
      const services = (data || {}).services.nodes;
      return <Layout {...props} services={services} />;
    }}
  />
);

export default LayoutContainer;
