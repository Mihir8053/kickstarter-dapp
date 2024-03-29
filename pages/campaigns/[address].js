import React from 'react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import { CardGroup, Grid, GridColumn, Button, GridRow } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import Link from 'next/link';

const CampaignShow = ({ minimumContribution, balance, requestCount, approversCount, manager, address }) => {
    const renderCards = () => {
        const items = [
            {
                header: manager,
                meta: "Address of manager",
                description: "Manager created this campaign and can create request to withdraw money",
                style: { overflowWrap: "break-word" }
            },
            {
                header: minimumContribution,
                meta: "Minimum contribution",
                description: "You must contribute at least this much wei to become approver"
            },
            {
                header: requestCount,
                meta: "Number of request",
                description: "A request tries to withdraw money from the contract. Request must be approved by approvers"
            },
            {
                header: approversCount,
                meta: "number of approvers",
                description: "number of people who have already donated to the campaign"
            },
            {
                header: web3.utils.fromWei(balance, "ether"),
                meta: "Campaign balance (ether)",
                description: "How much money this campaign has left to spend."
            }
        ];
        return <CardGroup items={items} />;
    };

    return (
        <Layout>
            <h3>Campaign Show</h3>
            <Grid>
                <GridRow>
                    <GridColumn width={10}>
                        {renderCards()}
                    </GridColumn>
                    <GridColumn width={6}>
                        <ContributeForm address={address} />
                    </GridColumn>
                </GridRow>
                <GridRow>
                    <GridColumn>
                        <Link href={`/campaigns/${address}/requests`} legacyBehavior>
                            <a >
                                <Button primary >View Requests</Button>
                            </a>
                        </Link>
                    </GridColumn>
                </GridRow>
            </Grid>
        </Layout>
    );
};

CampaignShow.getInitialProps = async ({ query }) => {
    const address = query.address;
    const campaign = await Campaign(address);
    const summary = await campaign.methods.getSummary().call();

    // Convert BigInt values to strings
    const minimumContribution = summary[0].toString();
    const balance = summary[1].toString();
    const requestCount = summary[2].toString();
    const approversCount = summary[3].toString();
    const manager = summary[4];

    return { minimumContribution, balance, requestCount, approversCount, manager, address: address };
};

export default CampaignShow;
