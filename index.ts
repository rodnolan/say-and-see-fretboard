import { Fretboard, Systems } from '@moonwave99/fretboard.js';
import { config } from './config';
import { log } from './utils';

// define the shape of the application's state
interface State {
  whatToRender: whatToRender,
  rootNote: rootNotes,
  scaleType: scaleTypes,
  boxSystem: Systems | extraSystems,
  boxNumber: boxNumbers,
  boxLetter: boxLetters,
  showNoteOctaves: boolean,
  limitToBox: boolean,
  themeName: themeNames,
  misc: string,
}

// used to associate all the state mutation commands with the appropriate state property
enum stateProperties {
  WHAT_TO_RENDER = 'whatToRender',
  ROOT_NOTE = 'rootNote',
  SCALE_TYPE = 'scaleType',
  BOX_SYSTEM = 'boxSystem',
  BOX_NUMBER = 'boxNumber',
  BOX_LETTER = 'boxLetter',
  SHOW_NOTE_OCTAVES = 'showNoteOctaves',
  THEME_NAME = 'themeName',
  MISC = 'misc',
};

enum whatToRender {
  SCALE = 'scale',
  BOX = 'box',
}

// here are the options for all the root notes
enum rootNotes {
  AFlat = 'Ab',
  ANatural = 'A',
  ASharp = 'A#',
  BFlat = 'Bb',
  BNatural = 'B',
  BSharp = 'B#',
  CFlat = 'Cb',
  CNatural = 'C',
  CSharp = 'C#',
  DFlat = 'Db',
  DNatural = 'D',
  DSharp = 'D#',
  EFlat = 'Eb',
  ENatural = 'E',
  ESharp = 'E#',
  FFlat = 'Fb',
  FNatural = 'F',
  FSharp = 'F#',
  GFlat = 'Gb',
  GNatural = 'G',
  GSharp = 'G#'
};

// these are the scales that can be rendered
enum scaleTypes {
  MAJOR = 'major',
  MINOR = 'minor',
  PENTATONIC = 'pentatonic', 
};

// scales can be rendered across the entire fretboard
// or they can be limited to a subsection of the fretboard
// here are the options for rendering only a subsection
// the three types supported by the fretboard library are 
// defined in the Systems enum
// this one lets me toggle the box system off entirely 
enum extraSystems {
  NO_BOX_SYSTEM = null,
}

// used by the PENTATONIC and TNPS systems
enum boxNumbers {
  One = 1,
  Two,
  Three,
  Four,
  Five,
  Six,
  Seven,
};

// used by the CAGED system
enum boxLetters {
  C = 'C',
  A = 'A',
  G = 'G',
  E = 'E',
  D = 'D'
};

// used for the whole page, not the fretboard specifically
enum themeNames {
  DARK = 'darkgray',
  LIGHT = 'lightgray',
}

// define default state
let state:State = {
  rootNote: rootNotes.ENatural,
  scaleType: scaleTypes.MAJOR,
  whatToRender: whatToRender.BOX,
  boxSystem: Systems.pentatonic,
  boxLetter: boxLetters.E,
  boxNumber: 1,
  showNoteOctaves: true,
  limitToBox: true,
  themeName: themeNames.LIGHT,
  misc: null,
}

