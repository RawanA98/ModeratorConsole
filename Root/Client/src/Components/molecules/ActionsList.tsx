
import React, { ChangeEvent, useEffect } from "react";
import { useState } from "react";
import MutationButton, { MutationButtonProps } from '../atoms/MutationButton';
import { gql, useMutation } from "@apollo/client";
import { Button, FormControl } from "react-bootstrap";
import { GET_MODERATION } from "../Organisms/ModerationConsole";

interface ActionsListProps {
    moderationID : number;
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

export default function ActionsList({moderationID,refetch}: ActionsListProps) {
    const [reason, setReason] = useState<string>('');
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

    useEffect(() => {
        setIsButtonDisabled(reason.trim().length === 0);
    }, [reason]);

    const [mutationCensor] = useMutation(MediaCensorMutation,{
        variables:{ input: { id: moderationID , reason: reason}},
        refetchQueries: [{ query: GET_MODERATION }]
    });
    const [mutationValid] = useMutation(MediaValidMutation,{
        variables:{ input: { id: moderationID , reason: reason}},
        refetchQueries: [{ query: GET_MODERATION }], 
    });
    
    function handleChanges(){
        setReason('');
    }

    function handleReason(e: ChangeEvent<HTMLInputElement>){
        setReason(e.target.value);
        setIsButtonDisabled(false);  
    }

    const actionsButton: Array<MutationButtonProps> = [
        {mutationFunction:mutationCensor, buttonText:"Censor", handleChanges: handleChanges, buttonVariantColor:"outline-danger",isButtonDisabled:isButtonDisabled},
        {mutationFunction:mutationValid, buttonText:"Valid", handleChanges: handleChanges, buttonVariantColor:"primary",isButtonDisabled:isButtonDisabled},
    ];

    return <div className="d-flex flex-column gap-3">
        <FormControl 
            type="text" 
            required 
            value={reason} 
            placeholder="Reason" 
            onChange={handleReason}
        />
        <div className="d-flex gap-3">
            {actionsButton.map((actionButton) => {
                return <MutationButton 
                    key={actionButton.buttonText}
                    mutationFunction={actionButton.mutationFunction} 
                    buttonText={actionButton.buttonText} 
                    handleChanges={actionButton.handleChanges} 
                    buttonVariantColor={actionButton.buttonVariantColor} 
                    isButtonDisabled={actionButton.isButtonDisabled} 
                />
            })}
        </div>
        
        <Button variant="outline-secondary" onClick={()=> refetch()}> Skip </Button>
    </div>
}
