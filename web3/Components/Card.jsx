"use client";
import React from 'react'

const Card = ({allreport, setOpenModel, setPay, title}) => {
	console.log(allreport);
  return (
	<div>
		{allreport?.map((report, i) => {
			<div onClick={() => (setPay(report), setOpenModel(true))}
			key={i+1}
			className='flex justify-center items-center'>
				Name
			</div>
		})}
	</div>
  )
}

export default Card