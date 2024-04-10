const container = document.createElement("div")
container.classList = "container";
document.body.appendChild(container)


for(let i = 0; i < 10; i++){
    const white = document.createElement("div");
    white.classList = "white";
    container.appendChild(white);
    const black = document.createElement("div");
    black.classList = "black";
    white.appendChild(black);
    white.addEventListener("click", () => {
        white.style.backgroundColor = "aqua"
    })
}
