import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import firebase from "../Firebase";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props); // get properties from Component
    this.ref = firebase.firestore().collection('boards');
    this.unsuscribe = null;
    this.state = {
      boards:[]
    }
  }

  onCollectionUpdate = (querySnapshot) => {
    const boards = [];
    querySnapshot.forEach((doc) => {
      const {title, description, author} = doc.data();
      boards.push({
        key: doc.id,
        doc, // document snapshot
        title,
        description,
        author
      });
    });

    this.setState({boards});
  };

  componentDidMount() {
    this.unsuscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }


  render() {
    return (
        <div className="container">

          <div className="card card-default">

            <div className="card-heading">
              <h3 className="card-title">BOARD LIST</h3>
            </div>

            <div className="card-body">
              <h4><Link to="/create">Add Board</Link></h4>

              <table className="table table-striped">
                <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Author</th>
                </tr>
                </thead>
                <tbody>
                {
                  this.state.boards.map( board =>
                  <tr>
                    <td>
                        <Link to={`/show/${board.key}`}>
                          {board.title}
                        </Link>
                    </td>
                    <td>{board.description}</td>
                    <td>{board.author}</td>
                  </tr>
                  )
                }
                </tbody>
              </table>
            </div>

          </div>


        </div>
    );
  }
}

export default App;
