import { useOf } from '@storybook/blocks';
import { ResetWrapper } from '@storybook/components';
import { styled } from '@storybook/theming';
import React, { useEffect, useState } from 'react';

import { Body, Code, Heading } from './Typography.jsx';
import { DDefinition, DList, DTerm } from './Layouts.jsx';
import { fetchToken } from './utilities.js';

import AdobeSVG from '../assets/images/adobe_logo.svg?raw';
import GitHubSVG from '../assets/images/github_logo.svg?raw';
import NpmSVG from '../assets/images/npm_logo.svg?raw';
import WCSVG from '../assets/images/wc_logo.svg?raw';

export const DSet = ({ term, children }) => {
    return (
        <>
            <DTerm>
                <Code style={{ display: 'inline-block' }}>{term}</Code>
            </DTerm>
            <DDefinition>{children}</DDefinition>
        </>
    );
};

export const StatusLight = styled.span(
    ({ variant = 'positive', ...props }) => `
	border-radius: 50%;
	vertical-align: middle;
	/* Scale this in relation to the typography */
	block-size: 0.6rem;
	inline-size: 0.6rem;
	background-color: ${fetchToken(`${variant}-visual-color`)};
	display: inline-block;
	line-height: 2;
	margin-inline-end: ${['l', 'xl'].includes(props.size) ? 10 : 8}px;
	margin-block-end: 1px;
`
);

export const ResourceSection = styled.section`
    display: flex;
    flex-flow: row wrap;
    align-items: center;
`;

export const ResourceLink = styled.a`
    position: relative;
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    margin-block-end: 16px;
    margin-inline-end: 16px;
    box-sizing: border-box;
    text-decoration: none;
    min-inline-size: 100px;
    border: 1px solid transparent;
    border-radius: 5px;
    border-color: rgb(230, 230, 230);
    overflow: hidden;
    color: rgb(0, 0, 0);
    background-color: rgba(255 255 255 / 80%);

    &:hover {
        border-color: rgb(213, 213, 213);
    }
`;

export const ResourceIconWrapper = styled.div`
    background-color: rgba(248, 248, 248);
    padding: 12px;
    display: flex;
    inline-size: 40px;
    block-size: 40px;
`;

export const ResourceTextWrapper = styled.div`
    margin-inline: 16px;
`;

const VersionDetails = ({
    tag,
    data = {},
    isDeprecated = false,
    skipDate = false,
    skipLink = false,
}) => {
    let statusType = 'notice';
    let statusMessage = 'Not yet available on the npm registry.';

    if (isDeprecated) {
        statusType = 'negative';
        statusMessage = 'Deprecated; no longer maintained.';
    } else if (data.date) {
        statusType = 'positive';
        statusMessage = 'Available on the npm registry.';
    }

    if (!isDeprecated && tag !== 'latest') {
        statusType = 'notice';
        statusMessage = `Available on the npm registry but not recommended for production use.`;
    }

    if (tag === 'local') {
        statusType = 'negative';
        statusMessage = `Not yet published to the npm registry.`;
    }

    return (
        <>
            <StatusLight variant={statusType} title={statusMessage} />
            {!skipLink && data.link ? (
                <a href={data.link} rel="noopener noreferrer">
                    {data.version}
                </a>
            ) : (
                data.version
            )}
            {!skipDate && data.date ? ` ${data.date}` : ''}
        </>
    );
};

/**
 * Process the npm data to determine the versions to display.
 * @param {object>} storyMeta
 * @param {object} npmData
 * @returns
 */
