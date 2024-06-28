import { useState } from "react";
import languages from "../languages";

function Translator() {
  const [fromText, setFromText] = useState('');
  const [toText, setToText] = useState('');
  const [fromLanguage, setFromLanguage] = useState('en-GB');
  const [toLanguage, setToLanguage] = useState('hi-IN');
  const [loading, setLoading] = useState(false);

  const handleExchange = () => {
    let tempValue = fromText;
    setFromText(toText);
    setToText(tempValue);

    let tempLanguage = fromLanguage;
    setFromLanguage(toLanguage);
    setToLanguage(tempLanguage)
  }

  const handleIconClick = (target, id) => {
    if(target.classList.contains('fa-copy'))
      {
        if(id === 'from')
          {
            copyContent(fromText);
          }
          else{
            copyContent(toText);
          }
      }
      else{
        if(id === 'from')
          {
            utterText(fromText, fromLanguage);
          }
          else{
            utterText(toText, toLanguage);
          }
      }
  }

  const copyContent = (text) => {
    navigator.clipboard.writeText(text);
  }

  const utterText = (text, languages) => {
    const synth = window.speechSynthesis;
    const uttarence = new SpeechSynthesisUtterance(text);
    uttarence.lang = languages;
    synth.speak(uttarence)
  }
  
  const handleTranslate = () =>{
    setLoading(true);
    let url = `https://api.mymemory.translated.net/get?q=${fromText}&langpair=${fromLanguage}|${toLanguage}`;
    fetch(url).then((res) => res.json()).then((data) => {
      setToText(data.responseData.translatedText);
      setLoading(false);
    })
  }
  return (
    <>
      <style>
        {`
          body {
            background-color: #600ee4;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
          }
        `}
      </style>
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <textarea
            className="w-full p-4 text-gray-800 bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 text-2xl h-60"
            id="from"
            placeholder="Enter text"
            value={fromText}
            onChange={(event) => setFromText(event.target.value)}
          ></textarea>
          <textarea
            className="w-full p-4 text-gray-800 bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 text-2xl h-60"
            id="to"
            value={toText}
            readOnly
          ></textarea>
        </div>
        <div className="flex justify-around">
          <div className="flex items-center mb-4">
            <div className="flex items-center space-x-4 border rounded-md border-gray-300 p-2">
              <i className="fa-solid fa-volume-high text-gray-500" onClick={(event) => handleIconClick(event.target, 'from')}></i>
              <i className="fa-solid fa-copy text-gray-500" onClick={(event) => handleIconClick(event.target, 'from')}></i>
            </div>
            <select className="ml-4 border-none bg-gray-100 text-gray-800" value={fromLanguage} onChange={(event) => 
              setFromLanguage(event.target.value)
            }>
              {
                Object.entries(languages).map(([code, name]) => (
                  <option key={code} value={code}>{name}</option>
                ))
              }
            </select>
          </div>
          <div className="flex items-center justify-center mb-4" onClick={handleExchange}>
            <i className="fa-solid fa-arrow-right-arrow-left text-gray-500 ml-4 mr-4" ></i>
          </div>
          <div className="flex items-center mb-4">
            <select className="mr-4 border-none bg-gray-100 text-gray-800" value={toLanguage} onChange={(event) => 
              setToLanguage(event.target.value)
            }>
              {
                Object.entries(languages).map(([code, name]) => (
                  <option key={code} value={code}>{name}</option>
                ))
              }
            </select>
            <div className="flex items-center space-x-4 border rounded-md border-gray-300 p-2">
              <i className="fa-solid fa-copy text-gray-500" onClick={(event) => handleIconClick(event.target, 'to')}></i>
              <i className="fa-solid fa-volume-high text-gray-500" onClick={(event) => handleIconClick(event.target, 'to')}></i>
            </div>
          </div>
        </div>
        <button className="w-full py-3 text-white bg-[#600ee4] rounded-md shadow-md hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          onClick={handleTranslate}
        >
          {loading ? 'Translating...' : "Translate Text"}
        </button>
      </div>
    </>
  );
}

export default Translator;
