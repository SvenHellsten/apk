import xml.etree.ElementTree as ET
import re
import json
import urllib.request
response = urllib.request.urlopen('https://www.systembolaget.se/api/assortment/products/xml')

tree = ET.parse(response)
root = tree.getroot()
listan = []
for child in root.iter('artikel'):
	alk = re.sub('%',"",child.find('Alkoholhalt').text)
	ppl = child.find('PrisPerLiter').text
	var = child.find('Varugrupp').text
	nr = child.find('nr').text

	if (float(ppl)==0.0):
		ppl =10000.00
	namn = child.find('Namn').text
	apk = (float(alk)/float(ppl))  

	if (child.find('Utgått').text=='0'):
		info = {
			"namn": namn,
			"apk": "{0:.4f}".format(apk),
			"Varugrupp": var,
			"nr":nr,
		}
		listan.append(info)

listan=sorted(listan,key=lambda x: x['apk'], reverse=True)

with open('your_file.json', 'w') as f:
	json.dump(listan,f)
f.close()