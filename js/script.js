//Define all global const and let
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
const confirmSettings = document.querySelector('#confirmSettings');
const resetSettings = document.querySelector('#resetSettings');
const trimSelect = document.querySelector('#trimColor');
const bgSelect = document.querySelector('#bgColor');
const msgSelect = document.querySelector('#messageColor');
const btnSelect = document.querySelector('#buttonColor');
const txtSelect = document.querySelector('#textColor');
const settingsArr = [trimSelect, bgSelect, msgSelect, btnSelect, txtSelect];
//Specifying certain let items in the global scope
let newResponse;
let newText;
let newQuestion;
let questionArr = [];
let newTextLower;

//Initial styling and functionality on first load
function loadApp () {
    appWindow.style.backgroundColor = 'rgba(0, 0, 0, .75)';
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
    appResponseText.innerHTML = 'Hello, ' + userName.value + ', my name is ' + appAssistant.innerHTML + '. How can I help you today? Type <b>"Help"</b> for a list of commands.'; 
    appResponseText.style.display = "inline";
    
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
        appWindow.style.backgroundColor = 'rgba(0, 0, 0, .75)';
        appText.style.zIndex = '-1';
        appSendButton.style.zIndex = '-1';
        appInteract.style.zIndex = '-1';

        appSettingsMenu.style.display = 'block';
        appInput.style.display = 'none';        
        
        //When confirm button is clicked, menu dissapears and settings are saved
        confirmSettings.addEventListener('click', () => {
            appSettingsMenu.style.display = 'none';
            appSettingsMenu.style.zIndex = '0';
            appWindow.style.backgroundColor = '#fff';
            appInteract.style.zIndex = '1';
            appText.style.zIndex = '1';
            appSendButton.style.zIndex = '1';
            
            function updateTrim () {
                let a = settingsArr[0].selectedIndex;
                let newTrim = settingsArr[0].options[a].innerHTML;
                appHead.style.backgroundColor = newTrim;
            }
            updateTrim();
            
            function updateBg () {
                let b = settingsArr[1].selectedIndex;
                let newBG = settingsArr[1].options[b].innerHTML;
                appWindow.style.backgroundColor = newBG;
            }
            updateBg();
            
            function updateMsg () {
                let c = settingsArr[2].selectedIndex;
                let newMsg = settingsArr[2].options[c].innerHTML;
                for (let i = 0; i < questionArr.length; i++) {
                    questionArr[i].style.backgroundColor = newMsg;
                }
            }
            setInterval(updateMsg);
            
            function updateBtn () {
                let d = settingsArr[3].selectedIndex;
                let newBtn = settingsArr[3].options[d].innerHTML;
                appSendButton.style.backgroundColor = newBtn;
                confirmSettings.style.backgroundColor = newBtn;
            }
            updateBtn();
            
            function updateTxt () {
                let e = settingsArr[4].selectedIndex;
                let newTxt = settingsArr[4].options[e].innerHTML;
                appSendButton.style.color = newTxt;
                appInteract.style.color = newTxt;
                appHead.style.color = newTxt;
            }
            updateTxt();
        });
        
        //When cancel button is clicked, menu dissapears and settings are discarded
        resetSettings.addEventListener('click', () => {
            appSettingsMenu.style.display = 'none';
            appSettingsMenu.style.zIndex = '0';
            appWindow.style.backgroundColor = '#fff';
            appInteract.style.zIndex = '1';
            appText.style.zIndex = '1';
            appSendButton.style.zIndex = '1';

            appHead.style.backgroundColor = 'chocolate';
            appWindow.style.backgroundColor = 'white';
            
            for (let i = 0; i < questionArr.length; i++) {
                questionArr[i].style.backgroundColor = 'chocolate';
            }
                
            appSendButton.style.backgroundColor = 'chocolate';
            confirmSettings.style.backgroundColor = 'chocolate';
            appSendButton.style.color = 'black';
            appInteract.style.color = 'black';
            appHead.style.color = 'black';
            
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
    
    if (newTextLower === 'hello' || newTextLower === 'hi') {
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
    } else if (newTextLower.includes('good mo') || newTextLower.includes('morning')) {
        newResponse.innerHTML = 'Good morning, ' + userName.value + '.';
        appInteract.appendChild(newResponse);
        newResponse.style.display = 'inline';
        
        appText.value = '';
    } else if (newTextLower.includes('good af') || newTextLower.includes('afternoon')) {
        newResponse.innerHTML = 'Good afternoon, ' + userName.value + '.';
        appInteract.appendChild(newResponse);
        newResponse.style.display = 'inline';
        
        appText.value = '';
    } else if (newTextLower.includes('good ev') || newTextLower.includes('evening')) {
        newResponse.innerHTML = 'Good evening, ' + userName.value + '.';
        appInteract.appendChild(newResponse);
        newResponse.style.display = 'inline';
        
        appText.value = '';
    } else if (newTextLower.includes('how') && newTextLower.includes('you')) {
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

//Updates scrolling for the message window automatically every 1/10 of a second
function scrollToBottom() {
    appInteract.scrollTop = appInteract.scrollHeight;
}
setInterval(scrollToBottom, 100);

//Get local date and time to display in the appHead for the user
//Time does not update automatically - fix in v0.3.1 patch
function getTime() {
    let dateTime = new Date();
    let h = dateTime.getHours();
    let m = dateTime.getMinutes();
    let ampm;
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
    }
setInterval(updateTime, 100);

 //Calling the initial function to load the app
loadApp();