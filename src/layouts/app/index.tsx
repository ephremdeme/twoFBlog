import React, { useState } from 'react';
import clsx from 'clsx';
import { RootState } from 'app/store';
import { getNav, INavRouter } from './routes';
import ProfileMenu from './ProfileMenu';
import List from '@material-ui/core/List';
import { useSelector } from 'react-redux';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import { UserRole } from 'features/auth/types';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import CssBaseline from '@material-ui/core/CssBaseline';
import { selectChartProductQty } from 'features/product';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Badge, Box, Button, Hidden, Tooltip } from '@material-ui/core';
import { createStyles, makeStyles, useTheme, Theme, withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const drawerWidth = 280;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    mobileMenuDrawer: {
      width: 70
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    title: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    avatarProfile: {
      margin: "0px .5rem 0 1rem"
    },
    navBtn: {
      margin: "0px .5rem"
    },
    chartBtn: {
      margin: ".3rem .5rem"
    }
  }),
);

const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      color: '#fff',
      right: -4,
      top: 13,
      border: `1px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  })
)(Badge);

export default function Layout() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [navs, setNavs] = useState<INavRouter[]>([]);
  const role: UserRole = useSelector((state: RootState) => state.auth.role);
  const auth = useSelector((state: RootState) => state.auth);
  const chartQty = useSelector(selectChartProductQty);

  React.useEffect(() => {
    setNavs(getNav(role));
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const toggleMobileDrawer = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <div>
      <List>
        {navs.map((nav: INavRouter, i: number) => (
          <ListItem
            button
            component={Link}
            to={nav.path}
            key={i}>
            <ListItemIcon>
              <Box style={{ fontSize: 20 }}>{nav.icon}</Box>
            </ListItemIcon>
            {nav.name}
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={0}
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar variant="dense">
          {
            !(auth.isGuest || auth.role === UserRole.USER) && (
              <>
                <Hidden mdDown>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, {
                      [classes.hide]: open,
                    })}
                  >
                    <MenuIcon />
                  </IconButton>
                </Hidden>
                <Hidden lgUp>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={toggleMobileDrawer}
                  >
                    <MenuIcon />
                  </IconButton>
                </Hidden>
              </>
            )
          }

          <Box className={classes.title}>
            <Box fontWeight={600} fontSize="1rem">
              RFClub
            </Box>
          </Box>
          <Box display="flex" alignItems="center">
            {
              (auth.isGuest || auth.role === UserRole.USER) && (
                <Box>
                  <Button
                    disableElevation
                    variant="contained"
                    color="primary"
                    size="small"
                    className={classes.navBtn}
                    component={Link}
                    to="/products/list">
                    Products
                  </Button>
                  <Button
                    disableElevation
                    variant="contained"
                    color="primary"
                    className={classes.navBtn}
                    size="small"
                    component={Link}
                    to="/posts/list">
                    Blogs
                  </Button>
                  {(role === UserRole.USER) && (
                    <Tooltip title="checkout chart">
                      <IconButton
                        aria-label="cart"
                        component={Link}
                        className={classes.chartBtn}
                        to={'/products/chart'}>
                        <StyledBadge badgeContent={chartQty}>
                          <ShoppingCartIcon style={{ color: "#FFF" }} />
                        </StyledBadge>
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
              )}
            {auth.isGuest ? (
              <Button
                disableElevation
                variant="contained"
                color="primary"
                className={classes.avatarProfile}
                size="small"
                component={Link}
                to="/login">
                Login
              </Button>
            )
              : <ProfileMenu />
            }
          </Box>
        </Toolbar>
      </AppBar>
      {
        !(auth.isGuest || auth.role === UserRole.USER) && (
          <>
            <Hidden mdDown>
              <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                  [classes.drawerOpen]: open,
                  [classes.drawerClose]: !open,
                })}
                classes={{
                  paper: clsx({
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                  }),
                }}
              >
                <div className={classes.toolbar}>
                  <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                  </IconButton>
                </div>
                {drawer}
              </Drawer>
            </Hidden>
            <Hidden>
              <Drawer anchor="left" open={mobileOpen} onClose={toggleMobileDrawer} className={classes.mobileMenuDrawer}>
                <Box mr={6}>
                  <div className={classes.toolbar}>
                    Menu
                  </div>
                  <Divider />
                  {drawer}
                </Box>
              </Drawer>
            </Hidden>
          </>
        )
      }
    </div>
  );
}
