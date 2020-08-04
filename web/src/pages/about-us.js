import React from 'react';
import GraphQLErrorList from '../components/graphql-error-list';
import Layout from '../containers/layout';

const AboutUsPage = (props) => {
  const { errors } = props;
  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  return (
    <Layout headline="About Us">
      <div>Here's info about us</div>
      <div>He's Tim. She's Heather. Together we make the Whitten Associates.</div>
    </Layout>
  );
};

export default AboutUsPage;
