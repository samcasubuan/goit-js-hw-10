const BASE_URL = 'https://api.thecatapi.com/v1';
// change this to your API Key
const API_KEY =
  'live_fi7Opc7K7DJ4FePdcOcznliHBP4wNmE2KT8xdNHfru5FTFGnELOMFY3u1OaJwQi2';

export function fetchBreeds() {
  return fetch(`${BASE_URL}/breeds?api_key=${API_KEY}`).then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    }
    return res.json();
  });
}

export function fetchCatByBreed(breedId) {
  return fetch(
    `${BASE_URL}/images/search?api_key=${API_KEY}&breed_ids=${breedId}`
  ).then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    }
    return res.json();
  });
}
