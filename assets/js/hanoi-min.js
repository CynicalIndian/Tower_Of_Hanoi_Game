function TOH() {
  towerA = document.getElementById("tower-a");
  towerB = document.getElementById("tower-b");
  towerC = document.getElementById("tower-c");
  UndoStatus = -1;

  towerA_Stack = new Array();
  towerB_Stack = new Array();
  towerC_Stack = new Array();

  Tower_A_ColorArray = new Array();
  Tower_A_WidthArray = new Array();

  Tower_B_ColorArray = new Array();
  Tower_B_WidthArray = new Array();

  Tower_C_ColorArray = new Array();
  Tower_C_WidthArray = new Array();

  tempSourceArray = new Array();
  tempDestinationArray = new Array();

  sourceArray = new Array();
  destinationArray = new Array();

  this.isValidLimit = function(no_of_disks) {
    if (no_of_disks < 12) return true;
    return false;
  };

  this.RandomColor = function() {
    var c = "#";
    for (var i = 0; i < 6; i++) {
      c += ((Math.random() * 16) | 0).toString(16);
    }
    return c;
  };

  this.CreateDisks = function(no_of_disks) {
    maxButtonWidth = 300;
    maxButtonHeight = 10;
    if (this.isValidLimit(no_of_disks)) {
      for (let i = 0; i < no_of_disks; i++) {
        towerA_Stack.push(i);
        towerA = document.getElementById("tower-a");
        tempNode_LI = document.createElement("li");
        tempNode_LI.setAttribute("class", "disk");

        tempNode_Button = document.createElement("button");
        tempNode_Button.setAttribute("class", "btn");


        width = maxButtonWidth - 25 * i;
        height = -i;
        color = this.RandomColor();


        Tower_A_ColorArray.push(color);
        Tower_A_WidthArray.push(width);

        tempNode_LI.setAttribute("id", "Disk_" + i);
        tempNode_Button.setAttribute(
          "style",
          "background-color:" +
            color +
            ";width:" +
            width +
            "px;bottom:" +
            height +
            "px;"
        );

        tempNode_LI.appendChild(tempNode_Button);
        towerA.appendChild(tempNode_LI);
        input_no_of_disks.disabled = true;
      }

      initialStack = Array.from(towerA_Stack);
    } else {
      alert("Check the Number of disk(s) !");
    }
  };

  this.DetermineSourceDestinationArray = function(source_tower,destination_tower) {
    if (source_tower === "a" && destination_tower === "b") {
      tempSourceArray = Array.from(towerA_Stack);

      tempDestinationArray = Array.from(towerB_Stack);
    } else if (source_tower === "b" && destination_tower === "a") {
      tempSourceArray = Array.from(towerB_Stack);

      tempDestinationArray = Array.from(towerA_Stack);
    } else if (source_tower === "b" && destination_tower === "c") {
      tempSourceArray = Array.from(towerB_Stack);

      tempDestinationArray = Array.from(towerC_Stack);
    } else if (source_tower === "c" && destination_tower === "b") {
      tempSourceArray = Array.from(towerC_Stack);

      tempDestinationArray = Array.from(towerB_Stack);
    } else if (source_tower === "a" && destination_tower === "c") {
      tempSourceArray = Array.from(towerA_Stack);
      tempDestinationArray = Array.from(towerC_Stack);
    } else if (source_tower === "c" && destination_tower === "a") {
      tempSourceArray = Array.from(towerC_Stack);
      tempDestinationArray = Array.from(towerA_Stack);
    }
  };

  this.isValidMove = function(tempSourceArray, tempDestinationArray) {
    if (
      tempSourceArray[tempSourceArray.length - 1] <
      tempDestinationArray[tempDestinationArray.length - 1]
    ) {
      return false;
    } else if (tempSourceArray.length == 0) {
      alert(
        "No Disk(s) in Tower '" +
          source_tower +
          "' to move to Tower '" +
          destination_tower +
          "'"
      );
      return false;
    }
    return true;
  };

  this.RecordMove = function(source_tower, destination_tower) {
    sourceArray.push(source_tower);
    // console.log(sourceArray);
    destinationArray.push(destination_tower);
    // console.log(destinationArray);

    this.DisplayMove(source_tower, destination_tower);
  };

  this.DisplayMove = function(source_tower, destination_tower) {
    MoveSoFar = document.getElementById("MovesTable");

    MoveSoFar.innerHTML =
      MoveSoFar.innerHTML +
      "<tr><td>" +
      source_tower +
      "</td><td>" +
      destination_tower +
      "</tr>";
  };

  this.RemoveFromeSourceTower = function(source_tower, destination_tower) {
    if (source_tower === "a") {
      tempID = towerA_Stack.pop();
      removedDisk = towerA.removeChild(towerA.lastChild);

      tempColor = Tower_A_ColorArray.pop();
      tempWidth = Tower_A_WidthArray.pop();
    } else if (source_tower === "b") {
      tempID = towerB_Stack.pop();
      removedDisk = towerB.removeChild(towerB.lastChild);
      tempColor = Tower_B_ColorArray.pop();
      tempWidth = Tower_B_WidthArray.pop();
    } else if (source_tower === "c") {
      tempID = towerC_Stack.pop();
      removedDisk = towerC.removeChild(towerC.lastChild);
      tempColor = Tower_C_ColorArray.pop();
      tempWidth = Tower_C_WidthArray.pop();
    }
    this.AddToDestinationTower(
      tempID,
      tempColor,
      tempWidth,
      removedDisk,
      source_tower,
      destination_tower
    );
  };

  this.AddToDestinationTower = function(tempID,tempColor,tempWidth,removedDisk,source_tower,destination_tower) {
    if (source_tower === "a") lChild = removedDisk;
    else if (source_tower === "b") lChild = removedDisk;
    else if (source_tower === "c") lChild = removedDisk;

    if (destination_tower === "a") {
      towerA_Stack.push(tempID);
      towerA.appendChild(lChild);
      Tower_A_ColorArray.push(tempColor);
      Tower_A_WidthArray.push(tempWidth);
    } else if (destination_tower === "b") {
      towerB_Stack.push(tempID);
      towerB.appendChild(lChild);
      Tower_B_ColorArray.push(tempColor);
      Tower_B_WidthArray.push(tempWidth);
    } else if (destination_tower === "c") {
      towerC_Stack.push(tempID);
      towerC.appendChild(lChild);
      Tower_C_ColorArray.push(tempColor);
      Tower_C_WidthArray.push(tempWidth);
    }
  };

  this.MoveDisk = function(source_tower, destination_tower, UndoStatus) {
    this.DetermineSourceDestinationArray(source_tower, destination_tower);
    if (this.isValidMove(tempSourceArray, tempDestinationArray)) {
      if (UndoStatus == -1) {
        this.RecordMove(source_tower, destination_tower);
      }

      this.RemoveFromeSourceTower(source_tower, destination_tower);

      tempSourceArray.splice(0, tempSourceArray.length);
      tempDestinationArray.splice(0, tempDestinationArray.length);

      if (
        JSON.stringify(towerB_Stack) == JSON.stringify(initialStack) ||
        JSON.stringify(towerC_Stack) == JSON.stringify(initialStack)
      ) {
        alert("You Did it !!");
      }
    } else {
      alert("Invalid Move !");
    }
  };
  this.UpdateMovesTable = function() {
    var table = document.getElementById("MovesTable");
    var rowCount = table.rows.length;

    table.deleteRow(rowCount - 1);
  };

  this.UndoMove = function(source, destination) {
    this.MoveDisk(source, destination, 1);
    this.UpdateMovesTable(UndoStatus);
  };
}



function start() {
  input_no_of_disks = document.getElementById("no_of_disks");

  var n = parseInt(document.getElementById("no_of_disks").value);
  if (isNaN(n)) {
    alert("Please provide an Integer !");
  }
  toh = new TOH();
  toh.CreateDisks(n);

  return false;
}

function Move() {
  source_tower = document.getElementById("from_tower").value;

  destination_tower = document.getElementById("to_tower").value;

  if (source_tower == destination_tower) {
    alert(
      "Source and destination tower shouldn't be the same !!\nPlease Change them..."
    );
  } else {
    toh.MoveDisk(source_tower, destination_tower, UndoStatus);
  }

  return false;
}
function Undo() {
  var source = destinationArray[destinationArray.length - 1];
  destinationArray.pop();
  var destination = sourceArray[sourceArray.length - 1];
  sourceArray.pop();

  toh.UndoMove(source, destination);
}
