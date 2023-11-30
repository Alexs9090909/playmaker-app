import React, { useState } from 'react';
import styles from './SearchBar.module.css';




function SearchBar({ searchSpotify }){

    const [term, setTerm] = useState('');

    function handleTermChange(event) {
        if (event.target.value) {
        setTerm(event.target.value);
        searchSpotify(term)
        } else {searchSpotify("")}
    };

    function handleSearch(event) {
        event.preventDefault();
    };

    return (
        <div>
            <form className={styles.SearchBarAndButtonContainer} onSubmit={handleSearch}>
                <div className={styles.SearchBarContainer}>
                    <input placeholder="Search Tracks" className={styles.SearchBarInput} onChange={handleTermChange} />
                </div>
                <div className={styles.SearchButtonContainer} >
                </div>
            </form>
        </div>
    )
}


export default SearchBar;



/*

            <div className={styles.SearchBarContainer}>
                <input type='text' placeholder='Track ?' className={styles.SearchBarInput} onChange={handleTermChange}></input>
            </div>
            <div className={styles.SearchButtonContainer} >
                <button type="submit">Let's Go</button> // c'était pas comme ça ça
            </div>
            //


*/