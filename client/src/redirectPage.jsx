import { useParams } from 'react-router-dom';
import { backendUrl } from './homePage';
import axios from 'axios';
import { useEffect } from 'react';

export function RedirectPage() {
  const { url } = useParams();
  const redirectedUrl = async () => {
    const data = await axios.get(backendUrl + "/" + url);
    return data.data['url'];
  };

  useEffect(async () => {
    window.location.replace(await redirectedUrl());

  });

  return (
    <div>
      <h1>Redirecting...</h1>
    </div>
  );
}
