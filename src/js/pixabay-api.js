import axios from 'axios';
import {Notify} from 'notiflix/build/notiflix-notify-aio';

const BASE_URL = "https://pixabay.com/api/";
const BASE_KEY = '44168245-b85e0b025332670cfa54a187d';

export default class PixabayApi {
  constructor(query) {
    this.query = query;
    this.page = 1
  }

  async fetchByQuery() {
    const perPage = 15
    const params = {
      'key': BASE_KEY,
      'q': this.query,
      'image_type': 'photo',
      'orientation': 'horizontal',
      'safesearch': 'true',
      'page': this.page,
      'per_page': perPage
    };

    const response = await axios.get(BASE_URL, {params});
    return {...response.data, perPage}

  }

  resetPage() {
    this.page = 1
  }

  incrementPage() {
    this.page += 1
  }
}