function processReleaseData(storyMeta, npmData) {
    const previewURL = 'https://www.npmjs.org/package/';

    const packageJson = storyMeta?.csfFile?.meta?.parameters?.packageJson ?? {};
    const ignoredTags = storyMeta?.csfFile?.meta?.parameters?.ignoredTags ?? [];

    const tags = [
        // Force "local" to be included in the list because we won't fetch it from npm
        // but we want to show it in the list of tags
        'local',
        ...Object.keys(npmData?.['dist-tags'] ?? {}),
    ].filter((tag) => !ignoredTags.includes(tag));

    const mapVersions = new Map();
    for (const tag of tags) {
        let version =
            npmData?.versions?.[npmData?.['dist-tags']?.[tag]]?.version;
        let date = npmData?.time?.[npmData?.['dist-tags']?.[tag]]
            ? 'published ' +
              new Date(
                  npmData?.time?.[npmData?.['dist-tags']?.[tag]]
              ).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: '2-digit',
              })
            : null;
        const link = npmData?.['dist-tags']?.[tag]
            ? `${previewURL}${packageJson.name}/v/${npmData?.['dist-tags']?.[tag]}`
            : null;

        // Prefer the version from the package.json file if this is the "local" tag
        if (tag === 'local') {
            version = packageJson?.version;
            date = 'unpublished';
        }

        mapVersions.set(tag, {
            version,
            date,
            link,
        });
    }

    const allVersions = [...mapVersions.entries()].sort(
        ([aTag, a], [bTag, b]) => {
            // Sort the local tag to the top, followed by the latest tag
            // then sort the rest of the tags by date in descending order
            if (aTag === 'local') return -1;
            if (bTag === 'local') return 1;
            if (aTag === 'latest') return -1;
            if (bTag === 'latest') return 1;
            return new Date(b.date) - new Date(a.date);
        }
    );

    // Remove the local tag from the list if the latest tag is available and it's larger than the local tag using semver
    if (tags.includes('local') && tags.includes('latest')) {
        const localVersion = allVersions.find(([tag]) => tag === 'local')?.[1]
            ?.version;
        const latestVersion = allVersions.find(([tag]) => tag === 'latest')?.[1]
            ?.version;
        if (localVersion && latestVersion && localVersion === latestVersion) {
            allVersions.splice(
                allVersions.findIndex(([tag]) => tag === 'local'),
                1
            );
        } else if (
            localVersion &&
            latestVersion &&
            localVersion !== latestVersion
        ) {
            // Check if the local version is a lower semver than the latest version
            const localSemver = localVersion.split('.');
            const latestSemver = latestVersion.split('.');
            const localMajor = parseInt(localSemver[0]);
            const latestMajor = parseInt(latestSemver[0]);
            if (localMajor < latestMajor) {
                allVersions.splice(
                    allVersions.findIndex(([tag, data]) => tag === 'local'),
                    1
                );
            } else if (localMajor === latestMajor) {
                const localMinor = parseInt(localSemver[1]);
                const latestMinor = parseInt(latestSemver[1]);
                if (localMinor < latestMinor) {
                    allVersions.splice(
                        allVersions.findIndex(([tag, data]) => tag === 'local'),
                        1
                    );
                } else if (localMinor === latestMinor) {
                    const localPatch = parseInt(localSemver[2]);
                    const latestPatch = parseInt(latestSemver[2]);
                    if (localPatch < latestPatch) {
                        allVersions.splice(
                            allVersions.findIndex(
                                ([tag, data]) => tag === 'local'
                            ),
                            1
                        );
                    }
                }
            }
        }
    }

    // A boolean to determine if the local version should be shown based on if it still exists in the list of all versions
    const showLocalVersion = allVersions.find(([tag]) => tag === 'local');

    return {
        showLocalVersion,
        allVersions,
    };
}

function initCache(key) {
    const [cache, setCache] = useState(
        JSON.parse(localStorage.getItem(key)) ?? {}
    );

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(cache));
        } catch (error) {
            /* empty */
        }
    }, [key, cache]);

    return [cache, setCache];
}

function fetchNpmData(packageName, setnpmData, setIsLoading) {
    const [cache, setCache] = initCache(packageName);

    // Capture the npm data for the component from the registry
    useEffect(() => {
        if (typeof cache === 'object' && Object.keys(cache).length > 0) {
            setnpmData(cache);
            setIsLoading(false);
            return;
        }

        fetch('https://registry.npmjs.org/' + packageName)
            .then(async (response) => {
                if (!response.ok) {
                    console.warn(`Failed to fetch npm data for ${packageName}`);
                    return;
                }

                const json = await response.json();

                if (!json) {
                    console.warn(`Failed to fetch npm data for ${packageName}`);
                    return;
                }

                setnpmData(json);
                setCache(json);
                setIsLoading(false);
            })
            .catch((error) => {
                console.warn(error?.message ?? error);
            });
    }, [cache, setCache, packageName, setnpmData, setIsLoading]);
}

