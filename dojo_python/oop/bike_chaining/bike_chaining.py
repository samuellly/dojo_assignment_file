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
        return self

    def ride(self):
        print('Riding')
        self.miles+=10
        return self

    def reverse(self):
        print('Reversing')
        if self.miles>=5:
            self.miles-=5
        return self
bike_1=Bike(200,"30mph").ride().ride().ride().displayInfo()

bike_2 =Bike(400,"50mph").ride().ride().reverse().reverse().displayInfo()

bike_3 =Bike(100,"25mph").reverse().reverse().reverse().displayInfo()
