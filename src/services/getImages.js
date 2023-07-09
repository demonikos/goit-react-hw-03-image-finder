import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';

const PER_PAGE = 12;

const getImages = async (query, page) => {
  const params = new URLSearchParams({
    key: '36718920-ea0d15de6c7dfa9439d7f0740',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: PER_PAGE,
    page: page,
  });

  const imageList = await axios(`?q=${query}&${params}`);
  return imageList.data;
};

export { getImages, PER_PAGE };