const fetchLogo = (brand) => {
    switch (brand) {
        case 'npm':
            return NpmSVG;
        case 'GitHub':
            return GitHubSVG;
        case 'Adobe':
            return AdobeSVG;
        case 'WC':
            return WCSVG;
    }

    return;
};

/**
 * Displays a resource card containing text and an image that links to a particular resource.
 *
 * @param {string} heading - heading of the resource card
 * @param {string} alt - additional description of the resource card
 * @param {string} image - the SVG image
 * @param {string} href - optional link to the resource, found in packageJson?.spectrum?.guidelines
 * @returns {string}
 */
export const ResourceLinkContent = ({ heading, alt, logo, href }) => {
    if (!href) return;

    return (
        <ResourceLink href={href} className="sb-unstyled" title={alt}>
            <ResourceIconWrapper
                dangerouslySetInnerHTML={{ __html: fetchLogo(logo) }}
            />
            <ResourceTextWrapper>
                {heading ? <Heading size="xs">{heading}</Heading> : ''}
                {alt ? <Body size="s">{alt}</Body> : ''}
            </ResourceTextWrapper>
        </ResourceLink>
    );
};

/**
 * Displays the list of relevant component links (to NPM, repo, guidelines, etc).
 *
 * The rootClassName is read from the story's default args, found in the story's metadata.
 *
 * The for loop is particularly helpful to match guidelines links for any nested components
 * (i.e. meter, form). We need to check that the rootClassName matches the rootClass found
 * in the packageJson.spectrum, to link to the correct guidelines page.
 *
 * Deprecated components should not show a GitHub resource card.
 *
 * @param {string} packageName - packageName sourced from packageJson?.name
 * @param {string[]} spectrumData - an array of objects sourced from packageJson?.spectrum
 * @param {string} rootClassName - a component's default rootClass arg
 * @returns {string}
 */
export const ResourceListDetails = ({
    packageName,
    spectrumData = [],
    rootClassName,
    isDeprecated,
}) => {
    if (!packageName) return;

    let swc, href;

    for (let i = 0; i < spectrumData?.length; i++) {
        const thisComponent =
            !spectrumData[i]?.rootClass ||
            spectrumData[i]?.rootClass === rootClassName;
        if (spectrumData[i]?.guidelines && thisComponent) {
            href = spectrumData[i]?.guidelines;
        }

        if (spectrumData[i]?.swc && thisComponent) {
            swc = spectrumData[i]?.swc;
        }
    }

    return (
        <ResourceSection className="sb-unstyled">
            {href ? (
                <ResourceLinkContent
                    className="doc-block-resource-cards"
                    heading="Design guidelines"
                    alt="Spectrum website"
                    logo="Adobe"
                    href={href}
                />
            ) : (
                ''
            )}
            {swc ? (
                <ResourceLinkContent
                    className="doc-block-resource-cards"
                    heading="Web components"
                    alt="Spectrum web components"
                    logo="WC"
                    href={swc}
                />
            ) : (
                ''
            )}
            <ResourceLinkContent
                className="doc-block-resource-cards"
                heading="View package"
                alt="npm"
                logo="npm"
                href={`https://npmjs.com/${packageName}`}
            />
            {!isDeprecated ? (
                <ResourceLinkContent
                    className="doc-block-resource-cards"
                    heading="View repository"
                    alt="GitHub"
                    logo="GitHub"
                    href={`https://github.com/adobe/spectrum-css/tree/main/components/${packageName.split('/').pop()}`}
                />
            ) : (
                ''
            )}
        </ResourceSection>
    );
};

