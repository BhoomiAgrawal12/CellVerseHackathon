// src/app/PatientDashboard/layout/header/Header.tsx
"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  styled,
  Stack,
  IconButton,
  Badge,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";
import Link from "next/link";
import { useSession } from "next-auth/react"; // Assuming NextAuth is used
import Profile from "./Profile";
import { IconBellRinging, IconMenu } from "@tabler/icons-react";
import { handleSignOut } from "../../../../../actions/authAction"; // Adjust path

interface ItemType {
  toggleMobileSidebar: (event: React.MouseEvent<HTMLElement>) => void;
}

const Header = ({ toggleMobileSidebar }: ItemType) => {
  const { data: session, status } = useSession(); // Get session data from NextAuth
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Add state for login status

  useEffect(() => {
    setIsLoggedIn(!!session); // Update login status based on session
  }, [session]); // Run effect when session changes

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: "none",
    background: theme.palette.background.paper,
    justifyContent: "center",
    backdropFilter: "blur(4px)",
    [theme.breakpoints.up("lg")]: {
      minHeight: "70px",
    },
  }));

  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: "100%",
    color: theme.palette.text.secondary,
  }));

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={toggleMobileSidebar}
          sx={{
            display: {
              lg: "none",
              xs: "inline",
            },
          }}
        >
          <IconMenu width="20" height="20" />
        </IconButton>

        <IconButton
          size="large"
          aria-label="show 11 new notifications"
          color="inherit"
          aria-controls="msgs-menu"
          aria-haspopup="true"
        >
          <Badge variant="dot" color="primary">
            <IconBellRinging size="21" stroke="1.5" />
          </Badge>
        </IconButton>
        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          {status === "loading" ? (
            // Show a loading state while session is being fetched
            <Button variant="contained" disabled>
              Loading...
            </Button>
          ) : isLoggedIn ? (
            // User is logged in, show Sign Out button
            <form onSubmit={handleSignOut}>
              <Button
                type="submit"
                variant="contained"
                disableElevation
                color="primary"
              >
                Sign Out
              </Button>
            </form>
          ) : (
            // User is not logged in, show Sign In button
            <Button
              variant="contained"
              component={Link}
              href="/auth/login"
              disableElevation
              color="primary"
            >
              Sign In
            </Button>
          )}
          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;
