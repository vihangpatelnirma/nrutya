

const logoStyle = `height: "80px";`


function render(data) {
		const { name, email, age, phone, class : forClass, source } = data
		return (
            `<div>
                <br/>
                <br/>
				<table border="1">
					<thead>
						<tr>
							<th>Name</th>
							<th>Email</th>
							<th>Age</th>
                            <th>Contact Numner</th>
                            <th>Class</th>
                            <th>Source</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>${name}</td>
							<td>${email}</td>
							<td>${age}</td>
                            <td>${phone}</td>
                            <td>${forClass}</td>
                            <td>${source}</td>
						</tr>
					</tbody>
				</table>
				<br />
				<img src="http://www.jalpadance.com/assets/img/logo.png" style=${logoStyle} />
			</div>`
		)
	}




module.exports = render