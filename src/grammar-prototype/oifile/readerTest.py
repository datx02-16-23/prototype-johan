from reader import *

@watch
def watchVector(): return {"id" : "a", "datatype" : "VECTOR"}
a = [1,2,3]
@init
def initVector(): return {"id" : "a", "value" : a}

done()