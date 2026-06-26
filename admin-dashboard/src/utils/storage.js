export function getStorage(key, fallback=null){
  try{
    const raw = localStorage.getItem(key);
    if(!raw) return fallback;
    return JSON.parse(raw);
  }catch(e){return fallback}
}
export function setStorage(key, value){
  try{localStorage.setItem(key, JSON.stringify(value));}catch(e){}
}