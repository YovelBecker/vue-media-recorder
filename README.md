# vue-media-recorder

vue-media-recorder is a Vue.js library for using HTML5 media devices to have image and video capturing in a moment.

## Installation

Use the package manager [npm](https://nodejs.org) to install vue-media-recorder.

```bash
npm install vue-media-recorder
```

## Usage

To use vue-media-recorder in your project all thats needed is to add the following code to your component.

```
<template>
    <div>
        <PhotoCapture v-model="imageBase64" />
        <VideoCapture uploadUrl="" v-model="videoUrl" />
    </div>
</template>

<script>
import {PhotoCapture, VideoCapture} from 'vue-media-recorder'

export default {
    data(){
        imageBase64: null,
        videoUrl: null,
    },
    components:{
        PhotoCapture,
        VideoCapture
}
</script>
```

## VideoCapture Component Usage

For the VideoComponent to work correctly it needs the server url to which it will write the video file while recorded but also the server should be created in a specific way given in this GitHub Repository

[VideoCapture Server Configuration](https://github.com/vyaron/misterRecorder)


## VideoCapture Component Props
|       Prop       |                             Value                             |
|:----------------:|:-------------------------------------------------------------:|
|    uploadUrl     | The server url to which the component will write the video to |
| recordBtnContent |              content for the video record button              |
|  stopBtnContent  |             content for the stop recording button             |
| cancelBtnContent |        button for clearing the recorderd video content        |
|  doneBtnContent  |     button to confirm video is fine and handling its url      |


## PhotoCapture Component Props
|       Prop       |                             Value                             |
|:----------------:|:-------------------------------------------------------------:|
| capturedBtnContent |              content for the image capture button              |
| cancelBtnContent |        button for clearing the captured image content        |
|  doneBtnContent  |     button to confirm image is fine and handling its base64 format      |



## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)