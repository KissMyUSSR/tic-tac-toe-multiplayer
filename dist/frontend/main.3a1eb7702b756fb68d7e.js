!function(){"use strict";var e,t={809:function(e,t,s){s.r(t)},479:function(e,t,s){var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=i(s(195)),a=i(s(368)),r=i(s(519));t.default=class{constructor(e,t,s){this.modeButtons=e,this.multiPlayerMenu=s,this.usernameForm=t,this.gameMode=this.findActiveModeButton().dataset.gameMode,this.changeMode=this.changeMode.bind(this),this.modeButtons.forEach((e=>{e.addEventListener("click",this.changeMode)}))}initializeSingleplayer(e,t,s){this.singleplayer=new n.default(e,t,s),this.singleplayer.startGame()}initializeMultiplayer(e,t){this.multiplayer=new r.default(...t,e),this.invitations=new a.default(this.multiPlayerMenu,this.multiplayer),this.usernameForm.addEventListener("submit",(e=>{var t;e.preventDefault();const s=this.getUsernameFormInputElement().value;""!==s&&(null===(t=this.invitations)||void 0===t||t.initialize(s))}))}getUsernameFormInputElement(){return this.usernameForm.elements.username}findActiveModeButton(){return this.modeButtons.filter((e=>!!e.classList.contains("active")))[0]}changeMode(e){const t=e.currentTarget;if(t.dataset.gameMode!==this.gameMode)if(this.findActiveModeButton().classList.remove("active"),this.gameMode=t.dataset.gameMode,t.classList.add("active"),"multi"===this.gameMode){this.multiPlayerMenu.classList.add("entering-username");const e=localStorage.getItem("username")||"";this.getUsernameFormInputElement().value=e}else this.multiPlayerMenu.classList.remove("entering-username"),this.multiPlayerMenu.classList.remove("search"),void 0!==this.singleplayer&&this.singleplayer.startGame()}}},368:function(e,t,s){Object.defineProperty(t,"__esModule",{value:!0});const i=s(580);t.default=class{constructor(e,t){this.multiPlayerMenu=e,this.sessions=[],this.multiplayer=t}initialize(e){if(localStorage.setItem("username",e),this.connectToServer(),void 0===this.socket)throw Error("Failed to connect to the server!");this.socket.emit("enter",e)}noChangesInSessions(e){const t=n(this.sessions.map((e=>({socketID:e.dataset.token,username:e.innerText,invited:e.classList.contains("pending"),wasInvited:e.classList.contains("active")}))));return s=t,i=n(e),s.length===i.length&&s.every(((e,t)=>e.socketID===i[t].socketID&&e.username===i[t].username&&e.invited===i[t].invited&&e.wasInvited===i[t].wasInvited));var s,i;function n(e){return e.sort(((e,t)=>e.socketID>t.socketID?1:e.socketID<t.socketID?-1:0))}}clearSessions(){this.sessions.forEach((e=>{var t;null===(t=e.parentElement)||void 0===t||t.removeChild(e)})),this.sessions=[]}createSessionElement(e){const t=document.createElement("button");t.classList.add("multiplayer-session"),e.wasInvited&&t.classList.add("active"),e.invited&&t.classList.add("pending"),t.dataset.token=e.socketID;const s=document.createElement("span");s.classList.add("multiplayer-nickname"),s.dataset.sessionNickname="",s.innerText=e.username;const i=document.createElement("i");i.classList.add("cancel-icon"),i.classList.add("session-icon");const n=document.createElement("i");return n.classList.add("accept-icon"),n.classList.add("session-icon"),t.addEventListener("click",(e=>{e.target!==t&&e.target!==s||t.classList.contains("confirm")||t.classList.contains("active")||t.classList.add("confirm")})),n.addEventListener("click",(()=>{var s,i,n,a;if(t.classList.contains("pending"))return void(null===(s=this.socket)||void 0===s||s.emit("acceptInvite",e.socketID));const r=this.multiPlayerMenu.querySelector(".pending-invites");r.classList.contains("show")||r.classList.add("show"),null===(n=null===(i=t.parentElement)||void 0===i?void 0:i.previousElementSibling)||void 0===n||n.append(t),null===(a=this.socket)||void 0===a||a.emit("invite",e.socketID),t.classList.remove("confirm"),t.classList.add("active")})),i.addEventListener("click",(()=>{const s=s=>{var i,n;const a=this.multiPlayerMenu.querySelector(".pending-invites");null===(i=this.socket)||void 0===i||i.emit("cancelInvite",e.socketID,s),null===(n=a.nextElementSibling)||void 0===n||n.append(t),0===a.childElementCount&&a.classList.remove("show")};t.classList.contains("active")?s(!0):t.classList.contains("pending")&&s(!1),t.classList.remove("confirm"),t.classList.remove("active"),t.classList.remove("pending")})),t.append(s,i,n),t}updateSessions(e){if(this.noChangesInSessions(e))return;this.clearSessions();const t=this.multiPlayerMenu.querySelector(".pending-invites");e.forEach((e=>{var s;const i=this.createSessionElement(e);this.sessions.push(i),!i.classList.contains("active")&&!i.classList.contains("pending")||i.classList.contains("confirm")?null===(s=t.nextElementSibling)||void 0===s||s.append(i):(t.classList.contains("show")||t.classList.add("show"),t.append(i))})),t.classList.contains("show")===(0===t.childElementCount)&&t.classList.toggle("show")}connectToServer(){if(void 0!==this.socket)return;this.socket=(0,i.io)("https://powerful-chamber-21934.herokuapp.com/"),this.socket.on("enterFailure",(e=>{var t;const s=document.createElement("div");s.classList.add("connection-error"),s.innerText=e,null===(t=document.getElementById("username-form"))||void 0===t||t.append(s)})),this.socket.on("enterSuccess",(()=>{void 0!==this.socket&&(this.socket.on("sessionsupdate",(e=>{this.multiPlayerMenu.classList.remove("entering-username"),this.multiPlayerMenu.classList.add("search"),this.updateSessions(e)})),this.socket.on("startGame",((...e)=>{var t;if(void 0===this.socket)throw Error("How in the world did this happen? Socket is undefined!");this.multiPlayerMenu.classList.remove("entering-username"),this.multiPlayerMenu.classList.remove("search"),null===(t=this.multiPlayerMenu.parentElement)||void 0===t||t.classList.add("multiplayer"),this.multiplayer.initialize(...e,this.socket),this.socket.on("gameOver",(()=>{var e;this.multiPlayerMenu.classList.add("search"),null===(e=this.multiPlayerMenu.parentElement)||void 0===e||e.classList.remove("multiplayer")}))})),this.multiplayer.leaveButton.addEventListener("click",(e=>{var t;this.multiPlayerMenu.classList.add("search"),null===(t=this.multiPlayerMenu.parentElement)||void 0===t||t.classList.remove("multiplayer")})))}))}}},519:function(e,t,s){var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=i(s(195));class a extends n.default{constructor(e,t,s,i){super(...i),this.currentTurn=this.xTurn,this.username=localStorage.getItem("username"),this.settingsButton=e[0],this.leaveButton=e[1],this.timer=t,this.settingsForm=s,this.startGame=this.startGame.bind(this)}initialize(e,t,s){this.opponent=e,this.xTurn=t,this.currentTurn=t,this.socket=s,this.initializeSettings(),this.setMessage(`Match against<br>${this.opponent}`,"Start")}initializeSettings(){const e=this.settingsForm.parentElement,t=this.settingsButton.lastElementChild;this.settingsForm.elements["player-move-time"];this.settingsButton.addEventListener("click",(()=>{e.classList.contains("show")?t.innerText="Game":t.innerText="Settings",e.classList.toggle("show")})),this.settingsForm.addEventListener("submit",(e=>{var t;e.preventDefault();const s=e.currentTarget.elements["timeout-time"];null===(t=this.socket)||void 0===t||t.emit("timeout",60*Number(s.value))})),this.leaveButton.addEventListener("click",(t=>{var s;this.endMessage.classList.remove("show"),e.classList.remove("show"),null===(s=this.socket)||void 0===s||s.emit("leaveGame")}))}swapSides(){this.xTurn=!this.xTurn,this.currentTurn=this.xTurn,this.setBoardHoverClass(),this.clearBoard()}startGame(){var e,t;this.swapSides(),this.currentTurn&&this.initializeMove(),null===(e=this.socket)||void 0===e||e.off("move"),null===(t=this.socket)||void 0===t||t.on("move",(e=>{this.makeMove(this.cells[e]),this.initializeMove()}))}initializeMove(){const e=this.makeMove,t=this.socket,s=i=>{const n=i.target;e(n),null==t||t.emit("move",this.cells.indexOf(n)),this.cells.forEach((e=>{e.removeEventListener("click",s)}))};this.cells.forEach((e=>{e.classList.contains("x")||e.classList.contains("o")||e.addEventListener("click",s)}))}makeMove(e){const t=this.currentTurn===this.xTurn?"x":"o";this.placeMark(e,t),this.swapTurns(),this.checkWin(t)?this.gameOver():this.checkDraw()&&this.gameOver(!0)}swapTurns(){this.currentTurn=!this.currentTurn,this.setBoardHoverClass()}gameOver(e=!1){const t=e?"Draw!":`${this.currentTurn?this.username:this.opponent}'s Victory!`;this.setMessage(t,"Restart")}setMessage(e,t){var s;null===(s=this.socket)||void 0===s||s.emit("timeout");const i=this.endMessage.querySelector("[data-end-text]"),n=this.endMessage.querySelector("[data-restart-button]");i.innerHTML=e,n.innerText=t,this.endMessage.classList.add("show"),n.addEventListener("click",(()=>{var e,t;null===(e=this.socket)||void 0===e||e.emit("restartMatch"),i.innerText="Waiting for the opponent",n.innerText="Wait",null===(t=this.socket)||void 0===t||t.on("restartMatch",(()=>{var e,t;null===(e=this.socket)||void 0===e||e.emit("restartMatch"),this.startGame(),null===(t=this.socket)||void 0===t||t.off("restartMatch")}))}),{once:!0})}}t.default=a},195:function(e,t){Object.defineProperty(t,"__esModule",{value:!0});t.default=class{constructor(e,t,s){this.cells=[...e],this.board=t,this.endMessage=s,this.xTurn=!0,this.WINNING_COMBINATIONS=[[0,3,6],[1,4,7],[2,5,8],[0,1,2],[3,4,5],[6,7,8],[0,4,8],[2,4,6]],this.makeMove=this.makeMove.bind(this)}clearBoard(){this.endMessage.classList.remove("show"),[...this.board.childNodes].forEach((e=>{this.board.removeChild(e)})),this.cells.forEach(((e,t)=>{const s=e.cloneNode(!0);s.classList.remove("x"),s.classList.remove("o"),this.board.append(s),this.cells[t]=s}))}startGame(){this.setBoardHoverClass(),this.clearBoard(),this.cells.forEach((e=>{e.addEventListener("click",this.makeMove,{once:!0})}))}makeMove(e){e instanceof Event&&(e=e.target);const t=this.xTurn?"x":"o";this.placeMark(e,t),this.swapTurns(),this.checkWin(t)?this.gameOver():this.checkDraw()&&this.gameOver(!0)}placeMark(e,t){e.classList.add(t)}swapTurns(){this.xTurn=!this.xTurn,this.setBoardHoverClass()}setBoardHoverClass(){this.board.classList.remove("o"),this.board.classList.remove("x"),this.xTurn?this.board.classList.add("x"):this.board.classList.add("o")}checkWin(e){return this.WINNING_COMBINATIONS.some((t=>t.every((t=>this.cells[t].classList.contains(e)))))}checkDraw(){return[...this.cells].every((e=>e.classList.contains("x")||e.classList.contains("o")))}gameOver(e=!1){let t;t=e?"Draw!":(this.xTurn?"Circle":"Cross")+" player Wins!",this.setMessage(t,"Restart",(e=>{this.endMessage.classList.remove("show"),this.startGame.call(this)}))}setMessage(e,t,s){this.endMessage.classList.add("show");const i=this.endMessage.querySelector("[data-end-text]"),n=this.endMessage.querySelector("[data-restart-button]");i.innerHTML=e,n.innerText=t,n.addEventListener("click",(e=>s(e)),{once:!0})}}},440:function(e,t,s){var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=i(s(479));s(809);const a=document.querySelectorAll("[data-cell]"),r=document.getElementById("gameboard"),o=document.querySelector("[data-end-message]"),l=(document.querySelector("[data-end-text]"),document.querySelector("[data-restart-button]"),document.getElementById("single-button")),c=document.getElementById("multi-button"),u=document.getElementById("ai-button"),d=document.querySelector("[data-multiplayer-menu]"),h=document.getElementById("username-form"),m=document.getElementById("settings-btn"),v=document.getElementById("leave-btn"),p=document.querySelector("[data-timer]"),g=document.querySelector("[data-settings]"),f=(document.querySelector("[data-opponent-move-time]"),document.querySelector("[data-final-move-time]"),new n.default([l,c,u],h,d)),y=[a,r,o],L=[[m,v],p,g];f.initializeSingleplayer(...y),f.initializeMultiplayer(y,L)}},s={};function i(e){var n=s[e];if(void 0!==n)return n.exports;var a=s[e]={exports:{}};return t[e].call(a.exports,a,a.exports,i),a.exports}i.m=t,e=[],i.O=function(t,s,n,a){if(!s){var r=1/0;for(u=0;u<e.length;u++){s=e[u][0],n=e[u][1],a=e[u][2];for(var o=!0,l=0;l<s.length;l++)(!1&a||r>=a)&&Object.keys(i.O).every((function(e){return i.O[e](s[l])}))?s.splice(l--,1):(o=!1,a<r&&(r=a));if(o){e.splice(u--,1);var c=n();void 0!==c&&(t=c)}}return t}a=a||0;for(var u=e.length;u>0&&e[u-1][2]>a;u--)e[u]=e[u-1];e[u]=[s,n,a]},i.d=function(e,t){for(var s in t)i.o(t,s)&&!i.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},function(){var e={179:0};i.O.j=function(t){return 0===e[t]};var t=function(t,s){var n,a,r=s[0],o=s[1],l=s[2],c=0;if(r.some((function(t){return 0!==e[t]}))){for(n in o)i.o(o,n)&&(i.m[n]=o[n]);if(l)var u=l(i)}for(t&&t(s);c<r.length;c++)a=r[c],i.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return i.O(u)},s=self.webpackChunk=self.webpackChunk||[];s.forEach(t.bind(null,0)),s.push=t.bind(null,s.push.bind(s))}();var n=i.O(void 0,[580],(function(){return i(440)}));n=i.O(n)}();