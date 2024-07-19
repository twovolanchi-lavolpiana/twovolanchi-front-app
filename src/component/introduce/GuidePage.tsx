import { AppBar, Avatar, Box, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, CssBaseline, Divider, Drawer, Grid, IconButton, IconButtonProps, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import Navbar from "../Navbar"
import { useDispatch } from "react-redux";
import { clearMultiSelectedPlayers, clearSelectedPlayer } from "../../store/PlayerSlice";
import { clearPlayers } from "../../store/PlayersListSlice";
import { clearPlayerViewState } from "../../store/PlayerViewSlice";
import { clearPossiblePlayerMoveState } from "../../store/PossiblePlayerMoveSlice";
import { clearBallSequences, clearPlayerMovingSequence } from "../../store/SequenceSlice";
import { clearSimulationOn, endSimulation } from "../../store/SimulationOnSlice";
import { clearPlayerId } from "../../store/PlayerIdSlice";
import { clearBall } from "../../store/BallSlice";
import { clearPossibleBallMoveState } from "../../store/PossibleBallMoveSlice";
import { useEffect, useRef, useState } from "react";
import AddPlayer from '../../image/guide-add-player.png'
import AddBall from '../../image/guide-add-ball.png'
import PlayerMove from '../../image/guide-player-move.png'
import PlayerBack from '../../image/guide-player-back.png'
import PlayerRemove from '../../image/guide-player-remove.png'
import Recommend from '../../image/guide-recommend.png'
import PlayerList from '../../image/guide-player-list.png'
import PlayerEdit from '../../image/guide-player-edit.png'
import SimulationVideo from '../../image/guide-simulation.mp4';
import Share from '../../image/guide-share.png'
import EditTactics from '../../image/guide-edit-tactics.png'
import SharedTactics from '../../image/guide-shared-tactics.png'
import EditTitle from '../../image/guide-edit-title.png'
import { useTranslation } from "react-i18next";


interface MainComponentProps {
    darkMode: boolean;
    onThemeChange: () => void;
}

const GuidePage = (props: MainComponentProps) => {
    const dispatch = useDispatch()
    const { t } = useTranslation();

    const handleReset = () => {
        dispatch(clearSelectedPlayer());
        dispatch(clearMultiSelectedPlayers());
        dispatch(clearPlayers());
        dispatch(clearPlayerViewState());
        dispatch(clearPossiblePlayerMoveState());
        dispatch(clearPlayerMovingSequence());
        dispatch(clearSimulationOn());
        dispatch(clearPlayerId());
        dispatch(clearBall());
        dispatch(clearBallSequences());
        dispatch(clearPossibleBallMoveState());
        dispatch(endSimulation())
    }

    useEffect(() => {
        handleReset();
    }, []);  // 빈 배열을 두 번째 인자로 전달하여 컴포넌트가 마운트될 때 한 번만 실행되도록 함

    const drawerWidth = 240;

    const refs: { [key: string]: React.RefObject<HTMLDivElement> } = {
        'guide-add-player-title': useRef<HTMLDivElement>(null),
        'guide-add-ball-title': useRef<HTMLDivElement>(null),
        'guide-player-move-title': useRef<HTMLDivElement>(null),
        'guide-player-back-title': useRef<HTMLDivElement>(null),
        'guide-player-remove-title': useRef<HTMLDivElement>(null),
        'guide-edit-title-title': useRef<HTMLDivElement>(null),
        'guide-recommend-title': useRef<HTMLDivElement>(null),
        'guide-player-list-title': useRef<HTMLDivElement>(null),
        'guide-player-edit-title': useRef<HTMLDivElement>(null),
        'guide-simulation-title': useRef<HTMLDivElement>(null),
        'guide-share-title': useRef<HTMLDivElement>(null),
        'guide-edit-tactics-title': useRef<HTMLDivElement>(null),
        'guide-shared-tactics-title': useRef<HTMLDivElement>(null),
    };

    const handleListItemClick = (key: keyof typeof refs) => {
        refs[key].current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Navbar darkMode={props.darkMode} onThemeChange={props.onThemeChange} />
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {[
                            'guide-add-player-title',
                            'guide-add-ball-title',
                            'guide-player-move-title',
                            'guide-player-back-title',
                            'guide-player-remove-title',
                            'guide-edit-title-title',
                            'guide-recommend-title',
                            'guide-player-list-title',
                            'guide-player-edit-title',
                            'guide-simulation-title',
                            'guide-share-title',
                            'guide-edit-tactics-title',
                            'guide-shared-tactics-title',
                        ].map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton onClick={() => handleListItemClick(text as keyof typeof refs)}>
                                    <ListItemText primary={t(text)} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <div style={{ paddingBottom: 30 }} ref={refs['guide-add-player-title']}>
                    <Card sx={{ maxWidth: 1000 }}>
                        <CardMedia
                            component="img"
                            image={AddPlayer}
                            alt="Add Player"
                            sx={{ width: '100%', height: 'auto' }} // 이미지 스타일링 추가
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" sx={{ paddingBottom: 3 }}>
                                {t('guide-add-player-title')}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 2 }}>
                                {t('guide-add-player-description')}
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
                <div style={{ paddingBottom: 30 }} ref={refs['guide-add-ball-title']}>
                    <Card sx={{ maxWidth: 1000 }}>
                        <CardMedia
                            component="img"
                            image={AddBall}
                            alt="Add Ball"
                            sx={{ width: '100%', height: 'auto' }} // 이미지 스타일링 추가
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" sx={{ paddingBottom: 3 }}>
                                {t('guide-add-ball-title')}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 2 }}>
                                {t('guide-add-ball-description')}
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
                <div style={{ paddingBottom: 5 }} ref={refs['guide-player-move-title']}>
                    <Card sx={{ maxWidth: 1000 }}>
                        <CardMedia
                            component="img"
                            image={PlayerMove}
                            alt="Player Move"
                            sx={{ width: '100%', height: 'auto' }} // 이미지 스타일링 추가
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" sx={{ paddingBottom: 3 }}>
                                {t('guide-player-move-title')}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 2 }}>
                                {t('guide-player-move-description')}
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
                <div style={{ paddingBottom: 30 }} ref={refs['guide-player-back-title']}>
                    <Card sx={{ maxWidth: 1000 }}>
                        <CardMedia
                            component="img"
                            image={PlayerBack}
                            alt="Player Back"
                            sx={{ width: '100%', height: 'auto' }} // 이미지 스타일링 추가
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" sx={{ paddingBottom: 3 }}>
                                {t('guide-player-back-title')}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 2 }}>
                                {t('guide-player-back-description')}
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
                <div style={{ paddingBottom: 30 }} ref={refs['guide-player-remove-title']}>
                    <Card sx={{ maxWidth: 1000 }}>
                        <CardMedia
                            component="img"
                            image={PlayerRemove}
                            alt="Player Remove"
                            sx={{ width: '100%', height: 'auto' }} // 이미지 스타일링 추가
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" sx={{ paddingBottom: 3 }}>
                                {t('guide-player-remove-title')}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 2 }}>
                                {t('guide-player-remove-description')}
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
                <div style={{ paddingBottom: 30 }} ref={refs['guide-edit-title-title']}>
                    <Card sx={{ maxWidth: 1000 }}>
                        <CardMedia
                            component="img"
                            image={EditTitle}
                            alt="Edit itle"
                            sx={{ width: '100%', height: 'auto' }} // 이미지 스타일링 추가
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" sx={{ paddingBottom: 3 }}>
                                {t('guide-edit-title-title')}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 2 }}>
                                {t('guide-edit-title-description')}
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
                <div style={{ paddingBottom: 30 }} ref={refs['guide-recommend-title']}>
                    <Card sx={{ maxWidth: 1000 }}>
                        <CardMedia
                            component="img"
                            image={Recommend}
                            alt="Recommend"
                            sx={{ width: '100%', height: 'auto' }} // 이미지 스타일링 추가
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" sx={{ paddingBottom: 3 }}>
                                {t('guide-recommend-title')}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 2 }}>
                                {t('guide-recommend-description')}
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
                <div style={{ paddingBottom: 30 }} ref={refs['guide-player-list-title']}>
                    <Card sx={{ maxWidth: 1000 }}>
                        <CardMedia
                            component="img"
                            image={PlayerList}
                            alt="Player List"
                            sx={{ width: '100%', height: 'auto' }} // 이미지 스타일링 추가
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" sx={{ paddingBottom: 3 }}>
                                {t('guide-player-list-title')}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 2 }}>
                                {t('guide-player-list-description')}
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
                <div style={{ paddingBottom: 30 }} ref={refs['guide-player-edit-title']}>
                    <Card sx={{ maxWidth: 1000 }}>
                        <CardMedia
                            component="img"
                            image={PlayerEdit}
                            alt="Player Edit"
                            sx={{ width: '100%', height: 'auto' }} // 이미지 스타일링 추가
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" sx={{ paddingBottom: 3 }}>
                                {t('guide-player-edit-title')}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 2 }}>
                                {t('guide-player-edit-description')}
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
                <div style={{ paddingBottom: 30 }} ref={refs['guide-simulation-title']}>
                    <Card sx={{ maxWidth: 1000 }}>
                        <CardMedia>
                            <video
                                src={SimulationVideo}
                                style={{ width: '100%', height: 'auto' }} // 비디오 스타일링 추가
                                controls
                            />
                        </CardMedia>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" sx={{ paddingBottom: 3 }}>
                                {t('guide-simulation-title')}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 2 }}>
                                {t('guide-simulation-description')}
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
                <div style={{ paddingBottom: 30 }} ref={refs['guide-share-title']}>
                    <Card sx={{ maxWidth: 1000 }}>
                        <CardMedia
                            component="img"
                            image={Share}
                            alt="Share"
                            sx={{ width: '100%', height: 'auto' }} // 이미지 스타일링 추가
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" sx={{ paddingBottom: 3 }}>
                                {t('guide-share-title')}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 2 }}>
                                {t('guide-share-description')}
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
                <div style={{ paddingBottom: 30 }} ref={refs['guide-edit-tactics-title']}>
                    <Card sx={{ maxWidth: 1000 }}>
                        <CardMedia
                            component="img"
                            image={EditTactics}
                            alt="Edit Tactics"
                            sx={{ width: '100%', height: 'auto' }} // 이미지 스타일링 추가
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" sx={{ paddingBottom: 3 }}>
                                {t('guide-edit-tactics-title')}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 2 }}>
                                {t('guide-edit-tactics-description')}
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
                <div style={{ paddingBottom: 30 }} ref={refs['guide-shared-tactics-title']}>
                    <Card sx={{ maxWidth: 1000 }}>
                        <CardMedia
                            component="img"
                            image={SharedTactics}
                            alt="Shared Tactics"
                            sx={{ width: '100%', height: 'auto' }} // 이미지 스타일링 추가
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" sx={{ paddingBottom: 3 }}>
                                {t('guide-shared-tactics-title')}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 2 }}>
                                {t('guide-shared-tactics-description')}
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
            </Box>
        </Box >
    );
}

export default GuidePage;