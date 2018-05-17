;(function(global, $){

    // Setting up our Greetr Object
    // 'new' an object
    var Greetr = function(firstName, lastName, language, msgType){
        return new Greetr.init(firstName, lastName, language);
    }

    // Declaring variables that other devs dont have access to unless I expose it to them.
    // hidden within the scope of the IIFE and never directly acesssible
    var supportedLanguages = ['en', 'es', 'fr', 'de', 'it', 'ep'];
    var supportedMsgTypes = ['normal','formal','informal','foul'];

    // Normal Greetings
    var greetings = {
        en: 'Hello',
        es: 'Hola',
        fr: 'Salut',
        de: 'Hallo',
        it: 'Ciao',
        ep: 'Olá',
    };

    // Formal Greetings
    var formalGreetings = {
        en: 'Greetings',
        es: 'Que tal',
        fr: 'Bonjour',
        de: 'Guten tag',
        it: 'Buon giorno',
        ep: 'Olá, bom dia ',
    };

    // Foul Greetings
    var foulGreetings = {
        en: ' , you son of a bitch!',
        es: ' , hijo de puta!',
        fr: ' ,fils de pute!',
        de: ' ,Du hurensohn!',
        it: ' ,figlio di puttana!',
        ep: ' ,filho da mãe!',
    };

    // Informal Greetings
    var informalGreetings = {
        en: 'What uppp',
        es: 'Como va',
        fr: 'Quoi de neuf',
        de: 'Was geht ab',
        it: 'Come va',
        ep: 'Como estás',
    };

    // Insufferable Greetings 
    // var insufferableGreetings = {
    //     en: 'What upp',
    //     es: 'Como va',
    //     fr: ' ',
    //     de: ' ',
    //     it: ' ',
    //     ep: ' ',
    // }

    // Adding a log
    // Logged Messages
    var logMessages = {
        en: 'Logged in',
        es: 'Inicio Sesion',
        fr: 'Logged Bonjour',
        de: 'Logged German',
        it: 'Logged Italian',
        ep: 'Logged European Portugeuse',
    };

    //  Where we can store methods and properties that are exposed to others
    // any objects built with Greetr.init will have access to this because the Greetr.init.prototype = Greetr.prototype
    Greetr.prototype  = {

        fullName: function(){
            return this.firstName + ' ' + this.lastName;
        },

        //  we'd like to validate with the languages supported
        validate : function(){
           if(supportedLanguages.indexOf(this.language) === -1 ){
                throw "Invalid language";
            };

            if(supportedMsgTypes.indexOf(this.msgType) === -1){
                throw "Invalid Message Type"
            };
        },

        greeting: function(){
            return greetings[this.language] + ' ' + this.firstName + '!';
        },

        formalGreeting: function(){
            return formalGreetings[this.language] + ', ' + this.fullName();
        },

        foulGreeting: function(){
            return this.firstName + foulGreetings[this.language];
        },
        
        informalGreeting: function(){
            return informalGreetings[this.language] + ' ' + this.firstName.charAt(0)+'.';
        },

        greet: function(msgType){
            var msg;

            if(msgType == "formal") {
                msg = this.formalGreeting();
            }else if (msgType == "informal") {
                msg = this.informalGreeting();
            }else if (msgType == "foul") {
                msg = this.foulGreeting();
            } else {
                msg = this.greeting()
            }
            if(console){
                console.log(msg);
            }

            // Chainable method
            return this;
        },

        log: function(){
            if(console){
                console.log(
                    logMessages[this.language] + ': ' + this.fullName()
                );
            }

            // Chainable method
            return this;
        },

        setMsgType: function(type){
            this.msgType = type;

            this.validate();

            // Chainable method
            return this;
        },

        setLang: function(lang){

            this.language = lang;

            this.validate();

            // Chainable method
            return this;
        },

        HTMLGreeting: function(selector, msgType){
            if(!$){
                throw 'jQuery not loaded';
            }

            if(!selector){
                throw 'Missing jQuery selector';
            }
            var msg;

            if(msgType == "formal") {
                msg = this.formalGreeting();
            }else if (msgType == "informal") {
                msg = this.informalGreeting();
            }else if (msgType == "foul") {
                msg = this.foulGreeting();
            } else {
                msg = this.greeting();
            }

            $(selector).html(msg);

            return this;
        }

    };

    Greetr.init = function(firstName, lastName, language, msgType){
        
        // this points to the new Greetr Object, you have to use this with constructor functions.
        var self = this;
        // Setting Default values
        self.firstName = firstName || "";
        self.lastName = lastName || "";
        self.language = language || "en"; 
        self.msgType = msgType || "normal";

        self.validate();
    }

    //  Any objects (prototype) created with the Greetr.init should point to the Greetr.prototype chain
    Greetr.init.prototype = Greetr.prototype

    // Expose my Greetr to the outside world and alias it to G$
    global.Greetr = global.G$ = Greetr;

}(window, jQuery));