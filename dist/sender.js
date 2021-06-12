(()=>{var t={355:t=>{self,t.exports=(()=>{"use strict";var t={d:(e,n)=>{for(var o in n)t.o(n,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:n[o]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{CodeCast:()=>N});const n={};function o(t){const e=new Promise(((e,o)=>{n[t]={resolve:e,reject:o}}));return n[t].promise=e,n[t]}function s(){return`CodeCast_${Math.random()}`}function a(t,e=25e3){const n=[];for(;""!==t;)n.push(t.slice(0,e)),t=t.slice(e);return n}let r=!1;function i(){return r}function c(t){r=t}const d=[];async function u(t){if("string"!=typeof t)throw Error("No URL provided to send method");return p(await(await fetch(t)).text())}function p(t){if("string"!=typeof t)throw Error("No JS string provided to sendString method");const e=s();return d.push({id:e,code:t}),i()?(l(),o(e).promise):o(e).promise}function l(){if(!i())throw Error("RemotePlayer Not Connected Yet");for(;d.length>0;){const t=d.shift();C(t.id,a(t.code))}}let m;function h(t,e){const{id:o,data:s}=JSON.parse(e);!function(t,e){n[t].resolve(e)}(o,s)}function f(t,e){const{id:o,error:s}=JSON.parse(e);!function(t,e){n[t].reject(e)}(o,s)}function y(){c(!0),l()}function g(){m&&m.sendMessage("urn:x-cast:com.codecast.reload",{})}function C(t,e=[]){m&&e.forEach(((n,o)=>{const a=e.length;!function(t={id:s()}){m&&m.sendMessage("urn:x-cast:com.codecast.send",t)}({code:n,id:t,index:o,length:a})}))}class N{#shouldReload;constructor(t){const e=new cast.framework.RemotePlayer,n=new cast.framework.RemotePlayerController(e),o=cast.framework.RemotePlayerEventType,s=cast.framework.CastContext.getInstance();this.#shouldReload=t??!0,c(e.isConnected??!1),n.addEventListener(o.IS_CONNECTED_CHANGED,(t=>{const e=s.getCurrentSession();c(t.value),function(t){t&&(m=t,m.addMessageListener("urn:x-cast:com.codecast.connected",y),m.addMessageListener("urn:x-cast:com.codecast.resolve",h),m.addMessageListener("urn:x-cast:com.codecast.reject",f))}(e),"SESSION_RESUMED"===e?.getSessionState()&&this.#shouldReload&&(g(),c(!1))}))}send=u;sendString=p;reload(){c(!1),g()}}return e})()}},e={};function n(o){var s=e[o];if(void 0!==s)return s.exports;var a=e[o]={exports:{}};return t[o](a,a.exports,n),a.exports}(()=>{"use strict";var t=n(355);const e={BUTTON_DOWN:"button_down",BUTTON_RIGHT:"button_right",BUTTON_LEFT:"button_left",BUTTON_UP:"button_up",L1:"l1",R1:"r1",L2:"l2",R2:"r2",SELECT:"select",START:"start",HOME:"home",L3:"l3",R3:"r3",UP:"up",DOWN:"down",LEFT:"left",RIGHT:"right",JOYSTICKS:"joysticks",CONNECTED:"connected",DISCONNECTED:"disconnected",ALL:"all"},o={standard:{0:e.BUTTON_DOWN,1:e.BUTTON_RIGHT,2:e.BUTTON_LEFT,3:e.BUTTON_UP,4:e.L1,5:e.R1,6:e.L2,7:e.R2,8:e.SELECT,9:e.START,10:e.L3,11:e.R3,12:e.UP,13:e.DOWN,14:e.LEFT,15:e.RIGHT,16:e.HOME}},s={};function a(t,n){t===e.CONNECTED&&window.addEventListener("gamepadconnected",n),t===e.DISCONNECTED&&window.addEventListener("gamepaddisconnected",n),s[t]=s[t]??[],s[t].push(n)}function r(t,e){s[t]&&s[t].forEach((t=>t(e)))}let i;function c({delay:t=0,duration:e=500,weak:n=.5,strong:o=.5}={}){const s=Math.min(Math.max(t,0),5e3),a=Math.min(Math.max(e,1),5e3,5e3-s),r=Math.min(Math.max(o,0),1),c=Math.min(Math.max(n,0),1);i.vibrationActuator&&i.vibrationActuator.playEffect("dual-rumble",{startDelay:s,duration:a,weakMagnitude:c,strongMagnitude:r})}class d{#gamepadIndex;#buttonNames;#isConnected=!1;#lastInput={buttons:[],joysticks:[]};constructor(){window.addEventListener("gamepadconnected",(t=>{var e;this.#buttonNames=(e=t.gamepad.mapping,o[e]||console.error(`${e} is an unsupported controller`)),this.#buttonNames&&(this.#isConnected=!0,this.#gamepadIndex=t.gamepad.index,window.requestAnimationFrame(this.#loop.bind(this)))})),window.addEventListener("gamepaddisconnected",(()=>{this.#isConnected=!1}))}#loop(){if(!this.#isConnected)return;const t=function(t,e){const n=navigator.getGamepads();return i=n[e],{buttons:function(t,e){return t.buttons.map(((t,n)=>({button:{pressed:t.pressed,touched:t.touched,value:t.value},index:n,type:e[n]})))}(i,t),joysticks:{left:[i.axes[0],i.axes[1]],right:[i.axes[2],i.axes[3]]}}}(this.#buttonNames,this.#gamepadIndex),n=function(t){return{buttons:t.buttons.filter((t=>t.button.pressed||t.button.touched)),joysticks:t.joysticks}}(t);let o=!1;if(function(t,e){return t.buttons.length!==e.buttons.length||(0!==t.buttons.length||0!==e.buttons.length)&&(JSON.stringify(t.buttons)!==JSON.stringify(e.buttons)||!!t.buttons.some(((t,n)=>t.button.value!==e.buttons[n].button.value))||void 0)}(n,this.#lastInput)){const s=[];o=!0,n.buttons.forEach((t=>{r(t.type,t),s.push(t.type)})),this.#lastInput.buttons.forEach((n=>{s.includes(n.type)||(r(n.type,t.buttons[n.index]),r(e.ALL,{buttons:[t.buttons[n.index]],joysticks:t.joysticks}))}))}(function(t,e){if(JSON.stringify(t.joysticks)!==JSON.stringify(e.joysticks))return!0})(n,this.#lastInput)&&(r(e.JOYSTICKS,n.joysticks),o||r(e.ALL,n)),o&&n.buttons.length>0&&r(e.ALL,n),this.#lastInput=n,window.requestAnimationFrame(this.#loop.bind(this))}on=a;vibrate=c;static INPUT=e}class u{#isConnected=!1;#gamepadInterceptors={};#keyboardInterceptors={};#session;#gamepad;constructor(){const t=new cast.framework.RemotePlayer,e=new cast.framework.RemotePlayerController(t),n=cast.framework.CastContext.getInstance(),o=cast.framework.RemotePlayerEventType;this.#gamepad=new d,this.#setupConnectedEvents(),e.addEventListener(o.IS_CONNECTED_CHANGED,(t=>{this.#isConnected=t.value,this.#isConnected&&(this.#session=n.getCurrentSession())})),document.addEventListener("keydown",(async t=>{if(!this.#isConnected)return;const{altKey:e,ctrlKey:n,metaKey:o,shiftKey:s,key:a,code:r,repeat:i,location:c}=t;let d={altKey:e,ctrlKey:n,metaKey:o,shiftKey:s,key:a,code:r,repeat:i,location:c,preventDefault:()=>{t.preventDefault()}};d=await this.#sendInterceptor(r,d,this.#keyboardInterceptors),this.#sendKeyboardInput(d)})),this.#gamepad.on(d.INPUT.ALL,(t=>{if(!this.#isConnected)return;const e=t.buttons.map((t=>this.#sendInterceptor(t.type,t,this.#gamepadInterceptors))),n=this.#sendInterceptor(d.INPUT.JOYSTICKS,t.joysticks,this.#gamepadInterceptors);Promise.all([Promise.all(e),n]).then((([t,e])=>{this.#sendGamepadInput({buttons:t,joysticks:e})}))}))}static INPUT=d.INPUT;onBeforeGamepad(t,e){this.#gamepadInterceptors[t]=e}onBeforeKeyboard(t,e){this.#keyboardInterceptors[t]=e}#sendInterceptor(t,e,n){if(e)return n[d.INPUT.ALL]&&(e=n[d.INPUT.ALL](e)),n[t]&&(e=n[t](e)),e}#sendGamepadInput(t){this.#session.sendMessage("urn:x-cast:com.inputcast.gamepad",t)}#sendKeyboardInput(t){this.#session.sendMessage("urn:x-cast:com.inputcast.keyboard",t)}#generateGamepadToSend(t){const{id:e,connected:n,index:o,mapping:s,timestamp:a}=t;return{id:e,connected:n,index:o,mapping:s,timestamp:a}}#setupConnectedEvents(){this.#gamepad.on(d.INPUT.CONNECTED,(async t=>{const e=await this.#sendInterceptor(d.INPUT.CONNECTED,this.#generateGamepadToSend(t.gamepad),this.#gamepadInterceptors);this.#sendGamepadInput(e)})),this.#gamepad.on(d.INPUT.DISCONNECTED,(async t=>{const e=await this.#sendInterceptor(d.INPUT.DISCONNECTED,this.#generateGamepadToSend(t.gamepad),this.#gamepadInterceptors);this.#sendGamepadInput(e)}))}}window.__onGCastApiAvailable=function(e){if(e){cast.framework.CastContext.getInstance().setOptions({receiverApplicationId:"D8CC1620",autoJoinPolicy:chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED});const e=new t.CodeCast,n=new u,o=new cast.framework.RemotePlayer,s=new cast.framework.RemotePlayerController(o),a=cast.framework.RemotePlayerEventType;s.addEventListener(a.IS_CONNECTED_CHANGED,(()=>{e.send("code-to-cast.js").then((()=>{n.onBeforeKeyboard(u.INPUT.ALL,(t=>(t.preventDefault(),t)))}))}))}}})()})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZGVyLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaW5wdXRjYXN0LWRlbW8vc2VuZGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIigoKT0+e3ZhciB0PXszNTU6dD0+e3NlbGYsdC5leHBvcnRzPSgoKT0+e1widXNlIHN0cmljdFwiO3ZhciB0PXtkOihlLG4pPT57Zm9yKHZhciBvIGluIG4pdC5vKG4sbykmJiF0Lm8oZSxvKSYmT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsbyx7ZW51bWVyYWJsZTohMCxnZXQ6bltvXX0pfSxvOih0LGUpPT5PYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodCxlKSxyOnQ9PntcInVuZGVmaW5lZFwiIT10eXBlb2YgU3ltYm9sJiZTeW1ib2wudG9TdHJpbmdUYWcmJk9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LFN5bWJvbC50b1N0cmluZ1RhZyx7dmFsdWU6XCJNb2R1bGVcIn0pLE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pfX0sZT17fTt0LnIoZSksdC5kKGUse0NvZGVDYXN0OigpPT5OfSk7Y29uc3Qgbj17fTtmdW5jdGlvbiBvKHQpe2NvbnN0IGU9bmV3IFByb21pc2UoKChlLG8pPT57blt0XT17cmVzb2x2ZTplLHJlamVjdDpvfX0pKTtyZXR1cm4gblt0XS5wcm9taXNlPWUsblt0XX1mdW5jdGlvbiBzKCl7cmV0dXJuYENvZGVDYXN0XyR7TWF0aC5yYW5kb20oKX1gfWZ1bmN0aW9uIGEodCxlPTI1ZTMpe2NvbnN0IG49W107Zm9yKDtcIlwiIT09dDspbi5wdXNoKHQuc2xpY2UoMCxlKSksdD10LnNsaWNlKGUpO3JldHVybiBufWxldCByPSExO2Z1bmN0aW9uIGkoKXtyZXR1cm4gcn1mdW5jdGlvbiBjKHQpe3I9dH1jb25zdCBkPVtdO2FzeW5jIGZ1bmN0aW9uIHUodCl7aWYoXCJzdHJpbmdcIiE9dHlwZW9mIHQpdGhyb3cgRXJyb3IoXCJObyBVUkwgcHJvdmlkZWQgdG8gc2VuZCBtZXRob2RcIik7cmV0dXJuIHAoYXdhaXQoYXdhaXQgZmV0Y2godCkpLnRleHQoKSl9ZnVuY3Rpb24gcCh0KXtpZihcInN0cmluZ1wiIT10eXBlb2YgdCl0aHJvdyBFcnJvcihcIk5vIEpTIHN0cmluZyBwcm92aWRlZCB0byBzZW5kU3RyaW5nIG1ldGhvZFwiKTtjb25zdCBlPXMoKTtyZXR1cm4gZC5wdXNoKHtpZDplLGNvZGU6dH0pLGkoKT8obCgpLG8oZSkucHJvbWlzZSk6byhlKS5wcm9taXNlfWZ1bmN0aW9uIGwoKXtpZighaSgpKXRocm93IEVycm9yKFwiUmVtb3RlUGxheWVyIE5vdCBDb25uZWN0ZWQgWWV0XCIpO2Zvcig7ZC5sZW5ndGg+MDspe2NvbnN0IHQ9ZC5zaGlmdCgpO0ModC5pZCxhKHQuY29kZSkpfX1sZXQgbTtmdW5jdGlvbiBoKHQsZSl7Y29uc3R7aWQ6byxkYXRhOnN9PUpTT04ucGFyc2UoZSk7IWZ1bmN0aW9uKHQsZSl7blt0XS5yZXNvbHZlKGUpfShvLHMpfWZ1bmN0aW9uIGYodCxlKXtjb25zdHtpZDpvLGVycm9yOnN9PUpTT04ucGFyc2UoZSk7IWZ1bmN0aW9uKHQsZSl7blt0XS5yZWplY3QoZSl9KG8scyl9ZnVuY3Rpb24geSgpe2MoITApLGwoKX1mdW5jdGlvbiBnKCl7bSYmbS5zZW5kTWVzc2FnZShcInVybjp4LWNhc3Q6Y29tLmNvZGVjYXN0LnJlbG9hZFwiLHt9KX1mdW5jdGlvbiBDKHQsZT1bXSl7bSYmZS5mb3JFYWNoKCgobixvKT0+e2NvbnN0IGE9ZS5sZW5ndGg7IWZ1bmN0aW9uKHQ9e2lkOnMoKX0pe20mJm0uc2VuZE1lc3NhZ2UoXCJ1cm46eC1jYXN0OmNvbS5jb2RlY2FzdC5zZW5kXCIsdCl9KHtjb2RlOm4saWQ6dCxpbmRleDpvLGxlbmd0aDphfSl9KSl9Y2xhc3MgTnsjc2hvdWxkUmVsb2FkO2NvbnN0cnVjdG9yKHQpe2NvbnN0IGU9bmV3IGNhc3QuZnJhbWV3b3JrLlJlbW90ZVBsYXllcixuPW5ldyBjYXN0LmZyYW1ld29yay5SZW1vdGVQbGF5ZXJDb250cm9sbGVyKGUpLG89Y2FzdC5mcmFtZXdvcmsuUmVtb3RlUGxheWVyRXZlbnRUeXBlLHM9Y2FzdC5mcmFtZXdvcmsuQ2FzdENvbnRleHQuZ2V0SW5zdGFuY2UoKTt0aGlzLiNzaG91bGRSZWxvYWQ9dD8/ITAsYyhlLmlzQ29ubmVjdGVkPz8hMSksbi5hZGRFdmVudExpc3RlbmVyKG8uSVNfQ09OTkVDVEVEX0NIQU5HRUQsKHQ9Pntjb25zdCBlPXMuZ2V0Q3VycmVudFNlc3Npb24oKTtjKHQudmFsdWUpLGZ1bmN0aW9uKHQpe3QmJihtPXQsbS5hZGRNZXNzYWdlTGlzdGVuZXIoXCJ1cm46eC1jYXN0OmNvbS5jb2RlY2FzdC5jb25uZWN0ZWRcIix5KSxtLmFkZE1lc3NhZ2VMaXN0ZW5lcihcInVybjp4LWNhc3Q6Y29tLmNvZGVjYXN0LnJlc29sdmVcIixoKSxtLmFkZE1lc3NhZ2VMaXN0ZW5lcihcInVybjp4LWNhc3Q6Y29tLmNvZGVjYXN0LnJlamVjdFwiLGYpKX0oZSksXCJTRVNTSU9OX1JFU1VNRURcIj09PWU/LmdldFNlc3Npb25TdGF0ZSgpJiZ0aGlzLiNzaG91bGRSZWxvYWQmJihnKCksYyghMSkpfSkpfXNlbmQ9dTtzZW5kU3RyaW5nPXA7cmVsb2FkKCl7YyghMSksZygpfX1yZXR1cm4gZX0pKCl9fSxlPXt9O2Z1bmN0aW9uIG4obyl7dmFyIHM9ZVtvXTtpZih2b2lkIDAhPT1zKXJldHVybiBzLmV4cG9ydHM7dmFyIGE9ZVtvXT17ZXhwb3J0czp7fX07cmV0dXJuIHRbb10oYSxhLmV4cG9ydHMsbiksYS5leHBvcnRzfSgoKT0+e1widXNlIHN0cmljdFwiO3ZhciB0PW4oMzU1KTtjb25zdCBlPXtCVVRUT05fRE9XTjpcImJ1dHRvbl9kb3duXCIsQlVUVE9OX1JJR0hUOlwiYnV0dG9uX3JpZ2h0XCIsQlVUVE9OX0xFRlQ6XCJidXR0b25fbGVmdFwiLEJVVFRPTl9VUDpcImJ1dHRvbl91cFwiLEwxOlwibDFcIixSMTpcInIxXCIsTDI6XCJsMlwiLFIyOlwicjJcIixTRUxFQ1Q6XCJzZWxlY3RcIixTVEFSVDpcInN0YXJ0XCIsSE9NRTpcImhvbWVcIixMMzpcImwzXCIsUjM6XCJyM1wiLFVQOlwidXBcIixET1dOOlwiZG93blwiLExFRlQ6XCJsZWZ0XCIsUklHSFQ6XCJyaWdodFwiLEpPWVNUSUNLUzpcImpveXN0aWNrc1wiLENPTk5FQ1RFRDpcImNvbm5lY3RlZFwiLERJU0NPTk5FQ1RFRDpcImRpc2Nvbm5lY3RlZFwiLEFMTDpcImFsbFwifSxvPXtzdGFuZGFyZDp7MDplLkJVVFRPTl9ET1dOLDE6ZS5CVVRUT05fUklHSFQsMjplLkJVVFRPTl9MRUZULDM6ZS5CVVRUT05fVVAsNDplLkwxLDU6ZS5SMSw2OmUuTDIsNzplLlIyLDg6ZS5TRUxFQ1QsOTplLlNUQVJULDEwOmUuTDMsMTE6ZS5SMywxMjplLlVQLDEzOmUuRE9XTiwxNDplLkxFRlQsMTU6ZS5SSUdIVCwxNjplLkhPTUV9fSxzPXt9O2Z1bmN0aW9uIGEodCxuKXt0PT09ZS5DT05ORUNURUQmJndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiZ2FtZXBhZGNvbm5lY3RlZFwiLG4pLHQ9PT1lLkRJU0NPTk5FQ1RFRCYmd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJnYW1lcGFkZGlzY29ubmVjdGVkXCIsbiksc1t0XT1zW3RdPz9bXSxzW3RdLnB1c2gobil9ZnVuY3Rpb24gcih0LGUpe3NbdF0mJnNbdF0uZm9yRWFjaCgodD0+dChlKSkpfWxldCBpO2Z1bmN0aW9uIGMoe2RlbGF5OnQ9MCxkdXJhdGlvbjplPTUwMCx3ZWFrOm49LjUsc3Ryb25nOm89LjV9PXt9KXtjb25zdCBzPU1hdGgubWluKE1hdGgubWF4KHQsMCksNWUzKSxhPU1hdGgubWluKE1hdGgubWF4KGUsMSksNWUzLDVlMy1zKSxyPU1hdGgubWluKE1hdGgubWF4KG8sMCksMSksYz1NYXRoLm1pbihNYXRoLm1heChuLDApLDEpO2kudmlicmF0aW9uQWN0dWF0b3ImJmkudmlicmF0aW9uQWN0dWF0b3IucGxheUVmZmVjdChcImR1YWwtcnVtYmxlXCIse3N0YXJ0RGVsYXk6cyxkdXJhdGlvbjphLHdlYWtNYWduaXR1ZGU6YyxzdHJvbmdNYWduaXR1ZGU6cn0pfWNsYXNzIGR7I2dhbWVwYWRJbmRleDsjYnV0dG9uTmFtZXM7I2lzQ29ubmVjdGVkPSExOyNsYXN0SW5wdXQ9e2J1dHRvbnM6W10sam95c3RpY2tzOltdfTtjb25zdHJ1Y3Rvcigpe3dpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiZ2FtZXBhZGNvbm5lY3RlZFwiLCh0PT57dmFyIGU7dGhpcy4jYnV0dG9uTmFtZXM9KGU9dC5nYW1lcGFkLm1hcHBpbmcsb1tlXXx8Y29uc29sZS5lcnJvcihgJHtlfSBpcyBhbiB1bnN1cHBvcnRlZCBjb250cm9sbGVyYCkpLHRoaXMuI2J1dHRvbk5hbWVzJiYodGhpcy4jaXNDb25uZWN0ZWQ9ITAsdGhpcy4jZ2FtZXBhZEluZGV4PXQuZ2FtZXBhZC5pbmRleCx3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuI2xvb3AuYmluZCh0aGlzKSkpfSkpLHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiZ2FtZXBhZGRpc2Nvbm5lY3RlZFwiLCgoKT0+e3RoaXMuI2lzQ29ubmVjdGVkPSExfSkpfSNsb29wKCl7aWYoIXRoaXMuI2lzQ29ubmVjdGVkKXJldHVybjtjb25zdCB0PWZ1bmN0aW9uKHQsZSl7Y29uc3Qgbj1uYXZpZ2F0b3IuZ2V0R2FtZXBhZHMoKTtyZXR1cm4gaT1uW2VdLHtidXR0b25zOmZ1bmN0aW9uKHQsZSl7cmV0dXJuIHQuYnV0dG9ucy5tYXAoKCh0LG4pPT4oe2J1dHRvbjp7cHJlc3NlZDp0LnByZXNzZWQsdG91Y2hlZDp0LnRvdWNoZWQsdmFsdWU6dC52YWx1ZX0saW5kZXg6bix0eXBlOmVbbl19KSkpfShpLHQpLGpveXN0aWNrczp7bGVmdDpbaS5heGVzWzBdLGkuYXhlc1sxXV0scmlnaHQ6W2kuYXhlc1syXSxpLmF4ZXNbM11dfX19KHRoaXMuI2J1dHRvbk5hbWVzLHRoaXMuI2dhbWVwYWRJbmRleCksbj1mdW5jdGlvbih0KXtyZXR1cm57YnV0dG9uczp0LmJ1dHRvbnMuZmlsdGVyKCh0PT50LmJ1dHRvbi5wcmVzc2VkfHx0LmJ1dHRvbi50b3VjaGVkKSksam95c3RpY2tzOnQuam95c3RpY2tzfX0odCk7bGV0IG89ITE7aWYoZnVuY3Rpb24odCxlKXtyZXR1cm4gdC5idXR0b25zLmxlbmd0aCE9PWUuYnV0dG9ucy5sZW5ndGh8fCgwIT09dC5idXR0b25zLmxlbmd0aHx8MCE9PWUuYnV0dG9ucy5sZW5ndGgpJiYoSlNPTi5zdHJpbmdpZnkodC5idXR0b25zKSE9PUpTT04uc3RyaW5naWZ5KGUuYnV0dG9ucyl8fCEhdC5idXR0b25zLnNvbWUoKCh0LG4pPT50LmJ1dHRvbi52YWx1ZSE9PWUuYnV0dG9uc1tuXS5idXR0b24udmFsdWUpKXx8dm9pZCAwKX0obix0aGlzLiNsYXN0SW5wdXQpKXtjb25zdCBzPVtdO289ITAsbi5idXR0b25zLmZvckVhY2goKHQ9PntyKHQudHlwZSx0KSxzLnB1c2godC50eXBlKX0pKSx0aGlzLiNsYXN0SW5wdXQuYnV0dG9ucy5mb3JFYWNoKChuPT57cy5pbmNsdWRlcyhuLnR5cGUpfHwocihuLnR5cGUsdC5idXR0b25zW24uaW5kZXhdKSxyKGUuQUxMLHtidXR0b25zOlt0LmJ1dHRvbnNbbi5pbmRleF1dLGpveXN0aWNrczp0LmpveXN0aWNrc30pKX0pKX0oZnVuY3Rpb24odCxlKXtpZihKU09OLnN0cmluZ2lmeSh0LmpveXN0aWNrcykhPT1KU09OLnN0cmluZ2lmeShlLmpveXN0aWNrcykpcmV0dXJuITB9KShuLHRoaXMuI2xhc3RJbnB1dCkmJihyKGUuSk9ZU1RJQ0tTLG4uam95c3RpY2tzKSxvfHxyKGUuQUxMLG4pKSxvJiZuLmJ1dHRvbnMubGVuZ3RoPjAmJnIoZS5BTEwsbiksdGhpcy4jbGFzdElucHV0PW4sd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLiNsb29wLmJpbmQodGhpcykpfW9uPWE7dmlicmF0ZT1jO3N0YXRpYyBJTlBVVD1lfWNsYXNzIHV7I2lzQ29ubmVjdGVkPSExOyNnYW1lcGFkSW50ZXJjZXB0b3JzPXt9OyNrZXlib2FyZEludGVyY2VwdG9ycz17fTsjc2Vzc2lvbjsjZ2FtZXBhZDtjb25zdHJ1Y3Rvcigpe2NvbnN0IHQ9bmV3IGNhc3QuZnJhbWV3b3JrLlJlbW90ZVBsYXllcixlPW5ldyBjYXN0LmZyYW1ld29yay5SZW1vdGVQbGF5ZXJDb250cm9sbGVyKHQpLG49Y2FzdC5mcmFtZXdvcmsuQ2FzdENvbnRleHQuZ2V0SW5zdGFuY2UoKSxvPWNhc3QuZnJhbWV3b3JrLlJlbW90ZVBsYXllckV2ZW50VHlwZTt0aGlzLiNnYW1lcGFkPW5ldyBkLHRoaXMuI3NldHVwQ29ubmVjdGVkRXZlbnRzKCksZS5hZGRFdmVudExpc3RlbmVyKG8uSVNfQ09OTkVDVEVEX0NIQU5HRUQsKHQ9Pnt0aGlzLiNpc0Nvbm5lY3RlZD10LnZhbHVlLHRoaXMuI2lzQ29ubmVjdGVkJiYodGhpcy4jc2Vzc2lvbj1uLmdldEN1cnJlbnRTZXNzaW9uKCkpfSkpLGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsKGFzeW5jIHQ9PntpZighdGhpcy4jaXNDb25uZWN0ZWQpcmV0dXJuO2NvbnN0e2FsdEtleTplLGN0cmxLZXk6bixtZXRhS2V5Om8sc2hpZnRLZXk6cyxrZXk6YSxjb2RlOnIscmVwZWF0OmksbG9jYXRpb246Y309dDtsZXQgZD17YWx0S2V5OmUsY3RybEtleTpuLG1ldGFLZXk6byxzaGlmdEtleTpzLGtleTphLGNvZGU6cixyZXBlYXQ6aSxsb2NhdGlvbjpjLHByZXZlbnREZWZhdWx0OigpPT57dC5wcmV2ZW50RGVmYXVsdCgpfX07ZD1hd2FpdCB0aGlzLiNzZW5kSW50ZXJjZXB0b3IocixkLHRoaXMuI2tleWJvYXJkSW50ZXJjZXB0b3JzKSx0aGlzLiNzZW5kS2V5Ym9hcmRJbnB1dChkKX0pKSx0aGlzLiNnYW1lcGFkLm9uKGQuSU5QVVQuQUxMLCh0PT57aWYoIXRoaXMuI2lzQ29ubmVjdGVkKXJldHVybjtjb25zdCBlPXQuYnV0dG9ucy5tYXAoKHQ9PnRoaXMuI3NlbmRJbnRlcmNlcHRvcih0LnR5cGUsdCx0aGlzLiNnYW1lcGFkSW50ZXJjZXB0b3JzKSkpLG49dGhpcy4jc2VuZEludGVyY2VwdG9yKGQuSU5QVVQuSk9ZU1RJQ0tTLHQuam95c3RpY2tzLHRoaXMuI2dhbWVwYWRJbnRlcmNlcHRvcnMpO1Byb21pc2UuYWxsKFtQcm9taXNlLmFsbChlKSxuXSkudGhlbigoKFt0LGVdKT0+e3RoaXMuI3NlbmRHYW1lcGFkSW5wdXQoe2J1dHRvbnM6dCxqb3lzdGlja3M6ZX0pfSkpfSkpfXN0YXRpYyBJTlBVVD1kLklOUFVUO29uQmVmb3JlR2FtZXBhZCh0LGUpe3RoaXMuI2dhbWVwYWRJbnRlcmNlcHRvcnNbdF09ZX1vbkJlZm9yZUtleWJvYXJkKHQsZSl7dGhpcy4ja2V5Ym9hcmRJbnRlcmNlcHRvcnNbdF09ZX0jc2VuZEludGVyY2VwdG9yKHQsZSxuKXtpZihlKXJldHVybiBuW2QuSU5QVVQuQUxMXSYmKGU9bltkLklOUFVULkFMTF0oZSkpLG5bdF0mJihlPW5bdF0oZSkpLGV9I3NlbmRHYW1lcGFkSW5wdXQodCl7dGhpcy4jc2Vzc2lvbi5zZW5kTWVzc2FnZShcInVybjp4LWNhc3Q6Y29tLmlucHV0Y2FzdC5nYW1lcGFkXCIsdCl9I3NlbmRLZXlib2FyZElucHV0KHQpe3RoaXMuI3Nlc3Npb24uc2VuZE1lc3NhZ2UoXCJ1cm46eC1jYXN0OmNvbS5pbnB1dGNhc3Qua2V5Ym9hcmRcIix0KX0jZ2VuZXJhdGVHYW1lcGFkVG9TZW5kKHQpe2NvbnN0e2lkOmUsY29ubmVjdGVkOm4saW5kZXg6byxtYXBwaW5nOnMsdGltZXN0YW1wOmF9PXQ7cmV0dXJue2lkOmUsY29ubmVjdGVkOm4saW5kZXg6byxtYXBwaW5nOnMsdGltZXN0YW1wOmF9fSNzZXR1cENvbm5lY3RlZEV2ZW50cygpe3RoaXMuI2dhbWVwYWQub24oZC5JTlBVVC5DT05ORUNURUQsKGFzeW5jIHQ9Pntjb25zdCBlPWF3YWl0IHRoaXMuI3NlbmRJbnRlcmNlcHRvcihkLklOUFVULkNPTk5FQ1RFRCx0aGlzLiNnZW5lcmF0ZUdhbWVwYWRUb1NlbmQodC5nYW1lcGFkKSx0aGlzLiNnYW1lcGFkSW50ZXJjZXB0b3JzKTt0aGlzLiNzZW5kR2FtZXBhZElucHV0KGUpfSkpLHRoaXMuI2dhbWVwYWQub24oZC5JTlBVVC5ESVNDT05ORUNURUQsKGFzeW5jIHQ9Pntjb25zdCBlPWF3YWl0IHRoaXMuI3NlbmRJbnRlcmNlcHRvcihkLklOUFVULkRJU0NPTk5FQ1RFRCx0aGlzLiNnZW5lcmF0ZUdhbWVwYWRUb1NlbmQodC5nYW1lcGFkKSx0aGlzLiNnYW1lcGFkSW50ZXJjZXB0b3JzKTt0aGlzLiNzZW5kR2FtZXBhZElucHV0KGUpfSkpfX13aW5kb3cuX19vbkdDYXN0QXBpQXZhaWxhYmxlPWZ1bmN0aW9uKGUpe2lmKGUpe2Nhc3QuZnJhbWV3b3JrLkNhc3RDb250ZXh0LmdldEluc3RhbmNlKCkuc2V0T3B0aW9ucyh7cmVjZWl2ZXJBcHBsaWNhdGlvbklkOlwiRDhDQzE2MjBcIixhdXRvSm9pblBvbGljeTpjaHJvbWUuY2FzdC5BdXRvSm9pblBvbGljeS5PUklHSU5fU0NPUEVEfSk7Y29uc3QgZT1uZXcgdC5Db2RlQ2FzdCxuPW5ldyB1LG89bmV3IGNhc3QuZnJhbWV3b3JrLlJlbW90ZVBsYXllcixzPW5ldyBjYXN0LmZyYW1ld29yay5SZW1vdGVQbGF5ZXJDb250cm9sbGVyKG8pLGE9Y2FzdC5mcmFtZXdvcmsuUmVtb3RlUGxheWVyRXZlbnRUeXBlO3MuYWRkRXZlbnRMaXN0ZW5lcihhLklTX0NPTk5FQ1RFRF9DSEFOR0VELCgoKT0+e2Uuc2VuZChcImNvZGUtdG8tY2FzdC5qc1wiKS50aGVuKCgoKT0+e24ub25CZWZvcmVLZXlib2FyZCh1LklOUFVULkFMTCwodD0+KHQucHJldmVudERlZmF1bHQoKSx0KSkpfSkpfSkpfX19KSgpfSkoKTsiXSwibWFwcGluZ3MiOiJBQUFBIiwic291cmNlUm9vdCI6IiJ9