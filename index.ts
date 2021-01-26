import { Fretboard, GUITAR_TUNINGS, Systems } from '@moonwave99/fretboard.js';
const config = {
  el:'#fretboard',
  tuning:GUITAR_TUNINGS.default,//["E2", "A2", "D3", "G3", "B3", "E4"],
  stringCount:6,
  stringWidth:1,
  stringColor:'#00f',
  fretCount:18,
  fretWidth:1,
  fretColor:'#666',
  nutWidth:7,
  nutColor:'#666',
  middleFretColor:'#ff636c',
  middleFretWidth:3,
  scaleFrets:true,
  topPadding:15,
  bottomPadding:5,
  leftPadding:15,
  rightPadding:15,
  height:150,
  width:1160,
  dotSize:25,
  dotStrokeColor:'#555',
  dotStrokeWidth:1,
  dotTextSize:10,
  dotFill: ({ inBox }) => (inBox ? 'cyan' : 'lightgray'),
  disabledOpacity:0.7,
  showFretNumbers:true,
  fretNumbersHeight:40,
  fretNumbersMargin:20,
  fretNumbersColor:'#33333399',
  font:'Verdana',
  crop:false,
  fretLeftPadding:0,
  barresColor:'#666'  
};
const rootNote = 'E';
const noteOnly = ({ note, octave }) => note;
const noteWithOctave = ({ note, octave }) => note+octave;
const fillFunction = ({ note }) => note === rootNote ? 'cyan' : 'lightgrey';

new Fretboard(config)
.renderBox({
  type: 'pentatonic', 
  root: rootNote, 
  box: {
    box: 'G', 
    system: Systems.CAGED
  }
}).style({
  filter: { inBox: true },
  text: noteOnly,
  fill: fillFunction,
});


// .setDots([
//   {
//     string: 6,
//     fret: 3
//   },
//   {
//     string: 5,
//     fret: 2
//   },
//   {
//     string: 1,
//     fret: 1
//   }
// ])
// .render()
// .renderChord('320001')
// .renderChord('xx0232')
