import React from 'react';
import { Button } from 'react-bootstrap';

interface MutationButtonProps{
    mutationFunction: any;
    buttonText: string;
    handleChanges: (value: string) => void;
    buttonVariantColor: string;
}

const MutationButton = ({ mutationFunction, buttonText,buttonVariantColor, handleChanges}: MutationButtonProps) => {
  const handleButtonClick = async () => {
    try {
      // Execute the provided mutation function
      const { data } = await mutationFunction();

      if(data.mediaCensor){
        console.log('Mutation response:', data);
        handleChanges(data.mediaCensor.status);
      }else{
        console.log('Mutation response:', data);
        handleChanges(data.mediaValid.status);
      }
    } catch (error) {
      // Handle any error that occurs during the mutation
      console.error('Error in mutation:', error);
    }
  };

  return (
    <Button onClick={handleButtonClick} variant={buttonVariantColor}>{buttonText}</Button>
  );
};

export default MutationButton;