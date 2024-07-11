import * as React from 'react';
import Button from '@mui/material/Button';

type OutlinedButtonProps = {
  text: string,
  onClick: React.ReactEventHandler
}

export const OutlinedButton = ({ text, onClick }: OutlinedButtonProps) => {
  return <Button
    variant="outlined"
    sx={{
      borderColor: 'black',
      color: 'black',
      width: {
        xs: '100%', // small screen (mobile devices)
        sm: '100%', // medium screen (tablets)
        md: '100%', // large screen (small laptops)
        lg: '100%', // extra large screen (desktops)
      },
      maxWidth: '200px', // maximum width regardless of screen size
      whiteSpace: 'nowrap', // prevent text from wrapping
      padding: '10px 20px', // increase button size
      fontSize: '1.1rem', // increase font size

    }}
    onClick={onClick}
  >
    {text}
    </Button>;
}