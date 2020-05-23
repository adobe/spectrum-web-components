import { TabList } from '@spectrum-web-components/bundle';

const tabs = document.querySelector('sp-tab-list') as TabList;
tabs.addEventListener('change', (e) => {
    const target = e.target as TabList;
    const { selected } = target;
    const { pathname } = location;
    const isAPI = pathname.search('api') > -1;
    switch (selected) {
        case 'api': {
            if (isAPI) return;
            const dest = (pathname + '/api/').replace('//a', '/a');
            history.pushState({}, document.title, dest);
            break;
        }
        case 'examples': {
            if (!isAPI) return;
            const dest = pathname.split('/api')[0] + '/';
            history.pushState({}, document.title, dest);
            break;
        }
    }
});
