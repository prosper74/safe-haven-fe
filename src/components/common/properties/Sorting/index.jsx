import React from "react";
import clsx from "clsx";
// Material-ui Components
import { Grid, IconButton, Chip } from "@material-ui/core";
// Material-ui Icon
import { Sort, Cancel } from "@material-ui/icons";
// Component Styles
import useStyles from "./SortStyles";

const Sorting = ({ setOption, sortOptions, setSortOptions }) => {
  const classes = useStyles();

  const handleSort = (i) => {
    const newOptions = [...sortOptions];
    newOptions.map((option) => (option.active = false));
    newOptions[i].active = true;
    setSortOptions(newOptions);
  };

  return (
    <Grid item container justifyContent="space-between" alignItems="center">
      <Grid item>
        <IconButton onClick={() => setOption(null)}>
          <Sort color="secondary" />
        </IconButton>
      </Grid>
      <Grid item xs>
        <Grid spacing={1} container justifyContent="space-evenly">
          {sortOptions.map((option, i) => (
            <Grid item key={option.label} onClick={() => handleSort(i)}>
              <Chip
                label={option.label}
                classes={{
                  root: clsx({ [classes.active]: option.active === true }),
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item>
        <IconButton onClick={() => setOption(null)}>
          <Cancel color="secondary" />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Sorting;
