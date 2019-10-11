import React, {Component} from 'react';
import firebase from "../Firebase";
import {Link} from 'react-router-dom';

class Show extends Component {

    constructor(props) {
        super(props);
        this.state = {
            board:{},
            key:''
        }
    }

    componentDidMount() {
        const ref=firebase.firestore().collection('boards').doc(this.props.match.params.id);
        // QuerySnapShot.doc()
        ref.get()
            .then((doc) =>{
                if (doc.exists) {
                    this.setState({
                        board:doc.data(),
                        key: doc.id,
                        isLoading: false
                    });
                } else {
                    console.log("No such document");
                }

            })
    }

    delete(id) {
        firebase.firestore().collection('boards')
            .doc(id).delete().then(()=>{
                console.log("Document successfully deleted!");
                this.props.history.push("/");
        }).catch((error)=>{
            console.error("Error removing document: ", error);
        });
    }

    render(){
        return(
          <div className="container">
              <div className="card card-default">
                  <div className="card-header">
                      <h4>
                          <Link to="/">Board List</Link>
                      </h4>
                  </div>
                  <div className="card-body">
                      <dl>
                          <dt>Description:</dt>
                          <dd>{this.state.board.description}</dd>
                          <dt>Author:</dt>
                          <dd>{this.state.board.author}</dd>
                          <dt>Title:</dt>
                          <dd>{this.state.board.title}</dd>
                      </dl>
                      <Link to={`/edit/${this.state.key}`} className="btn btn-success mr-2">
                          Edit
                      </Link>
                      <button
                          onClick={this.delete.bind(this, this.state.key)}
                          className="btn btn-danger">
                          Delete
                      </button>

                  </div>
              </div>
          </div>
        );
    }





}

export default Show;