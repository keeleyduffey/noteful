import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import NoteSidebar from './NoteSidebar/NoteSidebar';
import Main from './Main/Main';
import FullNote from './FullNote/FullNote';
import AddFolder from './AddFolder/AddFolder';
import AddNote from './AddNote/AddNote';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
import NotefulContext from './NotefulContext';
import config from './config';
import './App.css';



class App extends Component {
  state = {
    folders: [], //STORE.folders,
    notes: [], //STORE.notes,
    error: null
  };
   
  setFolder = folder => {
    this.setState({
      folders: [...this.state.folders, folder],
      error: null,
    })
  }

  setNote = note => {
    this.setState({
      notes: [...this.state.notes, note],
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
      fetch(`${config.API_ENDPOINT}/notes`),
      fetch(`${config.API_ENDPOINT}/folders`)
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
          path='/note/:noteId'
          component={NoteSidebar}
        />

        <Route
          path='/add-folder'
          component={NoteSidebar}
        />

        <Route
          path='/add-note'
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
          path='/note/:noteId' 
          component={FullNote}
        /> 

        <Route
          path='/add-folder'
          component={AddFolder}
        />

        <Route
          path='/add-note'
          component={AddNote}
        />
      </>
    )
  }


  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.deleteNote,
      addFolder: this.setFolder,
      addNote: this.setNote
    }
    return (
      <main className='App'>
        <Header />
        <NotefulContext.Provider value={contextValue}>
          <div className='content' aria-live='polite'>
            <nav>
              <ErrorBoundary>
                {this.renderSidebar()}
              </ErrorBoundary>
            </nav> 
            <main>
              <ErrorBoundary>
                {this.renderMain()}
              </ErrorBoundary>
            </main>
          </div>
         </NotefulContext.Provider>
      </main>
    );
  }
}

export default App;
