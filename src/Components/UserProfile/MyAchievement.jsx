import React from 'react'

export default function MyAchievement() {
    const AllBadge = [
        {
            name : "Beginning of Journey",
            img : "https://drive.google.com/file/d/1kxHPXetz4d0T1sQYA37QmLPqJCiOphuN/view?usp=drive_link",
            description : "You have succeed a first time booking. This is just a beginning",
            milestones : [{
                quest :  "Booking for first time",
                progress : 0,
                goal : 1  
            }] 
            
        },
        {
            name : "Road to traveler",
            img : "",
            description : "Now you're nearly to be a traveler make more journey with us together!",
            milestones : [{
                quest  :"Booking in three different place",
                progress : 0,
                goal : 3
            }]
        },
        {
            name : "Lovely place",
            img : "",
            description : "You're in love with some place",
            milestones : [{
                quest  :"Going to the same place 5 times",
                progress : 0,
                goal : 5
            }]
        }
    ]
  return (
    <div className='flex self-start flex-col mt-12 w-3/5 bg-white'>

    </div>
  )
}
