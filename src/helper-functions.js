
export const getFolder = (folders, folder_id) =>
    folders.find(folder => folder.folder_id === parseInt(folder_id))

export const getNote = (notes, noteId) =>
    notes.find(note => note.id === parseInt(noteId))

export const getNotesForFolder = (notes, folder_id) =>  
	folder_id ? notes.filter(note => note.folder_id === parseInt(folder_id)) : notes
