
document.getElementById('date').value=new Date().toISOString().slice(0,10);
let chart;
function f(n){return Number(n).toLocaleString('vi-VN')+' đ';}
function calculate(){
let loan=+document.getElementById('loan').value;
let rate=+document.getElementById('rate').value/100;
let months=+document.getElementById('months').value;
let date=new Date(document.getElementById('date').value);
let principal=loan/months,balance=loan,totalInterest=0;
let body=document.querySelector('#tbl tbody');body.innerHTML='';
let labels=[],data=[];
for(let i=1;i<=months;i++){
 let interest=balance*rate,total=principal+interest;
 balance=Math.max(0,balance-principal); totalInterest+=interest;
 let d=new Date(date); d.setMonth(d.getMonth()+i);
 body.innerHTML+=`<tr><td>${i}</td><td>${d.toLocaleDateString('vi-VN')}</td><td>${f(principal)}</td><td>${f(interest)}</td><td>${f(total)}</td><td>${f(balance)}</td></tr>`;
 labels.push('T'+i); data.push(Math.round(interest));
}
document.getElementById('totalInterest').innerText=f(totalInterest);
document.getElementById('totalPay').innerText=f(loan+totalInterest);
document.getElementById('monthlyPrincipal').innerText=f(principal);
if(chart) chart.destroy();
chart=new Chart(document.getElementById('chart'),{type:'line',data:{labels:labels,datasets:[{label:'Tiền lãi',data:data,borderColor:'#2E7D32'}]}})
}
calculate();
