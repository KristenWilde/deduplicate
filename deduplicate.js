const fs = require('fs')

const removeDuplicates = (leads) => {
	// remove the duplicates

	return leads
}



const run = () => {
	const filenames = fs.readdirSync('./unprocessed_lead_files') //filenames = fs.readdirSync(directory_name)
	const directories_created = []

	filenames.forEach(filename => {
		let duplicates = []

		const json = fs.readFileSync(`./unprocessed_lead_files/${filename}`, 'utf8')
		const leads = JSON.parse(json).leads

		const result = removeDuplicates(leads)

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
			JSON.stringify( { leads} , undefined, '\t'
		)

		// write de-duplicated file
		fs.writeFileSync(
			`./results/${directory_name}/${name}.json`, 
			JSON.stringify( { leads: result } , undefined, '\t')
		)

		// write log file
		fs.writeFileSync(
			`./results/${directory_name}/log.txt`, 
			"This is the log file"
		)

		// handle errors if json can't be parsed or leads array not found.
	})

	return directories_created
}



run()

module.exports = { run }