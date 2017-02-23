class animal(object):
    def __init__(self,name):
        self.name= name
        self.health= 100
    def walk(self):
        self.health-=1
        return self
    def run(self):
        self.health-=5
        return self
    def displayHealth(self):
        print "Name:" + str(self.name)
        print "Health:" + str(self.health)
class dog(animal):
    def __init__(self,name):
        super(dog,self).__init__(name)
        self.health=150
    def pet(self):
        self.health+=5
        return self
class dragon(animal):
    def __init__(self,name):
        super(dragon,self).__init__(name)
        self.health=170
    def fly(self):
        self.health-=10
        return self
    def displayHealth(self):
        print('this is a dragon!!')
        super(dragon,self).displayHealth()
        return self

animal = animal('Animal')
animal.walk().walk().walk().run().run().displayHealth()

puppy= dog('Puppy')
puppy.walk().walk().walk().run().run().displayHealth()

firestone=dragon('Firestone')
firestone.walk().walk().walk().run().run().fly().fly().displayHealth()
