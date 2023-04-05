const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const allScales = [];

const whiteKeys = document.querySelectorAll(".white-key");
const blackKeys = document.querySelectorAll(".black-key");

function createObject(title, scale) {
  return {
    name: title,
    scale: scale,
  };
}

function allNotesFromRoot(root) {
  let idx = notes.indexOf(root);
  const newNotes = [];
  while (newNotes.length < notes.length) {
    if (idx === notes.length) {
      idx = 0;
    }
    newNotes.push(notes[idx]);
    idx++;
  }
  return newNotes;
}

function createScale(root, isMajor) {
  // redefine all notes, beginning from the root
  const newNotes = allNotesFromRoot(root);
  console.log(newNotes);

  // determine major or minor scale formula
  let formula = [];
  if (isMajor) {
    formula = [0, 2, 4, 5, 7, 9, 11];
  } else {
    formula = [0, 2, 3, 5, 7, 8, 10];
  }
  console.log(formula);

  const filtered = [];
  let formulaIdx = 0;
  // filter notes and add any note that matches the formula
  newNotes.forEach((note, noteIdx) => {
    if (noteIdx === formula[formulaIdx]) {
      filtered.push(note);
      formulaIdx += 1;
    }
  });
  return filtered;
}

function generateScales() {
  notes.forEach((note) => {
    const majTitle = `${note} Major`;
    const majScale = createScale(note, true);
    allScales.push(createObject(majTitle, majScale));

    const minTitle = `${note} Minor`;
    const minScale = createScale(note, false);
    allScales.push(createObject(minTitle, minScale));
  });
  return allScales;
}

console.log(generateScales());
