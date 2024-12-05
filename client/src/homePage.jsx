import React, { useState } from 'react';
import axios from 'axios'


import { styles } from './style';


export const backendUrl = "http://localhost:3000"

function HomePage() {
  const [url, setUrl] = useState('');
  const [hover, setHover] = useState(false);
  const [resultUrl, setResultUrl] = useState('');

  const inputChange = (event) => {
    setUrl(event.target.value);
  };

  const submit = async () => {
    const postData = await axios.post(`${backendUrl}/sendUrl?url=${url}`);




    setResultUrl(window.location.href + postData.data['data'])


  };

  return (
    <div style={styles.container}>
      <a href='/' style={styles.title}>Url Shortener</a>
      <h4 style={styles.subtitle}>Paste the URL to be shortened</h4>
      <label htmlFor="urlInput" style={{
        display: 'block', fontWeight: 500, marginBottom: '5px', fontFamily: 'sans-serif'
      }}>
        URL Input:
      </label>
      <input
        id="urlInput"
        style={styles.input}
        placeholder="Enter the link here"
        value={url}
        onChange={inputChange}
      />
      <button
        style={{ ...styles.button, ...(hover ? styles.buttonHover : {}) }}
        onClick={submit}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        Shorten URL
      </button><br /><br /><br />
      {resultUrl && (
        <a href={resultUrl} target="_blank" rel="noopener noreferrer" style={{
          fontSize: '32px',
          color: 'rgb(1, 134, 218)',
          fontFamily: 'Arial, sans-serif',
        }}>
          {resultUrl}
        </a>

      )

      }
    </div>
  );
}

export default HomePage;
