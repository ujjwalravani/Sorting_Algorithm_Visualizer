import { swap } from "./helpers";
const ss = (array,arraySteps,colorSteps,strt,end) =>{
    let colorKey = colorSteps[colorSteps.length-1].slice();
    for(let i = 0;i<array.length;i++){
        //colorKey[i] = 3;
        for(let j =i+1;j<array.length;j++){
            if(array[j] < array[i]){
                swap(array,i,j);
            }
            colorKey[i] = 1;
            colorKey[j] = 1;
            colorSteps.push(colorKey.slice());
            arraySteps.push(array.slice());
            colorKey[i] =0;
            colorKey[j] = 0;
        }
        colorSteps.push(colorKey.slice());
        arraySteps.push(array.slice());
    }
    colorSteps[colorSteps.length-1] = new Array(array.length).fill(2);
}
export default ss;