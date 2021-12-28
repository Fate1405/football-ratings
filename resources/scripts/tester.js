let obj = [{"Joe" : "1", "Mama" : "2"}, {"Joe" : "1", "Mama" : "2"},];

for (let i = 0; i < obj.length; i++) {
    for (let [key, val] of Object.entries(obj[i])) {
        obj[i][key] = parseInt(val);
    }
}

console.log(obj);