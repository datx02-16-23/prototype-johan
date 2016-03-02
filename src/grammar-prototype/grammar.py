v = { }

##############################################
##############################################
def getContent(start, string):
    if string[start] != '(':
        return
    pFound = 1
    end    = start + 1
    while pFound > 0 and end < len(string):
        if string[end] == "(":
            pFound = pFound + 1
        elif string[end] == ")":
            pFound = pFound - 1
        end = end + 1
    return (string[start + 1 : end - 1], end)

def findNext(i, string):
    ch = string[i]
    while ch != '(' and i < len(string):
        i = i + 1
        ch = string[i]
    return i

def generateOperations(string):
    tokens      = []
    i           = 0
    while i < len(string):
        i = findNext(i,string)
        (substring,i) = getContent(i,string)
        tokens.append(substring)
    return tokens

##############################################
##############################################
# returns token and index end of token in op
def getNextToken(op):
    if op[0] == '(':
        return getContent(0,op)
    else:
        token = op.split()[0]
        return token,len(token)

# returns n tokens in given operation op
def extractTokens(n, op):
    buffer = []
    end    = 0
    for i in range(0, n):
        # parse through blank spaces
        while end < len(op) and op[end] == ' ':
            end = end + 1
        op = op[end:len(op)]

        next,end = getNextToken(op)
        buffer.append(next)
    return buffer

##############################################
# rule : swap - UPDATED!!!!
# write     w x (a i1)      - find assign to variable x from i1 in a
# write     w (a i1) (a i2) - find write to a at i1 from i2 in a
# write     w (a i2) x      - find write to a at i2 with x
grammar = {
    "swap" : {
        "rule" : 
            lambda operations: True,
        "syntax" :
            lambda vec, i1, i2: "swap %d %d %s" % (i1,i2,vec)
    }
}

IDS = {
    # "a" : { "op" : lambda op: extractTokens(2, op)},
    "r" : { "op" : lambda op: extractTokens(2, op)},
    "w" : { "op" : lambda op: extractTokens(2, op)}
}

# from current operation in operations find match with rule
#   # step onto next operation in sequence until
#   # # if one rule matches the full sequence
#   #       add rule to log-file
#   # # else if no matching rule was found
#   #       step onto next operation in operations
# (This could be done better if recursively other rules were
#  were checked with subsequences created, thats for later)
def interpretOperations(operations):
    buffer = []
    for operation in operations:
        # Extraction
        ID = operation[0]
        if ID not in IDS:
            raise "Unsupported Operation"
        operands = IDS[ID]["op"](operation[1:len(operation)])

        # Add to buffer
        buffer.append([ID,operands])

        # Check if current buffer matches any rule in grammar
        for op in buffer:
            
    return buffer

##############################################
##############################################
# swap index 0 & index 1 in array a
# (assign tmp (read 0 a)) (write 0 (read 1 a) a) (write 1 tmp a)
oi = "(w tmp (a 0)) (w (a 1) (a 2)) (w (a 2) tmp)"

# print generateOperations(oi)
#iterator = iter(generateOperations(oi))
#print interpretTokens(iterator)

print generateOperations(oi)
print interpretOperations(generateOperations(oi))