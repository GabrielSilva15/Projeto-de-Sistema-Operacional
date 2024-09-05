// Selecionando através do click qual ônibus vai 
const onibusUm = document.querySelector('.opcao-um');
const onibusDois = document.querySelector('.opcao-dois');

onibusUm.addEventListener('click',(e)=>{
    e.preventDefault();
    onibusUm.style.backgroundColor = "rgba(9, 42, 105, 1)";
    onibusUm.style.color = "white";

    onibusDois.style.backgroundColor = "white";
    onibusDois.style.color = "rgba(9, 42, 105, 1)";

})


onibusDois.addEventListener('click',(e)=>{
    e.preventDefault();
    onibusDois.style.backgroundColor = "rgba(9, 42, 105, 1)";
    onibusDois.style.color = "white";

    onibusUm.style.backgroundColor = "white";
    onibusUm.style.color = "rgba(9, 42, 105, 1)";

})

