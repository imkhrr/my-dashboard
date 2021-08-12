import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { ButtonToolbar, Table, Icon, IconButton } from "rsuite";
import TablePagination from "rsuite/lib/Table/TablePagination";
import { itemsTable } from "../../../store/DataTable";
import { Storehouse } from "../../../store/Trans";

const { Column, HeaderCell, Cell } = Table;

const TableStockOpname = (props) => {

    const [tableData, setTableData] = useRecoilState(itemsTable);
    const setStorehouse = useSetRecoilState(Storehouse);

    const [length, setLength] = useState(10);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState(props.search);
    const [loading, setLoading] = useState(true);
    const request = { length, search }

    const handleChangePage = (e) => {
        console.log(e);
        setPage(e);
    };

    const handleChangeLength = (e) => {
        console.log(e);
        setLength(e);
        setPage(1);
    };

    const getData = useCallback(async (e) => {
        setSearch(props.search);
        setLoading(true);
        try {
            let { data } = await axios.post(`table/commodities?page=${page}`, request);
            setTableData(data);
            setLoading(false);
        } catch (e) {
            setLoading(false);
            console.log(e.response);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, length, search, props.search])

    useEffect(() => {
        getData();
    }, [getData]);



    return (
        <div>
            <Table loading={loading} data={tableData.data} height={400}>
                <Column width={50} align="center" fixed>
                    <HeaderCell>No.</HeaderCell>
                    <Cell>
                        {(rowData, rowIndex) => {
                            return rowIndex + 1;
                        }}
                    </Cell>
                </Column>
                <Column flexGrow={0.75}>
                    <HeaderCell>Kode Barang</HeaderCell>
                    <Cell dataKey="code" />
                </Column>
                <Column flexGrow={1.5}>
                    <HeaderCell>Nama Barang</HeaderCell>
                    <Cell dataKey="name" />
                </Column>
                <Column flexGrow={0.5} align="right">
                    <HeaderCell>Stok Lama</HeaderCell>
                    <Cell dataKey="stock" />
                </Column>
                <Column flexGrow={0.5}>
                    <HeaderCell>Stok Baru</HeaderCell>
                    <Cell dataKey="" />
                </Column>
                <Column flexGrow={1.5} align="center">
                    <HeaderCell>Action</HeaderCell>
                    <Cell>
                        {(rowData) => {

                            function handleRestock() {
                                setStorehouse({ type: 'opname', data: rowData });
                            }
                            return (
                                <div>
                                    <ButtonToolbar>
                                        <IconButton
                                            icon={<Icon icon="exchange" />}
                                            // color="blue"
                                            size="xs"
                                            onClick={handleRestock}
                                        >
                                            <span className="is-tablet">Update</span>
                                        </IconButton>
                                    </ButtonToolbar>
                                </div>
                            );
                        }}
                    </Cell>
                </Column>
            </Table>
            <TablePagination
                lengthMenu={[
                    { value: 10, label: 10 },
                    { value: 50, label: 50 },
                    { value: 100, label: 100 },
                    { value: tableData.total, label: "all" },
                ]}
                total={tableData.total}
                activePage={tableData.current_page}
                displayLength={tableData.per_page}
                onChangePage={handleChangePage}
                onChangeLength={handleChangeLength}

            />
        </div>
    );
};

export default TableStockOpname;
