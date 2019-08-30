//Name: Jake Greer
//Date: 6/24/17
//Project: Vanilla JS - MVC - Hangman Game 


/**
 * @class Model
 *
 * Manages the data of the application.
 */
class Model {

    constructor() {
        this.state = {
            lives: 7,
            word: null,
            words: [
                { 
                    text: "rainbow",
                    audio: "assets/music/rainbow (mp3cut.net).mp3"
                },
                { 
                    text: "television",
                    audio: "assets/music/television (mp3cut.net).mp3"
                },
                { 
                    text: "interpol",
                    audio: "assets/music/interpol (mp3cut.net).mp3"
                },
                { 
                    text: "the shins",
                    audio: "assets/music/the-shins (mp3cut.net).mp3"
                },
                { 
                    text: "whitesnake",
                    audio: "assets/music/whitesnake (mp3cut.net).mp3"
                },
                { 
                    text: "the killers",
                    audio: "assets/music/the-killers (mp3cut.net).mp3"
                },
                { 
                    text: "scorpions",
                    audio: "assets/music/scorpions (mp3cut.net).mp3"
                },
                { 
                    text: "misfits",
                    audio: "assets/music/misfits (mp3cut.net).mp3"
                },
                { 
                    text: "kiss",
                    audio: "assets/music/kiss (mp3cut.net).mp3"
                },
                { 
                    text: "lynyrd skynyrd",
                    audio: "assets/music/lynyrd-skynyrd (mp3cut.net).mp3"
                },
                { 
                    text: "sex pistols",
                    audio: "assets/music/sex-pistols (mp3cut.net).mp3"
                },
                { 
                    text: "the strokes",
                    audio: "assets/music/the-strokes (mp3cut.net).mp3"
                },
                { 
                    text: "alice cooper",
                    audio: "assets/music/alice-cooper (mp3cut.net).mp3"
                },
                { 
                    text: "prince",
                    audio: "assets/music/prince (mp3cut.net).mp3"
                },
                { 
                    text: "pearl jam",
                    audio: "assets/music/pearl-jam (mp3cut.net).mp3"
                },
                { 
                    text: "green day",
                    audio: "assets/music/GreenDay_-_I_walk_alone_cut_(mp3.pm).mp3"
                },
                { 
                    text: "acdc",
                    audio: "assets/music/ACDC_-_Back_In_Black-sample.ogg"
                },
                { 
                    text: "zz top",
                    audio: "assets/music/zz-top (mp3cut.net).mp3"
                },
                { 
                    text: "foo fighters",
                    audio: "assets/music/foo-fighters (mp3cut.net).mp3"
                },
                { 
                    text: "dead kennedys",
                    audio: "assets/music/dead-kennedys (mp3cut.net).mp3"
                },
                { 
                    text: "arctic monkeys",
                    audio: "assets/music/arctic-monkeys (mp3cut.net).mp3"
                },
                { 
                    text: "rolling stones",
                    audio: "assets/music/rolling-stones (mp3cut.net).mp3"
                },
                { 
                    text: "nofx",
                    audio: "assets/music/nofx (mp3cut.net).mp3"
                },
                { 
                    text: "joy division",
                    audio: "assets/music/joy-division (mp3cut.net).mp3"
                },
                { 
                    text: "pixies",
                    audio: "assets/music/pixies (mp3cut.net).mp3"
                },
                { 
                    text: "queen",
                    audio: "assets/music/queen (mp3cut.net).mp3"
                },
                { 
                    text: "led zeppelin",
                    audio: "assets/music/led-zeppelin (mp3cut.net).mp3"
                },
                { 
                    text: "the beatles",
                    audio: "assets/music/pennylane (mp3cut.net).mp3"
                },
                { 
                    text: "pink floyd",
                    audio: "assets/music/pink-floyd (mp3cut.net).mp3"
                },
                { 
                    text: "guns n roses",
                    audio: "assets/music/guns-n-roses (mp3cut.net).mp3"
                },
                { 
                    text: "the grinns",
                    audio: "assets/music/the-grinns (mp3cut.net).mp3"
                }
            ],
            letters: ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
            guesses: [],
            lineArray: [],
            wordArray: []
        }
        this._pullWord();
    }

