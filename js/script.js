//Define all constants
const appWindow = document.querySelector('.appWindow');
const appInteract = document.querySelector('.appInteract');
const appInput = document.querySelector('.appInput');
const assistantName = document.querySelector('#assistantName');
const userName = document.querySelector('#userName');
const appTime = document.querySelector('#appTime');
const appHead = document.querySelector('#appHead');
const appAssistant = document.querySelector('#appAssistant');
const appResponseText = document.querySelector('.appResponse');
const appQuestionText = document.querySelector('.appQuestion');
const appText = document.querySelector('#appText');
const appSendButton = document.querySelector('#appSendButton');
const appStartButton = document.querySelector('#appStartButton');
const userInput = document.querySelector('.userInput');
const appSettingsIcon = document.querySelector('.appSettingsIcon img');
const appSettingsMenu = document.querySelector('#settingsMenu');
let newResponse;
let newText;
let newQuestion;
//const settingArr = [
//        trimColor,
//        bgColor,
//        messageColor,
//        buttonColor,
//        textColor
//    ];
//const settingValues = {
//    trimColor : document.querySelector('#trimColor option'),
//    bgColor : document.querySelector('#bgColor option'),
//    messageColor : document.querySelector('#messageColor option'),
//    buttonColor : document.querySelector('#buttonColor option'),
//    textColor : document.querySelector('#textColor option'),
//};

//Initial styling and functionality on first load
function loadApp () {
    appWindow.style.backgroundColor = 'rgba(0, 0, 0, .75)';
    appText.style.zIndex = '-1';
    appSendButton.style.zIndex = '-1';
    appResponseText.style.zIndex = '-1';
    appTime.innerHTML = getTime();
    //Send input to start app by clicking 'Start'
    appStartButton.addEventListener('click', () => {
        startApp(); 
    });
    //Send input to start app by pressing 'Enter'
    appInput.addEventListener('keyup', (e) => {
       if (e.keyCode === 13) {
           startApp();
       } 
    });
};

//Initial 'welcome' message from app assistant after startApp() executes

//This function also contains an event listener for user input which triggers the assistant to respond in autoRespond()
function startApp () {
    appWindow.style.backgroundColor = 'rgb(255, 255, 255)';
    appText.style.zIndex = '1';
    appSendButton.style.zIndex = '1';
    appResponseText.style.zIndex = '1';
    appInput.style.display = 'none';
    
    appAssistant.innerHTML = assistantName.value;
    appResponseText.innerHTML = 'Hello, ' + userName.value + ', my name is ' + appAssistant.innerHTML + '. How can I help you today?'; 
    appResponseText.style.display = "inline";
    
    //Settings icon enabled once startApp() is called
    appSettingsIcon.addEventListener('click', () => {
        appWindow.style.backgroundColor = 'rgba(0, 0, 0, .75)';
        appText.style.zIndex = '-1';
        appSendButton.style.zIndex = '-1';
        appInteract.style.zIndex = '-1';

        appSettingsMenu.style.display = 'block';
        appInput.style.display = 'none';

        let trimColor = document.querySelector('#trimColor');
        let bgColor = document.querySelector('#bgColor');
        let messageColor = document.querySelector('#messageColor');
        let buttonColor = document.querySelector('#buttonColor');
        let textColor = document.querySelector('#textColor');
        const confirmSettings = document.querySelector('#confirmSettings');
        const cancelSettings = document.querySelector('#cancelSettings');
        //When cancel button is clicked, menu dissapears
        cancelSettings.addEventListener('click', () => {
            appSettingsMenu.style.display = 'none';
            appSettingsMenu.style.zIndex = '0';
            appWindow.style.backgroundColor = '#fff';
            appInteract.style.zIndex = '1';
            appText.style.zIndex = '1';
            appSendButton.style.zIndex = '1';
        });
    });
}

//Click 'Send' button to send input
appSendButton.addEventListener('click', () => {
    newQuestion = document.createElement('p');
    newQuestion.setAttribute('class', 'appQuestion');
    newQuestion.innerHTML = appText.value;
    appInteract.appendChild(newQuestion);
    newQuestion.style.display = 'inline';

    autoRespond();
});

//Press enter on the keyboard to send input
userInput.addEventListener('keyup', function (e) {
    if (e.keyCode === 13) {
        let newQuestion = document.createElement('p');
        newQuestion.setAttribute('class', 'appQuestion');
        newQuestion.innerHTML = appText.value;
        appInteract.appendChild(newQuestion);
        newQuestion.style.display = 'inline';

        autoRespond();  
    }
});

