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

socket.on('message', message => {
  console.log(message);
  if (message.type !== messageTypes.LOGIN) {
    if (message.author === username) {
      message.type = messageTypes.RIGHT;
    } else {
      message.type = messageTypes.LEFT;
    }
  }

  messages.push(message);
  displayMessages();
  chatWindow.scrollTop = chatWindow.scrollHeight;
});

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

  const date = new Date();
  const day = date.getDate();
  const year = date.getFullYear();
  // take rightmost two digits:
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const dateString = `${month}/${day}/${year}`;

  const message = {
    author: username,
    date: dateString,
    content: messageInput.value
  };

  // socket.emit('message', message);

  // messages.push(message);
  // displayMessages();

  // chatWindow.scrollTop = chatWindow.scrollHeight;
  sendMessage(message);

  messageInput.value = '';
});

const sendMessage = message => {
  socket.emit('message', message);
};
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

  //console.log(username);

  sendMessage({
    author: username,
    type: messageTypes.LOGIN
  });

  // hide login and show chat window
  loginWindow.classList.add('hidden');
  chatWindow.classList.remove('hidden');

  // display those messages
  //displayMessages();
});
