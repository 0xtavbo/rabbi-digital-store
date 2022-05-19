const portraitURL = "./assets/images/portada/";
const portraitWrapper = document.getElementById("portada");

function renderPortraits() {
    for (var i=1; i < 4; i++) {
        var img = document.createElement("img");
        img.src = portraitURL + 'img0' + i + '.jpg';
        portraitWrapper.appendChild(img);
    };
};

export { renderPortraits };