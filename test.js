const fs = require('fs')
const Deduplicate = require('./deduplicate.js')

const leads = [
	{
		"_id": "jkj238238jdsnfsj23",
		"email": "foo@bar.com",
		"firstName":  "John",
		"lastName": "Smith",
		"address": "123 Street St",
		"entryDate": "2014-05-07T17:30:20+00:00"
	},
	{
		"_id": "edu45238jdsnfsj23",
		"email": "mae@bar.com",
		"firstName":  "Ted",
		"lastName": "Masters",
		"address": "44 North Hampton St",
		"entryDate": "2014-05-07T17:31:20+00:00"
	},
	{
		"_id": "wabaj238238jdsnfsj23",
		"email": "bog@bar.com",
		"firstName":  "Fran",
		"lastName": "Jones",
		"address": "8803 Dark St",
		"entryDate": "2014-05-07T17:31:20+00:00"
	},
	{
		"_id": "jkj238238jdsnfsj23",
		"email": "coo@bar.com",
		"firstName":  "Ted",
		"lastName": "Jones",
		"address": "456 Neat St",
		"entryDate": "2014-05-07T17:32:20+00:00"
	},
	{
		"_id": "sel045238jdsnfsj23",
		"email": "foo@bar.com",
		"firstName":  "John",
		"lastName": "Smith",
		"address": "123 Street St",
		"entryDate": "2014-05-07T17:32:20+00:00"
	},
	{
		"_id": "qest38238jdsnfsj23",
		"email": "foo@bar.com",
		"firstName":  "John",
		"lastName": "Smith",
		"address": "123 Street St",
		"entryDate": "2014-05-07T17:32:20+00:00"
	},
	{
		"_id": "vug789238jdsnfsj23",
		"email": "foo1@bar.com",
		"firstName":  "Blake",
		"lastName": "Douglas",
		"address": "123 Reach St",
		"entryDate": "2014-05-07T17:33:20+00:00"
	},
	{
		"_id": "wuj08238jdsnfsj23",
		"email": "foo@bar.com",
		"firstName":  "Micah",
		"lastName": "Valmer",
		"address": "123 Street St",
		"entryDate": "2014-05-07T17:33:20+00:00"
	},
	{
		"_id": "belr28238jdsnfsj23",
		"email": "mae@bar.com",
		"firstName":  "Tallulah",
		"lastName": "Smith",
		"address": "123 Water St",
		"entryDate": "2014-05-07T17:33:20+00:00"
	},
	{
		"_id": "jkj238238jdsnfsj23",
		"email": "bill@bar.com",
		"firstName":  "John",
		"lastName": "Smith",
		"address": "888 Mayberry St",
		"entryDate": "2014-05-07T17:33:20+00:00"
	}
]

// Add leads.js to unprocessed_lead_files directory
// fs.writeFileSync( './unprocessed_lead_files/leads.json', JSON.stringify(leads, undefined, '\t') )

// Run deduplicate

// const directory_names = Deduplicate.run()
const duplicates = Deduplicate.findDuplicates(leads)

console.log(duplicates)
// Check output (deduplicated leads)

// const output = fs.readFileSync(`./results/${directory_names.first}/leads.json`, 'utf8')
// const output_leads = output && JSON.parse(output) && JSON.parse(output).leads || []

// console.log("Output contains 4 leads", output_leads.length === 4)

// const jkj_lead = output_leads.find(lead => lead._id === 'foo@bar.com') || {}

// console.log("Output contains lead with id jkj238238jdsnfsj23 and email bill@bar.com", jkj_lead.email === "bill@bar.com" )

// const mae_lead = output_leads.find(lead => lead.email === 'mae@bar.com') || {}

// console.log("Output contains lead with email mae@bar.com and id belr28238jdsnfsj23", mae_lead._id === "belr28238jdsnfsj23")


// // Check log

// const log = fs.readFileSync(`./results/${directory_names.first}/log.json`, 'utf8')



