import React from 'react';
import styles from './Track.module.css';



function Track(props){

/*
    const handleAddClick = () => {
        props.updatePlaylistTracks(props.trackData);
        // console.log(typeof trackData);
    }
*/

    function handleAddClick() {
        props.addPlaylistTracks(props.trackData);
    }
      


    return (
        <div className={styles.TrackContainer} >
            <span className={styles.Track}>
                {props.trackData.name} by {props.trackData.artists[0].name}
            </span>
            <button className={styles.RemoveButton} onClick={handleAddClick}>+</button>

        </div>
    )
}

export default Track;