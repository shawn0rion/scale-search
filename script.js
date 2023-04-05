const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const allScales = [];
let userScale = [];
let possibleScales = [];

const whiteKeys = document.querySelectorAll(".white-key");
console.log(whiteKeys);
const blackKeys = document.querySelectorAll(".black-key");
const keys = [...whiteKeys].concat([...blackKeys]);
console.log(keys);
keys.forEach((key) => {
  console.log(key);
  key.addEventListener("click", (e) => {
    console.log(key);
    toggleActive(e);
  });
});

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

  // determine major or minor scale formula
  let formula = [];
  if (isMajor) {
    formula = [0, 2, 4, 5, 7, 9, 11];
  } else {
    formula = [0, 2, 3, 5, 7, 8, 10];
  }
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

function toggleActive(event) {
  const { target } = event;
  const { textContent } = target;

  if (target.classList.contains("active")) {
    target.classList.remove("active");

    const idx = userScale.indexOf(textContent);
    userScale = [...userScale.slice(0, idx)];
    // if the last note is not selected, append all notes after the selected note
    if (idx !== userScale.length - 1) {
      userScale.concat([...userScale.slice(idx + 1)]);
    }
  } else {
    target.classList.add("active");
    userScale.push(textContent);
  }
  console.log(target);
  console.log(userScale);
}
