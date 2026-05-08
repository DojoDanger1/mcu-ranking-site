# poster website: http://www.impawards.com

STARTING_POSITION = 14
ENDING_POSITION = 13
LIST = 'mcu'

with open(f'entries_{LIST}.js', 'r') as f:
    lines = f.readlines()

newlines = []
for line in lines:
    if 'ranking' in line:
        ranking = int(line.split(':')[1][1:].replace(',','').replace('\n',''))
        if STARTING_POSITION > ENDING_POSITION: # moving up:
            if ranking == STARTING_POSITION:
                newLine = line.split(':')[0] + ': ' + str(ENDING_POSITION) + ',\n'
                newlines.append(newLine)
            elif ENDING_POSITION <= ranking and ranking < STARTING_POSITION:
                newLine = line.split(':')[0] + ': ' + str(ranking+1) + ',\n'
                newlines.append(newLine)
            else:
                newlines.append(line)
        else: # moving down:
            if ranking == STARTING_POSITION:
                newLine = line.split(':')[0] + ': ' + str(ENDING_POSITION) + ',\n'
                newlines.append(newLine)
            elif STARTING_POSITION < ranking and ranking <= ENDING_POSITION:
                newLine = line.split(':')[0] + ': ' + str(ranking-1) + ',\n'
                newlines.append(newLine)
            else:
                newlines.append(line)
    else:
        newlines.append(line)

with open(f'entries_{LIST}.js', 'w') as f:
    f.writelines(newlines)

print(f'moved number {STARTING_POSITION} to {ENDING_POSITION} in {LIST}')