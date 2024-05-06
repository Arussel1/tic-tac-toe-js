(() =>{
    const dialog = document.querySelector('dialog');
    const form = document.forms["playerName"];
    const choices = document.getElementsByName('choice');
    const p1 = document.querySelector('.p1');
    const p2 = document.querySelector('.p2');
    dialog.showModal();
    form.addEventListener("submit",function(event) {
        event.preventDefault();
        p1.innerHTML = form.name1.value + ': ';
        p2.innerHTML = form.name2.value + ': ';
        if(choices[0].checked){
            p1.innerHTML += choices[0].value;
            p2.innerHTML += choices[1].value;
        }else{
            p2.innerHTML += choices[0].value;
            p1.innerHTML += choices[1].value;
        }
        dialog.close();
    })
})();


