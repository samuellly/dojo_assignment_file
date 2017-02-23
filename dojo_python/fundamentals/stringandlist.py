#find word"moneky" from str1
str1 = "If monkeys like bananas, then I must be a monkey!"
word= "monkey"
print string.find(word)
#new string replae
strNew = str1.replae("monkey","alligator")
print strNew
#find max, min
x = [2,54,-2,7,12,98]
print max(x)
print min(x)
#find first and last
y = ["hello",2,54,-2,7,12,98,"world"]
first=y[0]
last=y.pop()

print first
print last

#new list
z = [19,2,54,-2,7,12,98,32,10,-3,6]
z.sort()
print z

newZ=[]
newZ.append(z[0])
newZ.append(z[1])
print newZ

z.remove(-3)
z.remove(-2)
z.insert(0,newZ)

print z
