console.log('hi start');
shownotes();

// if a user adds a Node, add it to the local storage

let addbtn = document.getElementById('addbtn');
addbtn.addEventListener('click', function (e) {
    let addtxt = document.getElementById('addtxt');
    let addtitle = document.getElementById('addtitle');

    let notes = localStorage.getItem("notes");
    let notestitle = localStorage.getItem("notestitle");
    if (notes == null) {
        notesObj = [];
        // titleObj= [];
    } else {
        notesObj = JSON.parse(notes);
        titleObj = JSON.parse(notestitle);
    }

    notesObj.push(addtxt.value);
    titleObj.push(addtitle.value);

    localStorage.setItem("notes", JSON.stringify(notesObj));
    localStorage.setItem("notestitle", JSON.stringify(titleObj));

    addtxt.value = "";
    addtitle.value = '';
    // console.log(notesObj);
    // console.log(titleObj);


    // function to display notes
    shownotes();

});



//  function for  displaying notes

function shownotes() {
  
    let notes = localStorage.getItem("notes");
    let notestitle = localStorage.getItem("notestitle")
    if (notes == null) {
        notesObj = [];
        titleObj= [];
    } else {
        notesObj = JSON.parse(notes);
        titleObj = JSON.parse(notestitle);
    }


    let html = "";

    notesObj.forEach(function (element, index,) {
        html += `
        
        <div class="notecard my-2 mx-2 card" id="notecard">
            <div class="card-body">
                <h5 class="card-title"> ${titleObj[index]} </h5>
                <hr id="divider">
                <p class="card-text"> ${element}</p>
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
    let notes = localStorage.getItem("notes");
    let notestitle = localStorage.getItem("notestitle")
    if (notes == null) {
        notesObj = [];
        titleObj= [];
    } else {
        notesObj = JSON.parse(notes);
        titleObj = JSON.parse(notestitle);
    }

    notesObj.splice(index, 1);
    titleObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    localStorage.setItem("notestitle", JSON.stringify(titleObj));
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
    noteselm.innerHTML = `All cleared. Use "Add a Note" section above to add notes.`;

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