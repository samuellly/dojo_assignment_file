class Node(object):
 def __init__(self, value):
  self.value = value
  self.next = None
class SinglyLinkedList(object):
 def __init__(self):
  self.head = None
  self.tail = None
list = SinglyLinkedList()
list.head = Node('Alice')
list.head.next = Node('Chad')
list.head.next.next = Node('Debra')

#PrintAllVals
#AddBack(val)
#AddFront(val)
#InsertBefore(nextVal, val)
#InsertAfter(preval, val)
#RemoveNode(val)
#ReverseList()
def PrintAllVals(list):
    runner = list.head
while(runner.next != None):
 print(runner.val)
 runner = runner.next
