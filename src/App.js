import './App.css';
import bubblesort from './algorithms/bs';
import insertionsort from './algorithms/is';
import selectionsort from './algorithms/ss';
import mergesort from './algorithms/ms';
import quicksort from './algorithms/qs';
import { Component } from 'react';
import Bar from './comps/Bar';
//let first = 'Selection Sort'
class App extends Component {
  state = { 
    array : [], 
    arraySteps : [], // every time a swap is encountered/ array is modified, this is the new array
    colorKey: [], //for color of bars
    colorSteps : [],//similar to arraySteps
    currentStep: 0,
    count: 35,//number of bars
    delay: 17,// according to this delay, we'll re-render the components
    algorithm: 'Bubble Sort',
    timeouts: [],//for setTimeout()// will be updated
    disabled: false,
    //sorted: false,
   } 
  componentDidMount(){
    this.ArrayGenerate();
  }
  RandomNumberGenerate = (min,max)=>{
    return Math.floor(Math.random()*(max-min)+min);
  }
  clearTimeout = () =>{
    this.state.timeouts.forEach((timeout) => clearTimeout(timeout));
    this.setState({
      timeouts: []
    })
  }
  clearCurrentSteps = () =>{
    this.setState({
      currentStep: 0
    })
  }
  clearColorKey = () =>{
    let blankKey = new Array(this.state.count).fill(0);
    this.setState({
      colorKey: blankKey,
      colorSteps: [blankKey]  
    }) 
  }
  ArrayGenerate = ()=>{
    const cnt = this.state.count;
    this.clearCurrentSteps();
    this.clearColorKey();
    this.clearTimeout();
    const temp = [];
    for(let i =0;i<cnt;i++){
      temp.push(this.RandomNumberGenerate(50,350));
    }
    this.setState({
      array: temp,
      arraySteps: [temp],
    }, ()=>{
      this.generateSteps();
    });
  }
  algorithms  = {
    'Selection Sort' : selectionsort,
    'Bubble Sort': bubblesort,
    'Insertion Sort' : insertionsort,
    'Merge Sort' : mergesort,
    'Quick Sort': quicksort,
  }
  generateSteps = () =>{
    let array = this.state.array.slice();
    let steps = this.state.arraySteps.slice();
    let colorsteps = this.state.colorSteps.slice();
    this.algorithms[this.state.algorithm](array,steps,colorsteps,0,array.length-1);
    //this.algorithms[first](array,steps,colorsteps);
    this.setState({
      arraySteps: steps,
      colorSteps: colorsteps
    })
  }
  start = () =>{
    //this.generateSteps();
    
    let steps = this.state.arraySteps;
    let colorSteps = this.state.colorSteps;
    this.clearTimeout();
    let timeouts = [];
    let i = 0;
    if(this.isunsorted()){
    this.setState({
      disabled: true,
    })}
    
    while(i< steps.length-this.state.currentStep && this.isunsorted()){
      setTimeout(() => this.setState({ disabled: false }), (steps.length-this.state.currentStep)*this.state.delay);
      let timeout = setTimeout(() =>{
        let currentStep = this.state.currentStep;
        this.setState({
          array: steps[currentStep],
          colorKey: colorSteps[currentStep],
          currentStep: currentStep+1,
        });
        timeouts.push(timeout);
      },this.state.delay*(i))
      i++;
   }

    this.setState({
      timeouts: timeouts,
      //disabled: false
    })
  }
 changeAlgorithm = (e) => {
		this.clearTimeout();
		this.clearColorKey();
		this.setState(
			{
				algorithm: e.target.value,
				currentStep: 0,
				arraySteps: [
					this.state.arraySteps[
						this.state.currentStep === 0 ? 0 : this.state.currentStep - 1
					],
				],
			},
			() => this.generateSteps()
		);
	};
  changeDelay = (e) => {
		this.clearTimeout();
		this.setState({
			delay: parseInt(e.target.value,10),
		});
	};
  generateBars = () => {
		this.clearTimeout();
		this.clearColorKey();

		let barCount = this.state.count;
		let arr = [];

		for (let i = 0; i < barCount; i++) {
			arr.push(this.RandomNumberGenerate(50, 350));
		}

		this.setState(
			{
				array: arr,
				arraySteps: [arr],
				count: barCount,
				currentStep: 0,
			},
			() => this.generateSteps()
		);
	};
  changebc = (e) =>{
    this.clearTimeout();
    this.clearColorKey();
    this.setState({
      count: parseInt(e.target.value),

    },() =>this.generateBars());
  };
  isunsorted =()=>{
    for(let k = 0;k<this.state.colorKey.length;k++){
      if(this.state.colorKey[k] !== 2) return true;
    }
    return false;
  }
  render() { 
  
    let sliderStyle = {
      margin: 0,
    }
    let bars = this.state.array.map((data,ind) => {
      return (<Bar key = {ind} index = {ind} length = {data} color = {this.state.colorKey[ind]}/>); 
    });
    return <div className= "full">
      <div className="frame" >
        <div className="barsDiv container card">{bars}</div>
      </div>
      <div className="buttons">
        <button disabled = {this.state.disabled} className='button' onClick={() => this.ArrayGenerate()} >Generate New Array</button>
         <label className='select'>
            <select className='select' disabled= {this.state.disabled} value={this.state.algorithm} onChange={this.changeAlgorithm}>

              <option value= 'Bubble Sort'>Bubble Sort</option>

              <option value='Insertion Sort'>Insertion Sort</option>

              <option value='Selection Sort'>Selection Sort</option>
              
              <option value='Merge Sort'>Merge Sort</option>

              <option value='Quick Sort'>Quick Sort</option>
            </select>
          </label>
          <label className='select'>
            <select className='select' disabled = {this.state.disabled} onChange={this.changeDelay}>

              <option value = "17">Fast</option>

              <option value= "35">Medium</option>

              <option value= "100">Slow</option>
            </select>
          </label>
          <label className='select slider'>
            <p className= 'slider' disabled = {this.state.disabled} style = {sliderStyle}>Size</p>
            <input disabled = {this.state.disabled}type="range" min = '10' max = '35' step = '1' value = {this.state.count} onChange={this.changebc}/> {/*value is the defualt value of the slider*/}
            <p disabled = {this.state.disabled} className = 'slider' style = {sliderStyle}>{this.state.count}</p>
          </label>
        <button disabled = {this.state.disabled} className='button' onClick={() => this.start()} >Play</button>
      </div>
    </div>;
  }
}
 
export default App;
