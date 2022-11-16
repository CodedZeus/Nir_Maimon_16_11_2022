export const localStorageService={
    save,get
}



function save(key,value){
localStorage.setItem(key,JSON.stringify(value))
}


function get(key){
return JSON.parse(localStorage.getItem(key))
}