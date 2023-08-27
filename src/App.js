import { useEffect, useState } from 'react';
import Axios from 'axios';
import Dropdown from 'react-dropdown';
import { HiSwitchHorizontal } from 'react-icons/hi';
import 'react-dropdown/style.css';
import './App.css';
import logo from './logo.svg';
import gojo from './gojo.png';
import gifUrl from './hehe.gif';
  
function App() {
  
  // Initializing all the state variables 
  const [info, setInfo] = useState([]);
  const [input, setInput] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [options, setOptions] = useState([]);
  const [output, setOutput] = useState(0);
  
  // Calling the api whenever the dependency changes
  useEffect(() => {
    Axios.get(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`)
   .then((res) => {
      setInfo(res.data[from]);
    })
  }, [from]);
  
  // Calling the convert function whenever
  // a user switches the currency
  useEffect(() => {
    setOptions(Object.keys(info));
    convert();
  }, [info])
  
  // trolololo 
  const [showImages, setShowImages] = useState(false);
  const [showGifBackground, setShowGifBackground] = useState(false);

  // Function to convert the currency
  function convert() {
    var rate = info[to];
    setOutput(input * rate);
  }

  function handleConvertClick() {
    convert();

    // Ejecutar las funciones después de 5 segundos
    setTimeout(() => {
      
      setShowImages(!showImages);
      setShowGifBackground(!showGifBackground);
    }, 3000);
  }
  
  // Function to switch between two currency
  function flip() {
    var temp = from;
    setFrom(to);
    setTo(temp);
  }

  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsFlipped(prevIsFlipped => !prevIsFlipped);
    }, 600); // Cambia el valor para ajustar la velocidad del volteo

    return () => {
      clearInterval(intervalId);
    };
  }, []);


  return (
    <div className={`App background-page ${showGifBackground ? 'with-gif' : ''}`}>
      
      <div className="heading">
        {showImages ? (
           <h1 className="white" > e.e YA APRENDI REACT VICTORIA e.e</h1>
        ) : (
          <h1 >Currency converter</h1>
        )}
       
        {showImages && (
          <div className="image-container">
            <img src={gojo} className={isFlipped ? 'flipped-image' : 'normal-image'} alt="gojo" />
            <img src={logo} className="App-logo" alt="logo" />
            <img src={gojo} className={isFlipped ? 'flipped-image' : 'normal-image'} alt="gojo" />
          </div>
        )}
      </div>
      <div className="container">
        
      {showImages && (
            <div className="input-with-gif">
              <img src={gifUrl} alt="GIF" className="gif" />
            </div>
           )}
        <div className="left">
          <h3>Amount</h3>
          <input type="text" 
             placeholder="Enter the amount" 
             className="falling-input"
             onChange={(e) => setInput(e.target.value)} />
        </div>
        <div className="middle">
          <h3>From</h3>
          <Dropdown options={options} 
                    onChange={(e) => { setFrom(e.value) }}
          value={from} placeholder="From" />
        </div>
        <div className="switch">
          <HiSwitchHorizontal size="30px" 
                        onClick={() => { flip()}}/>
        </div>
        <div className="right">
          <h3>To</h3>
          <Dropdown options={options} 
                    onChange={(e) => {setTo(e.value)}} 
          value={to} placeholder="To" />
        </div>
      </div>
      <div className="result">
        <button onClick={()=>{handleConvertClick()}}>Convert</button>
        <h2>Converted Amount:</h2>
        <p>{input+" "+from+" = "+output.toFixed(2) + " " + to}</p>

      </div>
      </div>
   
  );
}
  
export default App;