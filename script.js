document.addEventListener('DOMContentLoaded', function() {
    const subjects = [
        { code: 'DFS101', name: 'Fire Science and Technology', maxMarks: 100 },
        { code: 'DFS102', name: 'Fire Prevention and Investigation', maxMarks: 100 },
        { code: 'DFS103', name: 'Fire Protection and Survey', maxMarks: 100 },
        { code: 'DFS104', name: 'Fire Extinction and Control', maxMarks: 100 },
        { code: 'DFS105', name: 'Industrial Safety Management', maxMarks: 100 },
        { code: 'DFS106', name: 'Practical I', maxMarks: 100 },
        { code: 'DFS107', name: 'Practical II', maxMarks: 100 },
        { code: 'DFS108', name: 'Practical III', maxMarks: 100 }
    ];

    const marksBody = document.getElementById('marks-body');
    subjects.forEach(subject => {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${subject.code}</td>
            <td>${subject.name}</td>
            <td>${subject.maxMarks}</td>
            <td><input type="number" class="input-field theory" value="0"></td>
            <td><input type="number" class="input-field practical" value="0"></td>
            <td class="total-marks">0</td>
            <td class="total-words">Zero</td>`;
        marksBody.appendChild(row);
    });

    document.querySelectorAll('.input-field').forEach(input => {
        input.addEventListener('input', updateResults);
    });

    function updateResults() {
        let totalMarks = 0;
        document.querySelectorAll('tbody tr').forEach(row => {
            const theory = parseInt(row.cells[3].querySelector('input').value) || 0;
            const practical = parseInt(row.cells[4].querySelector('input').value) || 0;
            const total = theory + practical;
            totalMarks += total;
            row.cells[5].textContent = total;
            row.cells[6].textContent = numberToWords(total);
        });
        document.getElementById('total-marks').textContent = totalMarks;
        const totalPossibleMarks = subjects.length * 100; // Assuming each subject is out of 100 marks
        const percentage = (totalMarks / totalPossibleMarks * 100).toFixed(2);
        document.getElementById('percentage').textContent = percentage + '%';
        document.getElementById('grade').textContent = calculateGrade(percentage);
        document.getElementById('result').textContent = percentage >= 50 ? 'PASS' : 'FAIL'; // Example logic
    }

    function numberToWords(number) {
        const a = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
        const b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
        if (number < 20) return a[number];
        const digit = number % 10;
        if (number < 100) return b[Math.floor(number / 10)] + (digit ? '-' + a[digit] : '');
        if (number < 1000) return a[Math.floor(number / 100)] + ' hundred' + (number % 100 == 0 ? '' : ' ' + numberToWords(number % 100));
        return 'out of range'; // extend this function if needed
    }

    function calculateGrade(percentage) {
        // Example grading logic, adjust according to actual criteria
        if (percentage >= 90) return 'A';
        else if (percentage >= 80) return 'B';
        else if (percentage >= 70) return 'C';
        else if (percentage >= 60) return 'D';
        else if (percentage >= 50) return 'E';
        else return 'F';
    }
});

