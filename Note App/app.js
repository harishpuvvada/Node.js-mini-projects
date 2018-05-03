
const fs =  require('fs');
const notes = require('./notes.js');
const _ = require('lodash');
const yargs = require('yargs')
const argv =  yargs.argv

command = process.argv[2]


if (command === 'add'){
    var note = notes.addNote(argv.title,argv.body);
    if (note){
      notes.logNote(note);
    } else{
      console.log("Note already exists");
    }
}

else if (command === 'list') {
  var AllNotes = notes.getAll();
  console.log(`Printing ${AllNotes.length} note(s).`);
  AllNotes.forEach((note)=>{
    notes.logNote(note);
  });
}

else if (command === 'read') {
   var note = notes.getNote(argv.title);
   if(note){
    notes.logNote(note);
          }
   else{
    console.log("Note not found");
   }
}


else if (command === 'remove') {
   var noteRemoved = notes.remove(argv.title);
   var message = noteRemoved ? "Note removed" : "remove command failed" ;
   console.log(message);

}

else{
  console.log('command note recognized');
}
