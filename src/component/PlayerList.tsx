import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store/Store"
import { useEffect, useState } from "react";
import { PlayerPosition } from "./PlayerPosition";
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { PlayerPositionEnum } from "./PlayerPositionEnum";

export const PlayerList = () => {
    const players = useSelector((state: RootState) => state.players.players);

    const setColorByPosition = (position: PlayerPositionEnum) => {
        switch (position) {
            case 'ST':
            case 'CF':
            case 'LW':
            case 'RW':
                return 'red';
            case 'AM':
            case 'LM':
            case 'RM':
            case 'CM':
                return 'green';
            case 'CB':
            case 'WLB':
            case 'WRB':
                return 'blue';
            case 'GK':
                return 'yellow';
            default:
                return '#3BB24A';
        }
    }

    useEffect(() => {
        console.log("PlayerList players = ", players)
    }, [players])

    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center"><Typography variant="subtitle1" fontWeight="bold">Position</Typography></TableCell>
                            <TableCell align="center"><Typography variant="subtitle1" fontWeight="bold">Name</Typography></TableCell>
                            <TableCell align="center"><Typography variant="subtitle1" fontWeight="bold">No</Typography></TableCell>
                            <TableCell align="center"><Typography variant="subtitle1" fontWeight="bold">Team</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {players.filter((player: PlayerPosition) => player.team === 'home').map((player: PlayerPosition) => (
                            <TableRow key={player.id}>
                                <TableCell align="center">
                                    <Avatar sx={{ bgcolor: setColorByPosition(player.position), width: 24, height: 24, margin: 'auto' }}>
                                        <Typography variant="caption" sx={{ fontSize: '0.6rem', fontWeight: 'bold' }}>
                                            {player.position}
                                        </Typography>
                                    </Avatar>
                                </TableCell>
                                <TableCell align="center"><Typography variant="body2" fontWeight="bold">{player.name}</Typography></TableCell>
                                <TableCell align="center"><Typography variant="body2" fontWeight="bold">{player.backNumber}</Typography></TableCell>
                                <TableCell align="center"><Typography variant="body2" fontWeight="bold">{player.team}</Typography></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div >
    );
}