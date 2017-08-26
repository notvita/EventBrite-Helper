function addTicketName() {
	// this may be different depending on if you enter a location or use a 'previously used' location
	let eventLocations = document.getElementsByClassName('js-location-edit-venue l-mar-top-1');	
	let eventTitle = document.getElementById('id_group-details-name').value;
	let str = '';

	if (eventLocations.length >= 1) {
		str = ' at ' + eventLocations[0].value;
	}

	document.getElementById('id_group-tickets-0-ticket_type').value = eventTitle + str;
}

// ticket sale end time is always a hour before start
function getEndTime() {
	let singleEvent = document.getElementsByClassName('js-event-repeats-label')[0].offsetParent !== null;
	
	if (!singleEvent) return true;
	
	let start = document.getElementsByClassName('js-dtp-timepicker-input time form__input--xshort js-timepicker-input')[0].value;
	
	let d = new Date(0, 0, 0, parseInt(start[0] + start[1]), 0, 0, 0);
	d.setHours(d.getHours() - 1);

	let finishHour = d.getHours().toString();
	let finishMin = start[3] + start[4];
	let finishMeridiem = start[5] + start[6];

	// convert 7 -> 07
	if (finishHour.length === 1) {
		finishHour = '0' + finishHour;
	}

	// account for 12pm -> 11am
	if (finishHour === '11') {
		finishMeridiem = 'am';
	}

	let result = finishHour + ':' + finishMin + finishMeridiem;	
	
	document.getElementsByClassName('js-time-input')[1].value = result;
}

(function(){		
	let format = '<a class="btn btn--secondary" id="helper-format-text">Format</a>'; 
	
	$('div#event_details_details').after(format);
	
	$('#helper-format-text').on('click', function() {
		let eventDesc = tinymce.get('id_group-details-description').getContent();
		
		eventDesc = eventDesc.replace(/<br ?\/?>/g, " "); 
		tinymce.get('id_group-details-description').setContent(eventDesc);
	});
	
	let ticketTitle = '<a class="btn btn--secondary" id="helper-ticket-title">Add ticket name</a>';
	let saleEnd = '<a class="btn btn--secondary" id="helper-ticket-sale-end">Set ticket sale end</a>';
	
	$('div#create_tickets_wrapper').after(ticketTitle, saleEnd);

	$('#helper-ticket-title').on('click', addTicketName);
	$('#helper-ticket-sale-end').on('click', getEndTime);
}());