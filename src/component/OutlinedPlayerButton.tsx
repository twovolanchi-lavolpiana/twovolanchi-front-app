import * as React from 'react';
import Button from '@mui/material/Button';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ItemTypes } from './ItemTypes';

type OutlinedPlayerButtonProps = {
  text: string,
  onClick: React.ReactEventHandler
}

export const OutlinedPlayerButton = ({ text, onClick }: OutlinedPlayerButtonProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.PLAYER,
    item: { text },
    collect: (monitor) => ({
      isDragging: !monitor.isDragging(),
    })
  }))

  return (
    <Button
      ref={drag}
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
        opacity: isDragging ? 0.5 : 1,
      }}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};