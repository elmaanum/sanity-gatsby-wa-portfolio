import React from 'react';
import { graphql } from 'gatsby';
// import {
//   mapEdgesToNodes,
//   filterOutDocsWithoutSlugs,
//   filterOutDocsPublishedInTheFuture,
// } from '../lib/helpers';
// import Container from '../components/container';
import GraphQLErrorList from '../components/graphql-error-list';
// import ProjectPreviewGrid from '../components/project-preview-grid';
// import SEO from '../components/seo';
import Layout from '../containers/layout';

export const query = graphql`
  query IndexPageQuery {
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

// export const query = graphql`
//   query IndexPageQuery {
//     site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
//       title
//       subtitle
//       description
//       keywords
//     }
//     projects: allSanityProject(
//       limit: 6
//       sort: { fields: [title], order: DESC }
//       filter: { slug: { current: { ne: null } }}
//     ) {
//       edges {
//         node {
//           id
//           mainImage {
//             crop {
//               _key
//               _type
//               top
//               bottom
//               left
//               right
//             }
//             hotspot {
//               _key
//               _type
//               x
//               y
//               height
//               width
//             }
//             asset {
//               _id
//             }
//             alt
//           }
//           title
//           _rawExcerpt
//           slug {
//             current
//           }
//         }
//       }
//     }
//   }
// `;

const IndexPage = (props) => {
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
    <Layout services={services}>
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
