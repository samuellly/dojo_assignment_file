function VehicleConstructor (name, wheels, passengers, speed) {
            // Instance variables
            this.name = name;
            this.wheels = wheels;
            this.passengers = passengers;
            this.speed = speed;
            this.distance_travelled = 0;
            VehicleConstructor.prototype.updateDistanceTravelled = function() {
                this.distance_travelled += this.speed;
            }
            VehicleConstructor.prototype.makeNoise = function() {
                console.log("default ring!");
            }
            VehicleConstructor.prototype.move = function() {
                this.updateDistanceTravelled();
                this.makeNoise();
                return this;
            }
            VehicleConstructor.prototype.checkMiles = function() {
                console.log(this.distance_travelled + ' mi');
            }
            VehicleConstructor.prototype.createVIN = function() {
                var numbers_alphabet = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B',
                    'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
                    'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
                var vin = '';
                var rand = 0;
                for (var i = 0; i < 17; i++) {
                    rand = Math.floor((Math.random() * 21) + 1);
                    vin += numbers_alphabet[rand];
                }
                return vin;
            }
        }
        // Bike
        console.log('// Bike ----------------------------------------------->');
        var bike = new VehicleConstructor ('Bike', 2, 1, 15);
        bike.makeNoise = function() { 
            console.log("ring ring!");
        }
        bike.move().move().move();
        bike.checkMiles();
        console.log('VIN: ' + bike.createVIN());
        // Sedan
        console.log('\n// Sedan -------------------------------------------->');
        var sedan = new VehicleConstructor ('Sedan', 4, 4, 70);
        sedan.makeNoise = function() { 
            console.log("Honk Honk!");
        }
        sedan.move().move().move();
        sedan.checkMiles();
        console.log('VIN: ' + sedan.createVIN());
        // Bus
        console.log('\n// Bus ---------------------------------------------->');
        var bus = new VehicleConstructor ('Bus', 8, 10, 50);
        bus.pickUpPassengers = function(pickup) {
            bus.passengers += pickup;
        }
        bus.pickUpPassengers(3);
        console.log('Bus passengers: ' + bus.passengers);
        bus.move().move().move();
        bus.checkMiles();
        console.log('VIN: ' + bus.createVIN());
		
        