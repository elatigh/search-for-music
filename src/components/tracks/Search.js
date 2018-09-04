import React, { Component } from 'react'
import {Consumer} from '../../context'
import axios from 'axios'

 class Search extends Component {
     state = {
         trackTitle:''

     }
      Onchage = (e)=>{
          this.setState({[e.target.name] :e.target.value})

     }
     findTrack = (dispatch,e)=>{
         e.preventDefault()
         axios.get(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${
            this.state.trackTitle
          }&page_size=10&page=1&s_track_rating=desc&apikey=${
            process.env.REACT_APP_MM_KEY}`)
         .then(res=>{
            dispatch({
                type: 'SEARCH_TRACKS',
                payload: res.data.message.body.track_list
              });
      
              this.setState({ trackTitle: '' });
             //console.log(res.data)
             //this.setState({track_list:res.data.message.body.track_list})
            })
         .catch(err=>{console.log(err)})
     }
        
   render() {
    return (
      <Consumer>
          {value=>{
              const { dispatch } = value;
              return(
                  <div className="card card-body mb-4 p-4">
                    <h1 className="text-center"> <i className="fas fa-music"/> Search For a Song</h1>

                    <p className="text-center lead">Get In Touch With Music</p>

                    <form onSubmit={this.findTrack.bind(this, dispatch)} className="form-group">
                       
                       <input className="form-control form-control-lg"  name="trackTitle" value={this.state.trackTitle} onChange={this.Onchage}/>
                       <button className="btn btn-primary btn-lg mt-2 btn-block">Get Lyrics Track </button>
                    </form>

                  </div>
              )
          }}
        
      </Consumer>
    )
  }
} export default Search
