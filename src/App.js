import React, {
  Component
} from 'react';
import './App.css';
import ImageSearchForm from './Components/ImageSearchForm/ImageSearchForm';
import Clarifai from "clarifai";
import FaceDetect from './Components/FaceDetect/FaceDetect';

const app = new Clarifai.App({
  apiKey: "",
});

class App extends Component {
  //Create the State for input and the fetch image
  constructor() {
    super();
    this.state = {
      image: "",
      imageUrl: "",
      box: {}, //a new object state that hold the bounding_box value
    };
  }

  //this function calculate the facedetect location in the image
  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    }; 
  } ;

  //this function display the face-detect box base on the state values
  displayFaceBox = (box) => {
    this.setState({ box: box });
  };
  //setState for our input with onInputChange function
  onInputChange = (event) => {
    this.setState({
      input: event.target.value
    });
  };

  //Perform a function when submitting with onSubmit
  onSubmit = () => {
    //set imageUrl state
    this.setState({
      imageUrl: this.state.input
    });
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then((response) => 
        this.displayFaceBox(this.calculateFaceLocation(response))
    )
    // if error exists console.log error
    .catch((error) => console.log(error))
  }
  render() {
    return ( <
      div className = "App" >
      {/* update your component with their state */}
      <ImageSearchForm 
      onInputChange = {this.onInputChange}
      onSubmit = {this.onSubmit}
      /> <FaceDetect 
      box={this.state.box}
      imageUrl = {this.state.imageUrl}
      /> </div>
    );
  }

}

export default App;
