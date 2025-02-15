import React, { useState } from 'react'
import { Dropdown } from 'react-bootstrap'

const CustomDropdown = ({ style, variant, heading, companies, onCompanyChange}) => {
    const [selected, setSelected] = useState(heading)

    const handleSelect = (eventKey) => {
        const company = JSON.parse(eventKey)
        onCompanyChange(company.id)
        setSelected(company.name)
    }

    return (
        <Dropdown onSelect={handleSelect} style={{marginTop: '15px',marginBottom: '50px'}}>
            <Dropdown.Toggle id="dropdown-basic" variant={variant} style={style}>
                {selected}
            </Dropdown.Toggle>

            <Dropdown.Menu style={style}>
                {
                    companies?.map((item,index) => {
                        return(
                            <Dropdown.Item eventKey={JSON.stringify({id :item?._id,name: item?.name})} key={index}>{item?.name}</Dropdown.Item>
                        )
                    })
                }
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default CustomDropdown