import React from 'react';
import GraphQLErrorList from '../components/graphql-error-list';
import SEO from '../components/seo';
import Layout from '../containers/layout';
import Container from '../components/container';
import ServicePreviewGrid from '../components/service-preview-grid';
import { mapEdgesToNodes } from '../lib/helpers';

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
            asset {
              _id
            }
            alt
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
        {serviceNodes && <ServicePreviewGrid nodes={serviceNodes}></ServicePreviewGrid>}
      </Container>
    </Layout>
  );
};

export default IndexPage;
