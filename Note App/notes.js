const fs =  require('fs');


// ------------------Begin of Reusable functions ---------------------

var fetchNotes = () => {
  try {                          //if file won't exist
    var notesString = fs.readFileSync('notes-data.json')
    return JSON.parse(notesString);
  } catch(e){
    return [];
  }
};

var saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json',JSON.stringify(notes));
};


// ------------------End of Reusable functions ---------------------


//  to add a new note

var addNote = (title,body) => {   
    var notes = fetchNotes();
    var note = {title,body}

    var duplicateNotes =  notes.filter((note) => { // to check if note already exists
      return note.title === title;
    });

    if (duplicateNotes.length === 0){
      notes.push(note);
      saveNotes(notes);
      return note
    }

  };


//to list all the notes

var getAll = () => {
    return fetchNotes();
};


// to read a note

var getNote = (title) => {
    
    var notes = fetchNotes();

    var getNotes =  notes.filter((note) => {  // to check if note exists and return note
      return note.title === title;
    });

    return getNotes[0]

};


// to delete a note

var remove = (title) => {

    var notes = fetchNotes(); // reusable func

    var filteredNotes =  notes.filter((note) => { // will return all other notes other than "note to be removed"
      return note.title !== title;
    });

    saveNotes(filteredNotes); //save new notes array

    return notes.length !== filteredNotes.length
    
};

// function just to print out note to screen

var logNote = (note) => { 
  console.log('--');
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
};

// add new function names here to be accessible from other modules

module.exports = {
  addNote, getAll, remove, getNote,logNote
};
