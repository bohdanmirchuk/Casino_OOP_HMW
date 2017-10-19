function Casino(SlotMachines, CasinoMoneyAmount){
  this.SlotMachines = SlotMachines;
  this.CasinoMoneyAmount = CasinoMoneyAmount;
  var machineMoney = parseInt(CasinoMoneyAmount/SlotMachines);
  var rest = CasinoMoneyAmount%machineMoney;
  this.Machines = {};
  for (i=0; i<SlotMachines; i++){
    this.Machines[i] = new SlotMachine(machineMoney+rest);
    rest=0;
  }
  var lucky = Math.floor((Math.random() * this.SlotMachines) + 1);
  this.Machines[lucky].lucky = true;

}

function SlotMachine(MachineMoneyAmount){
  this.MachineMoneyAmount = MachineMoneyAmount;
  this.lucky = false;

}

function createCasino(form){
  console.log(form[0].value, form[1].value)
  // document.body.insertAdjacentHTML('beforeEnd', '<section class="casino-section"><p>two</p></section>');
  casino = new Casino(form[0].value, form[1].value);
  playerMoney = casino.CasinoMoneyAmount;
  document.body.insertAdjacentHTML('beforeEnd', '<section class="casino-section">     <div class="casino-cnt casinomoney-cnt">    <h3>Money in casino - $<span id="money-in-casino">'+casino.CasinoMoneyAmount+'</span></h3><h3>Player&#39;s money - $<span>'+playerMoney+'</span></h3>   </div>  <div class="casino-cnt add-slot-cnt">   <p>Add new machine</p>  </div>  <div class="casino-cnt slots-cnt">  </div> </section>')
    for (var i=0; i<casino.SlotMachines; i++){
    document.querySelector('.slots-cnt').insertAdjacentHTML('beforeEnd', '<div class="img-cnt">  <img src="img/slot-machine.png" alt="slot-machine">   <p class="number-on-slot">777</p>     <p class="play-button">PLAY</p>    <p class="slot-money-field">$<span>'+casino.Machines[i].MachineMoneyAmount+'</span></p>     <p class="delete-button">x</p>    <p class="bet-cnt">Bet <select name="bet">             <option value="1">$1</option>        <option value="5">$5</option>       <option value="10">$10</option>       <option value="50">$50</option>        <option value="100">$100</option>      <option value="500">$500</option>    </select></p>    </div>');
  }
    console.log(casino);
  return false;
}