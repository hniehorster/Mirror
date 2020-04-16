var nest = [];
nest['client_id']       = "62110746-1cf5-4b32-a6a8-6f071ca537dd";
nest['client_secret']   = "J8JCYxobuzXPTfKbwUOUoppej";
nest['bearer']          = "c.rlGmhpYCAZAPKbzqD9eqVbvYVIcja9ogJblEEswHGiNZOlYaaUCRmT8SJDf1T7c7A552i7XfHCfPngbahobGykmyFeFgHxWn6ZifILGXBjbZo3HFybA8biTRfC3fm2cuGWCX7UpNIKWJmWvA";
nest['api_url']         = "https://developer-api.nest.com/";
nest['thermostat_id']   = "5kGvEZG0BttRE4_BspY3Hjp9WB_pF3z1";

//INFO
// Authorization URL https://home.nest.com/login/oauth2?client_id=62110746-1cf5-4b32-a6a8-6f071ca537dd&state=STATE



$.ajax({
    beforeSend: function(request) {
        request.setRequestHeader("Authorization", 'Bearer '+ nest['bearer']);
        request.setRequestHeader("Content-Type", 'application/json');
    },
    dataType: "json",
    url: nest['api_url'] + 'devices/' + nest['thermostat_id'],
    success: function(data) {
        alert(data);
    }
});