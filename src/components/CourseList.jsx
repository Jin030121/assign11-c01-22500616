import { useState } from 'react';
import CourseItem from './CourseItem.jsx';
import { initialCourses } from '../data/courses.js';

export default function CourseList() {
  const [courses, setCourses] = useState(initialCourses);
  const [newName, setNewName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [nextId, setNextId] = useState(
    () =>
      Math.max(
        0,
        ...initialCourses.map(course => Number(course.id) || 0)
      ) + 1
  );

  function handleDelete(id) {
    if (!window.confirm('이 과목을 삭제하시겠습니까?')) return;
    setCourses(previous => previous.filter(course => course.id !== id));
  }

  function handleAdd(event) {
    event.preventDefault();

    const trimmedName = newName.trim();

    if (!trimmedName) {
      setErrorMessage('과목명을 입력하세요.');
      return;
    }

    const newCourse = {
      id: nextId,
      name: trimmedName,
      category: 'Elective',
      completed: false,
    };

    setCourses(previous => [...previous, newCourse]);
    setNextId(previousId => previousId + 1);
    setNewName('');
    setErrorMessage('');
  }

  function handleToggle(id) {
    setCourses(previous =>
      previous.map(course =>
        course.id === id
          ? { ...course, completed: !course.completed }
          : course
      )
    );
  }

  const doneCount = courses.filter(course => course.completed).length;
  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(normalizedSearch)
  );

  return (
    <>
      <section className="stats" aria-label="과목 통계">
        <div className="stat">
          <span>전체 과목</span>
          <strong>{courses.length}</strong>
        </div>
        <div className="stat">
          <span>완료</span>
          <strong className="green">{doneCount}</strong>
        </div>
        <div className="stat">
          <span>진행 중</span>
          <strong className="blue">{courses.length - doneCount}</strong>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <h2>My Courses</h2>
          <span className="small-note">{courses.length} courses</span>
        </div>

        <form className="add-form" onSubmit={handleAdd}>
          <input
            className="input"
            value={newName}
            onChange={event => setNewName(event.target.value)}
            placeholder="새 과목명을 입력하세요"
            aria-label="새 과목명"
          />
          <button className="btn primary" type="submit">
            + Add Course
          </button>
        </form>

        {errorMessage && (
          <p className="error" role="alert">
            {errorMessage}
          </p>
        )}

        <div className="tools">
          <input
            className="input"
            value={searchTerm}
            onChange={event => setSearchTerm(event.target.value)}
            placeholder="과목 검색"
            aria-label="과목 검색"
          />
        </div>

        <div className="list-head">
          <span>COURSE</span>
          <span>CATEGORY</span>
          <span>ACTIONS</span>
        </div>

        {courses.length === 0 ? (
          <div className="empty">등록된 과목이 없습니다.</div>
        ) : filteredCourses.length === 0 ? (
          <div className="empty">검색 결과가 없습니다.</div>
        ) : (
          filteredCourses.map(course => (
            <CourseItem
              key={course.id}
              course={course}
              onDelete={handleDelete}
              onToggle={handleToggle}
            />
          ))
        )}
      </section>
    </>
  );
}