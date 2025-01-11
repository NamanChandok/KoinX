import React from 'react'

type Props = {
    image: string,
    name: string
}

export default function TeamMember({image, name}: Props) {
  return (
    <div className="bg-blue-50 p-4 md:px-8 rounded-md flex md:flex-row flex-col md:gap-8 gap-3 items-center">
        <div className="w-28 flex-shrink-0 text-center">
            <img src={image} className="aspect-square object-cover w-full mb-3 rounded-md" alt={name} />
            <div className="space-y-1">
                <h1 className="font-semibold text-lg text-nowrap">{name}</h1>
                <p className="text-light_gray text-sm">Designation Here</p>
            </div>
        </div>
        <p>Lorem ipsum dolor sit amet consectetur. In justo rutrum sit sit fermentum ut libero hendrerit id. Tellus sit ornare netus sagittis in nunc convallis mattis maecenas. Tempus arcu leo sociis laoreet nec neque sed pellentesque viverra. Consectetur proin amet ut id facilisi quis consectetur. Tellus gravida ultricies feugiat sed eu egestas dolor est ipsum. Malesuada etiam mi gravida praesent interdu</p>
    </div>
  )
}