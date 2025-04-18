import { ReactNode } from 'react';
import { Divider, Skeleton, Table, TableCell, TableHead, TableRow } from '@plex-inc/bricks/components';

import { nullable } from '../../../utils/nullable';
import style from '../styles/table-list.module.css';
import { useIsMobile } from '../../../utils/useIsMobile';
import { cn } from '../../../utils/cn';

interface TableCellProps {
    content: ReactNode;
    className?: string;
    type?: string;
    width?: number | string;
}

interface TableList {
    error?: React.ReactNode;
    head?: TableCellProps[];
    heightSkeleton?: string;
    widthSkeleton?: string;
    rows: TableCellProps[][];
    isLoading: boolean;
    tableClassName?: string;
    className?: string;
}

export const TableList = ({
    error,
    head,
    rows,
    heightSkeleton = '50px',
    widthSkeleton = '100%',
    isLoading,
    tableClassName,
    className,
}: TableList) => {
    const { isDesktop } = useIsMobile();
    return (
        <Table className={tableClassName}>
            {nullable(
                !isLoading && !rows?.length,
                () => (
                    <span />
                ),
                nullable(head, (h) => (
                    <>
                        <TableHead className={style.table__head_row}>
                            {h.map((cell, index) => {
                                return (
                                    <TableCell key={index} className={cn(cell.className)} width={`${cell.width}px`}>
                                        {cell.content}
                                    </TableCell>
                                );
                            })}
                        </TableHead>
                        <Divider />
                    </>
                )),
            )}
            {nullable(
                !isLoading && !rows?.length,
                () => error,
                nullable(
                    isLoading,
                    () =>
                        [...new Array(5)].map((_, index) => (
                            <Skeleton height={heightSkeleton} width={widthSkeleton} key={index} />
                        )),
                    rows.map((list, index) => (
                        <TableRow key={index} className={className}>
                            {list.map((listItem, index) => {
                                return (
                                    <TableCell
                                        key={index}
                                        className={cn(listItem.className)}
                                        width={!isDesktop ? listItem.width : '100%'}
                                    >
                                        {listItem.content}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    )),
                ),
            )}
        </Table>
    );
};
