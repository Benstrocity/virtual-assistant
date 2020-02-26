//Define all global const and let
const appWindow = document.querySelector('.appWindow');
const appInteract = document.querySelector('.appInteract');
const appInput = document.querySelector('.appInput');
const assistantName = document.querySelector('#assistantName');
const userName = document.querySelector('#userName');
const appTime = document.querySelector('#appTime');
let ampm;
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
const confirmSettings = document.querySelector('#confirmSettings');
const resetSettings = document.querySelector('#resetSettings');
const trimSelect = document.querySelector('#trimColor');
const bgSelect = document.querySelector('#bgColor');
const msgSelect = document.querySelector('#messageColor');
const btnSelect = document.querySelector('#buttonColor');
const txtSelect = document.querySelector('#textColor');
const settingsArr = [trimSelect, bgSelect, msgSelect, btnSelect, txtSelect];
let newResponse;
let newText;
let newQuestion;
let questionArr = [];
let newTextLower;
let threadCleared;

//Load the application
(function loadApp () {
    appWindow.style.backgroundColor = 'darkslategray';
    appText.style.zIndex = '-1';
    appSendButton.style.zIndex = '-1';
    appResponseText.style.zIndex = '-1';
    
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
})();

//This function also contains an event listener for user input which triggers the assistant to respond in autoRespond()
function startApp () {
    appText.style.zIndex = '1';
    appSendButton.style.zIndex = '1';
    appResponseText.style.zIndex = '1';
    appInput.style.display = 'none';
    
    appAssistant.innerHTML = assistantName.value;
    appAssistant.style.color = 'darkslategray';

    if (ampm === 'AM') {
        appResponseText.innerHTML = `${responseText[0].morningGreet}`; 
        appResponseText.style.display = "inline";
    } else {
        appResponseText.innerHTML = `${responseText[0].eveningGreet}`; 
        appResponseText.style.display = 'inline';
    }
    
    //Click 'Send' button to send input
    appSendButton.addEventListener('click', () => {
        newQuestion = document.createElement('p');
        newQuestion.setAttribute('class', 'appQuestion');
        newQuestion.innerHTML = appText.value;
        appInteract.appendChild(newQuestion);
        newQuestion.style.display = 'inline';
        questionArr.push(newQuestion);
        autoRespond();
    });

    //Press enter on the keyboard to send input
    userInput.addEventListener('keyup', function (e) {
        if (e.keyCode === 13) {
            newQuestion = document.createElement('p');
            newQuestion.setAttribute('class', 'appQuestion');
            newQuestion.innerHTML = appText.value;
            appInteract.appendChild(newQuestion);
            newQuestion.style.display = 'inline';
            questionArr.push(newQuestion);
            autoRespond();  
        }
    });
    
    //Settings icon enabled once startApp() is called
    appSettingsIcon.addEventListener('click', () => {
        appText.style.zIndex = '-1';
        appSendButton.style.zIndex = '-1';
        appInteract.style.zIndex = '-1';
        appSettingsMenu.style.display = 'block';
        appInput.style.display = 'none';        
        
        //When confirm button is clicked, menu dissapears and settings are saved
        confirmSettings.addEventListener('click', () => {
            appSettingsMenu.style.display = 'none';
            appSettingsMenu.style.zIndex = '0';
            appWindow.style.backgroundColor = 'floralwhite';
            appInteract.style.zIndex = '1';
            appText.style.zIndex = '1';
            appSendButton.style.zIndex = '1';
            
            (function updateTrim () {
                if (trimSelect.value !== 'default') {
                    let a = settingsArr[0].selectedIndex;
                    let newTrim = settingsArr[0].options[a].innerHTML;
                    appHead.style.backgroundColor = newTrim;
                } else {
                    appHead.style.backgroundColor = 'indianred';
                }
            })();
            
            (function updateBg () {
                if (bgSelect.value !== 'default') {
                    let b = settingsArr[1].selectedIndex;
                    let newBG = settingsArr[1].options[b].innerHTML;
                    appWindow.style.backgroundColor = newBG;
                } else {
                    appWindow.style.backgroundColor = 'darkslategray';
                }
            })();
            
            function updateMsg () {
                if (msgSelect.value !== 'default') {
                    let c = settingsArr[2].selectedIndex;
                    let newMsg = settingsArr[2].options[c].innerHTML;
                    for (let i = 0; i < questionArr.length; i++) {
                        questionArr[i].style.backgroundColor = newMsg;
                    }
                } else {
                    for (let i = 0; i < questionArr.length; i++) {
                        questionArr[i].style.backgroundColor = 'indianred';
                    }
                }
            }
            setInterval(updateMsg);
            
            (function updateBtn () {
                if (btnSelect.value !== "default") {
                    let d = settingsArr[3].selectedIndex;
                    let newBtn = settingsArr[3].options[d].innerHTML;
                    appSendButton.style.backgroundColor = newBtn;
                    confirmSettings.style.backgroundColor = newBtn;
                } else {
                    appSendButton.style.backgroundColor = 'indianred';
                    confirmSettings.style.backgroundColor = 'indianred';
                }
            })();
            
            (function updateTxt () {
                if (txtSelect.value !== 'default') {
                    let e = settingsArr[4].selectedIndex;
                    let newTxt = settingsArr[4].options[e].innerHTML;
                    appSendButton.style.color = newTxt;
                    appInteract.style.color = newTxt;
                    appHead.style.color = newTxt;
                } else {
                    appSendButton.style.color = 'floralwhite';
                    appInteract.style.color = 'floralwhite';
                    appHead.style.color = 'floralwhite';
                }
            })();
        });
        
        //When cancel button is clicked, menu dissapears and settings are discarded
        resetSettings.addEventListener('click', () => {
            appSettingsMenu.style.display = 'none';
            appSettingsMenu.style.zIndex = '0';
            appWindow.style.backgroundColor = 'floralwhite';
            appInteract.style.zIndex = '1';
            appText.style.zIndex = '1';
            appSendButton.style.zIndex = '1';

            appHead.style.backgroundColor = 'indianred';
            appWindow.style.backgroundColor = 'darkslategray';
            
            for (let i = 0; i < questionArr.length; i++) {
                questionArr[i].style.backgroundColor = 'indianred';
            }
                
            appSendButton.style.backgroundColor = 'indianred';
            confirmSettings.style.backgroundColor = 'indianred';
            appSendButton.style.color = 'floralwhite';
            appInteract.style.color = 'floralwhite';
            appHead.style.color = 'floralwhite';
            
            settingsArr[0].options.innerHTML = settingsArr[0].options[0].innerHTML;
        });
    });
}

