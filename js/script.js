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

function loadApp () {
    appWindow.style.backgroundColor = 'rgba(0, 0, 0, .75)';
    appText.style.zIndex = '-1';
    appSendButton.style.zIndex = '-1';
    appResponseText.style.zIndex = '-1';
    
    appStartButton.addEventListener('click', () => {
        startApp(); 
    });
}

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

function autoRespond () {
    
    let newResponse = document.createElement('p');
    newResponse.setAttribute('class', 'appResponse');
    
    if (appText.value.toLowerCase() === 'hello') {
        newResponse.innerHTML = 'Hello there!';
        appInteract.appendChild(newResponse);
        newResponse.style.display = 'inline';
        
        appText.value = '';
    } else {
        newResponse.innerHTML = 'I do not have an answer for you, ' + userName.value + '.'
        appInteract.appendChild(newResponse);
        newResponse.style.display = 'inline';
        
        appText.value = '';
    }
}

loadApp();