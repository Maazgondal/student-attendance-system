// script.js
let currentSemester = null;
let currentSection = null;
let students = {};

function login() {
  const semester = document.getElementById('semester-select').value;
  const section = document.getElementById('section-select').value;
  const name = document.getElementById('teacher-name').value;
  const password = document.getElementById('teacher-password').value;

  if (semester && section && name && password) {
    currentSemester = semester;
    currentSection = section;
    const key = `${semester}-${section}`;
    if (!students[key]) students[key] = [];

    document.getElementById('login-page').style.display = 'none';
    document.getElementById('app').style.display = 'block';
    document.getElementById('section-title').innerText = `Manage Students - ${key}`;
    updateStudentList();
  } else {
    alert('Please fill all login fields.');
  }
}

document.getElementById('student-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('student-name').value.trim();
  if (name && currentSemester && currentSection) {
    const key = `${currentSemester}-${currentSection}`;
    const roll = students[key].length + 1;
    students[key].push({ roll, name, present: 0, absent: 0 });
    updateStudentList();
    document.getElementById('student-name').value = '';
  }
});

function updateStudentList() {
  const list = document.getElementById('student-list');
  const table = document.getElementById('attendance-table');
  const key = `${currentSemester}-${currentSection}`;
  list.innerHTML = '';
  table.innerHTML = '';

  students[key].forEach((student, index) => {
    const li = document.createElement('li');
    li.textContent = `${student.roll}. ${student.name}`;
    list.appendChild(li);

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="border px-2 text-center">${student.roll}</td>
      <td class="border px-2">${student.name}</td>
      <td class="border px-2 text-center">${student.present}</td>
      <td class="border px-2 text-center">${student.absent}</td>
      <td class="border px-2 text-center">
        <button class="bg-green-500 text-white px-2 py-1 rounded" onclick="markAttendance(${index}, true)">Present</button>
        <button class="bg-red-500 text-white px-2 py-1 rounded ml-2" onclick="markAttendance(${index}, false)">Absent</button>
      </td>
    `;
    table.appendChild(tr);
  });
}

function markAttendance(index, isPresent) {
  const key = `${currentSemester}-${currentSection}`;
  const student = students[key][index];

  if (student.present + student.absent >= 32) {
    alert('Attendance completed for 32 lectures.');
    return;
  }

  if (isPresent) student.present++;
  else student.absent++;

  updateStudentList();
}

function calculateAttendance() {
  const key = `${currentSemester}-${currentSection}`;
  const list = document.getElementById('attendance-percentage');
  const barList = document.getElementById('attendance-bar-list');
  list.innerHTML = '';
  barList.innerHTML = '';

  students[key].forEach(student => {
    const total = student.present + student.absent;
    const percent = total > 0 ? ((student.present / total) * 100).toFixed(2) : 0;

    const li = document.createElement('li');
    li.textContent = `${student.roll}. ${student.name}: ${percent}% present`;
    list.appendChild(li);

    const bar = document.createElement('div');
    bar.className = 'flex items-center space-x-2';

    const label = document.createElement('span');
    label.textContent = `${student.roll}. ${student.name}`;

    const presentBar = document.createElement('div');
    presentBar.className = 'h-4 bg-green-500';
    presentBar.style.width = `${percent}%`;

    const absentBar = document.createElement('div');
    absentBar.className = 'h-4 bg-red-500';
    absentBar.style.width = `${100 - percent}%`;

    const wrapper = document.createElement('div');
    wrapper.className = 'w-full flex';
    wrapper.appendChild(presentBar);
    wrapper.appendChild(absentBar);

    bar.appendChild(label);
    bar.appendChild(wrapper);

    barList.appendChild(bar);
  });
}
