const is = (array,arraySteps,colorSteps,strt,end) => {
    let colorKey = colorSteps[colorSteps.length-1].slice();
    for(let i =1; i<array.length;i++){
        let value = array[i];
        let hole = i;
        colorKey[i] = 3;
        while(hole>0 && array[hole-1]>value){
            array[hole] = array[hole-1];
            arraySteps.push(array.slice());
            //colorKey[i] = 3;
            if(hole !== i){
                colorKey[hole] = 1;
            }
            colorKey[hole-1] = 1;
            colorSteps.push(colorKey.slice());
            colorKey[hole-1] = 0;
            colorKey[hole] = 0;
            hole = hole-1;
        }
        colorKey[i] = 0;
        array[hole] = value;
        arraySteps.push(array.slice());
        colorSteps.push(colorKey.slice());
    }
    colorSteps[colorSteps.length-1] = new Array(array.length).fill(2);
    return;
}
export default is;