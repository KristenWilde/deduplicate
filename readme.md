##About##
This program takes a json files containing identically structured json records and de-duplicates them according to the following rules:

- The data from the newest date is preferred.
- Duplicate IDs count as dups and duplicate emails count as dups.
- If the dates are identical the data from the record provided last in the list is preferred.

##Using the program:##

1. Place your lead file(s) in the folder named **unprocessed_lead_files**.

2. In the console, run `node run.js` from the `deduplicate` directory.

3. The program will create a folder for each lead file within its `results` folder. The name of the new folder includes the name of the lead file and a timestamp. Within the folder, you should find three files: 

- your original lead file (renamed with `original` in the filename)
- the de-duplicated lead file (with `result` in the filename)
- a csv file showing the accepted records grouped with the removed records. Opening this file as a spreadsheet makes it easy to view the changes to each field. It includes an `index` column indicating the position of each record in the original lead array.

####Testing:####

A test script can be run with `node test.js`.
