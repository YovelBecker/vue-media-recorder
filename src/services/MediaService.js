import axios from 'axios'

const SERVER = (process.env.NODE_ENV !== 'development') ? '/video' : 'http://localhost:3000'

async function saveVideo(video){
    let res = await axios.post(`${SERVER}/video`, video)
    console.log(res);
    
}

export default {
    saveVideo
}