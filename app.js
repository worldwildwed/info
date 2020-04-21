var scene = document.getElementById("main");
var cube = document.querySelector(".cube");
var current_x = 0;
var current_y = 0;
var current_z = 0;

var img = document.querySelector(".image");

face_style = "";

function scope_xyz() {
  current_x = current_x % 360;
  current_y = current_y % 360;
  current_z = current_z % 360;
}

function main(key) {

  console.log("AFTER press key");
  console.log(img.classList);

  if (key.keyCode == "38") {
    console.log("Up is pressed");
    current_x -= 90;
  }
  else if (key.keyCode == "40") {
    console.log("Down is pressed");
      current_x += 90;
  }
  else if (key.keyCode == "39"){
    console.log("Right is pressed");
    if (current_x % 180 == 0) {
      current_y -= 90;
    }
    else {
      current_z += 90*(current_x/Math.abs(current_x));
    }
  }
  else if (key.keyCode == "37"){
    console.log("Left is pressed");
    if (current_x % 180 == 0) {
      current_y += 90;
    }
    else {
      current_z -= 90*(current_x/Math.abs(current_x));
    }
  }

  if (key.keyCode <= 40 && key.keyCode >= 37){
    zoomOutImage();
    console.log("AFTER zoomOutImage");
    console.log(img.classList);
    // setTimeout(removeImage, 800);

    setTimeout(showCube, 200);
    setTimeout(flip, 1200);
    // flipbackX();
    // flipbackZ();
    // setTimeout(removeCube, 1300);

    console.log(current_x, current_y, current_z);
    // console.log(identifyFace());
    // face_style = "bg--" + identifyFace();
    console.log(face_style);

    console.log(cube.style.transform);

    // setTimeout(showImage, 2200);
    // setTimeout(zoomInImage, 2500);
  }

}

function removeCube() {
  scene.style.display = "none";
  removeImage();
  showImage();
  img.classList.remove("image-zoom-reverse");
}

function showCube() {
  scene.style.display = "block";
}

function removeImage() {
  img.classList.remove("image-zoom");
  last_index = img.classList.length - 1;
  // console.log(last_index);
  // console.log(img.classList.item(last_index));
  img.classList.remove(img.classList.item(last_index));
  console.log("REMOVE IMAGE");
  console.log(img.classList);
  // img.classList.add("bg--default");
}

function showImage() {
  img.classList.add("image-zoom-reverse");
  // NEED TO SPECIFY WHICH FACE OF CUBE TO SHOW
  face_style = "bg--" + identifyFace();
  img.classList.add(face_style);
  console.log("SHOW IMAGE");
  console.log(img.classList);
}

function zoomOutImage() {
  img.classList.add("image-zoom");
}

function zoomInImage() {
  img.classList.add("image-zoom-reverse");
}


function flipbackZ() {
  if (current_z != 0) {
    console.log("THIS IS IN flipbackZ()");
    current_z = 0;
  }
  setTimeout(flip, 400);
}

function flipbackX() {
  if (current_y % 360 != 0) {
    if (Math.abs(current_x) >= 90) {
      console.log("THIS IS IN flipbackX()");
      // if (current_x > 0) {
      //   current_x -= 90;
      // }
      // else {
      //   current_x += 90;
      // }
      current_x = 0;
      setTimeout(flip, 400);
    }
  }

}

function flipBack() {
  if (current_z != 0) {
    console.log("THIS IS IN flipbackZ()");
    current_z = 0;
  }

  if (current_y % 360 != 0) {
    if (Math.abs(current_x) >= 90) {
      console.log("THIS IS IN flipbackX()");
      current_x = 0;
    }
  }

  if (Math.abs(current_x) > 90) {
    console.log("THIS IS IN flipbackX()");
    if (current_x > 0) {
      current_x -= 90;
    }
    else {
      current_x += 90;
    }
  }

  console.log(current_x, current_y, current_z);
  face_style = "bg--" + identifyFace();
  flip();

}


function identifyFace() {
  if (current_x % 360 == 0 && current_y % 360 == 0) {
    return "front"
  }
  else {
    if (current_y % 360 == 0) {
      if (current_x == 90){
        return "bottom"
      }
      else if (current_x == -90){
        return "top"
      }
    }
    else {

        if (current_y % 360 == 90 || current_y % 360 == -270){
          return "left"
        }
        else if (current_y % 360 == -90 || current_y % 360 == 270){
          return "right"
        }
        else {
          return "back"
        }
    }
  }

}

function needFlipback() {
  if (current_y % 360 != 0) {
    if (Math.abs(current_x) >= 90){
      return true
    }
  }
  else if (current_z != 0) {
    return true
  }
  else if (Math.abs(current_x) > 90){
    return true
  }

  return false
}

function flip() {
  var rotate_x = "rotateX(" + String(current_x) + "deg)";
  var rotate_y = "rotateY(" + String(current_y) + "deg)";
  var rotate_z = "rotateZ(" + String(current_z) + "deg)";
  var current_transform = "translateZ(-100px)" + " " + rotate_x + " " + rotate_y + " " + rotate_z;
  // console.log(current_transform);
  cube.style.transform = current_transform;

  // removeImage();

  if (needFlipback()) {
    console.log("NEED FLIP BACK!!!!");
    setTimeout(flipBack, 200);
    setTimeout(removeCube, 600);
  }
  else {
    setTimeout(removeCube, 280);
  }
}

window.addEventListener("keydown", main, false);
