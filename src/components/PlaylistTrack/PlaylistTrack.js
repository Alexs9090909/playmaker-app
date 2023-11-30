import React from 'react';
import styles from '../Track/Track.module.css';



function PlaylistTrack(props){




      function handleRemoveClick() {
        props.removePlaylistTrack(props.index);
        // console.log(props.index);
    };

    return (
        <div className={styles.TrackContainer} trackId={props.trackData.id}>
            <span className={styles.Track}>
                {props.trackData.name} by {props.trackData.artists[0].name}
            </span>
            <button className={styles.RemoveButton} onClick={handleRemoveClick}>-</button>

        </div>
    )
}

export default PlaylistTrack;