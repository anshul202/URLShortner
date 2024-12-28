import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

const LinkShortenerApp = () => {
  const [shortened, setShortened] = useState(null);
  const [url, setUrl] = useState(null);
  const inputForm = useRef(null);

  const handleSystem = () => {
    const userInput = inputForm.current.value;
    try {
      new URL(userInput);
    } catch (err) {
      return alert("Please enter a valid link");
    }
    if (!userInput) return alert("Please enter a link");
    setShortened(userInput);
  };

  const fetchData = async () => {
    try {
      const response = await axios.post('http://localhost:8001/url', { url: shortened });
      setUrl(response.data.id);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (shortened) {
      fetchData();
    }
  }, [shortened]);

  return (
    <div className='w-[100vw] h-[100vh] flex flex-col items-center gap-6'>
      <h1 className='mt-12 font-bold text-3xl bg-gradient-to-bl from-slate-600 to-orange-600 bg-clip-text text-transparent'>Link Shortener</h1>
      <div className='flex w-[60%] justify-center'>
        <input className='w-full font-mono p-4 rounded-l-xl border-2 outline-blue-950' type="text" placeholder="Enter your link here" ref={inputForm} />
        <button className='bg-slate-800 text-white p-3 rounded-r-xl' onClick={handleSystem}>Shorten</button>
      </div>
      <div>
        {url ? (
          <a className='bg-slate-500 p-2 rounded-lg hover:shadow-xl' href={`http://localhost:8001/url/${url}`} target='_blank' rel='noopener noreferrer'>
            Shortened Link: {`http://localhost:8001/url/${url}`}
          </a>
        ) : (
          <p className='font-mono font-semibold'>Please enter a link</p>
        )}
      </div>
    </div>
  );
};

export default LinkShortenerApp;
