$('document').ready(function(){
    var customObject = {
        name:'California, Eureka',
        onClick:function(){
            console.log("I've been clicked");
            console.log(this.name);
        }
    }

    var customObject2 = {
        name:'sam, Hur',
        count: 0,
        onClick:function(){
            console.log("I've been clicked sam");
            console.log(this.name);
            this.count += 1;
            console.log(this.count);
        }
    }

    // our behavior on click.
    $('button').click(customObject.onClick);
    // $('button').click(customObject.onClick.bind(customObject));
    $('button').click(customObject2.onClick.bind(customObject2));

    function Ninja(name, age){
        this.name = name;
        this.age = age;
        // there could be lots of other stuff here!
    }

    function Ninja2(spell){
        this.spell = spell;
        // there could be lots of other stuff here!
    }

    function BlackBelt(name,age){
        //Commas!
        Ninja.call(this, name, age);
        this.belt = 'Black';
        console.log("Hey my name is: " + this.name);
        console.log("Exam: " + this.belt);
    }
    function YellowBelt(name,age){
        //ARRAY
        Ninja.apply(this, [name,age]);
        this.belt = 'Yellow';
        console.log(this.belt);
    }

    function RedBelt(name,age, spell){
        //ARRAY
        Ninja.apply(this, [name, age]);
        Ninja2.call(this, spell);
        this.belt = 'Red';
        console.log(this.belt);
    }

    var yB = new YellowBelt('Argeta', 19);
    var bB = new BlackBelt('Gentina', 17);
    var rB = new RedBelt('Aron', 16, 'abc');

    console.log(bB.name);
    console.log(yB.name);
    console.log(rB.age);
    console.log(rB.spell);

    function levelUp() {
        console.log(this.name + " has learned a new kata, in " + this.gender + " favorite language: " + this.language);
    }


    var person = {
        name: 'Tina',
        gender: 'her',
        language: 'JavaScript, duh!'
    };

    levelUp.call(person);
});
