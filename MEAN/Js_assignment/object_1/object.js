function VehicleConstructor(name,wheel,passengers){
    var vehicle={};
    
        vehicle.name = name;
        vehicle.wheel = wheel;
        vehicle.passengers = passengers;
    
        vehicle.makeNoise = function(){
        }
        return vehicle;
    }
    var Bike = VehicleConstructor ('bike',2,1);
    Bike.makeNoise = function(){
        console.log("ring ring!")
    }
    Bike.makeNoise();
    
    var Sedan = VehicleConstructor ('sedan',4,4);
    Sedan.makeNoise = function(){
        console.log("Honk Honk!")
    }
    Sedan.makeNoise();
    
    var bus = VehicleConstructor('bus',4,20);
    bus.pickUpPassengers = function(pickup){
        bus.passengers += pickup;
    }
    bus.pickUpPassengers(10);
    console.log('pickUp Passengers: '+ bus.passengers);