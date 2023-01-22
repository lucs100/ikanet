import json

# Run this script with the most recent title info in scripts/data to merge each set into a single JSON file.



# unpack title object data into json

AdjFile = open("scripts/data/BynameAdjectiveInfo.json")
AdjJson = json.load(AdjFile)
AdjFile.close()

SubFile = open("scripts/data/BynameSubjectInfo.json")
SubJson = json.load(SubFile)
SubFile.close()


# unpack title string data into json

StringFile = open("scripts/data/USen.json")
StringData = json.load(StringFile)
StringFile.close()
AdjStringsRaw = StringData["CommonMsg/Byname/BynameAdjective"]
SubStringsRaw = StringData["CommonMsg/Byname/BynameSubject"]

AdjStrings = dict()
SubStrings = dict()


# all IDs have this stupid XXXX_0 or XXXX_1 formatting, where _1 indicates paired (eg. king/queen) data OR some weird parameter set:
# [group=0001 type=0002 params=]
# trim IDs to XXXX, and filter out parameter entries

for item in AdjStringsRaw.items():
    if item[1] != "[group=0001 type=0002 params=]":
        if item[0][4:] == "_1":
            # this is a paired title, we need to merge it with the last one (XXXX_0)
            firstVariant = AdjStrings[item[0][:4]]
            secondVariant = item[1]
            AdjStrings[item[0][:4]] = f"{firstVariant} // {secondVariant}"
        else:
            #unpaired title
            AdjStrings[item[0][:4]] = item[1]

for item in SubStringsRaw.items():
    if item[1] != "[group=0001 type=0002 params=]":
        if item[0][4:] == "_1":
            firstVariant = SubStrings[item[0][:4]]
            secondVariant = item[1]
            SubStrings[item[0][:4]] = f"{firstVariant} // {secondVariant}"
        else:
            SubStrings[item[0][:4]] = item[1]


# clean up

#del AdjStringsRaw, SubStringsRaw, StringData


# pair strings and data, then merge into one list for each

AdjData = dict()

for title in AdjJson:
    title["Id"] = str(title["Id"]).zfill(4) # 0-pad string
    if title["Id"] in AdjStrings: # find ID in string list
        title["String"] = AdjStrings[title["Id"]] # append string to obj data
        AdjData[title["Id"]] = title # append to dictionary
    else:
        # title not implemented? shouldn't happen
        exit(999)
    
SubData = dict()

for title in SubJson:
    title["Id"] = str(title["Id"]).zfill(4)
    if title["Id"] in SubStrings:
        title["String"] = SubStrings[title["Id"]]
        SubData[title["Id"]] = title
    else:
        # title not implemented? shouldn't happen
        exit(999)


# write new merged files

with open("assets/titles/TitleAdjectiveInfo.json", 'w') as file:
    file.write(json.dumps(AdjData, indent=4))
    file.close()
with open("assets/titles/TitleSubjectInfo.json", 'w') as file:
    file.write(json.dumps(SubData, indent=4))
    file.close()

print(len(SubStringsRaw), len(SubStrings), len(SubData))
print(len(AdjStringsRaw), len(AdjStrings), len(AdjData))
