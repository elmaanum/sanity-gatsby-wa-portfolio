export default {
  widgets: [
    // {
    //   name: 'sanity-tutorials',
    //   options: {
    //     templateRepoId: 'sanity-io/sanity-template-gatsby-portfolio',
    //   },
    // },
    { name: 'structure-menu' },
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '',
                  title: 'Sanity Studio',
                  name: '',
                  apiId: '',
                },
                {
                  buildHookId: '',
                  title: 'Portfolio Website',
                  name: '',
                  apiId: '',
                },
              ],
            },
          },
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/elmaanum/sanity-gatsby-wa-portfolio',
            category: 'Code',
          },
          {
            title: 'Frontend',
            value: '',
            category: 'apps',
          },
        ],
      },
    },
    {
      name: 'document-list',
      options: { title: 'Projects', order: '_createdAt desc', types: ['project'] },
      layout: { width: 'medium' },
    },
  ],
};
