 function VehicleConstructor (name, wheels, passengers, speed) {
            this.name = name;
            this.wheels = wheels;
            this.passengers = passengers;
            this.speed = speed;//Have the Vehicle constructor also take in a ¡°speed¡± Store the speed as an attribute
            var distance_travelled = 0;//Create a private variable called distance_travelled that starts at 0
            var self = this;
            var updateDistanceTravelled = function() {//Create a private method called updateDistanceTravelled that increments distance traveled by speed
                distance_travelled += self.speed;
            }
            this.makeNoise = function() {
            }
            this.move = function() { //Add a method to the Vehicle called ¡°move¡± that calls updateDistanceTravelled and then makeNoise
                updateDistanceTravelled();
                this.makeNoise();
            }
            this.checkMiles = function() {//Add a method called checkMiles that console.logs the distance_travelled
                console.log(distance_travelled);
            }
        }
        // Bike
        console.log('// Bike ----------------------------------------------->');
        var bike = new VehicleConstructor ('Bike', 2, 1, 15);
        bike.makeNoise = function() { 
            console.log("ring ring!");
        }
        bike.move(); // first move
        bike.move(); // second move
        bike.checkMiles();
        // Sedan
        console.log('\n// Sedan -------------------------------------------->');
        var sedan = new VehicleConstructor ('Sedan', 4, 4, 70);
        sedan.makeNoise = function() { 
            console.log("Honk Honk!");
        }
        sedan.move(); // first move
        sedan.move(); // second move
        sedan.checkMiles();
        // Bus
        console.log('\n// Bus ---------------------------------------------->');
        var bus = new VehicleConstructor ('Bus', 8, 10, 50);
        bus.pickUpPassengers = function(pickup) {
            bus.passengers += pickup;
        }
        bus.pickUpPassengers(3);
        console.log('Bus passengers: ' + bus.passengers);
        bus.move(); // first move
        bus.move(); // second move
        bus.checkMiles();