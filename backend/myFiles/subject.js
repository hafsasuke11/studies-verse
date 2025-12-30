const subjectsData = [
    {
        id: 1,
        name: 'Mathematics',
        description: 'Study of numbers, quantity, space, and change',
        code: 'MATH101',
        topics: ['Algebra', 'Calculus', 'Geometry', 'Statistics']
    },
    {
        id: 2,
        name: 'Physics',
        description: 'Study of matter, energy, and their interactions',
        code: 'PHYS101',
        topics: ['Mechanics', 'Thermodynamics', 'Electromagnetism', 'Quantum']
    },
    {
        id: 3,
        name: 'Computer Science',
        description: 'Study of computation and information',
        code: 'CS101',
        topics: ['Programming', 'Data Structures', 'Algorithms', 'Database']
    },
    {
        id: 4,
        name: 'Chemistry',
        description: 'Study of substances and their properties',
        code: 'CHEM101',
        topics: ['Organic', 'Inorganic', 'Physical', 'Analytical']
    },
    {
        id: 5,
        name: 'Biology',
        description: 'Study of living organisms',
        code: 'BIO101',
        topics: ['Cell Biology', 'Genetics', 'Ecology', 'Evolution']
    }
];

const notesData = [
    {
        id: 1,
        subjectId: 1,
        title: 'Introduction to Calculus',
        content: 'Calculus is the mathematical study of continuous change...',
        author: 'Mr. Hanan',
        date: '2024-01-15'
    },
    {
        id: 2,
        subjectId: 3,
        title: 'JavaScript Basics',
        content: 'JavaScript is a versatile programming language...',
        author: 'Mr. Shahbaz',
        date: '2024-01-20'
    },
    {
        id: 3,
        subjectId: 2,
        title: 'Newton\'s Laws of Motion',
        content: 'Newton\'s laws describe the relationship between a body...',
        author: 'Ms. Ayesha',
        date: '2024-01-18'
    }
];

const subjectHandlers = {
    getSubjects: (req, res) => {
        res.json({
            subjects: subjectsData,
            count: subjectsData.length
        });
    },

    getNotes: (req, res) => {
        const { subjectId } = req.query;
        
        let filteredNotes = notesData;
        if (subjectId) {
            filteredNotes = notesData.filter(note => note.subjectId === parseInt(subjectId));
        }

        res.json({
            notes: filteredNotes,
            count: filteredNotes.length
        });
    }
};

module.exports = subjectHandlers;