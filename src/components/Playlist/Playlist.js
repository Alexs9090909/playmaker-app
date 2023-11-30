import React from 'react';
import Track from '../Track/Track';
import PlaylistTrack from '../PlaylistTrack/PlaylistTrack';
import styles from '../Tracklist/Tracklist.module.css';



function Playlist(props) {
    return (
        <div className={styles.TracklistContainer}>
           {props.playlistData.map((track,index) => <PlaylistTrack trackData={track} key={track.id} index={index} removePlaylistTrack={props.removePlaylistTrack} />)} 
        </div>
    )
}


export default Playlist;



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