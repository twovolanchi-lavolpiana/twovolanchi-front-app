import * as React from 'react';
import Button from '@mui/material/Button';

type OutlinedPlayerButtonProps = {
  text: string,
  onClick: React.ReactEventHandler
}

export const OutlinedPlayerButton = ({ text, onClick }: OutlinedPlayerButtonProps) => {
  return (
    <Button
      variant="outlined"
      sx={{
        borderColor: 'black',
        color: 'black',
        width: '50px', // 더 작은 크기로 설정
        height: '50px', // 동일한 높이로 설정하여 원형으로 만듦
        borderRadius: '50%', // 원형으로 만들기 위해 설정
        whiteSpace: 'nowrap',
        padding: '5px', // 패딩 조정
        fontSize: '0.8rem', // 글자 크기 조정
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};