//Triggered by user input in the startApp() function. Tells the assistant to respond and how to respond based on user input
function autoRespond () {
    
    newResponse = document.createElement('p');
    newText = appText.value; //store user input in a new variable
    let newTextLower = newText.toLowerCase(); //Format user input to lowercase
    newResponse.setAttribute('class', 'appResponse');
    appInteract.scrollTop = appInteract.scrollHeight;
    
    if (newTextLower === 'hello') {
        newResponse.innerHTML = 'Hello there!';
        appInteract.appendChild(newResponse);
        newResponse.style.display = 'inline';
        
        appText.value = '';
    } else if (newTextLower.includes('help')) {
        newResponse.innerHTML = 'I am here to help! Here are a list of key words you can add into your question that I can respond to: <ul><li><b>"Time"</b></li><li><b>"My Name"</b></li><li><b>"Your Name"</b></li><li><b>"Help"</b></li><li><b>"Hello"</b></li><b><li>"Good Morning"</li></b><b><li>"Good Afternoon"</li></b><b><li>"Good Evening"</li></b><b><li>"How are you"</li></b></ul>I am constantly learning, so check back frequently.';
        appInteract.appendChild(newResponse);
        newResponse.style.display = 'inline';
        
        appText.value = '';
    } else if (newTextLower.includes('time')) {
        newResponse.innerHTML = 'The current time is, ' + getTime();
        appInteract.appendChild(newResponse);
        newResponse.style.display = 'inline';
        
        appText.value = '';
    } else if (newTextLower.includes('name') && newTextLower.includes('my')) {
        newResponse.innerHTML = 'Your name is ' + userName.value + '.';
        appInteract.appendChild(newResponse);
        newResponse.style.display = 'inline';
        
        appText.value = '';
    } else if (newTextLower.includes('name') && newTextLower.includes('your')) {
        newResponse.innerHTML = 'My name is ' + assistantName.value + '.';
        appInteract.appendChild(newResponse);
        newResponse.style.display = 'inline';
        
        appText.value = '';
    } else if (newTextLower.includes('good mo' || 'morning')) {
        newResponse.innerHTML = 'Good morning, ' + userName.value + '.';
        appInteract.appendChild(newResponse);
        newResponse.style.display = 'inline';
        
        appText.value = '';
    } else if (newTextLower.includes('good af' || 'afternoon')) {
        newResponse.innerHTML = 'Good afternoon, ' + userName.value + '.';
        appInteract.appendChild(newResponse);
        newResponse.style.display = 'inline';
        
        appText.value = '';
    } else if (newTextLower.includes('good ev' || 'evening')) {
        newResponse.innerHTML = 'Good evening, ' + userName.value + '.';
        appInteract.appendChild(newResponse);
        newResponse.style.display = 'inline';
        
        appText.value = '';
    } else if (newTextLower.includes('how' && 'you')) {
        let randNum = Math.floor(Math.random() * 3) + 1;
        randNum = parseInt(randNum);
        if (randNum === 1) {
            newResponse.innerHTML = 'I am just fine, ' + userName.value + '.';
            appInteract.appendChild(newResponse);
            newResponse.style.display = 'inline';
        } else if (randNum === 2) {
            newResponse.innerHTML = 'I\'ve had better days. Thank you for asking, ' + userName.value + '.'; 
            appInteract.appendChild(newResponse);
            newResponse.style.display = 'inline';
        } else {
            newResponse.innerHTML = 'The real question is, how are you, ' + userName.value + '?';
            appInteract.appendChild(newResponse);
            newResponse.style.display = 'inline';
        }
        
        appText.value = '';
    } else {
        newResponse.innerHTML = 'I do not have an answer for you, ' + userName.value + '. Try to be more specific.';
        appInteract.appendChild(newResponse);
        newResponse.style.display = 'inline';
        
        appText.value = ''; //clears user input field after response
    }
}

//Get local date and time to display in the appHead for the user
//Time does not update automatically - fix in v0.3.1 patch
function getTime () {
    let dateTime = new Date();
    let h = dateTime.getHours();
    let m = dateTime.getMinutes();
    let ampm;
    //Convert to non military time
    if (h >= 12) {
        h -= 12;
        ampm = 'PM';
    } else if (h < 12) {
        ampm = 'AM';
    }
    //Add leading '0' to minutes
    if (m < 10) {
        clock = h + ':0' + m + ' ' + ampm; 
    } else {
        clock = h + ':' + m + ' ' + ampm;
    } 
    return clock;
}

loadApp(); //Calling the initial function to load the app