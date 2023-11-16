
import React from "react";
import { GET_USERS } from "../App";
import { useState } from "react";
import MutationButton from './ActionsButton';
import DifferenButton from './DifferentButton';
import { gql, useMutation } from "@apollo/client";
import { FormControl } from "react-bootstrap";

interface ActionsListProps {
    clientID : number;
    refetch: any;
}
const MediaCensorMutation = gql`
    mutation Mutation($input: MediaInput!) {
        mediaCensor(input: $input) {
            status
        }
    }
`
const MediaValidMutation = gql`
    mutation Mutation($input: MediaInput!) {
        mediaValid(input: $input) {
            status
        }
    }
`

export default function ActionsList({clientID,refetch}: ActionsListProps) {
    const [status, setStatus] = useState('');
    const [reason, setReason] = useState<string>('');

    const [mutationCensor] = useMutation(MediaCensorMutation,{
        variables:{ input: { id: clientID , reason: reason}},
        refetchQueries: [{ query: GET_USERS }]
    });
    const [mutationValid] = useMutation(MediaValidMutation,{
        variables:{ input: { id: clientID , reason: reason}},
        refetchQueries: [{ query: GET_USERS }], 
        onCompleted: () => {
            setStatus('');
        }
    });

    function handleChanges(value:string){
        setReason('');
        setStatus(value);
    }

    console.log('reason',reason);
    return <>
        {status && <p>{status}</p>}
        <FormControl type="text" required value={reason} placeholder="Reason" onChange={(e) => setReason(e.target.value)}/>
        {/* Use MutationButton with different mutations and text */}
        <MutationButton mutationFunction={mutationCensor} buttonText="Censor" handleChanges={handleChanges} buttonVariantColor={"outline-danger"}/>
        <MutationButton mutationFunction={mutationValid} buttonText="Valid" handleChanges={handleChanges} buttonVariantColor={"primary"}/>
        <DifferenButton refetch={refetch}/>
    </>
}