    _pullWord() {
        this.state.word = this.state.words[(Math.floor(Math.random() * this.state.words.length))];
        this._setArrays(this.state.word.text)
    }

    bindGameChanged(callback) {
        this.onGameChanged = callback
    }

    _commit(state) {
        this.onGameChanged(state)
    }
  
    guessLetter(letter) {

        this.state.guesses.push(letter);
        let found = false;
        let word = this.state.word.text;

        for(let i = 0; i < word.length; i++) {
            if( word.charAt(i) === letter ) {
                this.state.lineArray[i] = letter;
                found = true;
            }
        }

        if(!found) {
            this.state.lives--;
        }

        if(this.state.lives === 0) {
            this._resetGame();
        }

        if(word === this.state.lineArray.join('')) {
            let audio = new Audio(this.state.word.audio);
            audio.play();
            setTimeout( () => {
                this._resetGame()
            }, 16 * 1000)
        }

        this._commit(this.state)
    }
  
    _setArrays(word) {
        for(let i = 0; i < word.length; i++) {
            if (word.charAt(i) != " ") {
                this.state.lineArray.push("_");
                this.state.wordArray.push(word.charAt(i));
            }
            else {
                this.state.lineArray.push(" ");
                this.state.wordArray.push(" ");
            }
        }
        return this.state.lineArray.join(" ");
    }

    _resetGame() {
        this.state = {
            ...this.state,
            lives: 7,
            word: null,
            guesses: [],
            lineArray: [],
            wordArray: []
        }
        this._commit(this.state)
        this._pullWord();
    }
  
}
  
/**
 * @class View
 *
 * Visual representation of the model.
 */
class View {
    constructor() {
        //ROOT
        this.app = this.getElement('#root')
        //HEADER
        this.header = this.createElement("div", "heading");
        this.image = this.createElement('img', 'image-top');
        this.image.src = "assets/images/rockOn.jpg";
        this.title = this.createElement("h1", "title");
        this.title.textContent = "Rock and Roll Hangman";
        this.author = this.createElement("h3", "title");
        this.author.textContent = "By: Jake Greer";
        this.header.append(this.image, this.title, this.author);
        //GAME
        this.gameWrapper = this.createElement("div", "container");
        this.canvas = this.createElement('canvas', 'hangman-canvas')
        this.canvas.height = "400";
        this.canvas.width = "400";
        this.ctx = this.canvas.getContext("2d");
        this.ctx.strokeStyle = '#ffffff';
        this.wordContainer= this.createElement("div", "word-container");
        this.livesWrapper = this.createElement("p");
        this.livesCount = this.createElement("span", "lives");
        this.livesWrapper.textContent = "Lives left: ";
        this.livesWrapper.append(this.livesCount);
        this.wordValue = this.createElement("h1", "word");
        this.wordContainer.append(this.livesWrapper, this.wordValue);
        this.buttonContainer = this.createElement('div', 'letters');
        this.letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
        this.buttons = this.letters.map( letter => {
            let button = this.createElement('button', letter);
            button.textContent = letter;
            return button;
        })
        this.buttons.map( button => this.buttonContainer.append(button))
        this.gameWrapper.append(this.canvas, this.wordContainer, this.buttonContainer);
        //SIDEBAR
        this.sideBar = this.createElement('div', 'side-panel');
        this.sideBarTitle = this.createElement('h1');
        this.sideBarTitle.append('Hints:');
        this.break = this.createElement('br');
        this.sideBarTitle.append(this.break);
        this.sideBarTitle.append("_______");
        this.hintWrapper = this.createElement('ul');
        this.listItem = this.createElement('li');
        this.hintWrapper.append( 
            this.setListItem('All words are band names from the rock genre!'),
            this.setListItem('The keyboard can be used along with the buttons'),
            this.setListItem('Try using all your vowels first.'),
            this.setListItem('If you win, a song from the band will play for 15 seconds before refreshing a new game')
        )
        this.sideBar.append(this.sideBarTitle, this.hintWrapper);
        //WRITE GAME
        this.app.append(this.header, this.gameWrapper, this.sideBar)
        this._drawBasePost();
    }

