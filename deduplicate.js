const fs = require('fs')

// 
const findDuplicates = (leads) => {
	const hash = {}
	const sorted_duplicates = []


	leads.forEach((lead, index) => {

		lead.index = index

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



const run = () => {
	const filenames = fs.readdirSync('./unprocessed_lead_files') //filenames = fs.readdirSync(directory_name)
	const directories_created = []

	filenames.forEach(filename => {

		const json = fs.readFileSync(`./unprocessed_lead_files/${filename}`, 'utf8')
		const leads = JSON.parse(json).leads

		const result = findDuplicates(leads)

		// use timestamp in folder name to avoid issue with lead files not having unique names
		let timestamp = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })
		timestamp = timestamp.replace(/[\s,]+/g, '_') // replace spaces and comma with underscore
		timestamp = timestamp.replace(/\//g, '-') // replace slash with dash

		const name = filename.replace(/\.json$/, '')
		const directory_name = `${name}_${timestamp}`

		// make directory 
		fs.mkdirSync(`./results/${directory_name}`, {recursive: true})
		directories_created.push(directory_name)

		//write original file
		fs.writeFileSync(
			`./results/${directory_name}/original_${filename}`,
			JSON.stringify( { leads} , undefined, '\t' )
		)

		// write de-duplicated file
		fs.writeFileSync(
			`./results/${directory_name}/${name}.json`, 
			JSON.stringify( { leads: result } , undefined, '\t' )
		)

		// write log file
		fs.writeFileSync(
			`./results/${directory_name}/log.csv`, 
			"csv data"
		)

		// handle errors if json can't be parsed or leads array not found.
	})

	return directories_created
}



run()

module.exports = { run, findDuplicates }