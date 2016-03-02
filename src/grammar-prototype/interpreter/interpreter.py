from rules import *

def printOperation(operation):
	print operation["id"],"to",operation["to"]["id"],"from",operation["from"]["id"]

def validateOperand(jsonObject, operand):
	if operand["id"] in jsonObject["datastructures"]:
		return jsonObject["datastructures"][operand["id"]]
	else:
		return None

def getValue(jsonObject, operand):
	container = validateOperand(jsonObject, operand)
	if container == None:
		return None
	elif container["type"] == "array":
		return container["content"][operand["index"]]
	elif container["type"] == "variable":
		return container["content"]

def setValue(jsonObject, operand, value):
	container 	= validateOperand(jsonObject, operand)
	value 		= getValue(jsonObject, value)
	if container == None:
		return
	elif container["type"] == "array":
		container["content"][operand["index"]] = value
	elif container["type"] == "variable":
		container["content"] = value

def interpretOperations(jsonObject, grammar):
	interpretation = []
	operations = jsonObject["operations"]
	i = 0
	while i < len(operations):
		buffer = []
		for j in range(i,len(operations)):
			buffer.append(operations[j])
			ruleMatch = 0

			for rule in grammar:
				(flag,result) = rule(buffer)
				if flag == "INCOMPLETE":
					ruleMatch = ruleMatch + 1
				elif flag == "MATCH":
					if ruleMatch == 0:
						i = j
						print result
					else:
						ruleMatch = ruleMatch + 1
				elif ruleMatch > 0:
					ruleMatch = ruleMatch - 1
			if ruleMatch == 0:
				break
			if operations[j] == "write":
				setValue(jsonObject, operation["to"], operation["from"])
		i = i + 1

from json import loads

oifile 		= open("oifile.json", "r")
jsonObject 	= loads(oifile.read())

interpretOperations(jsonObject, [checkSwap])