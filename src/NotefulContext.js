import React from 'react'

const NotefulContext = React.createContext({
  notes: [],
  folders: [],
  // addBookmark: () => {},
  deleteNote: () => {},
})

export default NotefulContext
