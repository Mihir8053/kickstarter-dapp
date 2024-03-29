import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Form, Input, Message, Button } from 'semantic-ui-react'
import Campaign from "../ethereum/campaign"
import web3 from '../ethereum/web3'
import { useState } from 'react'
import { useRouter } from 'next/router';


const ContributeForm = (props) => {
    const router = useRouter();
    const [value, setvalue] = useState("");
    const [error, seterror] = useState("");
    const [loading, setloading] = useState(false)
    const onsubmit = async (event) => {
        event.preventDefault();
        const campaign = await Campaign(props.address);
        setloading(true);
        seterror("");
        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                value: web3.utils.toWei(value, "ether"), from: accounts[0]
            })
            router.replace(`/campaigns/${props.address}`);
        } catch (error) {
            seterror(error.message);
        }
        setloading(false);
        setvalue("");
    }
    return (
        <Form onSubmit={onsubmit} error={!!error}>
            <Form.Field>
                <label> Amount to contribute</label>
                <Input label="ether" labelPosition='right'
                    value={value}
                    onChange={(event) => setvalue(event.target.value)} />
                <Message error header="Oops!" content={error} />
                <Button primary loading={loading} > Contribute </Button>
            </Form.Field>
        </Form>
    )
}

export default ContributeForm