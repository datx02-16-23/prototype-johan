from reader import watch

watch({"id" : "a", "datatype" : "VECTOR"})
a = [1,2,3]
@init
def asd(): return {"id" : "a", "value" : a}

done()