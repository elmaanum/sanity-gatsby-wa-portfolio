import React from 'react';
import Layout from '../containers/layout';
import { graphql } from 'gatsby';
import Container from '../components/container';
import GraphQLErrorList from '../components/graphql-error-list';
// import SEO from '../components/seo';

export const query = graphql`
  query ServiceTemplateQuery($id: String!) {
    service: sanityService(id: { eq: $id }) {
      id
      title
      slug {
        current
      }
    }
  }
`;

const ServiceTemplate = (props) => {
  const { data, errors } = props;
  console.log(data);
  return (
    <Layout headline={data.service.title}>
      <div>This is all about {data.service.title}</div>
      {errors && <SEO title="GraphQL Error" />}
      {/* {project && <SEO title={project.title || 'Untitled'} />} */}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}
    </Layout>
  );
};

export default ServiceTemplate;
