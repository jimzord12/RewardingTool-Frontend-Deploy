# RewardingTool-Frontend-Deploy
GENERA Project: The Rewarding Tool Web Application's Frontend (UI - Source Code).
<br />
This DApp provides a way for users to examine and spend their **MGS** (MyGreenScore) **Tokens**.
<br />

<img src="Website/RT-homePage.png" alt="BootStrap" width="100%" height="100%" /> &nbsp;&nbsp;
<br />

## Technologies

This Web Application was constructed using some of the most modern and popular Web Technologies out there.
<br />

<img src="https://styles.redditmedia.com/t5_2su6s/styles/communityIcon_4g1uo0kd87c61.png?width=256&v=enabled&s=86f4a4bd647772d34d2de32a0e4281dd0ab095f1" alt="React Logo" width="50" height="50" /> &nbsp;&nbsp;
<img src="src/assets/img/github-readme/bootstrap.png" alt="BootStrap" width="50" height="50" /> &nbsp;&nbsp;
<img src="https://asset.brandfetch.io/idFdo8ulhr/idzj34qGQm.png" alt="Chart.js" width="50" height="50" /> &nbsp;&nbsp; 
<img src="https://0xchai.io/_next/image?url=%2Fstatic%2Fimages%2Fethersjs.png&w=3840&q=75" alt="Ethers.js" width="100" height="50" /> &nbsp;&nbsp; 
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Axios_%28computer_library%29_logo.svg/768px-Axios_%28computer_library%29_logo.svg.png?20220213115456" alt="Axios" width="210" height="50" /> &nbsp;&nbsp;&nbsp;
<img src="https://react-native-aria.geekyants.com/img/logo-large.png" alt="React Aria" width="50" height="50" /> &nbsp;&nbsp;
<img src="https://react-hook-form.com/images/logo/react-hook-form-logo-only.png" alt="React-hook-form" width="50" height="50" /> &nbsp;&nbsp;
<img src="src/assets/img/github-readme/webpack.png" alt="Webpack" width="50" height="50" /> &nbsp;&nbsp;
<img src="src/assets/img/github-readme/sass.png" alt="Sass" width="55" height="50" /> &nbsp;&nbsp; 

- **ReactJS** (Web Framework, combines HTML & JavaScript into one among other things)
- **Bootstrap** (A popular open-source front-end framework used for creating responsive and mobile-first websites)
- **Chart.js** (An open-source library that provides flexible and customizable charts for visualizing data on the web)
- **ethers.js** (A JS Library, that is required in order to connect the app with the blockchain) 
- **Axios** (A promise-based HTTP client for the browser and Node.js, used for making HTTP requests from JavaScript applications)
- **React Aria** (A collection of React Hooks that provides accessible UI primitives for building robust and accessible web applications)
- **React Hook Form** (A a lightweight and efficient library for handling form state and validation in React)
- **Webpack** (A powerful open-source JavaScript module bundler)
- **Sass** (A preprocessor scripting language that is compiled into CSS, extending its capabilities with features)
<br />

## Description
### Purpose
Leveraging the power of blockchain technology, this decentralized application (DApp) seeks to heighten user engagement and foster loyalty within our platform by dispensing MGS Tokens as rewards to users.

### The MGS Tokens
#### Usage
The primary concept underlying these tokens is to foster a secure, decentralized, and automated reward system for our platform users. This system recognizes and rewards user participation in specific events or general usage of our platform's web services.
Once a user has collected enough MGS Tokens, he/she shall be able to redeem them for a variety of rewards (which as of yet have not been decided).

#### Acquisition of MGS Tokens
Users can accumulate these tokens upon the successful completion of predefined actions or tasks.
<br />

For instance, take the example of our Social Forum Web Application within the platform. Here, user actions like voting on a post or comment, or submitting a comment, trigger a pop-up notification informing the user of a potential reward. 
This reward, in the form of MGS Tokens, serves as an acknowledgement of their contribution to the platform's community.
<br />

## Website Guide
### Registering

<img src="Website/RT-register-empty.png" alt="BootStrap" width="100%" height="100%" /> &nbsp;&nbsp;
<br />

User Registration Requirements: <br />
To successfully register as a user, you will need to provide the following:
<br />

- A unique username
- Your wallet address
- A valid email address
- A secure password

Additionally, please ensure the following:
<br />

- A crypto wallet is installed and functional.
- The crypto wallet is properly connected to our site.
- The wallet is configured to point to the appropriate network.
<br />

Assuming the user has a crypto wallet (like Metamask) installed.
<br />
Let's start by connecting it to the site:
1. Click the purple "Connect!" link
2. This window will appear (see image below)
<br />

<img src="Website/RT-register-connecting-1.png" alt="BootStrap" width="100%" height="100%" /> &nbsp;&nbsp;
<br />

3. After confirming that you wish to connect with the site, metamask will try to connect:

<img src="Website/RT-register-connecting-2.png" alt="BootStrap" width="100%" height="100%" /> &nbsp;&nbsp;
<br />

4. Next, we have to switch to the correct network
5. To achieve this, simply click on the purple "Switch!" link
<br />

<img src="Website/RT-register-netSwitch-1.png" alt="BootStrap" width="100%" height="100%" /> &nbsp;&nbsp;
<br />

7. Another Metamask window will pop-up and ask you to confirm this action
8. Press "Switch Network"
<br />

<img src="Website/RT-register-netSwitch-2.png" alt="BootStrap" width="100%" height="100%" /> &nbsp;&nbsp;
<br />

9. Now, we can create an Account
10. Fill the required form fields
11. Then, press the "Get Started" pink button 
12. Metamask, will prompt you with a window to confirm a transaction
(Dev: This transaction will create User object in the Blockchain. All state altering Smart Contact functions require the user to approve a transaction and pay some gas (using the network's native currency in our case ETH)

<br />

<img src="Website/RT-register-creatingAcc-1.png" alt="BootStrap" width="100%" height="100%" /> &nbsp;&nbsp;
<br />

13. Once the transaction is approved, the Account is created
<br />

<img src="Website/RT-register-creatingAcc-2.png" alt="BootStrap" width="100%" height="100%" /> &nbsp;&nbsp;
<br />

14. Now, let's try to log in. In the top of the page press the green "Log In" button
You will be navigated to this page:
<br />

<img src="Website/RT-login-1.png" alt="BootStrap" width="100%" height="100%" /> &nbsp;&nbsp;
<br />

15. The email and wallet address should be inserted automatically. Just type your password.
16. Press the "Let me in" button to log in with your newly created Account.
<br />

<img src="Website/RT-loggedIn.png" alt="BootStrap" width="100%" height="100%" /> &nbsp;&nbsp;
<br />

17. If you are navigated to the Home Page, and instead of the Log In and Sign Up buttons you see your username and MGS Tokens. You have successfully created and logged in with your Account
18. Congratulations! Now, go and explore our Platform's services and start gathering MGS Tokens!
