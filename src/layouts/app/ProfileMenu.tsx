import React from 'react';
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Avatar, IconButton } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../features/auth';
import { RootState } from '../../app/store';
import ListItem from '@material-ui/core/ListItem';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import { toggleTheme } from 'features/app';
import {
  useHistory,
} from 'react-router-dom';
import { UserRole } from 'features/user/types';

const StyledMenu = withStyles({
  paper: {
    boxShadow: "0 2px 14px rgba(0,0,0,0.3)"
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuBtn: {
      borderRadius: 5
    },
    smallAvatar: {
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
  })
)

export default function ProfileMenu() {
  const classes = useStyles()
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const appTheme = useSelector((state: RootState) => state.app.appTheme);
  const userName = useSelector((state: RootState) => state.auth.user_name);
  const userAvatar = useSelector((state: RootState) => state.auth.photo);
  const userStatus = useSelector(
    (state: RootState) => state.auth.authenticated
  );
  const role = useSelector((state: RootState) => state.auth.role);

  const signOut = () => {
    dispatch(logoutUser(auth.uid));
    history.push('/login');
  };

  // pop over menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        color="inherit"
        aria-label="open profile"
        edge="start"
        onClick={handleClick}
      >
        {userAvatar ?
          <Avatar
            className={classes.smallAvatar}
            src={userAvatar} />
          : <AccountCircle />}
      </IconButton>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Box p={2}>
          <Box pl={2} mt={1} mb={3}>
            <Box fontWeight={800}>{userName}</Box>
            <Box>{userStatus ? 'online' : 'offline'}</Box>
            {(role !== UserRole.GUEST && role !== UserRole.USER) && (
              <Box fontWeight={800} textAlign="center">{role}</Box>
            )}
          </Box>
          <ListItem button className={classes.menuBtn}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <Box fontSize={14} fontWeight={500} onClick={signOut}>
              Logout
            </Box>
          </ListItem>

          <ListItem
            button
            className={classes.menuBtn}
            onClick={() => dispatch(toggleTheme(appTheme))}
          >
            <ListItemIcon>
              {appTheme ? <Brightness7Icon /> : <Brightness4Icon />}
            </ListItemIcon>
            <Box
              fontSize={14}
              fontWeight={500}>
              Switch Theme
            </Box>
          </ListItem>
        </Box>
      </StyledMenu>
    </div>
  );
}
