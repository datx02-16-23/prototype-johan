
buffer = {
	"datastructures" : [

	],

	"operations" : [

	]
}
from json import dump
outfile = open('output.json', 'wb')

def watch(original_function):
	buffer["datastructures"].append(original_function())

def read(src):
	pass

def write(src, dst):
	pass

translateDatatype = {
	"list" : "array"
}
def init(original_function):
	data = original_function()
	buffer["operations"].append({
		"op"	: "init",
		"id"	: data["id"],
		"value" : data["value"]
		})

def done():
	dump(buffer, outfile)