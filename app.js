;(function(){

    const greetHead = document.querySelector('#greetHead');
    const greetLang = document.querySelector('#lang');
    const greetType = document.querySelector('#greetType');


    greetType.addEventListener('change', changeType = () =>{
        return greetHead.innerHTML = greetType.options[greetType.selectedIndex].text + ' ' + greetLang.options[greetLang.selectedIndex].text + ' greetings.';
    })
    
    document.querySelector('#firstName').addEventListener('submit', subFunc = ()=> {
       
        // Greetr in Use 
        const g =G$(firstName.value,lastName.value, greetLang.value);
        g.HTMLGreeting('#greeting', greetType.value);
        g.greet('#greeting')
        console.log(g.formalGreeting())

    })
})();


