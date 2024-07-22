import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { useScreenSize } from '../provider/ScreenSizeProvider';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Brightness4Outlined, Brightness7Outlined } from '@mui/icons-material';
import TranslateIcon from '@mui/icons-material/Translate';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/Store';
import { changeLng } from '../store/TranslationSlice';

const pages = ['Guide'];

interface NavbarProps {
    darkMode: boolean;
    onThemeChange: () => void;
}

function Navbar({ darkMode, onThemeChange }: NavbarProps) {
    const dispatch = useDispatch();
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const { vw } = useScreenSize(); // width 값 사용

    const lng = useSelector((state: RootState) => state.translation.lng);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const { i18n } = useTranslation();

    const changeLanguage = () => {
        if (lng === "en") {
            i18n.changeLanguage("ko");
            dispatch(changeLng({ lng: "ko" }))
        } else {
            i18n.changeLanguage("en");
            dispatch(changeLng({ lng: "en" }))
        }
    };

    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#3BB26F' }} className='App-header'>
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                            size="large"
                            aria-label="open drawer"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component={Link}
                        to="/"
                        sx={{
                            display: 'flex',
                            fontFamily: 'monospace',
                            color: 'inherit',
                            textDecoration: 'none',
                            flexGrow: 1,
                            textAlign: 'center',
                            justifyContent: 'center',
                            position: 'absolute',
                            left: '50%',
                            transform: 'translateX(-50%)',
                        }}
                    >
                        Lavolpiana
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton sx={{ ml: 'auto' }} onClick={changeLanguage} color="inherit">
                            <TranslateIcon />
                        </IconButton>
                        <IconButton sx={{ ml: 1 }} onClick={onThemeChange} color="inherit">
                            {darkMode ? <Brightness7Outlined /> : <Brightness4Outlined />}
                        </IconButton>
                    </Box>
                </Toolbar>
                {anchorElNav && (
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                    >
                        <MenuItem
                            key={'guide-page'}
                            onClick={handleCloseNavMenu}
                            component={Link}
                            to="/guide"
                        >
                            <Typography textAlign="center">Guide</Typography>
                        </MenuItem>
                        <MenuItem
                            key={'plan-page'}
                            onClick={handleCloseNavMenu}
                            component={Link}
                            to="/plan"
                        >
                            <Typography textAlign="center">Plan</Typography>
                        </MenuItem>
                    </Menu>
                )}
            </Container>
        </AppBar>
    );
}
export default Navbar;