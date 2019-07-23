import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import NoteSidebar from './NoteSidebar/NoteSidebar';
import Main from './Main/Main';
import FullNote from './FullNote/FullNote';
// import STORE from './store';
import NotefulContext from './NotefulContext';
import config from './config';
import './App.css';



class App extends Component {
  state = {
    folders: [], //STORE.folders,
    notes: [], //STORE.notes,
    error: null
  };
  
  setFolders = folders => {
    this.setState({
      folders,
      error: null,
    })
  }

  setNotes = notes => {
    this.setState({
      notes,
      error: null,
    })
  }

  deleteNote = noteId => {
    const newNotes = this.state.notes.filter(note =>
      note.id !== noteId
    )
    this.setState({
      notes: newNotes
    })
  }


  async componentDidMount() {
    Promise.all([
      fetch(config.API_ENDPOINT_NOTES),
      fetch(config.API_ENDPOINT_FOLDERS)
    ])
    .then(([resNotes, resFolders]) => {
      if (!resNotes.ok) return resNotes.json().then(e => Promise.reject(e));
      if (!resFolders.ok) return resFolders.json().then(e => Promise.reject(e));

      return Promise.all([resNotes.json(), resFolders.json()]);
    })
    .then(([notes, folders]) => {
      this.setState({notes, folders});
    })
    .catch(error => this.setState({ error }))
  }


  renderSidebar () {
    return (
      <>
        <Route
          exact
          path='/'
          component={Sidebar}
        />

        <Route
          exact
          path='/folder/:folderId'
          component={Sidebar}
        />

        <Route
          exact
          path='/note/:noteId'
          component={NoteSidebar}
        />
      </>
    )
  }

  renderMain () {
    return (
      <>
        <Route
          exact
          path='/'
          component={Main}
         />

        <Route
          exact
          path='/folder/:folderId'
          component={Main}
        /> 
        <Route 
          exact
          path='/note/:noteId' 
          component={FullNote}
        /> 
      </>
    )
  }


  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.deleteNote,
    }
    return (
      <main className='App'>
        <Header />
        <NotefulContext.Provider value={contextValue}>
          <div className='content' aria-live='polite'>
            <nav>{this.renderSidebar()}</nav> 
            <main>{this.renderMain()}</main>
          </div>
         </NotefulContext.Provider>
      </main>
    );
  }
}

export default App;
