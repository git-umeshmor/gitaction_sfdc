({
	handleCmpEvent: function(component, event) {
        var message = event.getParam("message");
        component.set("v.messageTemplate", message);
        var EventsHandled = parseInt(component.get("v.numberOfEvents")) + 1;
        component.set("v.numberOfEvents", EventsHandled);
    }
})