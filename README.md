# say-and-see-fretboard

The problem with using a computer to help you study guitar is that your hands are busy while you're playing so it's disruptive to interact with the computer via the keyboard. 

## What is this? 

This is a rough proof-of-concept app that allows the user to  display various scales on a guitar fretboard using voice commands... nearly hands free. 

## Getting Started

This app does not use a javascript framework but it does utilize typescript. 

ParcelJS provides a simple web application bundler and comes preconfigured to work with typescript.

```cmd
yarn global add parcel-bundler
```

or 


```cmd
npm install -g parcel-bundler
```

Once you have the code, navigate to the project's root folder and install the dependencies.

```cmd
yarn
```

or 

```cmd
npm i
```

Next, just start the bundler.

```cmd
yarn start
```

or 

```cmd
npm run start
```

Then, open http://localhost:1234/ in your browser.

# Put it to use

The commands that are currently exposed are listed on the bottom left corner, grouped into categories that indicate which property of the fretboard they operate on. There are two ways to execute them:
- say the command out loud. examples: "scale minor", "toggle octaves", "box number 4"
> to start the speech recognition listener, just move your mouse anywhere on the page and ensure that the border of the command log in the bottom right turns red. This is your cue that the app is listening.
- If you have a hard time getting the browser to understand your voice, you can always click on the command with your mouse

Please file an issue if you have a comment or question.

Have fun!
