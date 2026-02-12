export const formatComponentName = (
    title: string,
    typeCase: 'kebab' | 'pascal' = 'kebab'
) => {
    const formattedComponentName = title
        .split('/')
        .pop()
        ?.toLowerCase()
        .replace(/\s+/g, '-');

    if (typeCase === 'pascal') {
        return formattedComponentName
            ?.split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join('');
    }
    return formattedComponentName;
};
