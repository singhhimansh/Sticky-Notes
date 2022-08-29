console.log('hi start');
shownotes();

// if a user adds a Node, add it to the local storage

let addbtn = document.getElementById('addbtn');
addbtn.addEventListener('click', function (e) {
    let addtxt = document.getElementById('addtxt').value;
    let addtitle = document.getElementById('addtitle').value;

    if (addtxt.length < 3 || addtitle < 3) {

        html=`<div class="alert alert-success" role="alert">
        A simple success alert—check it out!
      </div>`;

    }

    let notes = localStorage.getItem("notes");
    
    if (notes === null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    let newNote = {[addtitle]:addtxt}
    notesObj.unshift(newNote);

    localStorage.setItem("notes", JSON.stringify(notesObj));

    addtxt= "";
    addtitle= '';

    shownotes();

});



//  function for  displaying notes

function shownotes() {
  
    // let notestitle = localStorage.getItem("notestitle")
    let notes = localStorage.getItem("notes");
    if (notes === null) {
        notesObj = [];
        // titleObj= [];
    } else {
        notesObj = JSON.parse(notes); // array
        // titleObj = JSON.parse(notestitle);
        // console.log(notesObj);
    }


    let html = "";

    notesObj.forEach(function (element, index,) {
        console.log(element, index);
        console.log((Object.keys(element)[0]));
        html += `
        
        <div class="notecard my-2 mx-2 card" id="notecard">
            <div class="card-body">
                <h4 class="card-title"> ${Object.keys(element)[0]} </h4>
                <hr id="divider">
                <p class="card-text"> ${Object.values(element)[0]}</p>
                <div id="delete"><button id='${index}' onclick="deletenote(this.id)"         class="btn btn-primary"> Delete</button></div>
            </div>
        </div>
        `
    });

    let noteselm = document.getElementById("notes");
    if (notesObj.length != 0) {
        noteselm.innerHTML = html;

    } else {
        noteselm.innerHTML = ` Nothing to show! Use "Add a Note" section above to add notes`;
    }
}



// delete note
function deletenote(index) {
    console.log(index);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes); //array
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    shownotes();

}


// search note 

let search = document.getElementById('searchtxt');
search.addEventListener("input", function () {

    let inputval = search.value.toLowerCase();
    let notecards = document.getElementsByClassName('notecard');
    Array.from(notecards).forEach(function (element) {

        let cardtxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        let titletxt = element.getElementsByClassName("card-title")[0].innerText.toLowerCase();
        if (cardtxt.includes(inputval) || titletxt.includes(inputval)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }

    })

})



// Clear all notes by a single click

let clearall = document.getElementById('clearall');
clearall.addEventListener('click',function() {

    localStorage.clear();
    let noteselm = document.getElementById("notes");
    noteselm.innerHTML = `All cleared. Use <em style="font-style:italic;">"Add a Note"</em> section above to add notes.`;

})




/*

1. relocate clear all button
2. delete those only which are searched button
3. Mark a note as Important
4. Separate notes by user
5. Sync and host to web server 
6. allow max no of item to display then add readmore button 
7. ask to fill title and txt mandatory

*/