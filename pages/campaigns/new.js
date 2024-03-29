import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { FormField, Button, Form, Input, Message } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import factory from "../../ethereum/factory";
import web3 from '../../ethereum/web3';
import { useRouter } from 'next/router';

const CampaignNew = () => {
    const router = useRouter(); // Initialize the router
    const [minimumContribution, setMinimumContribution] = useState("");
    const [errorMessage, seterrorMessage] = useState("")
    const [loading, setloading] = useState(false)
    const onSubmit = async (event) => {
        event.preventDefault();
        setloading(true);
        seterrorMessage("");
        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods
                .createCampaign(minimumContribution)
                .send({
                    from: accounts[0]
                });
            router.push('/');
        } catch (error) {
            seterrorMessage(error.message);
        }
        setloading(false);
    };

    return (
        <Layout>
            <h3>Create a Campaign</h3>
            <Form onSubmit={onSubmit} error={!!errorMessage}>
                <FormField>
                    <Input
                        label="wei"
                        labelPosition='right'
                        value={minimumContribution}
                        onChange={(event) => setMinimumContribution(event.target.value)}
                    />
                </FormField>
                <Message error header="Oops!" content={errorMessage} />
                <Button loading={loading} type='submit' primary>Create</Button>
            </Form>
        </Layout>
    );
};

export default CampaignNew;
