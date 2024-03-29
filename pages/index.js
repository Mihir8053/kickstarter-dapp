import React from 'react';
import factory from "../ethereum/factory";
import 'semantic-ui-css/semantic.min.css'
import { CardGroup, Button } from 'semantic-ui-react'
import Layout from '../components/Layout';
import Link from 'next/link';

const Index = ({ campaigns }) => {
    const renderCampaigns = () => {
        const items = campaigns.map(address => {
            return {
                header: address,
                description: (
                    <Link href={`/campaigns/${address}`} legacyBehavior>
                        <a>View Campaign</a>
                    </Link >
                ), // Adjust this as needed
                fluid: true
            };
        });
        return <CardGroup items={items} />;
    };

    return (
        <Layout>
            <div>
                <h1>Campaign list page</h1>
                <h3>Open Campaigns</h3>
                <Link href="/campaigns/new" legacyBehavior>
                    <a className='item'>
                        <Button floated='right' content='Create Campaign' icon='add circle' primary />
                    </a>
                </Link>
                {renderCampaigns()}
            </div>
        </Layout>
    );
};

Index.getInitialProps = async (ctx) => {
    try {
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        console.log(campaigns);
        return { campaigns };
    } catch (error) {
        console.error('Error fetching campaigns:', error);
        return { campaigns: [] };
    }
};

export default Index;
