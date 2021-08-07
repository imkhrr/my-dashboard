import React from "react";
import { Grid, Row, Col, Icon, Input, InputGroup } from "rsuite";
import TableSellTransactions from "../../components/tables/transactions/TableSellTransactions";

function SellTransactions() {

    return (
        <Grid fluid>
            <Row className="animate__animated animate__fadeIn">
                <Col xs={24} sm={24} md={24} className="px-0px">
                    <div className="pb-2 flex jc-sb">
                        <span className="t3 pr-1">Transaksi Terakhir</span>
                        <div className="flex jc-sb ai-c">
                            <InputGroup size="xs">
                                <Input placeholder="Search" />
                                <InputGroup.Addon>
                                    <Icon icon="search" />
                                </InputGroup.Addon>
                            </InputGroup>
                        </div>
                    </div>
                    <div className="pb-2" style={{ paddingTop: 3 }}>
                        <TableSellTransactions />
                    </div>
                </Col>
            </Row>
        </Grid>
    );
}

export default SellTransactions;