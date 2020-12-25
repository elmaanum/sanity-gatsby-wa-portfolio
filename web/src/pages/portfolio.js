import React from 'react';
import Layout from '../containers/layout';
import styles from './portfolio.module.css';
import { buildImageObj } from '../lib/helpers';
import { imageUrlFor } from '../lib/image-url';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

export const query = graphql`
  query PortfolioPageQuery {
    allSanityProject {
      edges {
        node {
          title
          slug {
            current
          }
          serviceTypes {
            title
          }
          images {
            _key
            _type
            priority
            crop {
              top
              bottom
              left
              right
            }
            asset {
              id
              _id
            }
            hotspot {
              x
              y
              height
              width
            }
          }
        }
      }
    }
  }
`;

const createProjectTile = (project) => (
  <div className={styles.projectTile}>
    <img
      className={styles.projectImage}
      src={imageUrlFor(buildImageObj(project.image)).height(300).width(300).fit('fill').url()}
    />
    <div className={`${styles.projectName} textH3`}>{project.title}</div>
    <div>{project.service}</div>
  </div>
);

class PortfolioPage extends React.Component {
  state = { projectsList: [] };

  componentWillMount = () => {
    this.allProjects = this.props.data.allSanityProject.edges.map(({ node }) => ({
      title: node.title,
      slug: node.slug.current,
      image: node.images.reduce((max, image) => (max.priority > image.priority ? max : image)),
      service: node.serviceTypes[0] ? node.serviceTypes[0].title : '',
    }));

    let serviceSet = new Set(
      []
        .concat(...this.props.data.allSanityProject.edges.map((edge) => edge.node.serviceTypes))
        .map((item) => item.title),
    );
    this.serviceArray = ['all', ...serviceSet];
  };

  _onSelect = (event) => {
    this.setState({
      projectsList:
        event.value == 'all'
          ? this.allProjects
          : this.allProjects.filter((project) => project.service == event.value),
    });
  };

  render() {
    return (
      <Layout headline="Portfolio">
        <div className={styles.selectionLine}>
          <pre>Show me&nbsp;</pre>
          <Dropdown
            className={styles.dropdown}
            options={this.serviceArray}
            onChange={this._onSelect}
            value={'all'}
          />
          <pre>&nbsp;projects</pre>
        </div>
        <div className={styles.projectsListContainer}>
          {this.state.projectsList.map((project) => createProjectTile(project))}
        </div>
      </Layout>
    );
  }
}

export default PortfolioPage;
