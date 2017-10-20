function Casino(SlotMachines, CasinoMoneyAmount){
  this.SlotMachines = SlotMachines;
  this.CasinoMoneyAmount = CasinoMoneyAmount;
  var machineMoney = parseInt(CasinoMoneyAmount/SlotMachines);
  var rest = CasinoMoneyAmount%machineMoney;
  this.Machines = {};
  for (i=0; i<this.SlotMachines; i++){
    this.Machines[i] = new SlotMachine(machineMoney+rest);
    rest=0;
  }
  var lucky = Math.floor((Math.random() * this.SlotMachines));
  this.Machines[lucky].lucky = true;

}

function SlotMachine(MachineMoneyAmount){
  this.MachineMoneyAmount = MachineMoneyAmount;
  this.lucky = false;

}
Casino.prototype.getTotalAmount = function(){
  var totalAmount = 0;
  for (i=0; i<this.SlotMachines; i++){
    totalAmount+=this.Machines[i].MachineMoneyAmount;
  }
  document.querySelector('#money-in-casino').innerHTML=totalAmount;
  if ( totalAmount == 0){
    alert("Wow... The Casino is a bankrupt now!..");
  }
  // console.log("totalAmount", totalAmount);

}
Casino.prototype.maxMachineAmount = function (){
  var max = 0;
  var indexMax = 0;
  for (i=0; i<this.SlotMachines; i++){
    if(this.Machines[i].MachineMoneyAmount > max){
      max = this.Machines[i].MachineMoneyAmount;
      indexMax = i;
      }
    }
    this.Machines[indexMax].MachineMoneyAmount=Math.floor(this.Machines[indexMax].MachineMoneyAmount/2);
    document.querySelectorAll('span.slot-money')[indexMax].innerHTML=this.Machines[indexMax].MachineMoneyAmount;
    // console.log("max", max);
    // console.log("indMax", indexMax);
    return max;
}

  //method Add Machine
Casino.prototype.addNewMachine = function (){
  var newMachineAmount = casino.maxMachineAmount()/2;
  var Mnum = parseInt(this.SlotMachines);
  Mnum += 1;
  this.SlotMachines = Mnum;
  console.log("Machine number",   Mnum);
  this.Machines[Mnum-1] = new SlotMachine(Math.floor(newMachineAmount));
      document.querySelector('.slots-cnt').insertAdjacentHTML('beforeEnd', '<div class="img-cnt">  <img src="img/slot-machine.png" alt="slot-machine">   <p class="number-on-slot">777</p>     <p class="play-button" onclick="casino.Machines['+i+'].Play(this, '+i+'), casino.getTotalAmount()">PLAY</p>    <p class="slot-money-field">$<span class="slot-money">'+casino.Machines[Mnum-1].MachineMoneyAmount+'</span></p>     <p class="delete-button" onclick="casino.Machines['+i+'].deleteMachine(this, '+i+')">x</p>    <p class="bet-cnt">Bet <select name="bet">       <option value="5">$5</option>      <option value="10">$10</option>       <option value="25">$25</option>       <option value="50">$50</option>        <option value="100">$100</option>      <option value="500">$500</option>    </select></p>    </div>');
   casino.getTotalAmount();
}

// method Delete Machine
SlotMachine.prototype.deleteMachine = function(p, index){
  var div = p.parentElement;
  // console.log(cntArr.children[index]);
  console.log(index);
  // cntArr.removeChild(cntArr.children[index]);
  div.style.display = "none";
  
}
  // method Play
SlotMachine.prototype.Play = function(p, index){
  var win = 0;
  var div = p.parentElement;
  var bet = parseInt(div.querySelector('select').value);

  if (casino.Machines[index].MachineMoneyAmount == 0){
    alert ("Sorry man, this machine is out of money(... Try to play on another one.")
  }
  else if(playerMoney >= bet){
    if (casino.Machines[index].lucky == true){
      var slotNumber = 777;
    }
    else{
      var slotNumber = Math.floor((Math.random() * 900) + 100);
    }
    div.querySelector('.number-on-slot').innerHTML = slotNumber;
    console.log("Slot Number", slotNumber);
    console.log("bet", bet);
    var arr = slotNumber.toString().split('');
    if (slotNumber == 777){
      console.log("777 win");
      win = casino.Machines[index].MachineMoneyAmount;
      casino.Machines[index].MachineMoneyAmount = 0;
      alert("OMG! 777! You're the lucky one! You've just cleared this machine up!")
    }
    else if ((arr[0] == arr[1])&&(arr[1]==arr[2])){
      console.log("5x win");
      bet = bet * 5;    
      win = bet;
      casino.Machines[index].MachineMoneyAmount -= bet;
      if (casino.Machines[index].MachineMoneyAmount < 0){
        casino.Machines[index].MachineMoneyAmount = 0;
      }
    }
    else if ((arr[0] == arr[1])||(arr[1]==arr[2])||(arr[0]==arr[2])){
      console.log("2x win");
      bet = bet * 2;
      win = bet;
      casino.Machines[index].MachineMoneyAmount -= bet;
      if (casino.Machines[index].MachineMoneyAmount < 0){
        casino.Machines[index].MachineMoneyAmount = 0;
      }
    }
    else {
      win = -bet;
      casino.Machines[index].MachineMoneyAmount += bet;
    }

    div.querySelector('span.slot-money').innerHTML = casino.Machines[index].MachineMoneyAmount;
    playerMoney = parseInt(playerMoney) + win;
    document.querySelector('#player-money').innerHTML = playerMoney;
    // console.log(div.parentNode.children);
    // console.log(div.children.r);
    // console.log(index);
  }
  else{
    alert("Sorry man, you don't have enough money to play this bet");
  }

}

function createCasino(form){
  casino = new Casino(form[0].value, form[1].value);
  playerMoney = casino.CasinoMoneyAmount;
  document.body.insertAdjacentHTML('beforeEnd', '<section class="casino-section">     <div class="casino-cnt casinomoney-cnt">    <h3>Money in casino - $<span id="money-in-casino">'+casino.CasinoMoneyAmount+'</span></h3><h3>Player&#39;s money - $<span id="player-money">'+playerMoney+'</span></h3>   </div>  <div class="casino-cnt add-slot-cnt" onclick="casino.addNewMachine()" >   <p>Add new machine</p>  </div>  <div class="casino-cnt slots-cnt">  </div> </section>')
    for (var i=0; i<casino.SlotMachines; i++){
    document.querySelector('.slots-cnt').insertAdjacentHTML('beforeEnd', '<div class="img-cnt">  <img src="img/slot-machine.png" alt="slot-machine">   <p class="number-on-slot">777</p>     <p class="play-button" onclick="casino.Machines['+i+'].Play(this, '+i+'), casino.getTotalAmount()">PLAY</p>    <p class="slot-money-field">$<span class="slot-money">'+casino.Machines[i].MachineMoneyAmount+'</span></p>     <p class="delete-button">x</p>    <p class="bet-cnt">Bet <select name="bet">       <option value="5">$5</option>        <option value="10">$10</option>       <option value="25">$25</option>       <option value="50">$50</option>        <option value="100">$100</option>      <option value="500">$500</option>    </select></p>    </div>');
  }
  form.lastElementChild.setAttribute("disabled", "disabled");
  return false;
}