import { Avatar, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { PlayerPositionEnum } from "../PlayerPositionEnum";
import { PlayerPosition } from "../PlayerPosition";
import { useTranslation } from "react-i18next";

export interface SharePlayerListProps {
    width: number;
    players: PlayerPosition[],
}

export const SharePlayerList: React.FC<SharePlayerListProps> = ({ width, players }) => {    
    const { t } = useTranslation();
    const setColorByPosition = (position: PlayerPositionEnum) => {
        switch (position) {
            case 'ST':
            case 'CF':
            case 'LF':
            case 'RF':
                return 'red';
            case 'AM':
            case 'LM':
            case 'RM':
            case 'CM':
                return 'green';
            case 'CB':
            case 'LB':
            case 'RB':
                return 'blue';
            case 'GK':
                return '#f192bd';
            default:
                return '#3BB24A';
        }
    }

    const sortedPlayers = players.slice().sort((a, b) => {
        if (a.team === b.team) {
            return a.backNumber - b.backNumber; // 같은 팀일 경우 backNumber로 정렬
        }
        return a.team === 'HOME' ? -1 : 1; // 'home' 팀이 먼저 오도록 정렬
    });

    return (
        <div>
            <TableContainer component={Paper} sx={{
                maxHeight: 700,
                width: width,
                overflowY: 'auto',
            }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center"><Typography variant="subtitle1" fontWeight="bold">{t('Position')}</Typography></TableCell>
                            <TableCell align="center"><Typography variant="subtitle1" fontWeight="bold">{t('Name')}</Typography></TableCell>
                            <TableCell align="center"><Typography variant="subtitle1" fontWeight="bold">{t('No')}</Typography></TableCell>
                            {/* <TableCell align="center"><Typography variant="subtitle1" fontWeight="bold">Team</Typography></TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedPlayers.map((player: PlayerPosition) => (
                            <TableRow key={player.id} >
                                <TableCell align="center">
                                    <Avatar
                                        sx={{
                                            bgcolor: setColorByPosition(player.position),
                                            width: 26,
                                            height: 26,
                                            margin: 'auto',
                                            boxShadow: player.team === 'HOME' ? '0 0 10px 5px #3B6FB2' : '0 0 10px 5px #B23B7F',
                                            borderRadius: '50%', // 원형 외곽선
                                        }}>
                                        <Typography variant="caption" sx={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'auto' }}>
                                            {player.position}
                                        </Typography>
                                    </Avatar>
                                </TableCell>
                                <TableCell align="center"><Typography variant="body2" fontWeight="bold">{player.name} </Typography></TableCell>
                                <TableCell align="center"><Typography variant="body2" fontWeight="bold">{player.backNumber}</Typography></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div >
    );
}