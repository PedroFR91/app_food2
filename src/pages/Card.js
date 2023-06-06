import * as React from 'react';
import Card from '../../node_modules/@material-ui/core/Card';
import CardActions from '../../node_modules/@material-ui/core/CardActions';
import CardContent from '../../node_modules/@material-ui/core/CardContent';
import CardMedia from '../../node_modules/@material-ui/core/CardMedia';
import Button from '../../node_modules/@material-ui/core/Button';
import Typography from '../../node_modules/@material-ui/core/Typography';

export default function MediaCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image='url("/images/breakfast-1804457_1920.jpg")'
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}