    setListItem(text) {
        let listItem = this.listItem.cloneNode(true);
        listItem.textContent = text;
        return listItem;
    }
  
    createElement(tag, className) {
        const element = document.createElement(tag)
    
        if (className) element.classList.add(className)
    
        return element
    }
  
    getElement(selector) {
        const element = document.querySelector(selector)
    
        return element
    }

    initListeners(handler) {
        this.buttons.forEach( button => {
            button.addEventListener('click', handler)
        })
    }

    updateGameView(props) {
        this.wordValue.textContent = props.lineArray.join(' ');
        this.livesCount.textContent = props.lives;
        let guessed = props.guesses[props.guesses.length - 1];
        if(this.letters.find( o => o === guessed)) {
            let button = this.buttons.find( o => o.className === guessed);
            button.removeAttribute('onclick');
            button.style.display = "none";

            this._drawMan(props.lives)
        }
    }

    _drawBasePost() {
        let ctx = this.ctx;
        ctx.lineWidth=3;
        ctx.moveTo(30,390);
        ctx.lineTo(123,390);
        ctx.stroke();
        
        ctx.moveTo(30,400);
        ctx.lineTo(120,400);
        ctx.stroke();
        
        ctx.moveTo(120,390);
        ctx.lineTo(120,400);
        ctx.stroke();
        
        //Main Post vertical bar 1
        ctx.moveTo(30,60);
        ctx.lineTo(30,400);
        ctx.stroke();
        //Main Post vertical bar 2
        ctx.moveTo(50,60);
        ctx.lineTo(50,100);
        ctx.stroke();
        //Main Post vertical bar 3
        ctx.moveTo(50,120);
        ctx.lineTo(50,390);
        ctx.stroke();
        //Main Post vertical bar top
        ctx.moveTo(30,60);
        ctx.lineTo(50,60);
        ctx.stroke();
        //Main Post horizontal bar 1
        ctx.moveTo(50,60);
        ctx.lineTo(225,60);
        ctx.stroke();
        //Main Post horizontal bar 2
        ctx.moveTo(50,80);
        ctx.lineTo(70,80);
        ctx.stroke();
        //Main Post horizontal bar 3
        ctx.moveTo(90,80);
        ctx.lineTo(225,80);
        ctx.stroke();
        //Main Post horizontal bar side
        ctx.moveTo(225,60);
        ctx.lineTo(225,80);
        ctx.stroke();
        //Main post support bar
        ctx.moveTo(30,120);
        ctx.lineTo(90,60);
        ctx.stroke();
        //Main post support bar 2
        ctx.moveTo(30,140);
        ctx.lineTo(110,60);
        ctx.stroke();
        //Rope-Hanging
        ctx.moveTo(225,80);
        ctx.lineTo(225,120);
        ctx.stroke();
        //Rope-bar
        ctx.moveTo(215,60);
        ctx.lineTo(215,80);
        ctx.stroke();
        //Rope-bar 2
        ctx.moveTo(220,60);
        ctx.lineTo(220,80);
        ctx.stroke();
        //Rope-bar 3
        ctx.moveTo(210,60);
        ctx.lineTo(210,80);
        ctx.stroke();
        //bolts 1
        ctx.lineWidth=1;
        ctx.beginPath();
        ctx.arc(35,64, 2, 0, Math.PI * 2, true);
        ctx.stroke();
        //bolts 2
        ctx.beginPath();
        ctx.arc(45,64, 2, 0, Math.PI * 2, true);
        ctx.stroke();
        //bolts 3
        ctx.beginPath();
        ctx.arc(91,64, 2, 0, Math.PI * 2, true);
        ctx.stroke();
        //bolts 4
        ctx.beginPath();
        ctx.arc(100,64, 2, 0, Math.PI * 2, true);
        ctx.stroke();
        //bolts 5
        ctx.beginPath();
        ctx.arc(35,119, 2, 0, Math.PI * 2, true);
        ctx.stroke();
        //bolts 6
        ctx.beginPath();
        ctx.arc(35,129, 2, 0, Math.PI * 2, true);
        ctx.stroke();
        //bolts 7
        ctx.beginPath();
        ctx.arc(35,75, 2, 0, Math.PI * 2, true);
        ctx.stroke();
        //bolts 8
        ctx.beginPath();
        ctx.arc(45,75, 2, 0, Math.PI * 2, true);
        ctx.stroke();
        //bolts 9
        ctx.beginPath();
        ctx.arc(36,395, 2, 0, Math.PI * 2, true);
        ctx.stroke();
        //bolts 10
        ctx.beginPath();
        ctx.arc(46,395, 2, 0, Math.PI * 2, true);
        ctx.stroke();
    }

