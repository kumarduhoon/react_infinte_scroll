import React from 'react'


function Card({ item }) {
    console.log(item)
    return (
        <div key={item.id} className="max-w-sm rounded overflow-hidden shadow-lg">
            <img className="w-full" src={item?.images[0]} alt="Sunset in the mountains" />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{item.title}</div>
                <p className="text-gray-700 text-base">{item.description}
                </p>
            </div>
            <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{item?.category?.name}</span>
            </div>

            {/* {data.length > 0 && data.map((item) => {
                return (
                    <div className="max-w-sm rounded overflow-hidden shadow-lg">
                        <img className="w-full" src={item?.images[0]} alt="Sunset in the mountains" />
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{item.title}</div>
                            <p className="text-gray-700 text-base">{item.description}
                            </p>
                        </div>
                        <div className="px-6 pt-4 pb-2">
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{item?.category?.name}</span>
                        </div>
                    </div>
                )
            })} */}
        </div>
    )
}

export default Card