/**
 * Displays the current version number of the component. The version is read from
 * the component's parameters, where it was sourced from the package.json file.
 *
 * Displays a component status of "deprecated" if it is set in the story's
 * parameters.
 *
 * Displays the list of relevant component links (to NPM, repo, guidelines, etc).
 *
 * Usage of this doc block within MDX template(s):
 *  <ComponentDetails />
 */
export const ComponentDetails = () => {
    const storyMeta = useOf('meta');

    const isDeprecated =
        storyMeta?.csfFile?.meta?.parameters?.status?.type == 'deprecated';
    const packageJson = storyMeta?.csfFile?.meta?.parameters?.packageJson ?? {};
    const rootClassName = storyMeta?.csfFile?.meta?.args?.rootClass ?? '';

    const packageName = packageJson?.name;

    if (!packageName) return;

    let spectrumData = packageJson?.spectrum;
    if (typeof spectrumData === 'string') {
        spectrumData = [spectrumData];
    }

    const [isLoading, setIsLoading] = useState(true);
    const [npmData, setnpmData] = useState({});

    fetchNpmData(packageJson.name, setnpmData, setIsLoading);

    const { showLocalVersion, allVersions } = processReleaseData(
        storyMeta,
        npmData
    );

    return (
        <ResetWrapper>
            {!isLoading ? (
                <>
                    <DList className="docblock-metadata sb-unstyled">
                        {isDeprecated ? (
                            <>
                                <DTerm key={'status'}>Status:</DTerm>
                                <DDefinition key={'status-data'}>
                                    Deprecated
                                </DDefinition>
                            </>
                        ) : (
                            ''
                        )}
                        {showLocalVersion ? (
                            <>
                                <DTerm key={'version-label'}>
                                    Local version:
                                </DTerm>
                                <DDefinition key={'version'}>
                                    <VersionDetails
                                        tag={'local'}
                                        data={
                                            allVersions &&
                                            allVersions.find(
                                                ([tag]) => tag === 'local'
                                            )?.[1]
                                        }
                                        isDeprecated={isDeprecated}
                                    />
                                </DDefinition>
                            </>
                        ) : (
                            <>
                                <DTerm key={'version-label'}>
                                    Latest version:
                                </DTerm>
                                <DDefinition key={'version'}>
                                    <VersionDetails
                                        tag={'latest'}
                                        data={
                                            allVersions &&
                                            allVersions.find(
                                                ([tag]) => tag === 'latest'
                                            )?.[1]
                                        }
                                        isDeprecated={isDeprecated}
                                        skipLink={true}
                                    />
                                </DDefinition>
                            </>
                        )}
                    </DList>
                    <ResourceListDetails
                        packageName={packageName}
                        spectrumData={spectrumData}
                        rootClassName={rootClassName}
                        isDeprecated={isDeprecated}
                    />
                </>
            ) : (
                ''
            )}
        </ResetWrapper>
    );
};

/**
 * Displays the tagged releases of the component. The tagged releases are read from npm.
 *
 * Usage of this doc block within MDX template(s):
 *  <TaggedReleases />
 */
export const TaggedReleases = () => {
    const storyMeta = useOf('meta');

    const isDeprecated =
        storyMeta?.csfFile?.meta?.parameters?.status?.type == 'deprecated';
    const packageJson = storyMeta?.csfFile?.meta?.parameters?.packageJson ?? {};

    const [isLoading, setIsLoading] = useState(true);
    const [npmData, setnpmData] = useState({});

    fetchNpmData(packageJson.name, setnpmData, setIsLoading);

    const { allVersions } = processReleaseData(storyMeta, npmData);

    return (
        <ResetWrapper>
            {!isLoading ? (
                <DList
                    skipBorder={true}
                    className="docblock-releases sb-unstyled"
                >
                    {allVersions
                        .filter(([tag]) => tag !== 'local')
                        .map(([tag, data], idx) => (
                            <DSet key={`${tag}-${idx}`} term={tag}>
                                <VersionDetails
                                    tag={tag}
                                    data={data}
                                    isDeprecated={isDeprecated}
                                    skipDate={true}
                                />
                            </DSet>
                        ))}
                </DList>
            ) : (
                ''
            )}
        </ResetWrapper>
    );
};

export default ComponentDetails;