/* ******** */
/* commands */
/* ******** */
const commandMap = {
  
  // ROOT_NOTE
  'a-flat': {
    category: stateProperties.ROOT_NOTE,
    command: () => { setRootNote(rootNotes.AFlat); },
  }, 
  'a-natural': {
    category: stateProperties.ROOT_NOTE,
    command: () => { setRootNote(rootNotes.ANatural); }
  },
  'a-sharp': {
    category: stateProperties.ROOT_NOTE,
    command: () => { setRootNote(rootNotes.ASharp); },
  }, 
  'b-flat': {
    category: stateProperties.ROOT_NOTE,
    command: () => { setRootNote(rootNotes.BFlat); },
  }, 
  'be-flat': {
    category: stateProperties.ROOT_NOTE,
    command: () => { setRootNote(rootNotes.BFlat); },
    hide: true,
  }, 
  'b-natural': {
    category: stateProperties.ROOT_NOTE,
    command: () => { setRootNote(rootNotes.BNatural); },
  }, 
  'be-natural': {
    category: stateProperties.ROOT_NOTE,
    command: () => { setRootNote(rootNotes.BNatural); },
    hide: true,
  }, 
  'b-sharp': {
    category: stateProperties.ROOT_NOTE,
    command: () => { setRootNote(rootNotes.BSharp); },
  }, 
  'be-sharp': {
    category: stateProperties.ROOT_NOTE,
    command: () => { setRootNote(rootNotes.BSharp); },
    hide: true,
  }, 
  'c-flat': {
    category: stateProperties.ROOT_NOTE,
    command: () => { setRootNote(rootNotes.CFlat); },
  }, 
  'c-natural': {
    category: stateProperties.ROOT_NOTE,
    command: () => { setRootNote(rootNotes.CNatural); },
  }, 
  'c-sharp': {
    category: stateProperties.ROOT_NOTE,
    command: () => { setRootNote(rootNotes.CSharp); },
  }, 
  'd-flat': {
    category: stateProperties.ROOT_NOTE,
    command: () => { setRootNote(rootNotes.DFlat); },
  }, 
  'd-natural': {
    category: stateProperties.ROOT_NOTE,
    command: () => { setRootNote(rootNotes.DNatural); },
  }, 
  'd-sharp': {
    category: stateProperties.ROOT_NOTE,
    command: () => { setRootNote(rootNotes.DSharp); },
  }, 
  'e-flat': {
    category: stateProperties.ROOT_NOTE,
    command: () => { setRootNote(rootNotes.EFlat); },
  }, 
  'e-natural': {
    category: stateProperties.ROOT_NOTE,
    command: () => { setRootNote(rootNotes.ENatural); },
  }, 
  'e-sharp': {
    category: stateProperties.ROOT_NOTE,
    command: () => { setRootNote(rootNotes.ESharp); },
  }, 
  'f-flat': {
    category: stateProperties.ROOT_NOTE,
    command: () => { setRootNote(rootNotes.FFlat); },  
  }, 
  'f-natural': {
    category: stateProperties.ROOT_NOTE,
    command: () => { setRootNote(rootNotes.FNatural); },
  }, 
  'f-sharp': {
    category: stateProperties.ROOT_NOTE,
    command: () => { setRootNote(rootNotes.FSharp); },
  }, 
  'g-flat': {
    category: stateProperties.ROOT_NOTE,
    command: () => { setRootNote(rootNotes.GFlat); },
  }, 
  'g-natural': {
    category: stateProperties.ROOT_NOTE,
    command: () => { setRootNote(rootNotes.GNatural); },
  }, 
  'g-sharp': {
    category: stateProperties.ROOT_NOTE,
    command: () => { setRootNote(rootNotes.GSharp); },
  }, 

  // SCALE_TYPE
  'scale-major': {
    category: stateProperties.SCALE_TYPE,
    command: () => { setScaleType(scaleTypes.MAJOR); },
  },
  'scale-minor': {
    category: stateProperties.SCALE_TYPE,
    command: () => { setScaleType(scaleTypes.MINOR); }, 
  },
  'scale-pentatonic': {
    category: stateProperties.SCALE_TYPE,
    command: () => { setScaleType(scaleTypes.PENTATONIC); },
  },

  // BOX_SYSTEM
  'box-system-caged': {
    category: stateProperties.BOX_SYSTEM,
    command: () => {setBoxSystem(Systems.CAGED); },
  },
  'box-system-pentatonic': {
    category: stateProperties.BOX_SYSTEM,
    command: () => {setBoxSystem(Systems.pentatonic); },
  },
  'box-system-three-notes': {
    category: stateProperties.BOX_SYSTEM,
    command: () => {setBoxSystem(Systems.TNPS); },
  },
  'box-system-3-notes': {
    category: stateProperties.BOX_SYSTEM,
    command: () => {setBoxSystem(Systems.TNPS); },
    hide: true,
  },
  'box-system-none': {
    category: stateProperties.BOX_SYSTEM,
    command: () => {setBoxSystem(extraSystems.NO_BOX_SYSTEM); },
  },

  // BOX_NUMBER
  'box-number-1': {
    category: stateProperties.BOX_NUMBER,
    command: () => { setBoxNumber(boxNumbers.One); },
  },
  'box-number-one': {
    category: stateProperties.BOX_NUMBER,
    command: () => { setBoxNumber(boxNumbers.One); },
    hide: true,
  },
  'box-number-2': {
    category: stateProperties.BOX_NUMBER,
    command: () => { setBoxNumber(boxNumbers.Two); },
  },
  'box-number-two': {
    category: stateProperties.BOX_NUMBER,
    command: () => { setBoxNumber(boxNumbers.Two); },
    hide: true,
  },
  'box-number-3': {
    category: stateProperties.BOX_NUMBER,
    command: () => { setBoxNumber(boxNumbers.Three); },
  },
  'box-number-three': {
    category: stateProperties.BOX_NUMBER,
    command: () => { setBoxNumber(boxNumbers.Three); },
    hide: true,
  },
  'box-number-4': {
    category: stateProperties.BOX_NUMBER,
    command: () => { setBoxNumber(boxNumbers.Four); },
  },
  'box-number-for': {
    category: stateProperties.BOX_NUMBER,
    command: () => { setBoxNumber(boxNumbers.Four); },
    hide: true,
  },
  'box-number-four': {
    category: stateProperties.BOX_NUMBER,
    command: () => { setBoxNumber(boxNumbers.Four); },
    hide: true,
  },
  'box-number-5': {
    category: stateProperties.BOX_NUMBER,
    command: () => { setBoxNumber(boxNumbers.Five); },
  },
  'box-number-five': {
    category: stateProperties.BOX_NUMBER,
    command: () => { setBoxNumber(boxNumbers.Five); },
    hide: true,
  },
  'box-number-6': {
    category: stateProperties.BOX_NUMBER,
    command: () => { setBoxNumber(boxNumbers.Six); },
  },
  'box-number-six': {
    category: stateProperties.BOX_NUMBER,
    command: () => { setBoxNumber(boxNumbers.Six); },
    hide: true,
  },
  'box-number-7': {
    category: stateProperties.BOX_NUMBER,
    command: () => { setBoxNumber(boxNumbers.Seven); },
  },
  'box-number-seven': {
    category: stateProperties.BOX_NUMBER,
    command: () => { setBoxNumber(boxNumbers.Seven); },
    hide: true,
  },

  // BOX_LETTER
  'box-letter-c': {
    category: stateProperties.BOX_LETTER,
    command: () => { setBoxLetter(boxLetters.C); },
  },
  'box-letter-a': {
    category: stateProperties.BOX_LETTER,
    command: () => { setBoxLetter(boxLetters.A); },
  },
  'box-letter-g': {
    category: stateProperties.BOX_LETTER,
    command: () => { setBoxLetter(boxLetters.G); },
  },
  'box-letter-e': {
    category: stateProperties.BOX_LETTER,
    command: () => { setBoxLetter(boxLetters.E); },
  },
  'box-letter-d': {
    category: stateProperties.BOX_LETTER,
    command: () => { setBoxLetter(boxLetters.D); },
  },

  // SHOW_NOTE_OCTAVES
  'toggle-octaves': {
    category: stateProperties.SHOW_NOTE_OCTAVES,
    command: () => { toggleOctaves(); },
  },

  // THEME_NAME
  'dark': {
    category: stateProperties.THEME_NAME,
    command: () => { setTheme('darkgrey'); },
  },
  'light':  {
    category: stateProperties.THEME_NAME,
    command: () => { setTheme('lightgrey'); },
  },

  // WHAT_TO_RENDER
  'render-scale': {
    category: stateProperties.WHAT_TO_RENDER,
    command: () => { setWhatToRender(whatToRender.SCALE); }
  },
  'render-box': {
    category: stateProperties.WHAT_TO_RENDER,
    command: () => { setWhatToRender(whatToRender.BOX); }
  },

  // UI
  'clear':  {
    category: stateProperties.MISC,
    command:() => { clearLog(); },
    hide: true,
  },
  'reset':  {
    category: stateProperties.MISC,
    command:() => { clearLog(); },
    hide: true,
  },
  'reset-log':  {
    category: stateProperties.MISC,
    command:() => { clearLog(); },
  },
  'clear-log':  {
    category: stateProperties.MISC,
    command:() => { clearLog(); },
    hide: true,
  },

  // 'root': () => {},
  // 'chord': () => {},
  // 'pentatonic': () => {},
  // 'major': () => {},
  // 'minor': () => {},
  // 'chromatic': () => {},
  // 'increase': () => {},
  // 'decrease': () => {},
  // 'sharp': () => {},
  // 'flat': () => {},
  // 'natural': () => {},
  // 'caged': () => {},
  // '3': () => {},
  // 'string': () => {},
  // 'fret': () => {},
};

