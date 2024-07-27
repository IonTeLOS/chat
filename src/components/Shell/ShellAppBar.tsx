import { styled, useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Fab from '@mui/material/Fab';
import StepIcon from '@mui/material/StepIcon';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import Zoom from '@mui/material/Zoom';
import Divider from '@mui/material/Divider';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Fullscreen from '@mui/icons-material/Fullscreen';
import FullscreenExit from '@mui/icons-material/FullscreenExit';
import Link from '@mui/icons-material/Link';
import Menu from '@mui/icons-material/Menu';
import QrCode2 from '@mui/icons-material/QrCode2';
import Notifications from '@mui/icons-material/Notifications'; // Bell icon
import { useContext, useEffect, useState } from 'react';
import { ShellContext } from 'contexts/ShellContext';
import { drawerWidth } from './Drawer';
import { peerListWidth } from './PeerList';

interface AppBarProps extends MuiAppBarProps {
  isDrawerOpen?: boolean;
  isPeerListOpen?: boolean;
}

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) =>
    prop !== 'isDrawerOpen' && prop !== 'isPeerListOpen',
})<AppBarProps>(({ theme, isDrawerOpen, isPeerListOpen }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(isDrawerOpen && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
  }),
  ...(isPeerListOpen && {
    width: `calc(100% - ${peerListWidth}px)`,
    marginRight: `${peerListWidth}px`,
  }),
  ...((isDrawerOpen || isPeerListOpen) && {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  ...(isDrawerOpen &&
    isPeerListOpen && {
      width: `calc(100% - ${drawerWidth}px - ${peerListWidth}px)`,
    }),
}));

interface ShellAppBarProps {
  onDrawerOpen: () => void;
  onLinkButtonClick: () => Promise<void>;
  isDrawerOpen: boolean;
  isPeerListOpen: boolean;
  title: string;
  onPeerListClick: () => void;
  onRoomControlsClick: () => void;
  setIsQRCodeDialogOpen: (isOpen: boolean) => void;
  showAppBar: boolean;
  isFullscreen: boolean;
  setIsFullscreen: (isFullscreen: boolean) => void;
}

export const ShellAppBar = ({
  onDrawerOpen,
  onLinkButtonClick,
  isDrawerOpen,
  isPeerListOpen,
  setIsQRCodeDialogOpen,
  title,
  onPeerListClick,
  onRoomControlsClick,
  showAppBar,
  isFullscreen,
  setIsFullscreen,
}: ShellAppBarProps) => {
  const theme = useTheme();
  const { peerList, isEmbedded, showRoomControls } = useContext(ShellContext);
  const [isInIframe, setIsInIframe] = useState(false);
  const [messageToCopy, setMessageToCopy] = useState<string | null>(null);

  // Detect if the page is running inside an iframe
  useEffect(() => {
    setIsInIframe(window.self !== window.top);
  }, []);

  // Set up message listener
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const allowedOrigins = [
        'https://teloslinux.org',
        'file://',  // Matches any file URL
      ];

      // Check if the event origin matches any of the allowed origins
      if (!allowedOrigins.some(origin => event.origin.startsWith(origin))) {
        console.warn('Blocked message from untrusted origin:', event.origin);
        return;
      }
      if (event.data.type === 'SHARE_ADDRESS') {
        const shareAddress = event.data.data;
        localStorage.setItem('current', shareAddress);
        // Process the message
        setMessageToCopy(shareAddress);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const handleQRCodeClick = () => setIsQRCodeDialogOpen(true);

  const onClickFullscreen = () => setIsFullscreen(!isFullscreen);

  const handleShareLink = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ url });
        alert('URL shared successfully!');
      } catch (err) {
        console.error('Failed to share URL: ', err);
        alert('Failed to share URL.');
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        alert('URL copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy URL: ', err);
        alert('Failed to copy URL.');
      }
    }
  };

const handleCopyMessage = async () => {
  // Retrieve the stored message from localStorage
  const stored = localStorage.getItem('current');
  
  // Determine which message to use
  const urlToCopy = messageToCopy ? `https://pchat.xyz/public/${messageToCopy}` :
                      stored ? `https://pchat.xyz/public/${stored}` :
                      null;

  if (urlToCopy) {
    try {
      await navigator.clipboard.writeText(urlToCopy);
      alert('Message copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy message: ', err);
      alert('Failed to copy message.');
    }
  } else {
    alert('No message to copy.');
  }
};


  const handleRoomControlsClick = () => {
    if (messageToCopy) {
      window.open(`https://ntfy.sh/${messageToCopy}`, '_blank');
    } else {
      alert('No message to send.');
    }
  };

  return (
    <>
      <Slide appear={false} in={showAppBar} mountOnEnter unmountOnExit>
        <AppBar
          position="fixed"
          isDrawerOpen={isDrawerOpen}
          isPeerListOpen={isPeerListOpen}
        >
          <Toolbar
            variant="regular"
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'right',
            }}
          >
            {isEmbedded ? null : (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="Open menu"
                sx={{ mr: 2, ...(isDrawerOpen && { display: 'none' }) }}
                onClick={onDrawerOpen}
              >
                <Menu />
              </IconButton>
            )}

            {isEmbedded ? null : (
              <Tooltip title={title}>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{
                    marginRight: 'auto',
                  }}
                >
                  {title}
                </Typography>
              </Tooltip>
            )}
            <Tooltip title="Copy current URL or Share">
              <IconButton
                size="large"
                color="inherit"
                aria-label="Copy or Share URL"
                onClick={isInIframe ? handleCopyMessage : handleShareLink}
              >
                <Link />
              </IconButton>
            </Tooltip>
            <Tooltip title="Show QR Code">
              <IconButton
                size="large"
                color="inherit"
                aria-label="Show QR Code"
                onClick={handleQRCodeClick}
              >
                <QrCode2 />
              </IconButton>
            </Tooltip>
            <Divider
              orientation="vertical"
              sx={{ height: theme.spacing(3.5), mx: theme.spacing(1) }}
            />
            <Tooltip
              title={
                showRoomControls ? 'Hide Room Controls' : 'Show Room Controls'
              }
            >
              <IconButton
                size="large"
                color="inherit"
                aria-label="show room controls"
                onClick={handleRoomControlsClick}
              >
                <Notifications />
              </IconButton>
            </Tooltip>
            <Tooltip
              title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            >
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="fullscreen"
                onClick={onClickFullscreen}
              >
                {isFullscreen ? <FullscreenExit /> : <Fullscreen />}
              </IconButton>
            </Tooltip>
            <Tooltip title="Click to show peer list">
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="Peer list"
                onClick={onPeerListClick}
                sx={{
                  ml: 1,
                }}
              >
                <StepIcon icon={peerList.length + 1} />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
      </Slide>
      <Zoom
        style={{ position: 'absolute', left: '16px', top: '16px' }}
        in={!showAppBar}
        unmountOnExit
      >
        <Tooltip title="Show room controls">
          <Fab
            size="small"
            aria-label="show room controls"
            color="primary"
            onClick={handleRoomControlsClick}
          >
            <ExpandMore />
          </Fab>
        </Tooltip>
      </Zoom>
    </>
  );
};
