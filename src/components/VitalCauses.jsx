import React from 'react'
import housingIcon from '../assets/housing-crisis-relief.png'
import veteranIcon from '../assets/veteran-support.png'
import wildfireIcon from '../assets/wildfire-victim-recovery.png'
import womensIcon from '../assets/womens-empowerment.png'
import healthcareIcon from '../assets/healthcare.png'
import homelessnessIcon from '../assets/homelessness-prevention.png'
import educationIcon from '../assets/education-student-aid.png'
import emergencyIcon from '../assets/emergency-relief.png'
import BuyCNTBtn from './BuyCNTBtn'
function VitalCauses() {
  const causes = [
    { 
      id: 1, 
      title: "Housing Crisis Relief",
      icon: housingIcon
    },
    { 
      id: 2, 
      title: "Veteran Support & Services",
      icon: veteranIcon
    },
    { 
      id: 3, 
      title: "Wildfire Victim Recovery",
      icon: wildfireIcon
    },
    { 
      id: 4, 
      title: "Women's Empowerment",
      icon: womensIcon
    },
    { 
      id: 5, 
      title: "HealthCare",
      icon: healthcareIcon
    },
    { 
      id: 6, 
      title: "Homelessness Prevention",
      icon: homelessnessIcon
    },
    { 
      id: 7, 
      title: "Education & Student Aid",
      icon: educationIcon
    },
    { 
      id: 8, 
      title: "Emergency Relief",
      icon: emergencyIcon
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-[46px] md:text-[54px] font-bold text-[#133E76] mb-16">
          CNT Supports Vital Causes<br className="hidden md:block" /> Across California:
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-20 gap-y-8">
          {causes.map(cause => (
            <div 
              key={cause.id} 
              className="bg-white rounded-lg border-2 border-[#133E76] flex flex-col items-center justify-center text-center shadow-lg h-[230px] w-[230px] mx-auto"
            >
              <div className="mb-5">
                <img src={cause.icon} alt={cause.title} width="64" height="64" className="object-contain" />
              </div>
              <h3 className="text-sm md:text-base font-medium px-4">{cause.title}</h3>
            </div>
          ))}
        </div>
        
        <BuyCNTBtn />

      </div>
    </section>
  )
}

export default VitalCauses 