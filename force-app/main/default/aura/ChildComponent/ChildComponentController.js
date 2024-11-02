({
    fireComponentEvent : function(component, event) {
        var cmpEvent = component.getEvent("sampleComponentEvent");
        cmpEvent.setParams({
            "message" : "Hello " +
            "World!" });
        cmpEvent.fire();
    }
})