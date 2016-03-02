
NOMATCH 	= "NOMATCH"
MATCH 		= "MATCH"
INCOMPLETE 	= "INCOMPLETE"

def isVector(operand):
	return len(operand) == 2

UPDATED = "UPDATED"

def getState(i,operation,state):
	if i == 0 and len(state) == 0:
		# append with key if not already in table, end result will be correct if operations are correct?
		newState = { operation["to"] : UPDATED,
					 operation["from"] : UPDATED,
					 operation["from"]["index"] : UPDATED }
		return newState
	elif i == 1 and isVector(operation["from"]) and isVector(operation["to"]):
		return (state[0], 
				operation["to"]["id"],
				operation["to"]["index"],
				operation["from"]["index"])
	elif i == 2 and not isVector(operation["from"]) and isVector(operation["to"]):
		return (operation["from"]["id"],
				operation["to"]["id"])
	else:
		raise Exception("No match found")

def checkSwap2(operations):
	if len(operations) > 3:
		return (NOMATCH,"")

	state = { }
	for i,operation in enumerate(operations):
		state = getState(i,operation,state)
		#for key,
	return (INCOMPLETE,"")
		
def checkSwap(operations):
	if len(operations) > 3:
		return (NOMATCH,"")
	tmp 	= None
	vector 	= None
	i1  	= None
	i2  	= None
	for i,operation in enumerate(operations):
		if operation["id"] == "write":
			if i == 0:
				tmp = operation["to"]["id"]
				if isVector(operation["from"]):
					vector	= operation["from"]["id"]
					i1 		= operation["from"]["index"]
				else:
					return (NOMATCH,"")
			elif i == 1 and not (tmp == None or vector == None or i1 == None):
				if (isVector(operation["to"]) and
					isVector(operation["from"]) and
					operation["to"]["id"] == vector and
					operation["from"]["id"] == vector and
					operation["to"]["index"] == i1):
					i2 = operation["from"]["index"]
				else:
					return (NOMATCH,"")
			elif i == 2 and not (tmp == None or vector == None or i1 == None or i2 == None):
				if (isVector(operation["to"]) and
					operation["to"]["id"] == vector and
					operation["to"]["index"] == i2 and
					operation["from"]["id"] == tmp):
					return (MATCH,"Swap " + str(i1) + " and " + str(i2) + " in vector " + vector)
			else:
				return (NOMATCH,"")
		else:
			return (NOMATCH,"")
	
	return (INCOMPLETE,"")
		