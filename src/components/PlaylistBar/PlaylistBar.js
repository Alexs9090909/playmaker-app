import React, { useState } from 'react';
import styles from '../SearchBar/SearchBar.module.css';




function PlaylistBar({ saveSpotifyPlaylist , playlistTracks }){

    const [playlistTitle, setPlaylistTitle] = useState('');

    function handleTitleChange(event) {
        setPlaylistTitle(event.target.value);
    };

    /* function handleSearch(event) {
        event.preventDefault();
        searchSpotify(term);
    };
    */

    function handleSave(event) {
        event.preventDefault();
        saveSpotifyPlaylist(playlistTitle, playlistTracks);
    };


    return (
        <div>
            <form className={styles.SearchBarAndButtonContainer} onSubmit={handleSave}>
                <div className={styles.SearchBarContainer}>
                    <input placeholder="Playlist title " className={styles.SearchBarInput} onChange={handleTitleChange} />
                </div>
                <div className={styles.SearchButtonContainer} >
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    )
}


export default PlaylistBar;



