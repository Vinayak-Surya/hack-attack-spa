
export const createSessionID = (length:any) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789=-_';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

export const isHaveTravelAccount = (data:any) => {
    const result = data.filter((item:any) => {
        return item.subAccountType === "TravelAccount"
    })
    return result
}