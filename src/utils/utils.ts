export const extractTokenAndUserId = (url: string) => {
    let regex = new RegExp('https:\/\/front\.safely-app\.fr\/reset\/(.*)\/token\/(.*)');
    const resultRegex = url.match(regex);
    const token = resultRegex[2];
    const userId = resultRegex[1];

    return {userId: userId, token: token};

}