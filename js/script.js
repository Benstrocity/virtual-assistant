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

//Initial styling and functionality on first load
function loadApp () {
    appWindow.style.backgroundColor = 'rgba(0, 0, 0, .75)';
    appText.style.zIndex = '-1';
    appSendButton.style.zIndex = '-1';
    appResponseText.style.zIndex = '-1';
    appTime.innerHTML = getTime();
    
    appStartButton.addEventListener('click', () => {
        startApp(); 
    });
}

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
}

appSendButton.addEventListener('click', () => {
    
    let newQuestion = document.createElement('p');
    newQuestion.setAttribute('class', 'appQuestion');
    newQuestion.innerHTML = appText.value;
    appInteract.appendChild(newQuestion);
    newQuestion.style.display = 'inline';
    
    autoRespond();
});

//Triggered by user input in the startApp() function. Tells the assistant to respond and how to respond based on user input
function autoRespond () {
    
    let newResponse = document.createElement('p');
    let newText = appText.value; //store user input in a new variable
    let newTextLower = newText.toLowerCase(); //Format user input to lowercase
    newResponse.setAttribute('class', 'appResponse');
    appInteract.scrollTop = appInteract.scrollHeight;
    
    if (newTextLower === 'hello') {
        newResponse.innerHTML = 'Hello there!';
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
    } else {
        newResponse.innerHTML = 'I do not have an answer for you, ' + userName.value + '. Try to be more specific.';
        appInteract.appendChild(newResponse);
        newResponse.style.display = 'inline';
        
        appText.value = ''; //clears user input field after response
    }
}

//Get local date and time to display in the appHead for the user
function getTime () {
    let dateTime = new Date();
    let h = dateTime.getHours();
    let m = dateTime.getMinutes();
    let ampm = '';
    let clock = '';
    if (h >= 12) {
        ampm = 'PM';
    } else {
        ampm = 'AM';
    }
    if (m.valueOf < 10) {
        clock = h + ':0' + m + ' ' + ampm; 
    } else {
        clock = h + ':' + m + ' ' + ampm;
    }
    return clock;
}

loadApp();