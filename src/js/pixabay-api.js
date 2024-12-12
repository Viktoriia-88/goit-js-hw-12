import axios from 'axios';

const API_KEY = '47484582-92e080108706ddb17b6ec6a5b';

export const fetchImg = async (query, page = 1) => {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page: page,
  })

  const response = await axios.get(
    `https://pixabay.com/api/?key=${API_KEY}&q=${params}`
  );
  return response.data;
}