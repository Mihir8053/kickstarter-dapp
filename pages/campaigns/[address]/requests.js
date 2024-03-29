import React, { useState, useEffect } from 'react';
import Layout from '../../../components/Layout';
import Link from 'next/link';
import { Button, Table } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import Campaign from "../../../ethereum/campaign";
import web3 from '../../../ethereum/web3';


const RequestsIndex = ({ address, requests, requestCount, approversCount }) => {
    let approversCountString = approversCount.toLocaleString();
    let requestCountString = requestCount.toLocaleString();
    // const readyToFinalize = requests.approvalCount > approversCount / 2;
    const onApprove = async (index) => {
        const accounts = await web3.eth.getAccounts();
        const campaign = await Campaign(address);
        await campaign.methods.approveRequest(index).send({
            from: accounts[0]
        })
    }

    const onFinalize = async (index) => {
        const accounts = await web3.eth.getAccounts();
        const campaign = await Campaign(address);
        await campaign.methods.finalizeRequest(index).send({ from: accounts[0] });
    }

    return (
        <Layout>
            <h3>Requests</h3>
            <Link href={`/campaigns/${address}/new-request`} legacyBehavior>
                <a>
                    <Button primary floated='right' style={{ marginBottom: 10 }} > Add Request</Button>
                </a>
            </Link>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell>Recipient</Table.HeaderCell>
                        <Table.HeaderCell>Amount (in ether)</Table.HeaderCell>
                        <Table.HeaderCell>Approval Count</Table.HeaderCell>
                        <Table.HeaderCell>Approve</Table.HeaderCell>
                        <Table.HeaderCell>Finalize</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {requests.map((request, index) => (
                        <Table.Row key={index} disabled={request.complete} positive={BigInt(request.approvalCount) > BigInt(approversCount) / BigInt(2) ? true : false}>                            <Table.Cell>{request.description}</Table.Cell>
                            <Table.Cell>{request.recipient}</Table.Cell>
                            <Table.Cell>{web3.utils.fromWei(BigInt(request.value.replace(/,/g, '')), "ether")}</Table.Cell>
                            <Table.Cell>{request.approvalCount}/{approversCountString}</Table.Cell>
                            <Table.Cell>
                                {request.complete ? null :
                                    (<Button color="green" onClick={() => onApprove(index)}>Approve</Button>)
                                }
                            </Table.Cell>
                            <Table.Cell>
                                {request.complete ? null :
                                    (<Button color="teal" onClick={() => onFinalize(index)}>Finalize</Button>)
                                }
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
            <div>Found {requestCountString} requests</div>
        </Layout >
    );
};


RequestsIndex.getInitialProps = async ({ query }) => {
    const address = query.address;
    const campaign = await Campaign(address);
    const requestCount = await campaign.methods.getRequestsCount().call();
    const approversCount = await campaign.methods.approversCount().call();
    const requests = await Promise.all(Array(requestCount)
        .fill()
        .map(async (element, index) => {
            const request = await campaign.methods.requests(index).call();
            const convertedRequest = {};
            for (const key in request) {
                const value = request[key];
                convertedRequest[key] = value.toLocaleString();
            }
            return convertedRequest;
        })
    );

    return { address, requests, requestCount, approversCount };
};

export default RequestsIndex;