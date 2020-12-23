import React from 'react';
import GraphQLErrorList from '../components/graphql-error-list';
import SEO from '../components/seo';
import Layout from '../containers/layout';
import Container from '../components/container';
import ServicePreviewGrid from '../components/service-preview-grid';
import { mapEdgesToNodes } from '../lib/helpers';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        {serviceNodes && <ServicePreviewGrid nodes={serviceNodes}></ServicePreviewGrid>}
      </Container>
    </Layout>
  );
};

export default IndexPage;