//Triggered by user input in the startApp() function. Tells the assistant to respond and how to respond based on user input
function autoRespond () {
    newResponse = document.createElement('p');
    newText = appText.value; //store user input in a new variable
    newTextLower = newText.toLowerCase(); //Format user input to lowercase
    newResponse.setAttribute('class', 'appResponse');

    //freshThread() looks to see if the user has cleared the message thread and if so, responds with feedback confirming the action.
    function freshThread() {
        if (threadCleared) {
            newResponse.innerHTML = `${responseText[0].clear}`;
            appInteract.appendChild(newResponse);
            newResponse.style.display = 'inline';
            threadCleared = false;
        } else {
            threadCleared = true;
        }   
    }
    
    if (newTextLower === 'hello' || newTextLower === 'hi') {
        newResponse.innerHTML = responseText[0].hello;
        appInteract.appendChild(newResponse);
        newResponse.style.display = 'inline';
        appText.value = '';
    } else if (newTextLower.includes('help')) {
        newResponse.innerHTML = responseText[0].help;
        appInteract.appendChild(newResponse);
        newResponse.style.display = 'inline';
        appText.value = '';
    } else if (newTextLower.includes('time')) {
        newResponse.innerHTML = `${responseText[0].time}  ${getTime()}`;
        appInteract.appendChild(newResponse);
        newResponse.style.display = 'inline';
        appText.value = '';
    } else if (newTextLower.includes('name') && newTextLower.includes('my')) {
        newResponse.innerHTML = `${responseText[0].user} ${userName.value}.`;
        appInteract.appendChild(newResponse);
        newResponse.style.display = 'inline';
        appText.value = '';
    } else if (newTextLower.includes('name') && newTextLower.includes('your')) {
        newResponse.innerHTML = `${responseText[0].assistant} ${assistantName.value}.`;
        appInteract.appendChild(newResponse);
        newResponse.style.display = 'inline';
        appText.value = '';
    } else if (newTextLower.includes('good mo') || newTextLower.includes('morning')) {
        newResponse.innerHTML = `${responseText[0].morning} ${userName.value}.`;
        appInteract.appendChild(newResponse);
        newResponse.style.display = 'inline';
        appText.value = '';
    } else if (newTextLower.includes('good af') || newTextLower.includes('afternoon')) {
        newResponse.innerHTML = `${responseText[0].afternoon} ${userName.value}.`;
        appInteract.appendChild(newResponse);
        newResponse.style.display = 'inline';
        appText.value = '';
    } else if (newTextLower.includes('good ev') || newTextLower.includes('evening')) {
        newResponse.innerHTML = `${responseText[0].evening} ${userName.value}.`;
        appInteract.appendChild(newResponse);
        newResponse.style.display = 'inline';
        appText.value = '';
    } else if (newTextLower.includes('how') && newTextLower.includes('you')) {
        let randNum = Math.floor(Math.random() * 3) + 1;
        randNum = parseInt(randNum);
        if (randNum === 1) {
            newResponse.innerHTML = `${responseText[0].howAreYou.fine} ${userName.value}.`;
            appInteract.appendChild(newResponse);
            newResponse.style.display = 'inline';
        } else if (randNum === 2) {
            newResponse.innerHTML = `${responseText[0].howAreYou.better} ${userName.value}.`; 
            appInteract.appendChild(newResponse);
            newResponse.style.display = 'inline';
        } else {
            newResponse.innerHTML = `${responseText[0].howAreYou.real} ${userName.value}?`;
            appInteract.appendChild(newResponse);
            newResponse.style.display = 'inline';
        }
        appText.value = '';
    } else if (newTextLower === '') {
        newResponse.innerHTML = `${userName.value}${responseText[0].blank}`;
        appInteract.appendChild(newResponse);
        newResponse.style.display = 'inline';
        appText.value = '';
    } else if (newTextLower === 'clear') {
        appInteract.textContent = '';
        threadCleared = true;
        freshThread();
        appText.value = '';
    } else {
        newResponse.innerHTML = `${responseText[0].noInfo}${userName.value}.`;
        appInteract.appendChild(newResponse);
        newResponse.style.display = 'inline';
        appText.value = ''; //clears user input field after response
    }
    appInteract.scrollTop = appInteract.scrollHeight; //Auto scrolls to the most recent response when the assistant responds
}

//Get local date and time to display in the appHead for the user
function getTime() {
    let dateTime = new Date();
    let h = dateTime.getHours();
    let m = dateTime.getMinutes();
    let clock;
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

//Updates the time automatically. The function is called within the setInterval method below the function
function updateTime() {
    appTime.innerHTML = getTime();   
};
setInterval(updateTime, 100);