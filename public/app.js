// console.log('hello from app.js!');

// message types: left right login
/**
 * enum because it adds to the autocomplete
 * and only needs to be changed in one place
 */
const messageTypes = { LEFT: 'left', RIGHT: 'right', LOGIN: 'login' };

// const messages = []; // {author, date, content, type}

// chat Stuff
const chatWindow = document.getElementById('chat');
const messagesList = document.getElementById('messagesList');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');

// login stuff
let username = '';
const usernameInput = document.getElementById('usernameInput');
const loginBtn = document.getElementById('loginBtn');
const loginWindow = document.getElementById('login');

const messages = []; // {author, date, content, type}

const socket = io();

// take in message object, and return corresponding message html
const createMessageHTML = message => {
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
                  message.type === messageTypes.RIGHT ? '' : message.author
                }</p>
                <p class="message-date">${message.date}</p>
            </div>
            <p class="message-content">${message.content}</p>
        </div>
    `;
};

const displayMessages = () => {
  console.log('Displaying messages:');
  const messagesHTML = messages
    // Arrow functions without open and close brackets makes implicit return...
    .map(messages => createMessageHTML(messages))
    .join('');
  messagesList.innerHTML = messagesHTML;
};

displayMessages();

// sendbtn callback
sendBtn.addEventListener('click', e => {
  e.preventDefault();
  if (!messageInput.value) {
    // can add error handling, etc...
    return console.log('must supply a message');
  }

  const message = {
    author: username,
    date: new Date(),
    content: messageInput.value,
    type: messageTypes.RIGHT
  };

  messages.push(message);
  displayMessages();

  messageInput.value = '';

  chatWindow.scrollTop = chatWindow.scrollHeight;
});

// loginbtn callback
loginBtn.addEventListener('click', e => {
  // e=event arguments.
  // prevent default action of a form
  e.preventDefault();

  // set the user name and create logged in message
  if (!usernameInput.value) {
    // can add error handling, etc...
    return console.log('must supply a user name');
  }
  username = usernameInput.value;
  console.log(username);

  messages.push({
    author: username,
    type: messageTypes.LOGIN
  });

  // hide login and show chat window
  loginWindow.classList.add('hidden');
  chatWindow.classList.remove('hidden');

  // display those messages
  displayMessages();
});
