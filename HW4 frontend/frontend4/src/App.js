import React from "react";
// Import the CustomModal that we created in Modal.js.
import Modal from "./components/Modal";
import RatingModal from "./components/rating"
import UserModal from "./components/user"
import axios from "axios";
import music from "./static/bensound-energy.mp3"



// We are creating a class component for our todo list and individual todo list
// items.

class App extends React.Component {
  // Here comes our constructor.
  constructor(props) {
    super(props);
    this.state = {
        
        songItem: {
        search:'',
        song: "",
        artist: "",
        rating: 1,
        username:'',
        password:'',
        audio: new Audio(music),
        isPlaying: false,
      },
        songList: [],
        songAvg: []
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    
        
    axios
    
      .get("http://localhost:8000/api/Artists/")
      .then((res) => this.setState({ songList: res.data }))
      .catch((err) => console.log(err));
      console.log(this.state.songList);
    
  };

  renderItems = () => {

    let filteredSongs = this.state.songList.filter(
      item => {
        return item.artist.indexOf(this.state.search) !== -1;
      }
    );
    return filteredSongs.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >

          {item.song},{' '}
          {item.artist}{'\n'}{'Rating: '}
          {item.rating}
          

        {/* UI for editing and deleting items and their respective events. */}

        <span>
          <button
            // If the user clicks the Edit button, call the editItem function.
            onClick={() => this.editItem(item)}
            className="btn btn-secondary mr-2"
          >

            {" "}
            Edit{" "}
          </button>
          <button
            // If the user clicks the Delete button, call the handleDelete function.
            onClick={() => this.handleDelete(item)}
            className="btn btn-danger"
          >
            Delete{" "}
          </button>

        {/* <button
            // If the user clicks the Rate button, call the handleDelete function.
            onClick={() => this.createRate(item)}
            className="btn btn-danger"
          >
            Rate{" "}
          </button>*/}
          
          
        </span>
      </li>

    ));

  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  ratingtoggle = () => {
    this.setState({ ratingModal: !this.state.ratingModal });
  };
  usertoggle = () => {
    this.setState({ userModal: !this.state.userModal });
  };

  handleSubmit = (item) => {
    this.toggle();
    if (item.id) {
      axios
        .put(`http://localhost:8000/api/Artists/${item.id}/`, item)
        .then((res) => this.refreshList());
        console.log('song already added');
      return;
    }
    axios
      .post("http://localhost:8000/api/Artists/", item)
      .then((res) => this.refreshList());
  };
  handleUser = (item) => {
    this.usertoggle();

    if (item.id) {
      axios
        .put(`http://localhost:8000/api/Users/${item.id}/`, item)
        .then((res) => this.refreshList());
      return;
    }
    axios
      .post("http://localhost:8000/api/Users/", item)
      .then((res) => this.refreshList());
  };

  handleRate = (item) => {
    
    this.ratingtoggle();
    
    // If the item already exists in our database, i.e., we have an id for our
    // item, use a PUT request to modify it.
    if (item.id) {
      axios
        .put(`http://localhost:8000/api/Ratings/${item.id}/`, item)
        .then((res) => this.refreshList());
      return;
    }

    axios
      .post("http://localhost:8000/api/Ratings/", item)
      .then((res) => this.refreshList());

  };

  handleDelete = (item) => {
    axios
      .delete(`http://localhost:8000/api/Artists/${item.id}`)
      .then((res) => this.refreshList());
  };

  createItem = () => {
    const item = { song: "", artist: ""};
    this.setState({ songItem: item, modal: !this.state.modal });
  };
  createUser = () => {
    const item = { username: "", password: ""};
    this.setState({ songItem: item, userModal: !this.state.userModal });
  };
  /*createRate = (item) => {
    const newitem = { username: "", song: item.song, rating: this.state.songItem.rating};
    this.setState({ songItem: newitem, ratingModal: !this.state.ratingModal });
    {this.renderItems()};
  };*/

  editItem = (item) => {
    this.setState({ songItem: item, modal: !this.state.modal });
  };

  playPause = () => {
    let isPlaying = this.state.isPlaying;

    if (isPlaying) {
      this.state.songItem.audio.pause();
    } else {
      this.state.songItem.audio.play();
    }
    this.setState({ isPlaying: !isPlaying});
  };

  updateSearch(event){
    this.setState({search: event.target.value.substr(0,20)});
    // console.log(event.target.value);
  };


  render() {
    return (
      <main className="content">
        <h1 className="Stitle">Music Rating App</h1>
        <div className="row ">
          <center>
          <div className="col-md-6 col-sm-10 mx-auto p-0" >
            <div className="card p-3">
            <div className="y">
               {/* If the user clicks the Add task button, call the createItem function. */}
               <p>
              <button class = 'b'style={{width: '200px'}} onClick={this.createUser} className="btn btn-primary">
                Sign in!

              </button>
              </p>
            </div>
              <div className="y">
                 {/* If the user clicks the Add task button, call the createItem function. */}
                <p>
                <button class = 'b' style={{width: '200px'}} onClick={this.createItem} className="btn btn-primary">
                  Add song

                </button>
                </p>
              </div>
              <div>
              <input
                type="text"
                value={this.state.search}
                // "this" refers to the current event. If there is a change,
                // it will be passed to the handleChange function above.
                onChange={this.updateSearch.bind(this)}
                placeholder="Enter artist"
              />
              </div>

              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
          </center>
          
        </div>
        <center>
        <div>
          <p>
            {this.state.isPlaying ?
              "Song is Playing" :
              "Song is Paused"}
          </p>

          <button onClick={this.playPause}>
            Play  |  Pause
          </button>
        </div>
        </center>
        {/* If the modal state is true, show the modal component. */}

        {this.state.modal ? (
          <Modal

            songItem={this.state.songItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}

        {this.state.ratingModal ? (
          <RatingModal

            songItem={this.state.songItem}
            ratingtoggle={this.ratingtoggle}
            onSave={this.handleRate}
          />
        ) : null}
        {this.state.userModal ? (
          <UserModal

            songItem={this.state.songItem}
            usertoggle={this.usertoggle}
            onSave={this.handleUser}
          />
        ) : null}
      </main>
    );
  }

}



// Export our App so that it can be rendered in index.js, where it is imported.
export default App;
