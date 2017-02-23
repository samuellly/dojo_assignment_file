import random
class Bike(object):
    def __init__(self,price,max_speed):
      self.price = price
      self.max_speed= max_speed
      self.miles=0

    def displayInfo(self):
        print(self.price)
        print(self.max_speed)
        print(self.miles)

    def ride(self):
        print('Riding')
        self.miles+=10

    def reverse(self):
        print('Reversing')
        if self.miles>=5:
            self.miles-=5
bike_1 =Bike(200,"30mph")
bike_1.ride()
bike_1.ride()
bike_1.ride()
bike_1.displayInfo()

bike_2 =Bike(400,"50mph")
bike_2.ride()
bike_2.ride()
bike_2.reverse()
bike_2.reverse()
bike_2.displayInfo()

bike_3 =Bike(100,"25mph")
bike_3.reverse()
bike_3.reverse()
bike_3.reverse()
bike_3.displayInfo()
