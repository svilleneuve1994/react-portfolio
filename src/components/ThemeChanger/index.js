import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWandMagic, faPlus, faStar } from '@fortawesome/free-solid-svg-icons'

const ThemeChanger = ({ setTheme }) => {
	const [toggle, setToggle] = useState(false)

	return (
		<div className="theme-changer" onClick={() => setToggle(!toggle)} >
			{toggle ? <></> : 
			<>
				<FontAwesomeIcon icon={faWandMagic} size="xl" />
				<FontAwesomeIcon icon={faStar} className="icon" size="xl" />
				<FontAwesomeIcon icon={faStar} className="icon" size="xl" />
				<FontAwesomeIcon icon={faStar} className="icon" size="xl" />
				<FontAwesomeIcon icon={faPlus} className="icon" size="xl" />
				<FontAwesomeIcon icon={faPlus} className="icon" size="xl" />
			</>}
			{toggle && (
				<>
				<div className="d-flex align-items-center mb-2">
					<FontAwesomeIcon icon={faWandMagic} size="xl" />
					<h3 className="ms-2 mb-0">Theme Changer</h3>
				</div>
				<ul className="list-group">
					<li className="list-group-item" onClick={() => setTheme("default")}>Default</li>
					<li className="list-group-item" onClick={() => setTheme("space")}>Space</li>
					<li className="list-group-item" onClick={() => setTheme("vaporwave")}>Vaporwave</li>
				</ul>
				</>
			)}
		</div>
	);
};

export default ThemeChanger;