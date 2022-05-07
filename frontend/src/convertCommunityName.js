
export const converting = (prevName) => {

    if (prevName) {
        let nameList = prevName.split(" "); // [Data, Logic];
        let newArr = [];
        
        for (let i = 0; i < nameList.length; i++) {
            newArr.push(nameList[i][0].toLowerCase() + nameList[i].slice(1, nameList[i].length));
        }
        return newArr.join("_");

    }
}