const draggables = document.querySelectorAll('.draggable');
const containers = document.querySelectorAll('.container');
const multiPicContainer = document.getElementById('multiPicContainer');

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

        // ******* Search Activity ********
        const getType = document.getElementById("type");
        const getGenre = document.getElementById("genre");
        const viewBtn = document.getElementById("btn");

        var myUrl2 = (`https://api.waifu.pics/many/sfw/waifu`);

        var multiPic = document.createElement('div');
        multiPic.className = "multiPicContainer grid grid-cols-2 gap-4 lg:grid-cols-3"

        viewBtn.addEventListener('click', () => {
            console.log(getType.value)
            console.log(myUrl2)

            myUrl2 = `https://api.waifu.pics/many/${getType.value}/${getGenre.value}`
            console.log(myUrl2)

            manyPic();
        });


        const response = await fetch(myUrl2, options);
        const allData = await response.json();

        // console.log(myUrl2)
        multiPic.innerHTML = ``;

        Object.keys(allData["files"])
        .slice(0, 12)
        .map(() => {

            //  Random Index for event array
            let randomIndex = Math.floor(Math.random() * Object.keys(allData["files"]).length);

            // a container for multi image

            multiPic.innerHTML +=`
            <div class="">
                <img class="border-2 border-solid border-slate-400 rounded-lg" src="${allData["files"][randomIndex]}" alt="waifu">
            </div>`;

            multiPicContainer.appendChild(multiPic);
        });
        console.log(multiPic)

};

manyPic();
