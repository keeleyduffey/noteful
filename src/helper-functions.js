
export const getFolder = (folders, folderId) =>
    folders.find(folder => folder.id === folderId)

export const getNote = (notes, noteId) =>
    notes.find(note => note.id === noteId)

export const getNotesForFolder = (notes, folderId) =>  
	folderId ? notes.filter(note => note.folderId === folderId) : notes
