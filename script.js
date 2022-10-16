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

function positionTheElement(containers, y) {
    const draggableElements = [...containers.querySelectorAll('.draggables:not(.dragging)')];

    draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        console.log(box)
    }, { offset: Number.POSITIVE_INFINITY })
}

// ******* For fetching Waifu API ********

const Image = document.querySelector('img')

let myUrl = fetch("https://api.waifu.pics/sfw/neko")

myUrl.then((response) => {
    return response.json()
}).then((response) => {
    Image.src = response.url
})

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

    var myUrl2 = ("https://api.waifu.pics/many/sfw/neko");

    const response = await fetch(myUrl2, options);
    const allData = await response.json();

    console.log(allData.files[4])

        Object.keys(allData["files"])
            .slice(0, 12)
            .map(() => {

            //  Random Index for event array
            let randomIndex = Math.floor(Math.random() * Object.keys(allData["files"]).length);

            // a container for multi image
            let multiPic = document.createElement('div');

            multiPic.innerHTML +=`
            <div class="">
                <img class="border-2 border-solid border-slate-400 rounded-lg" src="${allData["files"][randomIndex]}" alt="waifu">
            </div>`;

            multiPicContainer.appendChild(multiPic);
            console.log(multiPic)
        });
    };

manyPic();
