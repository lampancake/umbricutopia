const miniWindowHTML = `
<div id="mini-window">
  <div class="header">
    <h2>Mini Window</h2>
    <button id="close-button">X</button>
  </div>
  <div class="content">
    <input type="text" id="search-bar" placeholder="Search...">
    <div class="buttons">
      <button>Button 1</button>
      <button>Button 2</button>
      <button>Button 3</button>
    </div>
    <div class="menu">
      <ul>
        <li><a href="#">Menu Item 1</a></li>
        <li><a href="#">Menu Item 2</a></li>
        <li><a href="#">Menu Item 3</a></li>
      </ul>
    </div>
  </div>
</div>`;

const miniWindowCSS = `
#mini-window {
  width: 300px;
  height: 300px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 10px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.content {
  display: flex;
  flex-direction: column;
}

#search-bar {
  width: 100%;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 3px;
}

.buttons {
  display: flex;
  justify-content: space-around;
  margin: 10px 0;
}

button {
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu li {
  margin-bottom: 5px;
}

a {
  text-decoration: none;
  color: #333;
}
`;

// Create the mini window element
const miniWindow = document.createElement("div");
miniWindow.innerHTML = miniWindowHTML;
document.body.appendChild(miniWindow);

// Inject the styles into a style element
const style = document.createElement("style");
style.textContent = miniWindowCSS;
document.head.appendChild(style);

// Add functionality to the close button (similar to previous example)
const closeButton = document.getElementById("close-button");
dragElement(document.getElementById("miniWindow"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

closeButton.addEventListener("click", () => {
  miniWindow.style.display = "none";
});
