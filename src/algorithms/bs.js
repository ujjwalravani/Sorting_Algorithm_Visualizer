import { swap } from "./helpers";
const bs = (array,arraySteps,colorSteps,strt,end) =>{
    let colorKey = colorSteps[colorSteps.length-1].slice();
    let i =0;
    let swapped = false;
    while(!swapped){
        swapped = true;
        for(let j =0;j<array.length-i-1;j++){
            if(array[j] > array[j+1]){
                array = swap(array,j,j+1);
                swapped = false;
            }
            arraySteps.push(array.slice());
            colorKey[j] =1;
            colorKey[j+1] = 1;
            colorSteps.push(colorKey.slice());
            colorKey[j] = 0;
            colorKey[j+1] = 0;
        }
        //colorKey[array.length-i-1] = 2;
        arraySteps.push(array.slice());
        colorSteps.push(colorKey.slice());
        i++;
    }
    //colorSteps.push(new Array(array.length).fill(2));
    colorSteps[colorSteps.length -1] = new Array(array.length).fill(2);
    return;
}
export default bs;