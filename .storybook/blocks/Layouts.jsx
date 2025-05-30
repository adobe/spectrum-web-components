import { styled } from '@storybook/theming';
import React from 'react';
import styles from '@spectrum-css/bundle/dist/index.module.css';

export const Container = styled.section`
    color: var(--spectrum-neutral-content-color-default);
    background-color: var(--spectrum-background-layer-1-color);
    display: ${(props) => props.display ?? 'flex'};
    padding-inline: 48px 24px;
    padding-block: 60px;
    flex-direction: column;
    align-items: flex-start;
    gap: ${(props) => props.gap ?? '60px'};
    border-radius: 16px;
`;

export const List = styled.div`
    display: grid;
    gap: 24px;
    grid-template-columns: 1fr auto;
    grid-template-rows: auto;
    align-items: center;
    justify-content: center;
`;

export const DList = styled.dl`
    display: grid;
    grid-template-columns: max-content 1fr;
    column-gap: 20px;
    row-gap: 14px;
    padding-block: 0.75rem;
    margin-block: 0.5rem 2.5rem;
    border-block: ${(props) =>
        !props.skipBorder ? '1px solid hsla(203deg, 50%, 30%, 15%)' : '0'};

    & & {
        border-block: 0px;
        margin-block: 0;
        padding-inline-start: 0.75rem;
        padding-block-start: 0.25rem;
    }

    details > & {
        margin-inline-start: 12px;
    }
`;

export const DTerm = styled.dt`
    font-weight: ${(props) => props.theme.typography.weight.bold ?? 'bold'};
    padding: 0;
    margin: 0;
    font-size: ${(props) => props.theme.typography.size.s};
`;

export const DDefinition = styled.dd`
    font-style: normal;
    padding: 0;
    margin: 0;
    font-size: ${(props) => props.theme.typography.size.s};
`;

export const Details = styled.details`
    cursor: pointer;
    grid-column: 1 / 3;
    padding: 0;

    &[open] > summary::before {
        transform: rotate(90deg);
    }
`;

export const Summary = styled.summary`
    display: inline-flex;
    align-items: center;
    font-weight: ${(props) => props.theme.typography.weight.bold ?? 'bold'};
    padding: 0;
    padding-block-end: 0.75rem;
    margin: 0;
    font-size: ${(props) => props.theme.typography.size.s};
    list-style: none;

    &::-webkit-details-marker {
        display: none;
    }

    &::before {
        content: '';
        width: 10px;
        height: 10px;
        background-image: url('data:image/svg+xml,<svg focusable="false" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><path d="M3 9.95a.875.875 0 0 1-.615-1.498L5.88 5 2.385 1.547A.875.875 0 0 1 3.615.302L7.74 4.377a.876.876 0 0 1 0 1.246L3.615 9.698A.87.87 0 0 1 3 9.95"></path></svg>');
        background-size: cover;
        margin-inline-end: 0.75em;
        transition: 0.2s;
    }
`;

export const Table = ({
    headers = [],
    rows = [],
    size = 'l',
    compact = false,
    spacious = false,
    ...props
}) => {
    return (
        <table
            className={[
                'sb-unstyled',
                styles._spectrum_table,
                styles[`_spectrum_table__size${size}`],
                compact ? styles._spectrum_table__compact : null,
                spacious ? styles._spectrum_table__spacious : null,
            ]
                .filter(Boolean)
                .join(' ')}
            {...props}
        >
            {headers.length > 0 ? (
                <thead className={styles._spectrum_table_head}>
                    <tr>
                        {headers.map((heading, idx) => (
                            <th
                                key={idx}
                                className={styles._spectrum_table_headcell}
                            >
                                {heading}
                            </th>
                        ))}
                    </tr>
                </thead>
            ) : null}
            <tbody className={styles._spectrum_table_body}>
                {rows.map((columns, idx) => (
                    <tr key={idx} className={styles._spectrum_table_row}>
                        {columns.map((col, i) => (
                            <td key={i} className={styles._spectrum_table_cell}>
                                {col}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
