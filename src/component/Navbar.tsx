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

const pages = ['Introduce', 'Guide'];

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
            {vw >= 14.96 ? <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component={Link}
                        to="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Lavolpiana
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: 'flex' }}>
                        <Button
                            key={'guide-page'}
                            onClick={handleCloseNavMenu}
                            component={Link}
                            to="/guide"
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Guide
                        </Button>
                        <Button
                            key={'introduce-page'}
                            onClick={handleCloseNavMenu}
                            component={Link}
                            to="/introduce"
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Introduce
                        </Button>
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <IconButton sx={{ ml: 'auto' }} onClick={changeLanguage} color="inherit">
                            <TranslateIcon />
                        </IconButton>
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <IconButton sx={{ ml: 'auto' }} onClick={onThemeChange} color="inherit">
                            {darkMode ? <Brightness7Outlined /> : <Brightness4Outlined />}
                        </IconButton>
                    </Box>
                </Toolbar>
            </Container> :

                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Box sx={{ flexGrow: 1, display: 'flex' }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            {anchorElNav &&
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
                                        key={'introduce-page'}
                                        onClick={handleCloseNavMenu}
                                        component={Link}
                                        to="/introduce"
                                    >
                                        <Typography textAlign="center">Introduce</Typography>
                                    </MenuItem>
                                </Menu>

                            }
                        </Box>
                        <Typography
                            variant="h5"
                            noWrap
                            component={Link}
                            to="/"
                            sx={{
                                mr: 2,
                                display: 'flex',
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Lavolpiana
                        </Typography>
                        <Box sx={{ flexGrow: 0 }}>
                            <IconButton sx={{ ml: 'auto' }} onClick={changeLanguage} color="inherit">
                                <TranslateIcon />
                            </IconButton>
                        </Box>
                        <Box sx={{ flexGrow: 0 }}>
                            <IconButton sx={{ ml: 'auto' }} onClick={onThemeChange} color="inherit">
                                {darkMode ? <Brightness7Outlined /> : <Brightness4Outlined />}
                            </IconButton>
                        </Box>
                    </Toolbar>
                </Container>
            }
        </AppBar>
    );
}
export default Navbar;