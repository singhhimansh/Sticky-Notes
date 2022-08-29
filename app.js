console.log('hi start');
shownotes();

// if a user adds a Node, add it to the local storage

let addbtn = document.getElementById('addbtn');
addbtn.addEventListener('click', function (e) {
    e.preventDefault();
    let addtxt = document.getElementById('addtxt').value.trim();
    let addtitle = document.getElementById('addtitle').value.trim();

    if (addtxt.length < 3 || addtitle.length < 3) {

        let main= document.querySelector('main>div')
        // console.log(main);
        
        html=`<div class="alert container alert-danger alert-dismissible fade show" role="alert">
        <strong>Too short !</strong> Title & message must be atleast three characters long.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;

        main.insertAdjacentHTML('afterbegin', html);

        setTimeout(()=>{
          document.querySelector('main>div>div').remove();

        }, 1200)
        

    } else {
        let notes = localStorage.getItem("notes");
        notesObj = notes === null ? [] : JSON.parse(notes);

        let newNote = {[addtitle]:addtxt};
        notesObj.unshift(newNote);

        localStorage.setItem("notes", JSON.stringify(notesObj));

        let main= document.querySelector('main>div');
        // console.log(main);
        
        html=`<div class="alert container alert-info alert-dismissible fade show" role="alert">
        <strong>Voila !</strong> Note saved.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;

        main.insertAdjacentHTML('afterbegin', html);

        setTimeout(()=>{
          document.querySelector('main>div>div').remove();

        }, 1200);

        addtxt='';
        addtitle=''; 
    }

  

    shownotes();

});



//  function for  displaying notes

function shownotes() {
  
    let notes = localStorage.getItem("notes");
    notesObj = notes === null ? [] : JSON.parse(notes);


    let html = "";

    notesObj.forEach(function (element, index,) {
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
    let notes = localStorage.getItem("notes");
    notesObj = notes === null ? [] : JSON.parse(notes);

    let main= document.querySelector('main>div')
    
    html=`<div class="alert container alert-warning alert-dismissible fade show" role="alert">
    <strong>Alert !</strong> Note deleted.
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;

    main.insertAdjacentHTML('afterbegin', html);

    setTimeout(()=>{
        document.querySelector('main>div>div').remove();

    }, 1200)

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

        element.style.display = (cardtxt.includes(inputval) || titletxt.includes(inputval)) ?  "block" : "none";

    })

})



// Clear all notes by a single click

let clearall = document.getElementById('clearall');
clearall.addEventListener('click',function() {
    if (confirm('Do you want to delete all notes?')) {
        
    
    let main= document.querySelector('main>div')
    
    html=`<div class="alert container alert-danger alert-dismissible fade show" role="alert">
    <strong>Uhhh!</strong> All saved notes deleted. Add a new one.
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;

    main.insertAdjacentHTML('afterbegin', html);

    setTimeout(()=>{
        document.querySelector('main>div>div').remove();

    }, 1200)

    localStorage.clear();
    let noteselm = document.getElementById("notes");
    noteselm.innerHTML = `All cleared. Use "Add a Note"section above to add notes.`;

    }

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