const executeVoiceCommand = (voiceCommandStr) => {
  if (commandMap[voiceCommandStr].command instanceof Function) {
    log(`executing ${voiceCommandStr}`);
    commandMap[voiceCommandStr].command();
  } else {
    log(`I didn't understand... please try again.`);
  }
};

/* ********* */
/* listeners */
/* ********* */
document.addEventListener('mousemove', () => {
  const commandLog = document.getElementById('commandLog');
  const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  const SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
  
  const recognition = new SpeechRecognition();
  const speechRecognitionList = new SpeechGrammarList();

  let notes = [ 'A flat', 'A natural', 'A sharp', 'B flat', 'B natural', 'C natural', 'C sharp', 'D flat', 'D natural', 'D sharp', 'E flat', 'E natural', 'F natural', 'F sharp', 'G flat', 'G natural', 'G sharp'];
  var grammar = '#JSGF V1.0; grammar notes; public <note> = ' + notes.join(' | ') + ' ;'

  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
  recognition.continuous = false;
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onstart = function() {
    commandLog.style.border = '10px solid red';
  };
  
  recognition.onspeechend = function() {
    commandLog.style.border = '10px solid black';
    recognition.stop();
  };
                
  // This runs when the speech recognition service returns result
  recognition.onresult = function(event) {
      const transcript = event.results[0][0].transcript;
      const confidence = event.results[0][0].confidence;
      let commandStr = `${String(transcript).toLowerCase()} (${Math.round(confidence*100)}%)`;
      log(`you said: ${commandStr}`);
      let commandName = String(transcript).toLowerCase().split(' ');
      commandStr = commandName.length > 1 ? commandName.join('-') : commandName[0];
      executeVoiceCommand(commandStr);
  };
                
  // start recognition
  recognition.start();
  
});

