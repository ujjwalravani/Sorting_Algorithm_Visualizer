import { swap } from "./helpers";

const qs = (array,arraySteps,colorSteps,strt,end) =>{
    let colorKey = colorSteps[colorSteps.length -1].slice();
    srt(array,arraySteps,colorKey,colorSteps,strt,end);
    colorSteps[colorSteps.length-1] = new Array(array.length).fill(2);
    return;
}
const srt = (array,arraySteps,colorKey,colorSteps,strt,end) =>{
    if(strt<end){
        let pind = partition(array,arraySteps,colorKey,colorSteps,strt,end);
        srt(array,arraySteps,colorKey,colorSteps,strt,pind-1);
        srt(array,arraySteps,colorKey,colorSteps,pind+1,end);
    }
    else{
        return;
    }
}
const partition = (array,arraySteps,colorKey,colorSteps,strt,end)=>{
    let pind = strt;
    let piv = array[end];
    for(let i = strt;i<end;i++){
        if(array[i] < piv){
            swap(array,i,pind);
            colorKey[end] = 3;
            colorKey[i] = 1;
            colorSteps.push(colorKey.slice());
            arraySteps.push(array.slice());
            colorKey[end] = 0;
            colorKey[i] = 0;
            pind++;
        }
        colorKey[end] = 3;
        colorKey[i] = 1;
        colorSteps.push(colorKey.slice());
        arraySteps.push(array.slice());
        colorKey[end] = 0;
        colorKey[i] = 0;
    }
    swap(array,pind,end);
    colorKey[end] = 1;
    colorKey[pind] = 1;
    colorSteps.push(colorKey.slice());
    arraySteps.push(array.slice());
    colorKey[end] = 0;
    colorKey[pind] = 0;
    return pind;
}
export default qs;
