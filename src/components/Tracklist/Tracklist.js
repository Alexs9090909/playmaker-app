import React from 'react';
import Track from '../Track/Track';
import styles from './Tracklist.module.css';



function Tracklist(props) {
    return (
        <div className={styles.TracklistContainer}>
           {props.tracklistData.map((track,index) => <Track trackData={track} key={track.id} addPlaylistTracks={props.addPlaylistTracks} />)} 
        </div>
    )
}


export default Tracklist;



/*

import React from 'react';
import Track from '../Track/Track';

let trackExample = {
    title: 'Despasito',
    artist : 'Sergio Leone',
};


const tracklistExample = [trackExample,trackExample,trackExample];

console.log(tracklistExample);

function Tracklist() {
    return (
        <div>

           {tracklistExample.map((track,index) => <p key={index}>{track.title} by {track.artist}</p>)} 

        </div>
    )
}


export default Tracklist;

*/