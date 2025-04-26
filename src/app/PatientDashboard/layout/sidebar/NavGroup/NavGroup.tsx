import PropTypes from "prop-types";
// mui imports
import { ListSubheader, styled, Theme } from "@mui/material";

type NavGroupProps = {
  item: {
    navlabel?: boolean;
    subheader?: string;
  };
};

const NavGroup = ({ item }: NavGroupProps) => {
  const ListSubheaderStyle = styled(ListSubheader)(({ theme }: { theme: Theme }) => ({
    ...theme.typography.overline,
    fontWeight: "700",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(0),
    color: theme.palette.text.primary,
    lineHeight: "26px",
    padding: "3px 12px",
  }));

  return <ListSubheaderStyle disableSticky>{item.subheader}</ListSubheaderStyle>;
};

NavGroup.propTypes = {
  item: PropTypes.shape({
    navlabel: PropTypes.bool,
    subheader: PropTypes.string,
  }).isRequired,
};

export default NavGroup;
