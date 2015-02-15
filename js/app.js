var color = $(".selected").css("background-color");
var $canvas = $("canvas");
var ctx = $canvas[0].getContext("2d");
var prevEvent;
var mouseDown = false;

//Change selected list item
$(".controls").on("click", "li", function(){
  //Deselect sibbling element
  $(this).siblings().removeClass("selected");
  
  //Select clicked element
  $(this).addClass("selected");
  
  //Cache current color
  color = $(this).css("background-color");
});
  

//Click new color button
$("#revealColorSelect").click(function(){
  //Show/hide color select menu
  changeColor();
  $("#colorSelect").toggle();
});

//Update new color span
function changeColor() {
  //Get rgb values of sliders
  var red = $("#red").val();
  var green = $("#green").val();
  var blue = $("#blue").val(); 
  
  //Set newColor id to selected rgb value
  $("#newColor").css("background-color", "rgb(" + red + "," + green +"," + blue + ")");  
}

//Change color sliders
$("input[type=range]").change(changeColor); 

//Click add color button
$("#addNewColor").click(function(){
  //Append chosen color to the controls ul
  var $newColor = $("<li></li>");
  $newColor.css("background-color", $("#newColor").css("background-color"));
  $(".controls ul").append($newColor);
  
  //Select newly chosen color
  $newColor.click();
});
  
//Canvas mouse event
$canvas.mousedown(function(e){
  prevEvent = e;
  mouseDown = true;
}).mousemove(function(e){
  //When mouseDown is true, draw line
  if(mouseDown) {
    ctx.beginPath();
    ctx.moveTo(prevEvent.offsetX, prevEvent.offsetY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.strokeStyle = color;
    ctx.stroke();
    prevEvent = e;
  }
}).mouseup(function(){
  mouseDown = false;
}).mouseleave(function(){ //Set canvas mouseup if pointer leaves canvas
  $canvas.mouseup();
});

  
  
  