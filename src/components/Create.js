import React, {Component} from 'react';
import ReactDom from 'react-dom';
import firebase from "../Firebase";
import {Link} from 'react-router-dom';

class Create extends Component {

    constructor(props) {
        super();
        this.ref=firebase.firestore().collection('boards');
        this.state = {
            title:'',
            description:'',
            author:''
        }
    }


    onChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    };

    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        const {title, description, author} = this.state;

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
    };

    render() {
        const {title, author, description} = this.state;
      return(
          <div className="container">
              <h4>
                  <Link to="/">Book List</Link>
              </h4>

              <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                      <label htmlFor="title">Title:</label>
                      <input type="text"
                             className="form-control"
                             name="title"
                             value={title}
                             onChange={this.onChange}
                             placeholder="Title"/>
                  </div>
                  <div className="form-group">
                      <label htmlFor="description">Description:</label>
                      <textarea className="form-control"
                                name="description"
                                onChange={this.onChange}
                                placeholder="Description"
                                cols="80" rows="3">
                          {description}
                      </textarea>

                  </div>
                  <div className="form-group">
                      <label htmlFor="author">Author:</label>
                      <input type="text"
                             className="form-control"
                             name="author"
                             value={author}
                             onChange={this.onChange}
                             placeholder="Author"/>

                  </div>
                  <button type="submit" className="btn btn-primary">
                      Save
                  </button>
              </form>

          </div>
      );
    };


}

export default Create;