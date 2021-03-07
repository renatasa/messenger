###  This app is based on React Javascript framework. Additionally it uses Redux, React router.

###   Interface
<img src="https://github.com/renatasa/ChatApp/blob/dev/src/images/Login.PNG" width="600" >
<img src="https://github.com/renatasa/ChatApp/blob/dev/src/images/LoginWarning.PNG" height="500" > <img src="https://github.com/renatasa/ChatApp/blob/dev/src/images/Chat2.PNG" height="500" > <img src="https://github.com/renatasa/ChatApp/blob/dev/src/images/Chat3.PNG" height="500" >
<img src="https://github.com/renatasa/ChatApp/blob/dev/src/images/ChatError1.PNG" width="600" >
<img src="https://github.com/renatasa/ChatApp/blob/dev/src/images/ChatError2.PNG" width="600" >
<img src="https://github.com/renatasa/ChatApp/blob/dev/src/images/ChatErrorOnLogin.PNG" width="600" >
<img src="https://github.com/renatasa/ChatApp/blob/dev/src/images/MyProfile.PNG" width="600" >
<img src="https://github.com/renatasa/ChatApp/blob/dev/src/images/MyProfile2.PNG" height="500" >

### Running the app
1.	Load mock JSON data using JSON bins at https://jsonbin.io/ .
2.	Obtain HTTP endpoint and API secret-key from https://jsonbin.io/
3.	Setup .env file in ChatApp directory with HTTP endpoint and API secret-key
REACT_APP_GET_CHATS=
REACT_APP_API_KEY=
4.	Install node.js and npm
5.	Run npm install in ChatApp directory
6.	Run npm start. Open http://localhost:3000/  to view it in the browser.
7.	If you wish to get continuous UI updates with new messages from other users, fell free to uncomment lines 91-93  and 97 in messenger.js file. Those lines are commented due to limited amount of free JSONbin.io HTTP requests.