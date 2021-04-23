let access;

const getTwitchCredentials = () => {
    axios.post(`https://id.twitch.tv/oauth2/token?client_id=${dbAccess.twitchClientId}&client_secret=${dbAccess.twitchClientSecret}&grant_type=client_credentials`)
        .then(res => {
            access = res.data;
        })
        .catch(err => {
            console.error(err);
        });

    if (access == null) {
        throw "access is null"
    }
}

const interval = setInterval(getTwitchCredentials, 10000);

