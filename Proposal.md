
How it will work?
=================
- we want our code on the page, but code should be loaded conditionally 
- if page url has a param in query-string then our code loads and starts executing


Benefits
=================
- ease of integration
- saves a lot of CSOMs
- Unlike browser extensions, this works on Safari
- Unlike browser extensions, this works on mobile devices, phones and tabs, 


How to integrate?
=================

Approach 1
- Publisher adds teh script on the page
- in this case pubs will need to convicne their dev team tpo add the required code on the pub-web-site


Approach 2
- we add a module/code-block in prebid to download the required JS code from our website
- so that it will be easy for pubs to work

Approach 3 ; only Desktop
- If a dev wants to try our code on a publisher site where our code is not configured then for desktop environment the page can be modified and the code can be added for local environment using Chrome Dev Tool?
- it is bit difficult to work

Approach 4
- We can create an extension for now to add the required code on the page
- use this extension to add our code on page https://chrome.google.com/webstore/detail/custom-javascript-for-web/poakhlngfciodnhlhhgnaaelnpjljija?hl=en



Authentication
=================
- To make our code work only on selected pubs we can host our solution on CDN like CloudFlare
- when a call comes to download our code we will check the requesting domain
- use cloud-functions to check pub-domain is our customer or not
- decide whether we should let the actual downloaded or not