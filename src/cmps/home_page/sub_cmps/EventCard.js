import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import event_img from '../../../assets/images/lectures/lecture2.png';

export default function EventCard() {

    return (
        <Card className="card">
            <CardMedia
                className="card-img"
                component="img"
                height="200"
                image={event_img}
                alt="event"
            />

            <CardActions className="card-footer" >

                <input type="button" value="הירשם עכשיו" className="events-button"/>
                <span className="events-link">לפרטים</span>

            </CardActions>
        </Card>
    );
}
