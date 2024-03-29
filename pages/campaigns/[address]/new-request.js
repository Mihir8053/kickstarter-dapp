import React from 'react'
import 'semantic-ui-css/semantic.min.css';
import { Form, Button, Message, FormField, Input } from 'semantic-ui-react';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import Link from 'next/link';
import { useState } from 'react';
import Layout from '../../../components/Layout';
import { useRouter } from 'next/router';

const RequestNew = ({ address }) => {
    const router = useRouter();
    const [value, setvalue] = useState("")
    const [description, setdescription] = useState("")
    const [recipient, setrecipient] = useState("")
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState("")

    const onsubmit = async (event) => {
        event.preventDefault();
        const campaign = await Campaign(address);
        setloading(true);
        seterror("");
        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.createRequest(description, web3.utils.toWei(value, "ether"), recipient).send({ from: accounts[0] });
            router.push(`/campaigns/[address]/requests`, `/campaigns/${address}/requests`);
        } catch (error) {
            seterror(error.message);
        }
        setloading(false);
    }
    return (
        <Layout>
            <Link href={`/campaigns/[address]/requests`} as={`/campaigns/${address}/requests`} passHref legacyBehavior>
                <a>
                    Back
                </a>
            </Link>

            <h3>Create a Request</h3>
            <Form onSubmit={onsubmit} error={!!error}>
                <FormField>
                    <label>Description</label>
                    <Input value={description} onChange={(event) => { setdescription(event.target.value) }} />
                </FormField>
                <FormField>
                    <label>Value in Ether</label>
                    <Input value={value} onChange={(event) => { setvalue(event.target.value) }} />
                </FormField>
                <FormField>
                    <label>Recipient Address</label>
                    <Input value={recipient} onChange={(event) => { setrecipient(event.target.value) }} />
                </FormField>
                <Message error header="Oops!" content={error} />
                <Button primary loading={loading}>Create!</Button>
            </Form>
        </Layout>
    )
}

RequestNew.getInitialProps = async ({ query }) => {
    const address = query.address;
    return { address };
}

export default RequestNew