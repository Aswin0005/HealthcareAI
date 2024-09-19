'use client';
import { useState } from 'react';
import Image from 'next/image';

import face1 from '../public/face1.jpg';
import face2 from '../public/face2.jpg';
import face3 from '../public/face3.jpg';

// TherapistCard Component
function TherapistCard({ image, name, title, hospital, color, pricePerHour, sessionDuration, problems }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md mx-10 mb-6 group" style={{ backgroundColor: color }}>
            <div className="grid grid-cols-2 gap-4 items-start">
                {/* First grid (image and button) */}
                <div className="flex flex-col items-center">
                    <div className="relative h-24 w-24 rounded-full overflow-hidden mb-4">
                        <Image
                            src={image}
                            alt={name}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-full"
                        />
                    </div>
                    <button className="px-10 py-2 mt-3 text-blue-800 border border-blue-800 bg-white group-hover:bg-blue-800 group-hover:text-white rounded-lg font-medium transition-colors duration-300">
                        Book
                    </button>
                </div>

                {/* Second grid (text content) */}
                <div className="flex flex-col justify-between">
                    <div className="text-left">
                        <h2 className="text-md font-semibold">{name}</h2>
                        <p className="text-sm text-gray-600">{title}</p>
                        <p className="text-sm text-gray-600">{hospital}</p>
                        <p className="text-sm text-gray-600 mt-2">Session: ${pricePerHour}/{sessionDuration}</p>
                        <div className="mt-4">
                            <h3 className="text-sm font-semibold">Treats:</h3>
                            <ul className="list-disc list-inside text-sm text-gray-500">
                                {problems.map((problem, index) => (
                                    <li key={index}>{problem}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}




function Filter({ onFilter }) {
    const [selectedProblem, setSelectedProblem] = useState('');
    const [selectedHospital, setSelectedHospital] = useState('');
    const [selectedDuration, setSelectedDuration] = useState('');

    // Hard-coded options
    const problems = [
        "Anxiety",
        "Stress",
        "Depression",
        "Loneliness",
        "Phobia",
        "Trauma",
        "Family",
        "Relationship",
        "Grief",
        "Friendship"
    ];

    const hospitals = [
        "Apollo Hospitals",
        "Fortis Malar Hospital",
        "Sri Ramachandra Medical Centre",
        "Global Hospitals",
        "Vijaya Hospital",
        "Kauvery Hospital",
        "MIOT International",
        "Sankara Nethralaya",
        "Chettinad Hospital"
    ];

    const durations = [
        "30min",
        "45min",
        "1hr",
        "1hr 30min",
        "2hr"
    ];

    const handleFilter = () => {
        const filters = { problem: selectedProblem, hospital: selectedHospital, duration: selectedDuration };
        console.log("Filters applied:", filters); // Debugging line
        onFilter(filters); // Pass the filters to the parent component
    };

    return (
        <div className="filter-container mb-8 p-4 bg-gray-100 rounded-lg shadow-md">
            <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-4 md:flex-row">
                <select
                    value={selectedProblem}
                    onChange={(e) => setSelectedProblem(e.target.value)}
                    className="p-3 border rounded-lg w-full md:w-1/3"
                >
                    <option value="">Select Problem</option>
                    {problems.map((problem, index) => (
                        <option key={index} value={problem}>{problem}</option>
                    ))}
                </select>

                <select
                    value={selectedHospital}
                    onChange={(e) => setSelectedHospital(e.target.value)}
                    className="p-3 border rounded-lg w-full md:w-1/3"
                >
                    <option value="">Select Hospital</option>
                    {hospitals.map((hospital, index) => (
                        <option key={index} value={hospital}>{hospital}</option>
                    ))}
                </select>

                <select
                    value={selectedDuration}
                    onChange={(e) => setSelectedDuration(e.target.value)}
                    className="p-3 border rounded-lg w-full md:w-1/3"
                >
                    <option value="">Select Duration</option>
                    {durations.map((duration, index) => (
                        <option key={index} value={duration}>{duration}</option>
                    ))}
                </select>

                <button 
                    onClick={handleFilter} 
                    className="p-4 bg-blue-800 text-white rounded-lg transition md:ml-4 mt-4 md:mt-0"
                >
                    Apply
                </button>
            </div>
        </div>
    );
}



const therapists = [
    // 30m
    {
        image: face1,
        name: "Dr. Emma Parker",
        title: "Clinical Psychologist",
        hospital: "Apollo Hospitals",
        color: "#E0F1F0",
        pricePerHour: 80,
        sessionDuration: "30min",
        problems: ["Anxiety", "Stress"]
    },
    {
        image: face2,
        name: "Dr. Liam Moore",
        title: "Clinical Psychologist",
        hospital: "Fortis Malar Hospital",
        color: "#F0E0F1",
        pricePerHour: 75,
        sessionDuration: "30min",
        problems: ["Depression", "Loneliness"]
    },
    {
        image: face3,
        name: "Dr. Olivia Taylor",
        title: "Trauma Psychologist",
        hospital: "Sri Ramachandra Medical Centre",
        color: "#F1F0E0",
        pricePerHour: 85,
        sessionDuration: "30min",
        problems: ["Phobia", "Trauma"]
    },
    {
        image: face1,
        name: "Dr. Noah Davis",
        title: "Family Therapist",
        hospital: "Global Hospitals",
        color: "#D0F1E0",
        pricePerHour: 90,
        sessionDuration: "30min",
        problems: ["Stress", "Family"]
    },
    {
        image: face2,
        name: "Dr. Isabella Smith",
        title: "Clinical Psychologist",
        hospital: "Vijaya Hospital",
        color: "#F1D0E0",
        pricePerHour: 80,
        sessionDuration: "30min",
        problems: ["Depression", "Phobia"]
    },
    {
        image: face3,
        name: "Dr. Ethan Clark",
        title: "Clinical Psychologist",
        hospital: "Kauvery Hospital",
        color: "#E0D0F1",
        pricePerHour: 85,
        sessionDuration: "30min",
        problems: ["Loneliness", "Trauma"]
    },

    // 45m
    {
        image: face1,
        name: "Dr. Chloe Harris",
        title: "Anxiety Specialist",
        hospital: "MIOT International",
        color: "#E0F1D0",
        pricePerHour: 100,
        sessionDuration: "45min",
        problems: ["Anxiety", "Relationship"]
    },
    {
        image: face2,
        name: "Dr. Aiden Wright",
        title: "Grief Therapist",
        hospital: "Sankara Nethralaya",
        color: "#D0E0F1",
        pricePerHour: 90,
        sessionDuration: "45min",
        problems: ["Depression", "Grief"]
    },
    {
        image: face3,
        name: "Dr. Mia Lewis",
        title: "Family Therapist",
        hospital: "Chettinad Hospital",
        color: "#F1D0C0",
        pricePerHour: 95,
        sessionDuration: "45min",
        problems: ["Trauma", "Family"]
    },
    {
        image: face1,
        name: "Dr. Lucas Walker",
        title: "Stress Management Expert",
        hospital: "Apollo Hospitals",
        color: "#E0F1F0",
        pricePerHour: 85,
        sessionDuration: "45min",
        problems: ["Stress", "Friendship"]
    },
    {
        image: face2,
        name: "Dr. Emma Wilson",
        title: "Family Therapist",
        hospital: "Fortis Malar Hospital",
        color: "#F0E0F1",
        pricePerHour: 95,
        sessionDuration: "45min",
        problems: ["Depression", "Family"]
    },
    {
        image: face3,
        name: "Dr. Noah Johnson",
        title: "Phobia Specialist",
        hospital: "Sri Ramachandra Medical Centre",
        color: "#F1F0E0",
        pricePerHour: 90,
        sessionDuration: "45min",
        problems: ["Phobia", "Loneliness"]
    },

    // 1hr
    {
        image: face1,
        name: "Dr. Ava Martinez",
        title: "Depression Specialist",
        hospital: "Global Hospitals",
        color: "#D0F1E0",
        pricePerHour: 130,
        sessionDuration: "1hr",
        problems: ["Depression", "Stress"]
    },
    {
        image: face2,
        name: "Dr. William Green",
        title: "Friendship Expert",
        hospital: "Vijaya Hospital",
        color: "#F1D0E0",
        pricePerHour: 120,
        sessionDuration: "1hr",
        problems: ["Anxiety", "Friendship"]
    },
    {
        image: face3,
        name: "Dr. Amelia King",
        title: "Trauma Psychologist",
        hospital: "Kauvery Hospital",
        color: "#E0D0F1",
        pricePerHour: 125,
        sessionDuration: "1hr",
        problems: ["Trauma", "Loneliness"]
    },
    {
        image: face1,
        name: "Dr. James Brown",
        title: "Friendship Expert",
        hospital: "MIOT International",
        color: "#E0F1D0",
        pricePerHour: 135,
        sessionDuration: "1hr",
        problems: ["Depression", "Friendship"]
    },
    {
        image: face2,
        name: "Dr. Olivia Jones",
        title: "Grief Therapist",
        hospital: "Sankara Nethralaya",
        color: "#D0E0F1",
        pricePerHour: 140,
        sessionDuration: "1hr",
        problems: ["Phobia", "Grief"]
    },
    {
        image: face3,
        name: "Dr. Daniel Thomas",
        title: "Family Therapist",
        hospital: "Chettinad Hospital",
        color: "#F1D0C0",
        pricePerHour: 130,
        sessionDuration: "1hr",
        problems: ["Anxiety", "Family"]
    },

    // 1hr 30m
    {
        image: face1,
        name: "Dr. Sophia Robinson",
        title: "Trauma Psychologist",
        hospital: "Global Hospitals",
        color: "#D0F1E0",
        pricePerHour: 145,
        sessionDuration: "1hr 30min",
        problems: ["Depression", "Trauma"]
    },
    {
        image: face2,
        name: "Dr. Ethan Lee",
        title: "Grief Therapist",
        hospital: "Vijaya Hospital",
        color: "#F1D0E0",
        pricePerHour: 135,
        sessionDuration: "1hr 30min",
        problems: ["Stress", "Grief"]
    },
    {
        image: face3,
        name: "Dr. Ava Adams",
        title: "Family Therapist",
        hospital: "Fortis Malar Hospital",
        color: "#F0D0E0",
        pricePerHour: 140,
        sessionDuration: "1hr 30min",
        problems: ["Anxiety", "Family"]
    },
    {
        image: face1,
        name: "Dr. Noah Walker",
        title: "Stress Management Expert",
        hospital: "Sri Ramachandra Medical Centre",
        color: "#E0F1D0",
        pricePerHour: 150,
        sessionDuration: "1hr 30min",
        problems: ["Trauma", "Friendship"]
    },
    {
        image: face2,
        name: "Dr. Isabella Brown",
        title: "Family Therapist",
        hospital: "MIOT International",
        color: "#D0E0F1",
        pricePerHour: 140,
        sessionDuration: "1hr 30min",
        problems: ["Depression", "Family"]
    },
    {
        image: face3,
        name: "Dr. Liam Davis",
        title: "Stress Management Expert",
        hospital: "Sankara Nethralaya",
        color: "#F1D0E0",
        pricePerHour: 130,
        sessionDuration: "1hr 30min",
        problems: ["Stress", "Loneliness"]
    },

    // 2hr
    {
        image: face1,
        name: "Dr. Emma Taylor",
        title: "Phobia Specialist",
        hospital: "Chettinad Hospital",
        color: "#F1D0C0",
        pricePerHour: 180,
        sessionDuration: "2hr",
        problems: ["Phobia", "Family"]
    },
    {
        image: face2,
        name: "Dr. Jack Harris",
        title: "Trauma Psychologist",
        hospital: "Apollo Hospitals",
        color: "#E0F1F0",
        pricePerHour: 170,
        sessionDuration: "2hr",
        problems: ["Depression", "Trauma"]
    },
    {
        image: face3,
        name: "Dr. Olivia Carter",
        title: "Grief Therapist",
        hospital: "Vijaya Hospital",
        color: "#F1D0E0",
        pricePerHour: 160,
        sessionDuration: "2hr",
        problems: ["Grief", "Trauma"]
    },
    {
        image: face1,
        name: "Dr. Lucas Scott",
        title: "Friendship Expert",
        hospital: "Fortis Malar Hospital",
        color: "#F0E0F1",
        pricePerHour: 175,
        sessionDuration: "2hr",
        problems: ["Anxiety", "Friendship"]
    },
    {
        image: face2,
        name: "Dr. Mia Evans",
        title: "Family Therapist",
        hospital: "Kauvery Hospital",
        color: "#F1F0E0",
        pricePerHour: 180,
        sessionDuration: "2hr",
        problems: ["Trauma", "Family"]
    },
    {
        image: face3,
        name: "Dr. Daniel Thompson",
        title: "Anxiety Specialist",
        hospital: "Sri Ramachandra Medical Centre",
        color: "#F1F0E0",
        pricePerHour: 190,
        sessionDuration: "2hr",
        problems: ["Anxiety", "Stress"]
    }
];



export default function TherapistList() {
    const [filteredTherapists, setFilteredTherapists] = useState(therapists);

    const handleFilter = (filters) => {
        const { doctorName, problem, hospital, time, category } = filters;
        const filtered = therapists.filter(therapist => {
            return (
                (doctorName ? therapist.name.toLowerCase().includes(doctorName.toLowerCase()) : true) &&
                (problem ? therapist.problems.some(p => p.toLowerCase().includes(problem.toLowerCase())) : true) &&
                (hospital ? therapist.hospital.toLowerCase().includes(hospital.toLowerCase()) : true) &&
                (time ? therapist.sessionDuration.toLowerCase().includes(time.toLowerCase()) : true) &&
                (category ? therapist.title.toLowerCase().includes(category.toLowerCase()) : true)
            );
        });
        setFilteredTherapists(filtered);
    };

    return (
        <div className="p-4">
            <Filter onFilter={handleFilter} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {filteredTherapists.map((therapist, index) => (
                    <TherapistCard key={index} {...therapist} />
                ))}
            </div>
        </div>
    );
}