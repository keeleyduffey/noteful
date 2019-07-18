import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import NoteSidebar from './NoteSidebar/NoteSidebar';
import Main from './Main/Main';
import FullNote from './FullNote/FullNote';
import STORE from './store';
import './App.css';




class App extends Component {
  state = {
    allFolders: STORE.folders,
    allNotes: STORE.notes,
  };

  getFolder = (folders, folderId) =>
    folders.find(folder => folder.id === folderId)

  getNote = (notes, noteId) =>
    notes.find(note => note.id === noteId)

  getNotesForFolder = (notes, folderId) =>
    notes.filter(note => note.folderId === folderId)

  renderSidebar () {
    const { allFolders, allNotes } = this.state
    return (
      <>
        <Route
          exact
          path='/'
          render={routeProps => {
            return <Sidebar
              folders={allFolders} />
          }}
        />

        <Route
          exact
          path='/folder/:folderId'
          render={routeProps => {
            return <Sidebar
              folders={allFolders} />
          }}
        />

        <Route
          path='/note/:noteId'
          render={routeProps => {
            const {noteId} = routeProps.match.params;
            const note = this.getNote(allNotes, noteId) || {};
            const folder = this.getFolder(allFolders, note.folderId);
            return <NoteSidebar
              {...routeProps} folder={folder} />
          }}
        />
      </>
    )
  }

  renderMain () {
    const { allFolders, allNotes } = this.state
    return (
      <>
        <Route
          exact
          path='/'
          render={routeProps => {
            return <Main
              {...routeProps}
              notes={allNotes} />
          }}
         />

        <Route
          exact
          path='/folder/:folderId'
          render={routeProps => {
            const {folderId} = routeProps.match.params;
            const notesForFolder = this.getNotesForFolder(allNotes, folderId);
            return <Main
              {...routeProps}
              notes={notesForFolder} />
          }}
        /> 
        <Route 
          path='/note/:noteId' 
          render={routeProps => {
            const {noteId} = routeProps.match.params;
            const note = this.getNote(allNotes, noteId);
            return <FullNote
              {...routeProps}
              note={note} />
          }}
        /> 
      </>
    )
  }


  render() {
    return (
      <main className='App'>
        <Header />
        <div className='content' aria-live='polite'>
          <nav>{this.renderSidebar()}</nav> 
          <main>{this.renderMain()}</main>
        </div>
      </main>
    );
  }
}

export default App;
