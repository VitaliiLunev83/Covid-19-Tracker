import React from 'react';
import './infoBox.css'
import { Card, CardContent, Typography } from '@material-ui/core';

function InfoBox({title,cases,total,active,isRed,...props}) {
    return (
        <Card className={`InfoBox ${active && "InfoBox--selected"} ${isRed && active && "InfoBox--red" }`} onClick={props.onClick}>
            <CardContent>
                <Typography color="textSecondary" className="infoBox__title">
                {title}
                </Typography>
                <h2 className={`"infoBox__cases" ${!isRed && "infobox__cases--green"}`}>{cases}</h2>
                <Typography color="textSecondary" className="infoBox__total">
                    {total} Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
