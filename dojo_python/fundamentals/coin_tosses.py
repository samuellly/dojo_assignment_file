import random

# function that generates either 0 or 1
def headsOrTails():
    headsOrTails = random.randint(0,1)
    return headsOrTails

def tossCoin():
    attempt = 1
    heads = 0
    tails = 0
    for x in range(5000):
        coin = headsOrTails()
        if (coin == 0):
            heads += 1
            print "Attempt #{attempt}: Throwing a coin... It's head! ... got {heads} head(s) so far and {tails} tails(s) so far".format(attempt = attempt, heads = heads, tails = tails)
            attempt += 1
        else:
            tails += 1
            print "Attempt #{attempt}: Throwing a coin... It's tail! ... got {heads} head(s) so far and {tails} tails(s) so far".format(attempt = attempt, heads = heads, tails = tails)
            attempt += 1
    print "Ending the program. Thank you!"


tossCoin
#answer
# import random
# import math
#
# print 'Starting the program'
#
# head_count = 0
# tail_count = 0
# for i in range(1,5001):
#     rand = round(random.random())
#     if rand == 0:
#         face = 'tail'
#         tail_count += 1
#     else:
#         face = 'head'
#         head_count += 1
#     print "Attempt #"+str(i)+": Throwing a coin...It's a "+face+"!...Got "+str(head_count)+" head(s) and "+str(tail_count)+" tail(s) so far"
#
# print 'Ending the program, thank you!'
