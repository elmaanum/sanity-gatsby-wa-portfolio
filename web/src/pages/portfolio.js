import React from 'react';
import Dropdown from 'react-dropdown';
import Layout from '../containers/layout';
import * as styles from './portfolio.module.css';
import Modal from '../components/modal.js';
import { buildImageObj } from '../lib/helpers';
import { imageUrlFor } from '../lib/image-url';
import ProjectViewer from '../components/project-viewer';
import { graphql } from 'gatsby';

import 'react-dropdown/style.css';
import '../styles/layout.css';

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
          _rawDescription
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

const createProjectTile = (project, onClickProject) => (
  <div className={styles.projectTile} key={project.slug}>
    <button>
      <img
        onClick={() => onClickProject(project)}
        className={styles.projectImage}
        src={imageUrlFor(buildImageObj(project.images[0])).height(300).width(350).fit('fill').url()}
      />
    </button>
    <div className={`${styles.projectName} textH3`}>{project.title}</div>
    <div>{project.service}</div>
  </div>
);

class PortfolioPage extends React.Component {
  state = { projectsList: [], showModal: false, selectedProject: undefined };

  componentWillMount = () => {
    this.allProjects = this.props.data.allSanityProject.edges.map(({ node }) => ({
      title: node.title,
      slug: node.slug.current,
      images: node.images.sort((a, b) => (a.priority < b.priority ? 1 : -1)),
      service: node.serviceTypes[0] ? node.serviceTypes[0].title : '',
      description: node._rawDescription,
    }));

    let serviceSet = new Set(
      []
        .concat(...this.props.data.allSanityProject.edges.map((edge) => edge.node.serviceTypes))
        .map((item) => item.title),
    );
    this.serviceArray = ['all', ...serviceSet];
    this.updateProjectList('all');
  };

  _onSelectServiceType = (event) => this.updateProjectList(event.value);

  _onClickProject = (project) => {
    this.setState({
      showModal: true,
      selectedProject: project,
    });
  };

  _onClickClose = () => {
    this.setState({
      showModal: false,
      selectedProject: undefined,
    });
  };

  updateProjectList = (value) => {
    this.setState({
      projectsList:
        value == 'all'
          ? this.allProjects
          : this.allProjects.filter((project) => project.service == value),
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
            onChange={this._onSelectServiceType}
            value={'all'}
          />
          <pre>&nbsp;projects</pre>
        </div>
        <div className={styles.projectsListContainer}>
          {this.state.projectsList.map((project) =>
            createProjectTile(project, this._onClickProject),
          )}
        </div>
        {this.state.showModal && (
          <Modal>
            <ProjectViewer project={this.state.selectedProject} closeViewer={this._onClickClose} />
          </Modal>
        )}
      </Layout>
    );
  }
}

export default PortfolioPage;
