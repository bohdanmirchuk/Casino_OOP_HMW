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


Casino.prototype.addNewMachine = function (){
  var newMachineAmount = casino.maxMachineAmount()/2;
  var Mnum = parseInt(this.SlotMachines);
  Mnum += 1;
  this.SlotMachines = Mnum;
  console.log("Machine number",   Mnum);
  this.Machines[Mnum-1] = new SlotMachine(Math.floor(newMachineAmount));
      document.querySelector('.slots-cnt').insertAdjacentHTML('beforeEnd', '<div class="img-cnt">  <img src="img/slot-machine.png" alt="slot-machine">   <p class="number-on-slot">777</p>     <p class="play-button" onclick="casino.getTotalAmount()">PLAY</p>    <p class="slot-money-field">$<span class="slot-money">'+casino.Machines[Mnum-1].MachineMoneyAmount+'</span></p>     <p class="delete-button">x</p>    <p class="bet-cnt">Bet <select name="bet">       <option value="5">$5</option>      <option value="10">$10</option>       <option value="25">$25</option>       <option value="50">$50</option>        <option value="100">$100</option>      <option value="500">$500</option>    </select></p>    </div>');

  // console.log("new SLOT", this.Machines[Mnum-1]);

   casino.getTotalAmount();
}
  
SlotMachine.prototype.Play = function(p, index){
  var div = p.parentElement;
  var bet = parseInt(div.querySelector('select').value);

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
  console.log(arr);

  // console.log(div.parentNode.children);
  // console.log(div.children.r);
  // console.log(index);
}

function createCasino(form){
  console.log(form[0].value, form[1].value)
  // document.body.insertAdjacentHTML('beforeEnd', '<section class="casino-section"><p>two</p></section>');
  casino = new Casino(form[0].value, form[1].value);
  playerMoney = casino.CasinoMoneyAmount;
  document.body.insertAdjacentHTML('beforeEnd', '<section class="casino-section">     <div class="casino-cnt casinomoney-cnt">    <h3>Money in casino - $<span id="money-in-casino">'+casino.CasinoMoneyAmount+'</span></h3><h3>Player&#39;s money - $<span>'+playerMoney+'</span></h3>   </div>  <div class="casino-cnt add-slot-cnt" onclick="casino.addNewMachine()" >   <p>Add new machine</p>  </div>  <div class="casino-cnt slots-cnt">  </div> </section>')
    for (var i=0; i<casino.SlotMachines; i++){
    document.querySelector('.slots-cnt').insertAdjacentHTML('beforeEnd', '<div class="img-cnt">  <img src="img/slot-machine.png" alt="slot-machine">   <p class="number-on-slot">777</p>     <p class="play-button" onclick="casino.getTotalAmount(), casino.Machines['+i+'].Play(this, '+i+')">PLAY</p>    <p class="slot-money-field">$<span class="slot-money">'+casino.Machines[i].MachineMoneyAmount+'</span></p>     <p class="delete-button">x</p>    <p class="bet-cnt">Bet <select name="bet">       <option value="5">$5</option>        <option value="10">$10</option>       <option value="25">$25</option>       <option value="50">$50</option>        <option value="100">$100</option>      <option value="500">$500</option>    </select></p>    </div>');
  }
    console.log(casino);
  return false;
}