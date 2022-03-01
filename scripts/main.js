function read_display_and_quote(){
    // console.log("inside the function")
    db.collection("quotes").doc("tuesday")
    .onSnapshot(tuesdayDoc => {
        console.log("current document data: " + tuesdayDoc.data());
        // To display - document.get id.innerhtml = tuesdaydoc.data.quote
        document.getElementById("quote-goes-here").innerHTML = tuesdayDoc.data().quote;
        // wtf is tuesdaydoc?

    })

}

read_display_and_quote();

function greet (){
    firebase.auth().onAuthStateChanged(user => {
        if (user){
            console.log(user.uid); //let me to know who is the user that logged in t oget their UD
            currentUser = db.collection("users").doc(user.uid); // will go to the firestore and goo the colelction
            currentUser.get().then(userDoc => {
                //get user name
                console.log(userDoc.data().name);
                var user_Name = userDoc.data().name;
                document.getElementById("name").innerHTML = user_Name;
            })
        }

    })
    // db.collection("users").doc("1SXE2eaUzcSVsup5Sb02YwXeYI72")
    // .onSnapshot(greetings => {
    //     console.log("current document data: " + greetings.data());
    //     // To display - document.get id.innerhtml = tuesdaydoc.data.quote
    //     document.getElementById("name").innerHTML = greetings.data().name;

}
greet();

function writeHikes() {
    //define a variable for the collection you want to create in Firestore to populate data
    var hikesRef = db.collection("hikes");

    hikesRef.add({
        code:"BBY01",
        name: "Crown",    //replace with your own city?
        city: "Burnaby",
        province: "BC",
        level: "easy",
        length: "10 km",
        details: "Not a bad place"
    });
    hikesRef.add({
        code:"AM01",
        name: "Garibaldi",    //replace with your own city?
        city: "Anmore",
        province: "BC",
        level: "moderate",
        length: "10.5 km",
        details: "Pretty decent"
    });
    hikesRef.add({
        code:"NV01",
        name: "Monterey",    //replace with your own city?
        city: "North Vancouver",
        province: "BC",
        level: "hard",
        length: "8.2 km",
        details: "A yearly visit"

    });
}
function displayCards(collection) {
    let cardTemplate = document.getElementById("hikeCardTemplate");

    db.collection(collection).get()
        .then(snap => {
            var i = 1;
            snap.forEach(doc => { //iterate thru each doc
                var title = doc.data().name;   // get value of the "name" key
                var details = doc.data().details;   // get value of the "details" key
                let newcard = cardTemplate.content.cloneNode(true);

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-text').innerHTML = details;
                // newcard.querySelector('.card-image').src = "https://picsum.photos/seed/picsum/200/300";
                newcard.querySelector('.card-image').src = "./images/" + title + ".jpeg"; //hikes.jpg



                // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);
                // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

                //give unique ids to all elements for future use
                // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);

                //attach to gallery
                document.getElementById(collection + "-go-here").appendChild(newcard);
                i++;
            })
        })
}

displayCards("hikes");

