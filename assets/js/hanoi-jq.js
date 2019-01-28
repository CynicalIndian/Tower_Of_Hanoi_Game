

function TOH() {
    // UndoCount=0;
    // this.no_of_disks=no_of_disks;
    towerA_Stack = new Array();
    towerB_Stack = new Array();
    towerC_Stack = new Array();
  
    tempSourceArray = new Array();
    tempDestinationArray = new Array();
    // source="";
    // destination="";
    sourceArray = new Array();
    destinationArray = new Array();
    // moveCount = 0;

    towerA = $('#tower-a');
    // document.getElementById("tower-a");
    towerB = $('#tower-b');
    // document.getElementById("tower-b");
    towerC = $('#tower-c');
    // document.getElementById("tower-c");
    Tower_A_ColorArray = new Array();
    Tower_A_WidthArray = new Array();
  
    Tower_B_ColorArray = new Array();
    Tower_B_WidthArray = new Array();
  
    Tower_C_ColorArray = new Array();
    Tower_C_WidthArray = new Array();
  
    tempDiskID = new Array();

    
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
          // tempDiskID.push(i);
          towerA =  $("#tower-a");

          // tempNode_LI = $("<li class='disk'><button class='btn' id='Disk_"+i+" ' style='background-color:"+color+";width:"+width+"px;bottom:"+height+"px;'></button></li>");
          // document.createElement("li");
          
          
          // tempNode_LI.setAttribute("class", "disk");
  
          // tempNode_Button = document.createElement("button");
          // tempNode_Button.setAttribute("class", "btn");
          width = maxButtonWidth - 25 * i;
          height = -3 * i;
          color = this.RandomColor();
          Tower_A_ColorArray.push(color);
          Tower_A_WidthArray.push(width);
  
          // this.createDisk(i);
          // tempNode_LI.setAttribute("id", "Disk_" + i);
          // tempNode_Button.setAttribute(
          //   "style",
          //   "background-color:" +
          //     color +
          //     ";width:" +
          //     width +
          //     "px;bottom:" +
          //     height +
          //     "px;"
          // );
          tempNode_LI = $("<li class='disk'><button class='btn' id='Disk_"+i+" ' style='background-color:"+color+";width:"+width+"px;bottom:"+height+"px;'></button></li>");
          // tempNode_LI.appendChild(tempNode_Button);
          // towerA.appendChild(tempNode_LI);
          $(towerA).append(tempNode_LI);
        }
  
        initialStack = Array.from(towerA_Stack);
      } else {
        alert("Sorry Limit exceeded !");
      }
    };
  
    this.DetermineSourceDestinationArray = function(
      source_tower,
      destination_tower
    ) {
      // alert(source_tower);
      // alert(destination_tower);
      if (source_tower === "a" && destination_tower === "b") {
        tempSourceArray = Array.from(towerA_Stack);
  
        tempDestinationArray = Array.from(towerB_Stack);
        //    console.log(tempSourceArray);
        //    console.log(tempDestinationArray);
        //    source="a";
        //    destination="b";
      } else if (source_tower === "b" && destination_tower === "a") {
        tempSourceArray = Array.from(towerB_Stack);
  
        tempDestinationArray = Array.from(towerA_Stack);
        // console.log(tempSourceArray);
        // console.log(tempDestinationArray);
        // source="b";
        // destination="a";
      } else if (source_tower === "b" && destination_tower === "c") {
        tempSourceArray = Array.from(towerB_Stack);
  
        tempDestinationArray = Array.from(towerC_Stack);
        // console.log(tempSourceArray);
        // console.log(tempDestinationArray);
        // source="b";
        //    destination="c";
      } else if (source_tower === "c" && destination_tower === "b") {
        tempSourceArray = Array.from(towerC_Stack);
  
        tempDestinationArray = Array.from(towerB_Stack);
        // console.log(tempSourceArray);
        // console.log(tempDestinationArray);
        // source="c";
        //    destination="b";
      } else if (source_tower === "a" && destination_tower === "c") {
        tempSourceArray = Array.from(towerA_Stack);
        tempDestinationArray = Array.from(towerC_Stack);
        // console.log(tempSourceArray);
        // console.log(tempDestinationArray);
        // source="a";
        //    destination="c";
      } else if (source_tower === "c" && destination_tower === "a") {
        tempSourceArray = Array.from(towerC_Stack);
        tempDestinationArray = Array.from(towerA_Stack);
        // console.log(tempSourceArray);
        // console.log(tempDestinationArray);
        // source="c";
        //    destination="a";
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
      destinationArray.push(destination_tower);
  
      this.DisplayMove(source_tower, destination_tower);
    };
  
    this.DisplayMove = function(source_tower, destination_tower) {
      MoveSoFar = $("#MovesTable");
  
      // tr=document.createElement("tr");
      // td_source=document.createElement("td");
      // td_source.innerHTML=source_tower;
  
      // td_destination=document.createElement("td");
      // td_destination.innerHTML=destination_tower;
  
      // l=tr.appendChild(td_source);
      // l.appendChild(td_destination);
      // tr.appendChild(document.createElement("td"))

    
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
        removedDisk = $(towerA).last().remove();
        //$(towerA).remove();
        // removedDisk = towerA.removeChild(towerA.lastChild);
        // towerA.removeChild(towerA.lastChild);
        // console.log(disk);
        tempColor = Tower_A_ColorArray.pop();
        tempWidth = Tower_A_WidthArray.pop();
      } else if (source_tower === "b") {
        tempID = towerB_Stack.pop();
        removedDisk = $(towerB).last().remove();
        //towerB.removeChild(towerB.lastChild);
        tempColor = Tower_B_ColorArray.pop();
        tempWidth = Tower_B_WidthArray.pop();
      } else if (source_tower === "c") {
        tempID = towerC_Stack.pop();
        removedDisk = $(towerC).last().remove();
        //towerC.removeChild(towerC.lastChild);
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
    this.AddToDestinationTower = function(
      tempID,
      tempColor,
      tempWidth,
      removedDisk,
      source_tower,
      destination_tower
    ) {
      if (source_tower === "a") lChild = removedDisk;
      //towerA.lastChild;
      else if (source_tower === "b") lChild = removedDisk;
      //towerB.lastChild;
      else if (source_tower === "c") lChild = removedDisk; //towerC.lastChild;
  
      // this.CloneDisk(source,destination);
      if (destination_tower === "a") {
        towerA_Stack.push(tempID);
        //towerA.appendChild(lChild);
        $(towerA).append(lChild);
        Tower_A_ColorArray.push(tempColor);
        Tower_A_WidthArray.push(tempWidth);
  
        // diskColor.style.backgroundColor;
      } else if (destination_tower === "b") {
        towerB_Stack.push(tempID);
        //towerB.appendChild(lChild);
        $(towerB).append(lChild);
        Tower_B_ColorArray.push(tempColor);
        Tower_B_WidthArray.push(tempWidth);
      } else if (destination_tower === "c") {
        towerC_Stack.push(tempID);
        //towerC.appendChild(lChild);
        $(towerC).append(lChild);

        Tower_C_ColorArray.push(tempColor);
        Tower_C_WidthArray.push(tempWidth);
      }
    };
  
    this.MoveDisk = function(source_tower, destination_tower) {
      // alert(source_tower);
      // alert(destination_tower);
  
      this.DetermineSourceDestinationArray(source_tower, destination_tower);
      if (this.isValidMove(tempSourceArray, tempDestinationArray)) {
        this.RecordMove(source_tower, destination_tower);
  
        this.RemoveFromeSourceTower(source_tower, destination_tower);
        // this.AddToDestinationTower(destination);
  
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
      alert(rowCount);
  
      // MoveSoFar.removeChild(MoveSoFar.lastChild);
    };
  
    // this.CreateDisks(4);
    // this.MoveDisk=function(source_tower,destination_tower)
    // {
    //     if(this.isValidMove(source_tower,destination_tower))
    //     {
    //         alert("True");
    //     }
    //     else
    //     {
    //         alert("false");
    //     }
    //     //  sourceArray=new Array();
    //     //  destinationArray=new Array();
  
    // }
  }
  
  
  
  function start() {
    var input_no_of_disks = document.getElementById("no_of_disks");
    input_no_of_disks.disabled = true;
    var n = parseInt(document.getElementById("no_of_disks").value);
  
    toh = new TOH(n);
    toh.CreateDisks(n);
  
    // console.log(towerA_Stack);
    return false;
  }
  
  function Move() {
    source_tower = $("#from_tower").val();
    // document.getElementById("from_tower").value;
    // alert(source_tower);
    destination_tower =$("#to_tower").val();
     // document.getElementById("to_tower").value;
    // alert(destination_tower);
  
    if (source_tower == destination_tower) {
      alert(
        "Source and destination tower shouldn't be the same !!\nPlease Change them..."
      );
    } else {
      toh.MoveDisk(source_tower, destination_tower);
      // moveCount++;
    }
    $("#undo").removeAttr("disabled");
  
    return false;
  }
  // function Undo() {
  //   var source = destinationArray[destinationArray.length - 1];
  //   destinationArray.pop();
  //   var dest = sourceArray[sourceArray.length - 1];
  //   sourceArray.pop();
  //   toh.MoveDisk(source, dest);
  //   toh.UpdateMovesTable();
  // }
  