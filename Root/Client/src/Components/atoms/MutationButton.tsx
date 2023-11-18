import React from 'react';
import { Button } from 'react-bootstrap';

export interface MutationButtonProps{
    mutationFunction: any;
    buttonText: string;
    handleChanges: () => void;
    buttonVariantColor: string;
    isButtonDisabled: boolean;
}

const MutationButton = ({ mutationFunction, buttonText,buttonVariantColor, handleChanges, isButtonDisabled}: MutationButtonProps) => {
  const handleButtonClick = async () => {
    try {
      // Execute the provided mutation function
      const { data } = await mutationFunction();

      if(data.mediaCensor){
        console.log(data);
        handleChanges();
      }else{
        console.log(data);
        handleChanges();
      }
    } catch (error) {
      // Handle any error that occurs during the mutation
      console.error('Error in mutation:', error);
    }
  };

  return (
    <Button onClick={handleButtonClick} className='w-100' variant={buttonVariantColor} disabled={isButtonDisabled}>{buttonText}</Button>
  );
};

export default MutationButton;