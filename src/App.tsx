import { useState } from 'react';
import './App.css';
import Characters from './Characters';

export default function App(): JSX.Element {
  const [characters, setCharacters] = useState([1]);
  const handleAddCharacter =()=>{
    let temp = [...characters]
    temp.push(temp[temp.length - 1]+1)
    setCharacters(temp);
  }


  return (
    <div className="App">
      <div>
        <button onClick={handleAddCharacter}>add new character</button>      
        <div style={{width: "100%"}}>
          {characters.map((value)=>(
            <div key={`Charactar${value}`}>
              <Characters value={value} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
