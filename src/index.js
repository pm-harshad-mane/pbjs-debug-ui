import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';

// document.addEventListener("DOMContentLoaded", function(){
setTimeout(function(){
	const APP_UI_DIV_ID = "pbjs-debug-ui";
	const PBJS_NAMESPACE = window.PBJS_NAMESPACE || "pbjs";
	let div = document.createElement('div');
	div.id = APP_UI_DIV_ID;
	document.body.appendChild(div);
	// ToDo: fix the strictmode issue: refer: https://reactjs.org/docs/strict-mode.html#warning-about-deprecated-finddomnode-usage

	// ReactDOM.render(
	//   <React.StrictMode>
	//     <App pbjsNamespace={PBJS_NAMESPACE} />
	//   </React.StrictMode>,
	//   document.getElementById(APP_UI_DIV_ID)
	// );
	
	ReactDOM.render(
	  <div>
	    <App pbjsNamespace={PBJS_NAMESPACE} />
	  </div>,
	  document.getElementById(APP_UI_DIV_ID)
	);

	// need to change the maxHeight of App.js component
	window.addEventListener('resize', function(){
    	document.querySelector("#pbjs-debug-ui div div").style.maxHeight = (window.innerHeight - 10) + 'px';
	});
}, 5000);
// });
