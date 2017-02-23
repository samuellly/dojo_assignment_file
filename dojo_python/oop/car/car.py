import random
class car(object):
    def __init__(self,price,speed, fuel, mileage):
      self.price = price
      self.speed= speed
      self.fuel= fuel
      self.miles= mileage
      if price>10000:
          self.tax =0.15
      else:
          self.tax = 0.12
      self.display_all()

    def display_all(self):
        print(self)
        print('Price:', self.price)
        print('speed:', self.speed)
        print('fuel', self.fuel)
        print('Mile', self.miles)
        print('Tax Rate:', self.tax)

car_1=car(2000,'35mph','Full','15mpg')
car_2=car(2000,'5mph','Not Full','105mpg')
car_3=car(2000, '15mph', 'Kind of Full', '95mpg')
car_4=car(2000, '25mph', 'Full', '25mpg')
car_5=car(2000, '45mph', 'Empty', '25mpg')
car_6=car(20000000, '35mph', 'Empty', '15mpg')
