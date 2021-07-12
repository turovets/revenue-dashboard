import React, { ReactNode } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import './Table.scss';

export interface TableColumn {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'center';
  format?: (value: number) => string;
}

const useStyles = makeStyles({
  container: {
    maxHeight: 570,
    boxShadow: '0 2px 4px 0 rgba(238, 238, 238, 0.5)',
    marginBottom: '30px',
  },
});

type StickyHeadTableProps = {
  noDataMsg: string;
  rows: any[];
  columns: TableColumn[];
  children?: ReactNode;
}

const StickyHeadTable = ({ rows, columns, noDataMsg, children }: StickyHeadTableProps) => {
  const classes = useStyles();

  if (!rows.length && noDataMsg) {
    return (
      <>
        {children}
        <div className="Table-no-data-msg">{noDataMsg}</div>
      </>
    )
  }

  return (
    <>
      {children}
      <TableContainer className={classes.container}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                  {columns.map((column) => {
                    //@ts-ignore
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default StickyHeadTable;
