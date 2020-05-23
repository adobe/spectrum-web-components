let url = '/';

switch (process.env.CONTEXT) {
    case 'production':
        url = process.env.URL;
        break;
    case 'deploy-preview':
        url = process.env.DEPLOY_URL;
        break;
    case 'branch-deploy':
        url = process.env.DEPLOY_PRIME_URL;
        break;
    default:
        break;
}

module.exports = {
    name: 'Spectrum Web Components',
    shortDesc:
        'Spectrum Web Components provide interface components as custom elements to help teams work more efficiently and to make applications more consistent.',
    url,
};