/* *************************** */
/* state modification routines */
/* *************************** */

const setRootNote = (newRootNote) => {
  log(`switching rootNote to ${newRootNote}`);
  state.rootNote = newRootNote;
  renderFretboard();
};

const setScaleType = (newScaleType) => {
  log(`switching scaleType to ${newScaleType}`);
  state.scaleType = newScaleType;
  renderFretboard();
};

const setBoxSystem = (newBoxSystem) => {
  log(`switching boxSystem to ${newBoxSystem}`);
  state.boxSystem = newBoxSystem;
  renderFretboard();
};

const setBoxNumber = (newBoxNumber) => {
  log(`switching boxNumber to ${newBoxNumber}`);
  state.boxNumber = newBoxNumber;
  renderFretboard();
};

const setBoxLetter = (newBoxLetter) => {
  log(`switching boxLetter to ${newBoxLetter}`);
  state.boxLetter = newBoxLetter;
  renderFretboard();
};

const toggleOctaves = () => {
  log('toggling the showNoteOctaves switch');
  state.showNoteOctaves = !state.showNoteOctaves;
  renderFretboard();
};

const setTheme = (newThemeName) => {
  log(`set ${newThemeName} theme`);
  state.themeName = newThemeName;
  document.getElementById('wrapper').style.backgroundColor = state.themeName;
  updateStateMonitor();
};

const setWhatToRender = (newWhatToRender) => {
  log(`switching whatToRender to ${newWhatToRender}`);
  state.whatToRender = newWhatToRender;
  renderFretboard();
};

