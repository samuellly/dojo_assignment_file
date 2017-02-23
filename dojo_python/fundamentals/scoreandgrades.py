import random

def randomGrade():
    grade=random.randint(60,100)
    return grade

def printGrade(grade):
    if(grade<=69):
        print "Grade: {grade}%; Your grade is D".format(grade = grade)
    elif (grade >=70 and grade<=79):
        print "Grade: {grade}%; Your grade is c".format(grade = grade)
    elif (grade>=80 and grade<=89):
        print "Grade: {grade}%; Your grade is b".format(grade = grade)
    else:
        print "Grade: {grade}%; Your grade is a".format(grade = grade)

for x in range(10):
    printGrade(randomGrade())

#answer
# from random import randint
#
# print "Scores and Grades"
# for count in range(0, 10):
# 	score = randint(70, 100)
#
# 	if(score <= 70):
# 		grade = "D"
# 	elif(score <= 80):
# 		grade = "C"
# 	elif(score <= 90):
# 		grade = "B"
# 	else:
# 		grade = "A"
#
# 	print "Score: %d; Your grade is %s" %(score, grade)
#
# print "End of program. Bye!"
