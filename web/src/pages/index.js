import React from 'react';
import GraphQLErrorList from '../components/graphql-error-list';
// import SEO from '../components/seo';
import Layout from '../containers/layout';

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
      {/* <SEO title="Whitten Associates" />
      <Container>
        <h1>Welcome to Whitten Associates</h1>
        <div>Site under construction!!</div>
      </Container> */}
      <div>Div 1 - Content</div>
      <div>Div 2 - Content</div>
    </Layout>
  );
};

export default IndexPage;