    _drawHead() {
        let ctx = this.ctx;
        //outer circle
        ctx.lineWidth=4;
        ctx.beginPath();
        ctx.arc(225, 145, 25, 0, Math.PI * 2, true);
        ctx.stroke();
        
        //eyes-right
        ctx.beginPath();
        ctx.arc(233,141,4,0,2*Math.PI, true);
        ctx.stroke();
        //eyes-left
        ctx.beginPath();
        ctx.arc(217,141,4,0,2*Math.PI, true);
        ctx.stroke();
        
    }
    
    _drawMouth() {
        let ctx = this.ctx;
        ctx.beginPath();
        ctx.arc(225, 150, 15, 0, Math.PI, false);
        ctx.stroke();
    }
    
    _drawTorso() {
        let ctx = this.ctx;
        ctx.lineWidth=4;
        ctx.beginPath();
        ctx.moveTo(225,170);
        ctx.lineTo(225,250);
        ctx.stroke();
    }
    
    _drawLeftArm() {
        let ctx = this.ctx;
        //left arm
        ctx.lineWidth=4;
        ctx.beginPath();
        ctx.moveTo(225,170);
        ctx.lineTo(200,230);
        ctx.stroke();
    }
    
    _drawRightArm() {
        let ctx = this.ctx;
        //right arm
        ctx.lineWidth=4;
        ctx.beginPath();
        ctx.moveTo(225,170);
        ctx.lineTo(250,230);
        ctx.stroke();
    }
    
    _drawLeftLeg() {
        let ctx = this.ctx;
        //left leg
        ctx.lineWidth=4;
        ctx.beginPath();
        ctx.moveTo(225,250);
        ctx.lineTo(200,320);
        ctx.stroke();
    }
    
    _drawRightLeg() {
        let ctx = this.ctx;
        //right leg
        ctx.lineWidth=4;
        ctx.beginPath();
        ctx.moveTo(225,250);
        ctx.lineTo(250,320);
        ctx.stroke();
    }
    
    _drawMan(lives) {
        //calls drawing functions for each lif lost;
        if(lives == 6) {
            this._drawHead();
            this._drawMouth();
        }
        if(lives == 5) {
            this._drawTorso();
        }
        if(lives == 4) {
            this._drawLeftArm();
        }
        if(lives == 3) {
            this._drawRightArm();
        }
        if(lives == 2) {
            this._drawLeftLeg();
        }
        if(lives == 1) {
            this._drawRightLeg();
        }
        if(lives == 0) {
            console.log("Zero reset buttons")
        }
    }
  
}
  
/**
 * @class Controller
 *
 * Links the user input and the view output.
 *
 * @param model
 * @param view
//  */
class Controller {
    constructor(model, view) {
        this.model = model
        this.view = view

        this.model.bindGameChanged(this.onGameChanged);
        this.view.initListeners(this.handleKeyPress.bind(this))

        this.onGameChanged(this.model.state)
        document.onkeyup = this.handleKeyPress.bind(this);
    }
  
    onGameChanged = props => {
        this.view.updateGameView(props);
    }

    handleKeyPress(event) {
        var userGuess = event.key || event.target.className;
        userGuess = userGuess.toLowerCase();
        if( this.model.state.letters.find(o => o === userGuess) ) {
            this.model.guessLetter(userGuess);
        }
    }

}
  
const app = new Controller(new Model(), new View())