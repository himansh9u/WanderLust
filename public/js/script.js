(() => {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }
            form.classList.add('was-validated')
        }, false)
    })
})()

setTimeout(() => {
    let alerts = (document.getElementsByClassName("disappearing-alert"));
    for(alert of alerts){
        alert.style.display = "none";
    }
}, 2000);

function search(){
    let searchInp = document.querySelector(".search-inp");
    let listingContainer = document.querySelector(".listing-container");
    let cards = document.querySelectorAll(".listing-container a");
    const searchedText = searchInp.value.toLowerCase();
    console.log(searchedText);
    for(let i = 0; i < cards.length; i++){
        let currCardTitle = cards[i].querySelector(".card-text").textContent.toLowerCase();
        if(currCardTitle.indexOf(searchedText) > -1){
            cards[i].style.display = "";
        } else {
            cards[i].style.display = "none";
        }
    }
}
