const jobRequirements = {
    "Web Developer": {
        skills: ["python", "html & css", "javascript", "flask", "sql", "git"],
        resources: [
            { name: "Flask", link: "https://flask.palletsprojects.com/", hours: "10 hrs" },
            { name: "SQL", link: "https://www.w3schools.com/sql/", hours: "8 hrs" },
            { name: "Git", link: "https://git-scm.com/doc", hours: "5 hrs" },
            { name: "JavaScript", link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", hours: "15 hrs" },
            { name: "Python", link: "https://www.python.org/about/gettingstarted/", hours: "12 hrs" },
            { name: "HTML & CSS", link: "https://developer.mozilla.org/en-US/docs/Learn/HTML", hours: "8 hrs" }
        ]
    },
    "Data Analyst": {
        skills: ["python", "sql", "excel", "tableau", "pandas"],
        resources: [
            { name: "SQL", link: "https://www.w3schools.com/sql/", hours: "8 hrs" },
            { name: "Tableau", link: "https://www.tableau.com/learn", hours: "12 hrs" },
            { name: "Pandas", link: "https://pandas.pydata.org/", hours: "10 hrs" },
            { name: "Excel", link: "https://support.microsoft.com/en-us/excel", hours: "6 hrs" },
            { name: "Python", link: "https://www.python.org/about/gettingstarted/", hours: "12 hrs" }
        ]
    }
};

function runAnalysis() {
    const roleSelect = document.getElementById('role');
    const skillsInput = document.getElementById('skills');

    if (!roleSelect || !skillsInput) return;

    const role = roleSelect.value;
    const userSkills = skillsInput.value
        .split(',')
        .map(s => s.trim().toLowerCase())
        .filter(s => s.length > 0);

    const roleData = jobRequirements[role];
    if (!roleData) return;

    const matched = [];
    const missing = [];

    roleData.skills.forEach(skill => {
        if (userSkills.includes(skill)) {
            matched.push(skill);
        } else {
            missing.push(skill);
        }
    });

    const score = Math.round((matched.length / roleData.skills.length) * 100);

    const analysisData = {
        role: role,
        userSkills: userSkills,
        score: score,
        matched: matched,
        missing: missing
    };

    localStorage.setItem('skillAnalysis', JSON.stringify(analysisData));

    const scoreElement = document.getElementById('matchScore');
    const listContainer = document.getElementById('missingList');
    const resultsCard = document.getElementById('resultsCard');

    if (scoreElement) {
        scoreElement.innerText = `${score}%`;
    }

    if (listContainer) {
        listContainer.innerHTML = '';
        if (missing.length === 0) {
            listContainer.innerHTML = '<li>🎉 You are placement ready for this role!</li>';
        } else {
            missing.forEach(skill => {
                const formattedSkill = skill.toUpperCase();
                listContainer.innerHTML += `<li>❌ ${formattedSkill}</li>`;
            });
        }
    }

    if (resultsCard) {
        resultsCard.style.display = 'block';
    }
}