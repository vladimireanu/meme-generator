import React, {Component} from 'react';


class MemeGenerator extends Component {
  constructor(props){
    super(props)
    this.state = {
      topText: '',
      bottomText: '',
      randomImage: "http://i.imgflip.com/1bij.jpg",
      allMemeImgs: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount(){

    fetch("https://api.imgflip.com/get_memes")
        .then(response => response.json())
        .then(response => {
          const {memes} = response.data
          this.setState({
            allMemeImgs: memes
          })
        })
  }

  handleChange = (event) => {
      const {value, name} = event.target
      this.setState({[name]: value})
  }

  handleSubmit = (event) => {
        event.preventDefault()
        const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
        const randImg = this.state.allMemeImgs[randNum].url
        this.setState({
          randomImage: randImg
        })
    }

  render() {
    return(
      <div>
           <form onSubmit={this.handleSubmit} className="meme-form">
              <input onChange={this.handleChange} type='text' value={this.state.topText} name ='topText' placeholder='Top Text' />
              <input onChange={this.handleChange} type='text' value={this.state.bottomText} name ='bottomText' placeholder='Bottom Text' />
              <button>Gen</button>
          </form>
          <div className="meme">
                   <img src={this.state.randomImage} alt="randomImg" />
                   <h2 className="top">{this.state.topText}</h2>
                   <h2 className="bottom">{this.state.bottomText}</h2>
               </div>
      </div>
    )
  }
}
export default MemeGenerator;
