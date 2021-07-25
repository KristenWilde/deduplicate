const fs = require('fs')

// returns array of sorted arrays of duplicates with accepted duplicate in position 0
const findDuplicates = (leads) => {
	const hash = {}
	const sorted_duplicates = []

	leads.forEach((lead, index) => {

		lead.index = index // add index for sorting

		if (hash[lead._id]){
			hash[lead._id].add(lead)
		} 

		if (hash[lead.email]){
			hash[lead.email].add(lead)
		}

		if ( !hash[lead._id] && !hash[lead.email] ) {
			const new_set = new Set([lead])

			// point to the same Set with both keys
			hash[lead._id] = new_set
			hash[lead.email] = new_set
		}
	})

	// convert values array to a set to ensure uniqueness
	const sets = new Set(Object.values(hash))

	sets.forEach(set => {

		const sorted = Array.from(set).sort((a,b) => {
			if ( a.entryDate === b.entryDate){
				return a.index < b.index ? 1 : -1
			}
			if ( Date.parse(a.entryDate) < Date.parse(b.entryDate) ){
				return 1
			}
			return -1
		})

		sorted_duplicates.push(sorted)
	})

	return sorted_duplicates
}
 
const uniqueLeads = (sorted_duplicates) => {
	return sorted_duplicates.map(duplicates => {
		// copy first lead and remove index property
		const lead = { ...duplicates[0] }
		delete lead.index
		
		return lead
	})
}

const csvLog = (sorted_duplicates) => {
	let result = "Fields,_id,email,firstName,lastName,address,entryDate,index\n"
	
	result += sorted_duplicates.map(array => 

		array.map((lead, index) => {
			let accepted = index === 0 ? 'Accepted' : 'Removed'

			let data = Object.values(lead).join(",")

			return `${accepted},${data}`
		}).join("\n")

	).join("\n\n")

	return result
}


const run = () => {
	const directories_created = []
	const filenames = fs.readdirSync('./unprocessed_lead_files')

	if (!filenames || !filenames.length) console.log("No unprocessed lead files found")

	filenames.forEach(filename => {

		const json = fs.readFileSync(`./unprocessed_lead_files/${filename}`, 'utf8')
		const leads = JSON.parse(json).leads

		if (leads && Array.isArray(leads)){
			const sorted_duplicates = findDuplicates(leads)
			const csv_log = csvLog(sorted_duplicates)
			const unique_leads = uniqueLeads(sorted_duplicates)

			// use timestamp in folder name to avoid issue with lead files not having unique names
			let timestamp = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })
			timestamp = timestamp.replace(/[\s,]+/g, '_') // replace spaces and comma with underscore
			timestamp = timestamp.replace(/\//g, '-') // replace slash with dash

			const base_name = filename.replace(/\.json$/, '')
			const directory_name = `${base_name}_${timestamp}`

			// make new directory 
			fs.mkdirSync(`./results/${directory_name}`, {recursive: true})
			directories_created.push(directory_name)

			// copy original file to new directory
			fs.copyFileSync(
				`./unprocessed_lead_files/${filename}`,
				`./results/${directory_name}/original_${filename}`,
			)

			// write results
			fs.writeFileSync(
				`./results/${directory_name}/result_${filename}`, 
				JSON.stringify( { leads: unique_leads }, undefined, '\t' )
			)

			// write log file
			fs.writeFileSync(
				`./results/${directory_name}/changes_to_${filename}.csv`, 
				csv_log
			)
			
			// delete original file from .unprocessed_lead_files
			fs.unlinkSync(`./unprocessed_lead_files/${filename}`)
		}

		else console.log(`leads array not found wihin ${filename}.`)
	})

	return directories_created
}

module.exports = { run, findDuplicates, csvLog, uniqueLeads }