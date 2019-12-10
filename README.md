# vue-media-recorder

vue-media-recorder makes it easy to capture media (Microphone, Camera, Video) in your Vue.js apps.


## Installation

Use the package manager [npm](https://nodejs.org) to install vue-media-recorder.

```bash
npm install vue-media-recorder
```

## Usage

Using vue-media-recorder is easy:

```
<template>
    <div>
        <PhotoCapture v-model="imageBase64" />
        <VideoCapture uploadUrl="<example-server-address.com>" v-model="videoUrl" />
    </div>
</template>

<script>
import {PhotoCapture, VideoCapture} from 'vue-media-recorder'

export default {
    data(){
        return {
            imageBase64: '',
            videoUrl: '',
        }
    },
    components:{
        PhotoCapture,
        VideoCapture
    }
}
</script>
```

## VideoCapture Component Usage

For the VideoCaptrue component to work correctly, pass an uploadUrl prop 
 for your server.
Kindly see a sample server here:

[VideoCapture Server Configuration](https://github.com/vyaron/misterRecorder)


## VideoCapture Component Props
|Prop              |Value                                                           | IsRequired | Example                     |
|:----------------:|:--------------------------------------------------------------:|------------|-----------------------------|
| uploadUrl        | The server url to which the component will upload the video to | true  | 'localhost:3000' / 'foo-bar.com' |
| recordBtnContent | content for the video record button                            | false | '⬤'                             |
| stopBtnContent   | content for the stop recording button                          | false | '◼'                              |
| cancelBtnContent | button for clearing the recorderd video content                | false | 'ⅹ'                              |
| doneBtnContent   | button to confirm video is fine and handling its url           | false | '✓'                              |


## PhotoCapture Component Props
|Prop                |Value                                                           | IsRequired | Example |
|:------------------:|:--------------------------------------------------------------:|------------|---------|
| capturedBtnContent | content for the image capture button                           | false      | '📷'    |
| cancelBtnContent   | button for clearing the captured image content                 | false      | 'ⅹ'     |
| doneBtnContent     | button to confirm image is fine and handling its base64 format | false      | '✓'     |



## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)