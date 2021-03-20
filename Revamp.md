## Revamp
Current approach assumes that the script may be loaded after prebid.js and will not be able to listen to the pbjs events.
it has its own benefits, may be we can keep two different versions.

If we assume that our tool will be always loaded before the prebid.js then we can listen to all the pbjs events and display the data accordingly. Not all slots are fetched at once. Some slots will be refreshed. hence there will be multiple auctions on the page. We will be able to display the data according to multiple auctions. 

We can make the auction based data available in 
```
pbjs.auctions = { 
	auction_ID_1: {
		init: {},
		end: {},
		noBid: {},
		errors: []
	},	
}
```
- expose it based on the presence of pbjs_debug flag
- then it will be ok even if our debug tool loads late
- 

New Auction based data presentation
- Auction ID {will be multiple instances based on the multiple auctions}
-- AdUnits present in the auction
- User IDs {like now}
- Config {like now}