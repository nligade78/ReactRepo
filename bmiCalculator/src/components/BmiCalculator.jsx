import React from "react";

function BmiCalculator() {
    const [weight, setWeight] = React.useState(0);
    const [height, setHeight] = React.useState(0);
    const [bmi, setBmi] = React.useState(0);

    const weightSet = (e) => {
        const weight = parseFloat(e.target.value);
        setWeight(weight || 0);
      };
      

    //   const heightSet = (e) => {
    //     const height = parseFloat(e.target.value);   instead of using this function, we can use the onChange event directly in the input field
    //     setHeight(height || 0);
    //   };

    const CalculateBMI = () => {
        const heightInMeter = height * 0.0254;
        const weightInKg = weight * 0.45359237;
        let bmi = weightInKg / (heightInMeter * heightInMeter);
        setBmi(bmi.toFixed(2));
        console.log(bmi);
    }

    const handleReload = () => {
        setWeight(0);
        setHeight(0);
        setBmi(0);
      };
      

    
  return (
    <div className="container">
      <div className="title">BMI Calculator</div>
      <div className="input">
        <span>Weight(lbs)</span>
        <input type="number" placeholder="Enter Weight Value"  value={weight} onChange={weightSet}/>
        <span>Height(in)</span>
        <input type="number" placeholder="Enter Height Value"   value={height} onChange={(event)=> setHeight(event.target.value)}/>  
      </div>
      <div className="buttons">
        <button onClick={CalculateBMI}>Submit</button>
        <button onClick={handleReload}>Reload</button>
      </div>
        <div className="result">
            <span>Your BMI is: {bmi}</span>
            <span>0</span>
        </div>
    </div>
  );
}

export default BmiCalculator;
