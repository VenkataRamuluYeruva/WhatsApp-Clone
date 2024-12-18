const axios = require('axios');

const YOUTUBE_API_KEY = 'your api_key';
const query = 'Godavari ';
const apiEndpoint = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=${YOUTUBE_API_KEY}&maxResults=10`;

axios.get(apiEndpoint)
  .then(response => {
    const videoIds = response.data.items.map(item => item.id.videoId);
    console.log(videoIds);
  })
  .catch(error => {
    console.error(error);
  });
