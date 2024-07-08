const partyContainer = document.querySelector("#party-container");
const newPartyForm = document.querySelector("#add-party-form");
const partyName = document.querySelector("#party-name");
const partyDate = document.querySelector("#party-date");
const partyLocation = document.querySelector("#party-location");
const partyDescription = document.querySelector("#party-description");

/*1. Fetch the data
2. Build new html from that data
3. Insert the new html into our page
*/


async function getEvents(){
    try{
        //start request with fetch and store results in a variable called res
            //remember await ensures that fetch finishes before we store anything in 
            //variable
        const res = await fetch(
           "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2109-CPU-RM-WEB-PT/events"
        ); 
        //turn the response(readable stream) into an object and store result in a var called json
        const json = await res.json();
        return json.data;
    } catch(err) {
        console.log(err);
    }
};

getEvents();

function createEventsHTML(events, container) {
    const eventsHTML = events.map((events) => {
        //create a new container element
        const eventContainer = document.createElement("div");
            //create new paragrapth that will display event data
        const eventParagraph = document.createElement("p");
        //put the party data in paragraph
        eventParagraph.innerText = `${event.name} ${event.description} ${event.location} ${event.date}`;
        //As we loop through array we get access to each object with event parameter. We want to use
        //Javascript to access each of the object's values
       const deleteButton= document.createElement("button");
       //creates delete button
       //we created a div for the container because we have both a paragpraph and a button 
       deleteButton.innerText = "Delete";
       //When deleting you have to specify an id. We don't want a command that can delete everything en masse
       deleteButton.addEventListener("click", async function () {
        try {
            const res = await fetch(
            `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2109-CPU-RM-WEB-PT/events/${event.id}`,
            {
                method: "DELETE",
            }
            
        );
        console.log(res);
        if (res.status === 204) {
            alert("deleted successfully");
            render();
        }

       } catch (err) {
        console.log(err);
       }
       });
        eventContainer.appendChild(eventParagraph);
        //appendChild puts the thing you pass last inside the parent
        eventContainer.appendChild(deleteButton);
        return eventContainer;
    });
    //When it loops through, use replaceChildren on parent container to insert events
   container.replaceChildren(...eventsHTML);
    
    };

//Post request
//Post endpoint is usually the same as fetch request
//Post can take second ardgument unlike Fetch

async function creatEvent(event){
    try {
        const res = await fetch(
        "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2109-CPU-RM-WEB-PT/events",
        {
            //We're telling server what to do. Go to POST event logic not Get
            method: "POST",
            //This is the data we want to store in database. We have to send in format optimized for sending
            //Over physical network that is internet. = This is caled serialization 
            body: JSON.stringify(event),
            //We're telling the server what to expect in the request. We're telling to expect JSON
                //Javascrip server request
            headers:{"Content-type": application/json,
                Accept: application/json,
            },
        });
        //We expect a response. If successful the created object is returned. We created a try catch block and if
        //It's not succssful we'll find out
        const json = await res.json();
        //call render to prevent page from refreshing
        render();
    } catch (err) {
        console.log(err)
    }
};

/*Add event listener to the form
In the event handler, we want to get all the data from the input  and make Post request to the server
//We will log the party if successful
//Then update our UI
//HTTP = Hyper Text Transfer Protocol
    //Formal rules that govern communications between client/server 
        //What kind of data are we sending and how do we format it
            //We have to serialize data before sending
    HTTP Verbs
        - Get request (getting data to read it)
        - Post request (we create/write data somewhere )
        - Put/Patch used for updating
            - Put:
            - Patch: Quick fix. Fixing one thing. Ie - date, location
        - Delete: To delete
        - CRUD - Create, Read, Update, Delete

*/

newPartyForm.addEventListener("submit", async function (e){
//We use e and preventDefault from stopping it from refreshing and clearing page when form submitted

e.preventDefault();

//When package received the server expects everything to be in a certain order. Any deviation is not expected. 
const newParty = {
    name: partyName.value,
    description: partyDescription.value,
    location: partyLocation.value,
    date: new Date(partyDate.value).toISOString()
};
const result = await creatEvent(newParty);
//await can only be used on an async function
console.log(result);
});

async function render(){
    /*1. Fetch the data
2. Build new html from that data
    -loop through our data from the api - using map
    -at each step, create the party/even listing
    -when loop is through, use replacechildren on the parent container to insert all events
3. Insert the new html into our page
*/

//fetch the data
const events = await getEvents();

//createEventsHtml was previously here

createEventsHTML(events, partyContainer);

//built new html from data
//loop through events array 
}

render();


