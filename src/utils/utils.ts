export const extractTokenAndUserId = (url: string) => {
    // let userId: string;
    // let token: string;

    // By default, we receive an url with this format : https://front.safely-app.fr/reset/594989/token/qwe23909sdfs0934
    // To be honest, I don't know if this is the best way to do this but
    // I've tried doing this by regex but didn't found a regex to extract
    // the userId and the token at once.

    var regex = new RegExp('https:\/\/front\.safely-app\.fr\/reset\/(.*)\/token\/(.*)');
    const resultRegex = url.match(regex);
    const token = resultRegex[2];
    const userId = resultRegex[1];

    // // Url = https://front.safely-app.fr/reset/594989/token/qwe23909sdfs0934
    // url = url.substring(27, url.length);
    // // Url = reset/594989/token/qwe23909sdfs0934
    // url = url.substring(7, url.length);
    // // Url = 594989/token/qwe23909sdfs0934
    // userId = url?.substring(0, url.indexOf("/"));
    // // userid = 594989
    // url = url.substring(url.indexOf("/") + 1, url.length);
    // // Url = token/qwe23909sdfs0934
    // url = url.substring(url.indexOf("/") + 1, url.length);
    // // Url = qwe23909sdfs0934
    // token = url;

    return {userId: userId, token: token};

}