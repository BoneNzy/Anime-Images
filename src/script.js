const draggables = document.querySelectorAll('.draggable');
const containers = document.querySelectorAll('.container');
const multiPicContainer = document.getElementById('multiImageContainer');

draggables.forEach(draggables => {
    draggables.addEventListener('dragstart', () => {
        draggables.classList.add('dragging');
    });
    draggables.addEventListener('dragend', () => {
        draggables.classList.remove('dragging');
    });
});

containers.forEach(containers => {
    containers.addEventListener('dragover', (e) => {
        e.preventDefault();
        const afterElements = positionTheElement(containers, e.clientY);

        const draggable = document.querySelector('.dragging');
        containers.appendChild(draggable);
    });
});

// ******* For fetching Waifu API ********

const Image = document.querySelector('img')

let myUrl = fetch("https://api.waifu.pics/sfw/neko")

myUrl.then((response) => {
    return response.json()
}).then((response) => {
    Image.src = response.url
});


// many Pics

let manyPic = async () => {
    let options = {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          title: 'multiple images',
        }),
    }

    var myUrl2 = (`https://api.waifu.pics/many/sfw/waifu`);
    console.log(myUrl2)

        // ******* Search Activity ********
        const getType = document.getElementById("type");
        const getGenre = document.getElementById("genre");
        const viewBtn = document.getElementById("btn");


        var multiPic = document.createElement('div');
        multiPic.className = "multiPicContainer grid grid-cols-2 gap-3";

        viewBtn.addEventListener('click', () => {
            console.log(getType.value)
            console.log(myUrl2)

            myUrl2 = new Request(`https://api.waifu.pics/many/${getType.value}/${getGenre.value}`);

            manyPic();
        });


        const response = await fetch(myUrl2, options);
        const allData = await response.json();
        console.table(allData);

        // console.log(myUrl2)
        multiPic.innerHTML = ``;

        Object.keys(allData["files"])
        .slice(0, 6)
        .map(() => {

            //  Random Index for event array
            let randomIndex = ~~(Math.random() * Object.keys(allData["files"]).length); // ~~ is used instead of Math.floor()

            // a container for multi image
            // border-2 border-solid border-slate-400 rounded-lg
            multiPic.innerHTML +=`
                <div class="border-2 border-solid border-slate-600 rounded-lg">
                  <img class=""
                    src="${allData["files"][randomIndex]}"
                    alt="waifu"
                  />
                </div>`;

            multiPicContainer.appendChild(multiPic);
        });
        console.log(multiPic)

};

manyPic();
