console.log('hello from app.js!');

// message types: left right login
/**
 * enum because it adds to the autocomplete
 * and only needs to be changed in one place
 */
const messageTypes = { LEFT: 'left', RIGHT: 'right', LOGIN: 'login' };

//const messages = []; // {author, date, content, type}

//chat Stuff
const chatWindow = document.getElementById('chat');
const messagesList = document.getElementById('messagesList');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');

//login stuff
let username = '';
const usernameInput = document.getElementById('usernameInput');
const loginBtn = document.getElementById('loginBtn');
const loginWindow = document.getElementById('login');

const messages = [
  {
    author: 'bob cobb',
    date: '11/11/2000',
    content: 'foo bar baz',
    type: messageTypes.RIGHT
  },
  {
    author: 'bob cobb',
    date: '11/11/2000',
    content:
      'This is the most important message ever left in the history of our nation!',
    type: messageTypes.LEFT
  },
  {
    author: 'bob cobb',
    date: '11/11/2000',
    type: messageTypes.LOGIN
  }
]; // {author, date, content, type}

// take in message object, and return corresponding message html
createMessageHTML = message => {
  if (message.type === messageTypes.LOGIN) {
    return `
            <p class="secondary-text text-center mb-2">${message.author} has joined the chat...</p>
        `;
  }

  return `
        <div class="message ${
          message.type === messageTypes.LEFT ? 'message-left' : 'message-right'
        }">
            <div id="message-details" class="flex">
                <p class="message-author">${
                  message.author === messageTypes.RIGHT ? '' : message.author
                }</p>
                <p class="message-date">${message.date}</p>
            </div>
            <p class="message-content">${message.content}</p>
        </div>
    `;
};

const displayMessages = () => {
  const messagesHTML = messages
    // Arrow functions without open and close brackets makes implicit return...
    .map(messages => createMessageHTML(messages))
    .join('');
  messagesList.innerHTML = messagesHTML;
};

displayMessages();

//sendbtn callback

//loginbtn callback
loginBtn.addEventListener('click', e => {
  // e=event artuments.
  //prevent default action of a form
  e.preventDefault;

  //set the user name and create logged in message
    let 

  // display those messages

  //hide login and show chat window

  //display those messages
});
