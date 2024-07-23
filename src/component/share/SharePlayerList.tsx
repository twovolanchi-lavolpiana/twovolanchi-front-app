import { Avatar, Pagination, PaginationItem, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { PlayerPositionEnum } from "../PlayerPositionEnum";
import { PlayerPosition } from "../PlayerPosition";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";

export interface SharePlayerListProps {
    filteredPlayers: PlayerPosition[],
}

export const SharePlayerList: React.FC<SharePlayerListProps> = ({ filteredPlayers }) => {
    const { t } = useTranslation();

    const [page, setPage] = useState(1);
    const itemsPerPage = 5;

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

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const paginatedPlayers = filteredPlayers.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    const totalPageCount = Math.ceil(filteredPlayers.length / itemsPerPage);

    return (
        <div>
            <TableContainer component={Paper} sx={{
                maxHeight: 700,
                overflowY: 'auto',
                background: 'transparent'
            }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center"><Typography
                                variant="subtitle1"
                                fontWeight="bold"
                                color={'white'}
                            >{t('Position')}</Typography></TableCell>
                            <TableCell align="center"><Typography
                                variant="subtitle1"
                                fontWeight="bold"
                                color={'white'}
                            >{t('Name')}</Typography></TableCell>
                            <TableCell align="center"><Typography
                                variant="subtitle1"
                                fontWeight="bold"
                                color={'white'}
                            >{t('No')}</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedPlayers.map((player: PlayerPosition) => (
                            <TableRow key={player.id} >
                                <TableCell align="center" sx={{ border: 0 }}>
                                    <Avatar
                                        sx={{
                                            bgcolor: setColorByPosition(player.position),
                                            width: 26,
                                            height: 26,
                                            margin: 'auto',
                                            boxShadow: player.team === 'HOME' ? '0 0 10px 5px #3B6FB2' : '0 0 10px 5px #B23B7F',
                                            borderRadius: '50%', // 원형 외곽선
                                        }}>
                                        <Typography variant="caption" sx={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'white' }}>
                                            {player.position}
                                        </Typography>
                                    </Avatar>
                                </TableCell>
                                <TableCell align="center" sx={{ border: 0 }}><Typography variant="body2" fontWeight="bold" color="white">{player.name} </Typography></TableCell>
                                <TableCell align="center" sx={{ border: 0 }}><Typography variant="body2" fontWeight="bold" color="white">{player.backNumber}</Typography></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {totalPageCount > 1 && (
                <Stack spacing={2} sx={{ marginTop: 2, color: 'white', alignItems: 'center' }}>
                    <Pagination
                        count={totalPageCount}
                        page={page}
                        onChange={handleChangePage}
                        renderItem={(item) => (
                            <PaginationItem
                                slots={{ previous: ArrowBackIosNew, next: ArrowForwardIos }}
                                sx={{ color: 'white' }}
                                {...item}
                            />
                        )}
                    />
                </Stack>
            )}
        </div >
    );
}