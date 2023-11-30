const BASE_URL = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = '?response_type=token';
const CLIENT_ID = "&client_id=92b7e448f7fe406eaef359748343fe84";
// const REDIRECT_URL = "&redirect_uri=http://localhost:3000/";
const REDIRECT_URL = "&redirect_uri=https://alexs9090909.github.io/playmaker/";
const SCOPE = '&scope=ugc-image-upload user-read-playback-state user-modify-playback-state user-read-currently-playing playlist-modify-public playlist-modify-private playlist-read-private playlist-read-collaborative';
let TOKEN = null;

/*  let apiKey = "BQCIHk_B6sJGR5f0fhBGM8RI7RzvIWsuCANY6NiKAheSpKsteRPEUTU50kmObhMsHq6xitwlf0_MhjoyZVLnxynTbsnmYF1ewXe4zXdhO9IWo4zp3Z09QiP8xI4awFxC36RdVRU5miChXDanugLoF06-_jI9XoUMu38PVYTDtcjqD14txydNHW_DPG5VLiKgSwo73583W9Zoqv1n7KmRzeXfr2eKeNKsdFHeZXKm3uVNbMq-HHelM6x_3BS6jvQRGhMAHKXV7Q" */ // Access token à renouveler toutes les heures 

const getToken = () => {
   
    if (TOKEN) {
        return TOKEN;
    } else if (window.location.hash.length > 1) {

        const hashParameters = {}
        // window.location.hash.split('&').forEach(i => hashParameters[i] = i);
        window.location.hash
            .slice(1) // to remove # sign
            .split('&') // to split to paramater/value groups))
            .forEach(item => {
                const parameter = item.split('=')
                hashParameters[parameter[0]] = parameter[1];
            });

        TOKEN = hashParameters.access_token;
        window.history.pushState('Access Token', '', '/');
        return TOKEN;
        
    } else if (!TOKEN) {
        const URL = BASE_URL + RESPONSE_TYPE + CLIENT_ID + SCOPE + REDIRECT_URL;
        window.location = URL;
    }
} 

const Spotify = {
    search(term) {

        let apiKey = getToken();
        if (!apiKey) return [];        

        return fetch(
            `https://api.spotify.com/v1/search?q=${term}&type=track`,
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`
                },
            }

        )
            .then((response) => {
                return response.json();
            })
            .then((jsonResponse) => {
                const items = jsonResponse.tracks && jsonResponse.tracks.items; // Vérification de l'existence de jsonResponse.tracks
                if (items) {
                    const itemsArray = Object.values(items);
                    return itemsArray;
                } else {
                    console.log(apiKey)
                    console.error('La propriété "tracks" est manquante dans la réponse de l\'API.');
                    return [];
                }
            })
    },

    save(playlistTitle, playlistTracks) {

        let apiKey = getToken();
        if (!apiKey) return [];   

        return fetch(
            `https://api.spotify.com/v1/me`,
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`
                },
            }
        )
            .then((response) => {
                return response.json();
            })
            .then((jsonResponse) => {
                console.log(jsonResponse)
                const user_id = jsonResponse.id;
                return fetch(
                    `https://api.spotify.com/v1/users/${user_id}/playlists`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${apiKey}`
                        },
                        body: JSON.stringify({
                            "name": playlistTitle,
                            "description": "New playlist description",
                            "public": false
                        }),
                    }
                )
                    .then((secondResponse) => {
                        return secondResponse.json();
                    }, networkError => console.log(networkError.message)
                    ).then(secondJsonResponse => {
                        const playlist_id = secondJsonResponse.id;
                        // console.log('is playlistTracks an array ? > ' + Array.isArray(playlistTracks));
                        // console.log("content of playlistTracks is : " + playlistTracks);
                        return fetch(
                            `https://api.spotify.com/v1/users/${user_id}/playlists/${playlist_id}/tracks`,
                            {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: `Bearer ${apiKey}`
                                },
                                body: JSON.stringify({
                                    "uris": playlistTracks,
                                }),
                            }
                        )
                    })
                    ;
            })

            .catch((error) => {
                console.error('Erreur lors de la requête  :', error);
            });
    }
}


export { Spotify, getToken };



/*

http://localhost:3000/#access_token=

BQAXmZzANGKXOSaIQaxRlngYF13k3-vjkcTYGIoLthSMBcU_tiYhDtRSeZJr07BxjbZgLR5mmOcsYnnarZYWhK-t-0uX5DS2Vc9pGVwcAOO4GbZiwKC81S1vtLvKMYJhcSCO0kXQa07E1l3yJIm2MIXQ4BTDtoUV1JvHUr2pZ0OKrrP3nPgcYLr2po5V8xtLUhp3MSvAXSf7OW1PiwVMJlEqUY3T8RxUXbjuoIpip4oTh681LyGzHRA5vjmz

&token_type=Bearer&expires_in=3600&state=XPubkNMqxCslAjw0


http://localhost:3000/#access_token=

BQBQu603MWS2Q51LqWhhpzvX359-d8oxQ4U1YseT05hjzRPKTGV2HXUOabr06FYhbocyvuSDKN-iOSdVfI3Z46y19GtFUr7Gfie1LKnH3VIeoAR-aCtfRqQ28u_FYQ1EnH2cnP7YI8u16cAympJhVNG7PolFX8fRKTI2yLftSx9cJASrv8Yg6c21xrjVOzFYUJwU-CdVByVsIzXohZ8pDtw5E6Pjr0Ws2pwXWxi0tdg3UaZ7Bb_ePpU1swSo

&token_type=Bearer&expires_in=3600&state=emGMhBkNZ1GqYhQw



http://localhost:3000/#access_token=

BQCIHk_B6sJGR5f0fhBGM8RI7RzvIWsuCANY6NiKAheSpKsteRPEUTU50kmObhMsHq6xitwlf0_MhjoyZVLnxynTbsnmYF1ewXe4zXdhO9IWo4zp3Z09QiP8xI4awFxC36RdVRU5miChXDanugLoF06-_jI9XoUMu38PVYTDtcjqD14txydNHW_DPG5VLiKgSwo73583W9Zoqv1n7KmRzeXfr2eKeNKsdFHeZXKm3uVNbMq-HHelM6x_3BS6jvQRGhMAHKXV7Q

&token_type=Bearer&expires_in=3600&state=uTvo6sv20HoYocs8


*/


/* faire ctrl+z pour enlever toutes les lignes du haut et ca revient à avant authorization work */