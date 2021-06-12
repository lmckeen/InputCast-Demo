(()=>{"use strict";const t={BUTTON_DOWN:"button_down",BUTTON_RIGHT:"button_right",BUTTON_LEFT:"button_left",BUTTON_UP:"button_up",L1:"l1",R1:"r1",L2:"l2",R2:"r2",SELECT:"select",START:"start",HOME:"home",L3:"l3",R3:"r3",UP:"up",DOWN:"down",LEFT:"left",RIGHT:"right",JOYSTICKS:"joysticks",CONNECTED:"connected",DISCONNECTED:"disconnected",ALL:"all"},e={standard:{0:t.BUTTON_DOWN,1:t.BUTTON_RIGHT,2:t.BUTTON_LEFT,3:t.BUTTON_UP,4:t.L1,5:t.R1,6:t.L2,7:t.R2,8:t.SELECT,9:t.START,10:t.L3,11:t.R3,12:t.UP,13:t.DOWN,14:t.LEFT,15:t.RIGHT,16:t.HOME}},n={};function s(e,s){e===t.CONNECTED&&window.addEventListener("gamepadconnected",s),e===t.DISCONNECTED&&window.addEventListener("gamepaddisconnected",s),n[e]=n[e]??[],n[e].push(s)}function i(t,e){n[t]&&n[t].forEach((t=>t(e)))}let a;function o({delay:t=0,duration:e=500,weak:n=.5,strong:s=.5}={}){const i=Math.min(Math.max(t,0),5e3),o=Math.min(Math.max(e,1),5e3,5e3-i),l=Math.min(Math.max(s,0),1),c=Math.min(Math.max(n,0),1);a.vibrationActuator&&a.vibrationActuator.playEffect("dual-rumble",{startDelay:i,duration:o,weakMagnitude:c,strongMagnitude:l})}class l{#gamepadIndex;#buttonNames;#isConnected=!1;#lastInput={buttons:[],joysticks:[]};constructor(){window.addEventListener("gamepadconnected",(t=>{var n;this.#buttonNames=(n=t.gamepad.mapping,e[n]||console.error(`${n} is an unsupported controller`)),this.#buttonNames&&(this.#isConnected=!0,this.#gamepadIndex=t.gamepad.index,window.requestAnimationFrame(this.#loop.bind(this)))})),window.addEventListener("gamepaddisconnected",(()=>{this.#isConnected=!1}))}#loop(){if(!this.#isConnected)return;const e=function(t,e){const n=navigator.getGamepads();return a=n[e],{buttons:function(t,e){return t.buttons.map(((t,n)=>({button:{pressed:t.pressed,touched:t.touched,value:t.value},index:n,type:e[n]})))}(a,t),joysticks:{left:[a.axes[0],a.axes[1]],right:[a.axes[2],a.axes[3]]}}}(this.#buttonNames,this.#gamepadIndex),n=function(t){return{buttons:t.buttons.filter((t=>t.button.pressed||t.button.touched)),joysticks:t.joysticks}}(e);let s=!1;if(function(t,e){return t.buttons.length!==e.buttons.length||(0!==t.buttons.length||0!==e.buttons.length)&&(JSON.stringify(t.buttons)!==JSON.stringify(e.buttons)||!!t.buttons.some(((t,n)=>t.button.value!==e.buttons[n].button.value))||void 0)}(n,this.#lastInput)){const a=[];s=!0,n.buttons.forEach((t=>{i(t.type,t),a.push(t.type)})),this.#lastInput.buttons.forEach((n=>{a.includes(n.type)||(i(n.type,e.buttons[n.index]),i(t.ALL,{buttons:[e.buttons[n.index]],joysticks:e.joysticks}))}))}(function(t,e){if(JSON.stringify(t.joysticks)!==JSON.stringify(e.joysticks))return!0})(n,this.#lastInput)&&(i(t.JOYSTICKS,n.joysticks),s||i(t.ALL,n)),s&&n.buttons.length>0&&i(t.ALL,n),this.#lastInput=n,window.requestAnimationFrame(this.#loop.bind(this))}on=s;vibrate=o;static INPUT=t}class c{#keyboardCallbacks={};#gamepadCallbacks={};#lastJoysticks;constructor(){const t=cast.framework.CastReceiverContext.getInstance();t.addCustomMessageListener("urn:x-cast:com.inputcast.keyboard",(({data:t})=>{this.#dispatchCallbacks(l.INPUT.ALL,t,this.#keyboardCallbacks),this.#dispatchCallbacks(t.code,t,this.#keyboardCallbacks)})),t.addCustomMessageListener("urn:x-cast:com.inputcast.gamepad",(({data:t})=>{if("boolean"==typeof t.connected){const e=t.connected?l.INPUT.CONNECTED:l.INPUT.DISCONNECTED;return void this.#dispatchCallbacks(e,t,this.#gamepadCallbacks)}t.buttons.forEach((({type:t,button:e})=>{this.#dispatchCallbacks(t,e,this.#gamepadCallbacks)}));const e=JSON.stringify(t.joysticks);this.#lastJoysticks!==e&&(this.#lastJoysticks=e,this.#dispatchCallbacks(l.INPUT.JOYSTICKS,t.joysticks,this.#gamepadCallbacks)),this.#dispatchCallbacks(l.INPUT.ALL,t,this.#gamepadCallbacks)}))}static INPUT=l.INPUT;onGamepad(t,e){this.#gamepadCallbacks[t]=this.#gamepadCallbacks[t]||[],this.#gamepadCallbacks[t].push(e)}onKeyboard(t,e){this.#keyboardCallbacks[t]=this.#keyboardCallbacks[t]||[],this.#keyboardCallbacks[t].push(e)}#dispatchCallbacks(t,e,n){n[t]?.length>0&&n[t].forEach((t=>{t(e)}))}}document.body.innerHTML='<?xml version="1.0" encoding="utf-8"?>\n<svg viewBox="0 0 500 500" style="width: 450px" xmlns="http://www.w3.org/2000/svg">\n  <defs>\n    <clipPath id="_clipPath_6BMDFfNuTJnCQN1FSlk6wcnq2XSqCHAS">\n      <rect width="500" height="500"/>\n    </clipPath>\n  </defs>\n  <g clip-path="url(#_clipPath_6BMDFfNuTJnCQN1FSlk6wcnq2XSqCHAS)" transform="matrix(1.242883, 0, 0, 1.242883, 1.145972, -6.109139)" style="">\n    <g>\n      <g>\n        <path d=" M 288.066 101.559 C 308.77 103.477 341.593 120.442 341.593 129.066 C 341.593 130.106 344.121 133.824 347.392 137.392 C 350.514 140.812 391.701 246.974 396.905 272.846 C 400.771 292.77 401.068 320.128 397.499 332.469 C 392.444 350.163 381.441 362.207 366.275 366.667 L 359.584 368.749 L 349.474 360.869 C 343.972 356.557 295.054 309.126 282.862 303.178 L 273.941 299.015 L 199.597 299.015 L 199.894 109.439 L 254.611 109.439 L 262.938 104.532 C 272.355 102.218 275.572 100.401 288.066 101.559 Z " fill="rgb(0,0,0)"/>\n        <path d=" M 111.934 101.559 C 91.23 103.477 58.407 120.442 58.407 129.066 C 58.407 130.106 55.879 133.824 52.608 137.392 C 49.486 140.812 8.299 246.974 3.095 272.846 C -0.771 292.77 -1.068 320.128 2.501 332.469 C 7.556 350.163 18.559 362.207 33.725 366.667 L 40.416 368.749 L 50.526 360.869 C 56.028 356.557 104.946 309.126 117.138 303.178 L 126.059 299.015 L 200.403 299.015 L 200.106 109.439 L 145.389 109.439 L 137.062 104.532 C 127.645 102.218 124.428 100.401 111.934 101.559 Z " fill="rgb(0,0,0)"/>\n      </g>\n      <circle vector-effect="non-scaling-stroke" cx="227.94064229519577" cy="180.21241196959275" r="9.480283554300314" fill="rgb(255,255,255)" id="start"/>\n      <circle vector-effect="non-scaling-stroke" cx="252.92005943952557" cy="245.57522016392159" r="18.52194043850676" fill="rgb(255,255,255)" id="r3"/>\n      <circle vector-effect="non-scaling-stroke" cx="97.98076399161685" cy="180.03844817162295" r="18.521940438506775" fill="rgb(255,255,255)" id="l3"/>\n      <circle vector-effect="non-scaling-stroke" cx="164.6356622751377" cy="180.03696130155504" r="9.480283554300343" fill="rgb(255,255,255)" id="select"/>\n      <circle vector-effect="non-scaling-stroke" cx="199.09387610369956" cy="139.54205499644704" r="20.10991767125344" fill="rgb(255,255,255)" id="home"/>\n      <rect x="139.398" y="222.151" width="12.631" height="17.661" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)" id="up"/>\n      <rect x="139.341" y="252.274" width="12.631" height="17.661" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)" id="down"/>\n      <rect x="154.543" y="237.296" width="12.631" height="17.661" transform="matrix(0,1,-1,0,406.986,85.268)" fill="rgb(255,255,255)" id="right"/>\n      <rect x="139.271" y="239.702" width="12.781" height="12.732" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/>\n      <rect x="124.308" y="237.127" width="12.631" height="17.661" transform="matrix(0,1,-1,0,376.581,115.335)" fill="rgb(255,255,255)" id="left"/>\n      <circle vector-effect="non-scaling-stroke" cx="275.7791998667234" cy="179.97451275869426" r="11.947000997302894" fill="rgb(255,255,255)" id="button_left"/>\n      <circle vector-effect="non-scaling-stroke" cx="302.60977024585566" cy="208.0272903338172" r="11.947000997302894" fill="rgb(255,255,255)" id="button_down"/>\n      <circle vector-effect="non-scaling-stroke" cx="330.58523057743685" cy="180.20349074918397" r="11.947000997302894" fill="rgb(255,255,255)" id="button_right"/>\n      <circle vector-effect="non-scaling-stroke" cx="302.1518142648766" cy="154.21597569867257" r="11.947000997302894" fill="rgb(255,255,255)" id="button_up"/>\n    </g>\n    <mask id="_mask_5sks55AC0mF4gVPblQFim6FwOgs4kLX2" x="-200%" y="-200%" width="400%" height="400%">\n      <rect x="-200%" y="-200%" width="400%" height="400%" style="fill:white;"/>\n      <path d=" M 80.153 77.281 L 125.279 77.281 L 125.175 91.596 L 80.478 91.596 L 76.803 91.448 L 73.885 87.774 L 73.786 82.225 L 76.337 77.832 L 80.153 77.281 Z " fill="black" stroke="none"/>\n    </mask>\n    <path d=" M 80.153 77.281 L 125.279 77.281 L 125.175 91.596 L 80.478 91.596 L 76.803 91.448 L 73.885 87.774 L 73.786 82.225 L 76.337 77.832 L 80.153 77.281 Z " fill="rgb(255,255,255)"/>\n    <path d=" M 80.153 77.281 L 125.279 77.281 L 125.175 91.596 L 80.478 91.596 L 76.803 91.448 L 73.885 87.774 L 73.786 82.225 L 76.337 77.832 L 80.153 77.281 Z " stroke-width="3" stroke="rgb(0,0,0)" style="fill:white;" id="l1"/>\n    <mask id="_mask_EDR3bq8XVdvAVJTNpBGvYb0rfBzgHqIa" x="-200%" y="-200%" width="400%" height="400%">\n      <rect x="-200%" y="-200%" width="400%" height="400%" style="fill:white;"/>\n      <path d=" M 321.159 78.376 L 276.033 78.376 L 276.137 92.69 L 320.834 92.69 L 324.509 92.543 L 327.427 88.869 L 327.526 83.32 L 324.975 78.926 L 321.159 78.376 Z " fill="black" stroke="none"/>\n    </mask>\n    <path d=" M 321.159 78.376 L 276.033 78.376 L 276.137 92.69 L 320.834 92.69 L 324.509 92.543 L 327.427 88.869 L 327.526 83.32 L 324.975 78.926 L 321.159 78.376 Z " fill="rgb(255,255,255)"/>\n    <path d=" M 321.159 78.376 L 276.033 78.376 L 276.137 92.69 L 320.834 92.69 L 324.509 92.543 L 327.427 88.869 L 327.526 83.32 L 324.975 78.926 L 321.159 78.376 Z " stroke-width="3" stroke="rgb(0,0,0)" style="fill:white;" id="r1"/>\n    <mask id="_mask_kdnsY0sQCCVWJZN0i9NpMAhcdw2DrgoZ" x="-200%" y="-200%" width="400%" height="400%">\n      <rect x="-200%" y="-200%" width="400%" height="400%" style="fill:white;"/>\n      <path d=" M 288.903 39.79 L 287.859 68.616 L 313.847 68.549 L 312.339 39.893 L 309.755 36.608 L 304.01 33.49 L 296.372 33.655 L 291.757 35.833 L 288.903 39.79 Z " fill="black" stroke="none"/>\n    </mask>\n    <path d=" M 288.903 39.79 L 287.859 68.616 L 313.847 68.549 L 312.339 39.893 L 309.755 36.608 L 304.01 33.49 L 296.372 33.655 L 291.757 35.833 L 288.903 39.79 Z " fill="rgb(255,255,255)"/>\n    <path d=" M 288.903 39.79 L 287.859 68.616 L 313.847 68.549 L 312.339 39.893 L 309.755 36.608 L 304.01 33.49 L 296.372 33.655 L 291.757 35.833 L 288.903 39.79 Z " stroke-width="3" stroke="rgb(0,0,0)" style="fill:white;" id="r2"/>\n    <mask id="_mask_QvUNBkpOCNmKpNkGfv6EzICxvRYkgWnK" x="-200%" y="-200%" width="400%" height="400%">\n      <rect x="-200%" y="-200%" width="400%" height="400%" style="fill:white;"/>\n      <path d=" M 113.362 37.551 L 114.406 66.377 L 88.418 66.31 L 89.926 37.653 L 92.51 34.369 L 98.255 31.251 L 105.893 31.416 L 110.509 33.594 L 113.362 37.551 Z " fill="black" stroke="none"/>\n    </mask>\n    <path d=" M 113.362 37.551 L 114.406 66.377 L 88.418 66.31 L 89.926 37.653 L 92.51 34.369 L 98.255 31.251 L 105.893 31.416 L 110.509 33.594 L 113.362 37.551 Z " fill="rgb(255,255,255)"/>\n    <path d=" M 113.362 37.551 L 114.406 66.377 L 88.418 66.31 L 89.926 37.653 L 92.51 34.369 L 98.255 31.251 L 105.893 31.416 L 110.509 33.594 L 113.362 37.551 Z " stroke-width="3" stroke="rgb(0,0,0)" style="fill:white;" id="l2"/>\n  </g>\n</svg>';const r=["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Backspace","Delete","CapsLock","Control","Shift","Enter","Alt","Meta","Escape","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","F11","F12","PageUp","PageDown","Home","End","Insert","Pause","ScrollLock","NumLock","ContextMenu","MediaPlayPause","MediaTrackNext","MediaTrackPrevious"],d=document.createElement("input"),h={Tab:"\t"};function L(t,e){Object.entries(e).forEach((([e,n])=>{t.style[e]=n}))}let u;function g(t){u.innerText=t,u.style.transform="translateY(0)",setTimeout((()=>{u.style.transform="translateY(-100%)"}),2e3)}d.type="text",d.style.fontSize="3rem",d.placeholder="try typing on your sender...",document.body.append(d),L(document.body,{height:"100%",margin:"auto",display:"flex",background:"white",alignItems:"center",justifyContent:"center",flexDirection:"column"}),u=document.createElement("div"),u.classList.add("toast"),L(u,{position:"fixed",top:0,left:0,right:0,margin:"auto",fontSize:"2rem",textAlign:"center",fontFamily:"sans-serif",padding:"0.5rem",background:"#202020",color:"#ddd",transition:"transform 0.5s",transform:"translateY(-100%)"}),document.body.append(u);const f=new c;f.onGamepad(c.INPUT.ALL,(function(t){if(t.buttons.forEach((t=>{const e=document.querySelector(`#${t.type}`);t.button.value?e.style.fill=`rgba(255,0,0,${t.button.value}`:e.style.fill="white"})),t.joysticks){const e=97,n=180,s=252,i=245,a=document.querySelector("#l3"),o=document.querySelector("#r3");a.style.cx=e+10*t.joysticks.left[0],a.style.cy=n+10*t.joysticks.left[1],o.style.cx=s+10*t.joysticks.right[0],o.style.cy=i+10*t.joysticks.right[1]}})),f.onGamepad(c.INPUT.CONNECTED,(t=>{g(`Connected: ${t.id}`)})),f.onGamepad(c.INPUT.DISCONNECTED,(t=>{g(`Disconnected: ${t.id}`)})),f.onKeyboard(c.INPUT.ALL,(t=>function(t){if(r.includes(t))return;const e=d.selectionStart,n=d.value,s=h[t]||t;d.value=n.substring(0,e)+s+n.substring(e),d.selectionStart=e+s.length,d.selectionEnd=e+s.length,d.scrollLeft=d.scrollWidth/d.value.length*e+s.length}(t.key))),f.onKeyboard("Backspace",(function(){const t=d.value.substring(0,d.selectionStart-1),e=d.value.substring(d.selectionEnd,d.value.length);d.value=t+e,d.selectionStart=t.length,d.selectionEnd=t.length})),resolve()})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZS10by1jYXN0LmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaW5wdXRjYXN0LWRlbW8vY29kZS10by1jYXN0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIigoKT0+e1widXNlIHN0cmljdFwiO2NvbnN0IHQ9e0JVVFRPTl9ET1dOOlwiYnV0dG9uX2Rvd25cIixCVVRUT05fUklHSFQ6XCJidXR0b25fcmlnaHRcIixCVVRUT05fTEVGVDpcImJ1dHRvbl9sZWZ0XCIsQlVUVE9OX1VQOlwiYnV0dG9uX3VwXCIsTDE6XCJsMVwiLFIxOlwicjFcIixMMjpcImwyXCIsUjI6XCJyMlwiLFNFTEVDVDpcInNlbGVjdFwiLFNUQVJUOlwic3RhcnRcIixIT01FOlwiaG9tZVwiLEwzOlwibDNcIixSMzpcInIzXCIsVVA6XCJ1cFwiLERPV046XCJkb3duXCIsTEVGVDpcImxlZnRcIixSSUdIVDpcInJpZ2h0XCIsSk9ZU1RJQ0tTOlwiam95c3RpY2tzXCIsQ09OTkVDVEVEOlwiY29ubmVjdGVkXCIsRElTQ09OTkVDVEVEOlwiZGlzY29ubmVjdGVkXCIsQUxMOlwiYWxsXCJ9LGU9e3N0YW5kYXJkOnswOnQuQlVUVE9OX0RPV04sMTp0LkJVVFRPTl9SSUdIVCwyOnQuQlVUVE9OX0xFRlQsMzp0LkJVVFRPTl9VUCw0OnQuTDEsNTp0LlIxLDY6dC5MMiw3OnQuUjIsODp0LlNFTEVDVCw5OnQuU1RBUlQsMTA6dC5MMywxMTp0LlIzLDEyOnQuVVAsMTM6dC5ET1dOLDE0OnQuTEVGVCwxNTp0LlJJR0hULDE2OnQuSE9NRX19LG49e307ZnVuY3Rpb24gcyhlLHMpe2U9PT10LkNPTk5FQ1RFRCYmd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJnYW1lcGFkY29ubmVjdGVkXCIscyksZT09PXQuRElTQ09OTkVDVEVEJiZ3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImdhbWVwYWRkaXNjb25uZWN0ZWRcIixzKSxuW2VdPW5bZV0/P1tdLG5bZV0ucHVzaChzKX1mdW5jdGlvbiBpKHQsZSl7blt0XSYmblt0XS5mb3JFYWNoKCh0PT50KGUpKSl9bGV0IGE7ZnVuY3Rpb24gbyh7ZGVsYXk6dD0wLGR1cmF0aW9uOmU9NTAwLHdlYWs6bj0uNSxzdHJvbmc6cz0uNX09e30pe2NvbnN0IGk9TWF0aC5taW4oTWF0aC5tYXgodCwwKSw1ZTMpLG89TWF0aC5taW4oTWF0aC5tYXgoZSwxKSw1ZTMsNWUzLWkpLGw9TWF0aC5taW4oTWF0aC5tYXgocywwKSwxKSxjPU1hdGgubWluKE1hdGgubWF4KG4sMCksMSk7YS52aWJyYXRpb25BY3R1YXRvciYmYS52aWJyYXRpb25BY3R1YXRvci5wbGF5RWZmZWN0KFwiZHVhbC1ydW1ibGVcIix7c3RhcnREZWxheTppLGR1cmF0aW9uOm8sd2Vha01hZ25pdHVkZTpjLHN0cm9uZ01hZ25pdHVkZTpsfSl9Y2xhc3MgbHsjZ2FtZXBhZEluZGV4OyNidXR0b25OYW1lczsjaXNDb25uZWN0ZWQ9ITE7I2xhc3RJbnB1dD17YnV0dG9uczpbXSxqb3lzdGlja3M6W119O2NvbnN0cnVjdG9yKCl7d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJnYW1lcGFkY29ubmVjdGVkXCIsKHQ9Pnt2YXIgbjt0aGlzLiNidXR0b25OYW1lcz0obj10LmdhbWVwYWQubWFwcGluZyxlW25dfHxjb25zb2xlLmVycm9yKGAke259IGlzIGFuIHVuc3VwcG9ydGVkIGNvbnRyb2xsZXJgKSksdGhpcy4jYnV0dG9uTmFtZXMmJih0aGlzLiNpc0Nvbm5lY3RlZD0hMCx0aGlzLiNnYW1lcGFkSW5kZXg9dC5nYW1lcGFkLmluZGV4LHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy4jbG9vcC5iaW5kKHRoaXMpKSl9KSksd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJnYW1lcGFkZGlzY29ubmVjdGVkXCIsKCgpPT57dGhpcy4jaXNDb25uZWN0ZWQ9ITF9KSl9I2xvb3AoKXtpZighdGhpcy4jaXNDb25uZWN0ZWQpcmV0dXJuO2NvbnN0IGU9ZnVuY3Rpb24odCxlKXtjb25zdCBuPW5hdmlnYXRvci5nZXRHYW1lcGFkcygpO3JldHVybiBhPW5bZV0se2J1dHRvbnM6ZnVuY3Rpb24odCxlKXtyZXR1cm4gdC5idXR0b25zLm1hcCgoKHQsbik9Pih7YnV0dG9uOntwcmVzc2VkOnQucHJlc3NlZCx0b3VjaGVkOnQudG91Y2hlZCx2YWx1ZTp0LnZhbHVlfSxpbmRleDpuLHR5cGU6ZVtuXX0pKSl9KGEsdCksam95c3RpY2tzOntsZWZ0OlthLmF4ZXNbMF0sYS5heGVzWzFdXSxyaWdodDpbYS5heGVzWzJdLGEuYXhlc1szXV19fX0odGhpcy4jYnV0dG9uTmFtZXMsdGhpcy4jZ2FtZXBhZEluZGV4KSxuPWZ1bmN0aW9uKHQpe3JldHVybntidXR0b25zOnQuYnV0dG9ucy5maWx0ZXIoKHQ9PnQuYnV0dG9uLnByZXNzZWR8fHQuYnV0dG9uLnRvdWNoZWQpKSxqb3lzdGlja3M6dC5qb3lzdGlja3N9fShlKTtsZXQgcz0hMTtpZihmdW5jdGlvbih0LGUpe3JldHVybiB0LmJ1dHRvbnMubGVuZ3RoIT09ZS5idXR0b25zLmxlbmd0aHx8KDAhPT10LmJ1dHRvbnMubGVuZ3RofHwwIT09ZS5idXR0b25zLmxlbmd0aCkmJihKU09OLnN0cmluZ2lmeSh0LmJ1dHRvbnMpIT09SlNPTi5zdHJpbmdpZnkoZS5idXR0b25zKXx8ISF0LmJ1dHRvbnMuc29tZSgoKHQsbik9PnQuYnV0dG9uLnZhbHVlIT09ZS5idXR0b25zW25dLmJ1dHRvbi52YWx1ZSkpfHx2b2lkIDApfShuLHRoaXMuI2xhc3RJbnB1dCkpe2NvbnN0IGE9W107cz0hMCxuLmJ1dHRvbnMuZm9yRWFjaCgodD0+e2kodC50eXBlLHQpLGEucHVzaCh0LnR5cGUpfSkpLHRoaXMuI2xhc3RJbnB1dC5idXR0b25zLmZvckVhY2goKG49PnthLmluY2x1ZGVzKG4udHlwZSl8fChpKG4udHlwZSxlLmJ1dHRvbnNbbi5pbmRleF0pLGkodC5BTEwse2J1dHRvbnM6W2UuYnV0dG9uc1tuLmluZGV4XV0sam95c3RpY2tzOmUuam95c3RpY2tzfSkpfSkpfShmdW5jdGlvbih0LGUpe2lmKEpTT04uc3RyaW5naWZ5KHQuam95c3RpY2tzKSE9PUpTT04uc3RyaW5naWZ5KGUuam95c3RpY2tzKSlyZXR1cm4hMH0pKG4sdGhpcy4jbGFzdElucHV0KSYmKGkodC5KT1lTVElDS1Msbi5qb3lzdGlja3MpLHN8fGkodC5BTEwsbikpLHMmJm4uYnV0dG9ucy5sZW5ndGg+MCYmaSh0LkFMTCxuKSx0aGlzLiNsYXN0SW5wdXQ9bix3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuI2xvb3AuYmluZCh0aGlzKSl9b249czt2aWJyYXRlPW87c3RhdGljIElOUFVUPXR9Y2xhc3MgY3sja2V5Ym9hcmRDYWxsYmFja3M9e307I2dhbWVwYWRDYWxsYmFja3M9e307I2xhc3RKb3lzdGlja3M7Y29uc3RydWN0b3IoKXtjb25zdCB0PWNhc3QuZnJhbWV3b3JrLkNhc3RSZWNlaXZlckNvbnRleHQuZ2V0SW5zdGFuY2UoKTt0LmFkZEN1c3RvbU1lc3NhZ2VMaXN0ZW5lcihcInVybjp4LWNhc3Q6Y29tLmlucHV0Y2FzdC5rZXlib2FyZFwiLCgoe2RhdGE6dH0pPT57dGhpcy4jZGlzcGF0Y2hDYWxsYmFja3MobC5JTlBVVC5BTEwsdCx0aGlzLiNrZXlib2FyZENhbGxiYWNrcyksdGhpcy4jZGlzcGF0Y2hDYWxsYmFja3ModC5jb2RlLHQsdGhpcy4ja2V5Ym9hcmRDYWxsYmFja3MpfSkpLHQuYWRkQ3VzdG9tTWVzc2FnZUxpc3RlbmVyKFwidXJuOngtY2FzdDpjb20uaW5wdXRjYXN0LmdhbWVwYWRcIiwoKHtkYXRhOnR9KT0+e2lmKFwiYm9vbGVhblwiPT10eXBlb2YgdC5jb25uZWN0ZWQpe2NvbnN0IGU9dC5jb25uZWN0ZWQ/bC5JTlBVVC5DT05ORUNURUQ6bC5JTlBVVC5ESVNDT05ORUNURUQ7cmV0dXJuIHZvaWQgdGhpcy4jZGlzcGF0Y2hDYWxsYmFja3MoZSx0LHRoaXMuI2dhbWVwYWRDYWxsYmFja3MpfXQuYnV0dG9ucy5mb3JFYWNoKCgoe3R5cGU6dCxidXR0b246ZX0pPT57dGhpcy4jZGlzcGF0Y2hDYWxsYmFja3ModCxlLHRoaXMuI2dhbWVwYWRDYWxsYmFja3MpfSkpO2NvbnN0IGU9SlNPTi5zdHJpbmdpZnkodC5qb3lzdGlja3MpO3RoaXMuI2xhc3RKb3lzdGlja3MhPT1lJiYodGhpcy4jbGFzdEpveXN0aWNrcz1lLHRoaXMuI2Rpc3BhdGNoQ2FsbGJhY2tzKGwuSU5QVVQuSk9ZU1RJQ0tTLHQuam95c3RpY2tzLHRoaXMuI2dhbWVwYWRDYWxsYmFja3MpKSx0aGlzLiNkaXNwYXRjaENhbGxiYWNrcyhsLklOUFVULkFMTCx0LHRoaXMuI2dhbWVwYWRDYWxsYmFja3MpfSkpfXN0YXRpYyBJTlBVVD1sLklOUFVUO29uR2FtZXBhZCh0LGUpe3RoaXMuI2dhbWVwYWRDYWxsYmFja3NbdF09dGhpcy4jZ2FtZXBhZENhbGxiYWNrc1t0XXx8W10sdGhpcy4jZ2FtZXBhZENhbGxiYWNrc1t0XS5wdXNoKGUpfW9uS2V5Ym9hcmQodCxlKXt0aGlzLiNrZXlib2FyZENhbGxiYWNrc1t0XT10aGlzLiNrZXlib2FyZENhbGxiYWNrc1t0XXx8W10sdGhpcy4ja2V5Ym9hcmRDYWxsYmFja3NbdF0ucHVzaChlKX0jZGlzcGF0Y2hDYWxsYmFja3ModCxlLG4pe25bdF0/Lmxlbmd0aD4wJiZuW3RdLmZvckVhY2goKHQ9Pnt0KGUpfSkpfX1kb2N1bWVudC5ib2R5LmlubmVySFRNTD0nPD94bWwgdmVyc2lvbj1cIjEuMFwiIGVuY29kaW5nPVwidXRmLThcIj8+XFxuPHN2ZyB2aWV3Qm94PVwiMCAwIDUwMCA1MDBcIiBzdHlsZT1cIndpZHRoOiA0NTBweFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cXG4gIDxkZWZzPlxcbiAgICA8Y2xpcFBhdGggaWQ9XCJfY2xpcFBhdGhfNkJNREZmTnVUSm5DUU4xRlNsazZ3Y25xMlhTcUNIQVNcIj5cXG4gICAgICA8cmVjdCB3aWR0aD1cIjUwMFwiIGhlaWdodD1cIjUwMFwiLz5cXG4gICAgPC9jbGlwUGF0aD5cXG4gIDwvZGVmcz5cXG4gIDxnIGNsaXAtcGF0aD1cInVybCgjX2NsaXBQYXRoXzZCTURGZk51VEpuQ1FOMUZTbGs2d2NucTJYU3FDSEFTKVwiIHRyYW5zZm9ybT1cIm1hdHJpeCgxLjI0Mjg4MywgMCwgMCwgMS4yNDI4ODMsIDEuMTQ1OTcyLCAtNi4xMDkxMzkpXCIgc3R5bGU9XCJcIj5cXG4gICAgPGc+XFxuICAgICAgPGc+XFxuICAgICAgICA8cGF0aCBkPVwiIE0gMjg4LjA2NiAxMDEuNTU5IEMgMzA4Ljc3IDEwMy40NzcgMzQxLjU5MyAxMjAuNDQyIDM0MS41OTMgMTI5LjA2NiBDIDM0MS41OTMgMTMwLjEwNiAzNDQuMTIxIDEzMy44MjQgMzQ3LjM5MiAxMzcuMzkyIEMgMzUwLjUxNCAxNDAuODEyIDM5MS43MDEgMjQ2Ljk3NCAzOTYuOTA1IDI3Mi44NDYgQyA0MDAuNzcxIDI5Mi43NyA0MDEuMDY4IDMyMC4xMjggMzk3LjQ5OSAzMzIuNDY5IEMgMzkyLjQ0NCAzNTAuMTYzIDM4MS40NDEgMzYyLjIwNyAzNjYuMjc1IDM2Ni42NjcgTCAzNTkuNTg0IDM2OC43NDkgTCAzNDkuNDc0IDM2MC44NjkgQyAzNDMuOTcyIDM1Ni41NTcgMjk1LjA1NCAzMDkuMTI2IDI4Mi44NjIgMzAzLjE3OCBMIDI3My45NDEgMjk5LjAxNSBMIDE5OS41OTcgMjk5LjAxNSBMIDE5OS44OTQgMTA5LjQzOSBMIDI1NC42MTEgMTA5LjQzOSBMIDI2Mi45MzggMTA0LjUzMiBDIDI3Mi4zNTUgMTAyLjIxOCAyNzUuNTcyIDEwMC40MDEgMjg4LjA2NiAxMDEuNTU5IFogXCIgZmlsbD1cInJnYigwLDAsMClcIi8+XFxuICAgICAgICA8cGF0aCBkPVwiIE0gMTExLjkzNCAxMDEuNTU5IEMgOTEuMjMgMTAzLjQ3NyA1OC40MDcgMTIwLjQ0MiA1OC40MDcgMTI5LjA2NiBDIDU4LjQwNyAxMzAuMTA2IDU1Ljg3OSAxMzMuODI0IDUyLjYwOCAxMzcuMzkyIEMgNDkuNDg2IDE0MC44MTIgOC4yOTkgMjQ2Ljk3NCAzLjA5NSAyNzIuODQ2IEMgLTAuNzcxIDI5Mi43NyAtMS4wNjggMzIwLjEyOCAyLjUwMSAzMzIuNDY5IEMgNy41NTYgMzUwLjE2MyAxOC41NTkgMzYyLjIwNyAzMy43MjUgMzY2LjY2NyBMIDQwLjQxNiAzNjguNzQ5IEwgNTAuNTI2IDM2MC44NjkgQyA1Ni4wMjggMzU2LjU1NyAxMDQuOTQ2IDMwOS4xMjYgMTE3LjEzOCAzMDMuMTc4IEwgMTI2LjA1OSAyOTkuMDE1IEwgMjAwLjQwMyAyOTkuMDE1IEwgMjAwLjEwNiAxMDkuNDM5IEwgMTQ1LjM4OSAxMDkuNDM5IEwgMTM3LjA2MiAxMDQuNTMyIEMgMTI3LjY0NSAxMDIuMjE4IDEyNC40MjggMTAwLjQwMSAxMTEuOTM0IDEwMS41NTkgWiBcIiBmaWxsPVwicmdiKDAsMCwwKVwiLz5cXG4gICAgICA8L2c+XFxuICAgICAgPGNpcmNsZSB2ZWN0b3ItZWZmZWN0PVwibm9uLXNjYWxpbmctc3Ryb2tlXCIgY3g9XCIyMjcuOTQwNjQyMjk1MTk1NzdcIiBjeT1cIjE4MC4yMTI0MTE5Njk1OTI3NVwiIHI9XCI5LjQ4MDI4MzU1NDMwMDMxNFwiIGZpbGw9XCJyZ2IoMjU1LDI1NSwyNTUpXCIgaWQ9XCJzdGFydFwiLz5cXG4gICAgICA8Y2lyY2xlIHZlY3Rvci1lZmZlY3Q9XCJub24tc2NhbGluZy1zdHJva2VcIiBjeD1cIjI1Mi45MjAwNTk0Mzk1MjU1N1wiIGN5PVwiMjQ1LjU3NTIyMDE2MzkyMTU5XCIgcj1cIjE4LjUyMTk0MDQzODUwNjc2XCIgZmlsbD1cInJnYigyNTUsMjU1LDI1NSlcIiBpZD1cInIzXCIvPlxcbiAgICAgIDxjaXJjbGUgdmVjdG9yLWVmZmVjdD1cIm5vbi1zY2FsaW5nLXN0cm9rZVwiIGN4PVwiOTcuOTgwNzYzOTkxNjE2ODVcIiBjeT1cIjE4MC4wMzg0NDgxNzE2MjI5NVwiIHI9XCIxOC41MjE5NDA0Mzg1MDY3NzVcIiBmaWxsPVwicmdiKDI1NSwyNTUsMjU1KVwiIGlkPVwibDNcIi8+XFxuICAgICAgPGNpcmNsZSB2ZWN0b3ItZWZmZWN0PVwibm9uLXNjYWxpbmctc3Ryb2tlXCIgY3g9XCIxNjQuNjM1NjYyMjc1MTM3N1wiIGN5PVwiMTgwLjAzNjk2MTMwMTU1NTA0XCIgcj1cIjkuNDgwMjgzNTU0MzAwMzQzXCIgZmlsbD1cInJnYigyNTUsMjU1LDI1NSlcIiBpZD1cInNlbGVjdFwiLz5cXG4gICAgICA8Y2lyY2xlIHZlY3Rvci1lZmZlY3Q9XCJub24tc2NhbGluZy1zdHJva2VcIiBjeD1cIjE5OS4wOTM4NzYxMDM2OTk1NlwiIGN5PVwiMTM5LjU0MjA1NDk5NjQ0NzA0XCIgcj1cIjIwLjEwOTkxNzY3MTI1MzQ0XCIgZmlsbD1cInJnYigyNTUsMjU1LDI1NSlcIiBpZD1cImhvbWVcIi8+XFxuICAgICAgPHJlY3QgeD1cIjEzOS4zOThcIiB5PVwiMjIyLjE1MVwiIHdpZHRoPVwiMTIuNjMxXCIgaGVpZ2h0PVwiMTcuNjYxXCIgdHJhbnNmb3JtPVwibWF0cml4KDEsMCwwLDEsMCwwKVwiIGZpbGw9XCJyZ2IoMjU1LDI1NSwyNTUpXCIgaWQ9XCJ1cFwiLz5cXG4gICAgICA8cmVjdCB4PVwiMTM5LjM0MVwiIHk9XCIyNTIuMjc0XCIgd2lkdGg9XCIxMi42MzFcIiBoZWlnaHQ9XCIxNy42NjFcIiB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSwwLDApXCIgZmlsbD1cInJnYigyNTUsMjU1LDI1NSlcIiBpZD1cImRvd25cIi8+XFxuICAgICAgPHJlY3QgeD1cIjE1NC41NDNcIiB5PVwiMjM3LjI5NlwiIHdpZHRoPVwiMTIuNjMxXCIgaGVpZ2h0PVwiMTcuNjYxXCIgdHJhbnNmb3JtPVwibWF0cml4KDAsMSwtMSwwLDQwNi45ODYsODUuMjY4KVwiIGZpbGw9XCJyZ2IoMjU1LDI1NSwyNTUpXCIgaWQ9XCJyaWdodFwiLz5cXG4gICAgICA8cmVjdCB4PVwiMTM5LjI3MVwiIHk9XCIyMzkuNzAyXCIgd2lkdGg9XCIxMi43ODFcIiBoZWlnaHQ9XCIxMi43MzJcIiB0cmFuc2Zvcm09XCJtYXRyaXgoMSwwLDAsMSwwLDApXCIgZmlsbD1cInJnYigyNTUsMjU1LDI1NSlcIi8+XFxuICAgICAgPHJlY3QgeD1cIjEyNC4zMDhcIiB5PVwiMjM3LjEyN1wiIHdpZHRoPVwiMTIuNjMxXCIgaGVpZ2h0PVwiMTcuNjYxXCIgdHJhbnNmb3JtPVwibWF0cml4KDAsMSwtMSwwLDM3Ni41ODEsMTE1LjMzNSlcIiBmaWxsPVwicmdiKDI1NSwyNTUsMjU1KVwiIGlkPVwibGVmdFwiLz5cXG4gICAgICA8Y2lyY2xlIHZlY3Rvci1lZmZlY3Q9XCJub24tc2NhbGluZy1zdHJva2VcIiBjeD1cIjI3NS43NzkxOTk4NjY3MjM0XCIgY3k9XCIxNzkuOTc0NTEyNzU4Njk0MjZcIiByPVwiMTEuOTQ3MDAwOTk3MzAyODk0XCIgZmlsbD1cInJnYigyNTUsMjU1LDI1NSlcIiBpZD1cImJ1dHRvbl9sZWZ0XCIvPlxcbiAgICAgIDxjaXJjbGUgdmVjdG9yLWVmZmVjdD1cIm5vbi1zY2FsaW5nLXN0cm9rZVwiIGN4PVwiMzAyLjYwOTc3MDI0NTg1NTY2XCIgY3k9XCIyMDguMDI3MjkwMzMzODE3MlwiIHI9XCIxMS45NDcwMDA5OTczMDI4OTRcIiBmaWxsPVwicmdiKDI1NSwyNTUsMjU1KVwiIGlkPVwiYnV0dG9uX2Rvd25cIi8+XFxuICAgICAgPGNpcmNsZSB2ZWN0b3ItZWZmZWN0PVwibm9uLXNjYWxpbmctc3Ryb2tlXCIgY3g9XCIzMzAuNTg1MjMwNTc3NDM2ODVcIiBjeT1cIjE4MC4yMDM0OTA3NDkxODM5N1wiIHI9XCIxMS45NDcwMDA5OTczMDI4OTRcIiBmaWxsPVwicmdiKDI1NSwyNTUsMjU1KVwiIGlkPVwiYnV0dG9uX3JpZ2h0XCIvPlxcbiAgICAgIDxjaXJjbGUgdmVjdG9yLWVmZmVjdD1cIm5vbi1zY2FsaW5nLXN0cm9rZVwiIGN4PVwiMzAyLjE1MTgxNDI2NDg3NjZcIiBjeT1cIjE1NC4yMTU5NzU2OTg2NzI1N1wiIHI9XCIxMS45NDcwMDA5OTczMDI4OTRcIiBmaWxsPVwicmdiKDI1NSwyNTUsMjU1KVwiIGlkPVwiYnV0dG9uX3VwXCIvPlxcbiAgICA8L2c+XFxuICAgIDxtYXNrIGlkPVwiX21hc2tfNXNrczU1QUMwbUY0Z1ZQYmxRRmltNkZ3T2dzNGtMWDJcIiB4PVwiLTIwMCVcIiB5PVwiLTIwMCVcIiB3aWR0aD1cIjQwMCVcIiBoZWlnaHQ9XCI0MDAlXCI+XFxuICAgICAgPHJlY3QgeD1cIi0yMDAlXCIgeT1cIi0yMDAlXCIgd2lkdGg9XCI0MDAlXCIgaGVpZ2h0PVwiNDAwJVwiIHN0eWxlPVwiZmlsbDp3aGl0ZTtcIi8+XFxuICAgICAgPHBhdGggZD1cIiBNIDgwLjE1MyA3Ny4yODEgTCAxMjUuMjc5IDc3LjI4MSBMIDEyNS4xNzUgOTEuNTk2IEwgODAuNDc4IDkxLjU5NiBMIDc2LjgwMyA5MS40NDggTCA3My44ODUgODcuNzc0IEwgNzMuNzg2IDgyLjIyNSBMIDc2LjMzNyA3Ny44MzIgTCA4MC4xNTMgNzcuMjgxIFogXCIgZmlsbD1cImJsYWNrXCIgc3Ryb2tlPVwibm9uZVwiLz5cXG4gICAgPC9tYXNrPlxcbiAgICA8cGF0aCBkPVwiIE0gODAuMTUzIDc3LjI4MSBMIDEyNS4yNzkgNzcuMjgxIEwgMTI1LjE3NSA5MS41OTYgTCA4MC40NzggOTEuNTk2IEwgNzYuODAzIDkxLjQ0OCBMIDczLjg4NSA4Ny43NzQgTCA3My43ODYgODIuMjI1IEwgNzYuMzM3IDc3LjgzMiBMIDgwLjE1MyA3Ny4yODEgWiBcIiBmaWxsPVwicmdiKDI1NSwyNTUsMjU1KVwiLz5cXG4gICAgPHBhdGggZD1cIiBNIDgwLjE1MyA3Ny4yODEgTCAxMjUuMjc5IDc3LjI4MSBMIDEyNS4xNzUgOTEuNTk2IEwgODAuNDc4IDkxLjU5NiBMIDc2LjgwMyA5MS40NDggTCA3My44ODUgODcuNzc0IEwgNzMuNzg2IDgyLjIyNSBMIDc2LjMzNyA3Ny44MzIgTCA4MC4xNTMgNzcuMjgxIFogXCIgc3Ryb2tlLXdpZHRoPVwiM1wiIHN0cm9rZT1cInJnYigwLDAsMClcIiBzdHlsZT1cImZpbGw6d2hpdGU7XCIgaWQ9XCJsMVwiLz5cXG4gICAgPG1hc2sgaWQ9XCJfbWFza19FRFIzYnE4WFZkdkFWSlROcEJHdlliMHJmQnpnSHFJYVwiIHg9XCItMjAwJVwiIHk9XCItMjAwJVwiIHdpZHRoPVwiNDAwJVwiIGhlaWdodD1cIjQwMCVcIj5cXG4gICAgICA8cmVjdCB4PVwiLTIwMCVcIiB5PVwiLTIwMCVcIiB3aWR0aD1cIjQwMCVcIiBoZWlnaHQ9XCI0MDAlXCIgc3R5bGU9XCJmaWxsOndoaXRlO1wiLz5cXG4gICAgICA8cGF0aCBkPVwiIE0gMzIxLjE1OSA3OC4zNzYgTCAyNzYuMDMzIDc4LjM3NiBMIDI3Ni4xMzcgOTIuNjkgTCAzMjAuODM0IDkyLjY5IEwgMzI0LjUwOSA5Mi41NDMgTCAzMjcuNDI3IDg4Ljg2OSBMIDMyNy41MjYgODMuMzIgTCAzMjQuOTc1IDc4LjkyNiBMIDMyMS4xNTkgNzguMzc2IFogXCIgZmlsbD1cImJsYWNrXCIgc3Ryb2tlPVwibm9uZVwiLz5cXG4gICAgPC9tYXNrPlxcbiAgICA8cGF0aCBkPVwiIE0gMzIxLjE1OSA3OC4zNzYgTCAyNzYuMDMzIDc4LjM3NiBMIDI3Ni4xMzcgOTIuNjkgTCAzMjAuODM0IDkyLjY5IEwgMzI0LjUwOSA5Mi41NDMgTCAzMjcuNDI3IDg4Ljg2OSBMIDMyNy41MjYgODMuMzIgTCAzMjQuOTc1IDc4LjkyNiBMIDMyMS4xNTkgNzguMzc2IFogXCIgZmlsbD1cInJnYigyNTUsMjU1LDI1NSlcIi8+XFxuICAgIDxwYXRoIGQ9XCIgTSAzMjEuMTU5IDc4LjM3NiBMIDI3Ni4wMzMgNzguMzc2IEwgMjc2LjEzNyA5Mi42OSBMIDMyMC44MzQgOTIuNjkgTCAzMjQuNTA5IDkyLjU0MyBMIDMyNy40MjcgODguODY5IEwgMzI3LjUyNiA4My4zMiBMIDMyNC45NzUgNzguOTI2IEwgMzIxLjE1OSA3OC4zNzYgWiBcIiBzdHJva2Utd2lkdGg9XCIzXCIgc3Ryb2tlPVwicmdiKDAsMCwwKVwiIHN0eWxlPVwiZmlsbDp3aGl0ZTtcIiBpZD1cInIxXCIvPlxcbiAgICA8bWFzayBpZD1cIl9tYXNrX2tkbnNZMHNRQ0NWV0paTjBpOU5wTUFoY2R3MkRyZ29aXCIgeD1cIi0yMDAlXCIgeT1cIi0yMDAlXCIgd2lkdGg9XCI0MDAlXCIgaGVpZ2h0PVwiNDAwJVwiPlxcbiAgICAgIDxyZWN0IHg9XCItMjAwJVwiIHk9XCItMjAwJVwiIHdpZHRoPVwiNDAwJVwiIGhlaWdodD1cIjQwMCVcIiBzdHlsZT1cImZpbGw6d2hpdGU7XCIvPlxcbiAgICAgIDxwYXRoIGQ9XCIgTSAyODguOTAzIDM5Ljc5IEwgMjg3Ljg1OSA2OC42MTYgTCAzMTMuODQ3IDY4LjU0OSBMIDMxMi4zMzkgMzkuODkzIEwgMzA5Ljc1NSAzNi42MDggTCAzMDQuMDEgMzMuNDkgTCAyOTYuMzcyIDMzLjY1NSBMIDI5MS43NTcgMzUuODMzIEwgMjg4LjkwMyAzOS43OSBaIFwiIGZpbGw9XCJibGFja1wiIHN0cm9rZT1cIm5vbmVcIi8+XFxuICAgIDwvbWFzaz5cXG4gICAgPHBhdGggZD1cIiBNIDI4OC45MDMgMzkuNzkgTCAyODcuODU5IDY4LjYxNiBMIDMxMy44NDcgNjguNTQ5IEwgMzEyLjMzOSAzOS44OTMgTCAzMDkuNzU1IDM2LjYwOCBMIDMwNC4wMSAzMy40OSBMIDI5Ni4zNzIgMzMuNjU1IEwgMjkxLjc1NyAzNS44MzMgTCAyODguOTAzIDM5Ljc5IFogXCIgZmlsbD1cInJnYigyNTUsMjU1LDI1NSlcIi8+XFxuICAgIDxwYXRoIGQ9XCIgTSAyODguOTAzIDM5Ljc5IEwgMjg3Ljg1OSA2OC42MTYgTCAzMTMuODQ3IDY4LjU0OSBMIDMxMi4zMzkgMzkuODkzIEwgMzA5Ljc1NSAzNi42MDggTCAzMDQuMDEgMzMuNDkgTCAyOTYuMzcyIDMzLjY1NSBMIDI5MS43NTcgMzUuODMzIEwgMjg4LjkwMyAzOS43OSBaIFwiIHN0cm9rZS13aWR0aD1cIjNcIiBzdHJva2U9XCJyZ2IoMCwwLDApXCIgc3R5bGU9XCJmaWxsOndoaXRlO1wiIGlkPVwicjJcIi8+XFxuICAgIDxtYXNrIGlkPVwiX21hc2tfUXZVTkJrcE9DTm1LcE5rR2Z2NkV6SUN4dlJZa2dXbktcIiB4PVwiLTIwMCVcIiB5PVwiLTIwMCVcIiB3aWR0aD1cIjQwMCVcIiBoZWlnaHQ9XCI0MDAlXCI+XFxuICAgICAgPHJlY3QgeD1cIi0yMDAlXCIgeT1cIi0yMDAlXCIgd2lkdGg9XCI0MDAlXCIgaGVpZ2h0PVwiNDAwJVwiIHN0eWxlPVwiZmlsbDp3aGl0ZTtcIi8+XFxuICAgICAgPHBhdGggZD1cIiBNIDExMy4zNjIgMzcuNTUxIEwgMTE0LjQwNiA2Ni4zNzcgTCA4OC40MTggNjYuMzEgTCA4OS45MjYgMzcuNjUzIEwgOTIuNTEgMzQuMzY5IEwgOTguMjU1IDMxLjI1MSBMIDEwNS44OTMgMzEuNDE2IEwgMTEwLjUwOSAzMy41OTQgTCAxMTMuMzYyIDM3LjU1MSBaIFwiIGZpbGw9XCJibGFja1wiIHN0cm9rZT1cIm5vbmVcIi8+XFxuICAgIDwvbWFzaz5cXG4gICAgPHBhdGggZD1cIiBNIDExMy4zNjIgMzcuNTUxIEwgMTE0LjQwNiA2Ni4zNzcgTCA4OC40MTggNjYuMzEgTCA4OS45MjYgMzcuNjUzIEwgOTIuNTEgMzQuMzY5IEwgOTguMjU1IDMxLjI1MSBMIDEwNS44OTMgMzEuNDE2IEwgMTEwLjUwOSAzMy41OTQgTCAxMTMuMzYyIDM3LjU1MSBaIFwiIGZpbGw9XCJyZ2IoMjU1LDI1NSwyNTUpXCIvPlxcbiAgICA8cGF0aCBkPVwiIE0gMTEzLjM2MiAzNy41NTEgTCAxMTQuNDA2IDY2LjM3NyBMIDg4LjQxOCA2Ni4zMSBMIDg5LjkyNiAzNy42NTMgTCA5Mi41MSAzNC4zNjkgTCA5OC4yNTUgMzEuMjUxIEwgMTA1Ljg5MyAzMS40MTYgTCAxMTAuNTA5IDMzLjU5NCBMIDExMy4zNjIgMzcuNTUxIFogXCIgc3Ryb2tlLXdpZHRoPVwiM1wiIHN0cm9rZT1cInJnYigwLDAsMClcIiBzdHlsZT1cImZpbGw6d2hpdGU7XCIgaWQ9XCJsMlwiLz5cXG4gIDwvZz5cXG48L3N2Zz4nO2NvbnN0IHI9W1wiQXJyb3dVcFwiLFwiQXJyb3dEb3duXCIsXCJBcnJvd0xlZnRcIixcIkFycm93UmlnaHRcIixcIkJhY2tzcGFjZVwiLFwiRGVsZXRlXCIsXCJDYXBzTG9ja1wiLFwiQ29udHJvbFwiLFwiU2hpZnRcIixcIkVudGVyXCIsXCJBbHRcIixcIk1ldGFcIixcIkVzY2FwZVwiLFwiRjFcIixcIkYyXCIsXCJGM1wiLFwiRjRcIixcIkY1XCIsXCJGNlwiLFwiRjdcIixcIkY4XCIsXCJGOVwiLFwiRjEwXCIsXCJGMTFcIixcIkYxMlwiLFwiUGFnZVVwXCIsXCJQYWdlRG93blwiLFwiSG9tZVwiLFwiRW5kXCIsXCJJbnNlcnRcIixcIlBhdXNlXCIsXCJTY3JvbGxMb2NrXCIsXCJOdW1Mb2NrXCIsXCJDb250ZXh0TWVudVwiLFwiTWVkaWFQbGF5UGF1c2VcIixcIk1lZGlhVHJhY2tOZXh0XCIsXCJNZWRpYVRyYWNrUHJldmlvdXNcIl0sZD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiksaD17VGFiOlwiXFx0XCJ9O2Z1bmN0aW9uIEwodCxlKXtPYmplY3QuZW50cmllcyhlKS5mb3JFYWNoKCgoW2Usbl0pPT57dC5zdHlsZVtlXT1ufSkpfWxldCB1O2Z1bmN0aW9uIGcodCl7dS5pbm5lclRleHQ9dCx1LnN0eWxlLnRyYW5zZm9ybT1cInRyYW5zbGF0ZVkoMClcIixzZXRUaW1lb3V0KCgoKT0+e3Uuc3R5bGUudHJhbnNmb3JtPVwidHJhbnNsYXRlWSgtMTAwJSlcIn0pLDJlMyl9ZC50eXBlPVwidGV4dFwiLGQuc3R5bGUuZm9udFNpemU9XCIzcmVtXCIsZC5wbGFjZWhvbGRlcj1cInRyeSB0eXBpbmcgb24geW91ciBzZW5kZXIuLi5cIixkb2N1bWVudC5ib2R5LmFwcGVuZChkKSxMKGRvY3VtZW50LmJvZHkse2hlaWdodDpcIjEwMCVcIixtYXJnaW46XCJhdXRvXCIsZGlzcGxheTpcImZsZXhcIixiYWNrZ3JvdW5kOlwid2hpdGVcIixhbGlnbkl0ZW1zOlwiY2VudGVyXCIsanVzdGlmeUNvbnRlbnQ6XCJjZW50ZXJcIixmbGV4RGlyZWN0aW9uOlwiY29sdW1uXCJ9KSx1PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiksdS5jbGFzc0xpc3QuYWRkKFwidG9hc3RcIiksTCh1LHtwb3NpdGlvbjpcImZpeGVkXCIsdG9wOjAsbGVmdDowLHJpZ2h0OjAsbWFyZ2luOlwiYXV0b1wiLGZvbnRTaXplOlwiMnJlbVwiLHRleHRBbGlnbjpcImNlbnRlclwiLGZvbnRGYW1pbHk6XCJzYW5zLXNlcmlmXCIscGFkZGluZzpcIjAuNXJlbVwiLGJhY2tncm91bmQ6XCIjMjAyMDIwXCIsY29sb3I6XCIjZGRkXCIsdHJhbnNpdGlvbjpcInRyYW5zZm9ybSAwLjVzXCIsdHJhbnNmb3JtOlwidHJhbnNsYXRlWSgtMTAwJSlcIn0pLGRvY3VtZW50LmJvZHkuYXBwZW5kKHUpO2NvbnN0IGY9bmV3IGM7Zi5vbkdhbWVwYWQoYy5JTlBVVC5BTEwsKGZ1bmN0aW9uKHQpe2lmKHQuYnV0dG9ucy5mb3JFYWNoKCh0PT57Y29uc3QgZT1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHt0LnR5cGV9YCk7dC5idXR0b24udmFsdWU/ZS5zdHlsZS5maWxsPWByZ2JhKDI1NSwwLDAsJHt0LmJ1dHRvbi52YWx1ZX1gOmUuc3R5bGUuZmlsbD1cIndoaXRlXCJ9KSksdC5qb3lzdGlja3Mpe2NvbnN0IGU9OTcsbj0xODAscz0yNTIsaT0yNDUsYT1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2wzXCIpLG89ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyM1wiKTthLnN0eWxlLmN4PWUrMTAqdC5qb3lzdGlja3MubGVmdFswXSxhLnN0eWxlLmN5PW4rMTAqdC5qb3lzdGlja3MubGVmdFsxXSxvLnN0eWxlLmN4PXMrMTAqdC5qb3lzdGlja3MucmlnaHRbMF0sby5zdHlsZS5jeT1pKzEwKnQuam95c3RpY2tzLnJpZ2h0WzFdfX0pKSxmLm9uR2FtZXBhZChjLklOUFVULkNPTk5FQ1RFRCwodD0+e2coYENvbm5lY3RlZDogJHt0LmlkfWApfSkpLGYub25HYW1lcGFkKGMuSU5QVVQuRElTQ09OTkVDVEVELCh0PT57ZyhgRGlzY29ubmVjdGVkOiAke3QuaWR9YCl9KSksZi5vbktleWJvYXJkKGMuSU5QVVQuQUxMLCh0PT5mdW5jdGlvbih0KXtpZihyLmluY2x1ZGVzKHQpKXJldHVybjtjb25zdCBlPWQuc2VsZWN0aW9uU3RhcnQsbj1kLnZhbHVlLHM9aFt0XXx8dDtkLnZhbHVlPW4uc3Vic3RyaW5nKDAsZSkrcytuLnN1YnN0cmluZyhlKSxkLnNlbGVjdGlvblN0YXJ0PWUrcy5sZW5ndGgsZC5zZWxlY3Rpb25FbmQ9ZStzLmxlbmd0aCxkLnNjcm9sbExlZnQ9ZC5zY3JvbGxXaWR0aC9kLnZhbHVlLmxlbmd0aCplK3MubGVuZ3RofSh0LmtleSkpKSxmLm9uS2V5Ym9hcmQoXCJCYWNrc3BhY2VcIiwoZnVuY3Rpb24oKXtjb25zdCB0PWQudmFsdWUuc3Vic3RyaW5nKDAsZC5zZWxlY3Rpb25TdGFydC0xKSxlPWQudmFsdWUuc3Vic3RyaW5nKGQuc2VsZWN0aW9uRW5kLGQudmFsdWUubGVuZ3RoKTtkLnZhbHVlPXQrZSxkLnNlbGVjdGlvblN0YXJ0PXQubGVuZ3RoLGQuc2VsZWN0aW9uRW5kPXQubGVuZ3RofSkpLHJlc29sdmUoKX0pKCk7Il0sIm1hcHBpbmdzIjoiQUFBQSIsInNvdXJjZVJvb3QiOiIifQ==