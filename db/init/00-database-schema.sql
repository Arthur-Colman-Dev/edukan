/*Informações dos alunos.*/
CREATE TABLE public.students (
  google_classroom_id TEXT PRIMARY KEY
);

COMMENT ON TABLE public.students IS
'Alunos que usam o Edukan.';

CREATE TYPE assignment_status AS ENUM ('todo','doing', 'done');

/*Provas e trabalhos assinalados aos alunos.*/
CREATE TABLE public.assignments (
    id SERIAL PRIMARY KEY,
    course_id TEXT UNIQUE NOT NULL,
    course_work_id TEXT UNIQUE NOT NULL,
    student_id TEXT NOT NULL REFERENCES public.students(google_classroom_id),
    status assignment_status NOT NULL DEFAULT 'todo'
);

COMMENT ON TABLE public.assignments IS
'Trabalhos e provas pertencentes aos alunos.';