const clearLog = () => {
  (document.getElementById('commandLog') as HTMLTextAreaElement).value = '';
};

const updateStateMonitor = () => {
  Object.keys(stateProperties).map(prop => {
    const id = `value-${stateProperties[prop]}`;
    document.getElementById(id).innerText = state[stateProperties[prop]];
  });
}

/* **************************** */
/* fretboard rendering routines */
/* **************************** */
const renderFretboard = () => {
  state.whatToRender === whatToRender.SCALE ? renderScale() : renderBox();
  updateStateMonitor();
}

const renderScale = () => {

  if (state.boxSystem) {
    const position = state.boxSystem === Systems.CAGED ? state.boxLetter : state.boxNumber; 
    log(`rendering scale with ${state.boxSystem} box in position ${position}`);

    fretboard.renderScale({
      type: state.scaleType,
      root: state.rootNote,
      box: {
        box: state.boxSystem === Systems.CAGED ? state.boxLetter : state.boxNumber,
        system: state.boxSystem,
      }
    })
  } else {
    log(`rendering scale with no box`);
    fretboard.renderScale({
      type: state.scaleType,
      root: state.rootNote,
    });
  }

  styleFretboard();
}

const renderBox = () => {
  if (state.boxSystem) {
    const position = state.boxSystem === Systems.CAGED ? state.boxLetter : state.boxNumber; 
    log(`rendering box with ${state.boxSystem} box in position ${position}`);

    fretboard.renderBox({
      type: state.scaleType, 
      root: state.rootNote, 
      box: {
        box: state.boxSystem === Systems.CAGED ? state.boxLetter : state.boxNumber,
        system: state.boxSystem,
      }
    });
  } else {
    log(`rendering box with no box... this makes no sense.`);
    fretboard.renderBox({
      type: state.scaleType, 
      root: state.rootNote, 
    });
  }

  styleFretboard();
};

const styleFretboard = () => {
  fretboard.style({
    filter: { inBox: state.limitToBox },
    text: ({note, octave}) => state.showNoteOctaves ? `${note}${octave}` : `${note}`,
    fill: ({ note }) => note === state.rootNote ? 'cyan' : 'lightblue',
  });
}

/* ********************** */
/* UI generation routines */
/* ********************** */

const generateVoiceCommandsBox = () => {
  // find the div where everything will be inserted
  const voiceCommandsList = document.getElementById('voiceCommandsListContainer');
  
  // loop over all the properties that are defined in the state object
  Object.keys(stateProperties).map(prop => stateProperties[prop]).forEach(commandCategory => {
    // create a new box for each state property
    const commandCategoryDiv = document.createElement('div');
    commandCategoryDiv.setAttribute('id', `${commandCategory}Container`);
    
    // display the name of each state property
    const commandCategoryTitle = document.createElement('div');
    commandCategoryTitle.setAttribute('class', 'commandCategoryTitle');
    commandCategoryTitle.innerText = `${commandCategory}:`;
    commandCategoryDiv.appendChild(commandCategoryTitle);

    // and also the current value of that property
    const commandCategoryValue = document.createElement('span');
    commandCategoryValue.setAttribute('id', `value-${commandCategory}`);
    commandCategoryValue.setAttribute('class', 'stateValues');
    commandCategoryValue.innerText = state[commandCategory];
    commandCategoryTitle.appendChild(commandCategoryValue);

    voiceCommandsList.appendChild(commandCategoryDiv);

    // loop over each command the the category and display it 
    // hide the ones that exist just to deal with oddball speech recognition

    const valuesContainer = document.createElement('div');
    commandCategoryDiv.appendChild(valuesContainer);
    valuesContainer.setAttribute('class', 'valuesContainer');
    Object.keys(commandMap).forEach(command => {
      if(commandMap[command].category === commandCategory && !commandMap[command].hide) {
        const commandSpan = document.createElement('span');
        commandSpan.addEventListener('click', () => {
          commandMap[command].command();
        });
        commandSpan.innerText = command;
        valuesContainer.appendChild(commandSpan);
      }
    });

  });
};

const fretboard = new Fretboard(config);
generateVoiceCommandsBox();
renderFretboard();
