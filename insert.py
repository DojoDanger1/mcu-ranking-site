# poster website: http://www.impawards.com

POSITION = 66
LIST = 'mcu'

with open(f'entries_{LIST}.js', 'r') as f:
    lines = f.readlines()

newlines = []
for line in lines:
    if 'ranking' in line:
        ranking = int(line.split(':')[1][1:].replace(',','').replace('\n',''))
        if ranking >= POSITION:
            newLine = line.split(':')[0] + ': ' + str(ranking+1) + ',\n'
            newlines.append(newLine)
        else:
            newlines.append(line)
    else:
        newlines.append(line)

with open(f'entries_{LIST}.js', 'w') as f:
    f.writelines(newlines)

print(f'inserted {POSITION} into {LIST}')