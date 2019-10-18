import React, {Component} from 'react';
import firebase from "../Firebase";
import {Link} from 'react-router-dom';

class Edit extends Component {

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

    onChange = (e) => {
        const state = this.state;
        console.log("on change ", state);
        state[e.target.name] = e.target.value;
        this.setState(state);
    };

    onSubmit = (e) => {
        e.preventDefault();


        console.log("Submited");
        console.log(this.state);

        // ToDo: use const instead of let + validations

        let title = this.state.title;
        let description = this.state.description;
        let author = this.state.author;

        if (this.state.title === undefined){
            title = this.state.board.title;
        } else{
            title = this.state.title;
        }

        if (this.state.author === undefined){
            author = this.state.board.author;
        } else{
            author = this.state.author;
        }

        if (this.state.description === undefined){
            description = this.state.board.description;
        } else{
            description = this.state.description;
        }

        //

        const key = this.state.key;

        console.log(title, description, author, key);

        firebase.firestore().collection('boards').doc(key).set({author: author, title: title, description: description}).then(()=>{
            console.log("Changes updated");
            this.props.history.push("/");

        }).catch((error)=>{
            console.error("Error while updating: ", error)
        });

        /* const {title, description, author} = this.state;



        this.ref.add({
            title,
            description,
            author
        }).then((docRef)=>{
            this.setState({
                title:'',
                description:'',
                author:''
            });

            this.props.history.push("/");
        });

         */
    };

    render(){
        return(
            <div className="container">
                <div className="card card-default">
                    <div className="card-header">
                        <h4>
                            <Link to="/">Board List</Link>
                        </h4>
                    </div>

                    <form onSubmit={this.onSubmit}>

                        <div className="form-group">

                            <div className="card-body">
                                <dl>
                                    <dt>Description:</dt>
                                    <dd>
                                <textarea className="form-control"
                                          name="description"
                                          defaultValue={this.state.board.description}
                                          placeholder="Description" cols="80" rows="5"
                                          onChange={this.onChange}
                                />
                                    </dd>
                                    <dt>Author:</dt>
                                    <dd>
                                        <input type="text"
                                               className="form-control"
                                               name="author"
                                               defaultValue={this.state.board.author}
                                               placeholder="Author"
                                               onChange={this.onChange}

                                        />
                                    </dd>
                                    <dt>Title:</dt>
                                    <dd>
                                        <input type="text"
                                               className="form-control"
                                               name="title"
                                               defaultValue={this.state.board.title}
                                               placeholder="Title"
                                               onChange={this.onChange}
                                        />
                                    </dd>
                                </dl>
                                <button type="submit" className="btn btn-primary">
                                    Save
                                </button>
                                <Link to={`/`} className="btn btn-success mr-2">
                                    Cancel
                                </Link>
                                <button
                                    onClick={this.delete.bind(this, this.state.key)}
                                    className="btn btn-danger">
                                    Delete
                                </button>


                            </div>

                        </div>


                    </form>



                </div>
            </div>
        );
    }





}

export default Edit;