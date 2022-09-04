const amount = document.querySelectorAll('.amount'),
      day    = document.querySelectorAll('.day'),
      bar    = document.querySelectorAll('.bar'),
      total  = document.querySelector('.total'),
      form   = document.getElementById('form');

function getValue(tag){    
    tag.addEventListener('blur',e=>{
       let value = e.target.value;
       let name  = e.target.name;
    
       async function modifyValue(){
           const request  = await fetch('assets/data.json');
           const response = await request.json(); 
            
           for(let i=0; i<response.length; i++){
               if(response[i].day == name){             
                   response[i].amount = value;            
                   amount[i].textContent = `$${response[i].amount}`;
                   bar[i].style = `height: ${response[i].amount}px`;   
               };
           }; 
       };
       modifyValue();
    });
};
let lastMax = [undefined];
function totalCost(){
    let spending = 0;
    let diarySpend = [];

    for(let i=0; i<amount.length; i++){
        let cut = amount[i].textContent.split("$");
        let num = parseInt(cut[1]);      
        spending += num;
        diarySpend.push(num);
    }
    let max = Math.max(...diarySpend);
    

    for(let i=0; i<bar.length; i++){
        let cut = amount[i].textContent.split("$");
        let num = parseInt(cut[1]);
        if(num >= max){
            if(!bar[i].classList.contains('active')){
                bar[i].classList.add('active');
                lastMax.push(bar[i]);
                document.querySelector('.wed').classList.remove('active');
                
                if(lastMax != bar[i]){
                    if(lastMax.length > 2){
                        lastMax.shift();
                        lastMax[0].classList.remove('active');
                    };
                };             
            };
            if(bar[i].classList.contains('wed')) document.querySelector('.wed').classList.add('active');
        };
    };
    total.textContent = `$${spending}`;
}

form.addEventListener('click',e =>{
    let target = e.target.tagName;

    if(target == 'INPUT') getValue(e.target);
    if(target == 'BUTTON'){
        e.preventDefault();
        totalCost();
    }
});