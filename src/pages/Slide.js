import React from 'react';
import { Typography, Button, CardMedia } from '../../node_modules/@material-ui/core';
import { makeStyles } from '../../node_modules/@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  slideContainer: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  buttonContainer: {
    marginTop: theme.spacing(2),
  },
  media: {
    height: '300px',
    width: '100%',
    objectFit: 'cover',
    marginBottom: theme.spacing(2),
  },
}));

const Slide = ({ title, description, buttonText, onClick, imageUrl }) => {
  const classes = useStyles();

  return (
    <div className={classes.slideContainer}>
      <CardMedia
        component="img"
        alt=""
        image={imageUrl}
        className={classes.media}
      />
      <Typography variant="h4" component="h2" className={classes.title}>
        {title}
      </Typography>
      <Typography variant="body1">{description}</Typography>
      <div className={classes.buttonContainer}>
        <Button variant="contained" color="primary" onClick={onClick}>
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default Slide;
