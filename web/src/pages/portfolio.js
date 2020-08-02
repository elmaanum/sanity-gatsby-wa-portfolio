import React from 'react';
import GraphQLErrorList from '../components/graphql-error-list';
import Layout from '../containers/layout';

const PortfolioPage = (props) => {
  const { errors } = props;
  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  return (
    <Layout headline="Portfolio">
      <div>Here's a Portfolio:</div>
      <div>[pictures of buildings]</div>
    </Layout>
  );
};

export default PortfolioPage;
